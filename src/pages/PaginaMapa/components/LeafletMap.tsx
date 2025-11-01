import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Import do plugin de heatmap será feito dinamicamente para evitar problemas de pré-empacotamento do Vite
import '../../../styles/leaflet-custom.css';

// Fix para os ícones padrão do Leaflet
delete ((L as any).Icon.Default.prototype as any)._getIconUrl;
((L as any).Icon.Default as any).mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LeafletMapProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  lojaEndereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    coordenadas?: {
      latitude: number;
      longitude: number;
      dataAtualizacao: string;
    };
  };
  showHeatmap?: boolean;
  showDeliveryRadius?: boolean;
}

export function LeafletMap({ 
  height = '100vh', 
  center = [-23.5505, -46.6333], // São Paulo como padrão
  zoom = 13,
  lojaEndereco,
  showHeatmap = false,
  showDeliveryRadius = true
}: LeafletMapProps) {
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const lojaMarkerRef = useRef<any>(null);
  const heatmapLayerRef = useRef<any>(null);
  const deliveryRadiusLayersRef = useRef<any[]>([]);
  const [isLoadingHeatmap, setIsLoadingHeatmap] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // Função para criar raios de área de entrega
  const criarRaiosEntrega = useCallback((coordenadas: [number, number]) => {
    console.log('🎯 criarRaiosEntrega chamada:', { 
      coordenadas, 
      hasMap: !!mapInstanceRef.current, 
      showDeliveryRadius 
    });
    
    if (!mapInstanceRef.current || !showDeliveryRadius) {
      console.log('❌ Não foi possível criar raios:', { 
        hasMap: !!mapInstanceRef.current, 
        showDeliveryRadius 
      });
      return;
    }

    console.log('✅ Criando raios de entrega...');
    
    // Limpar raios existentes
    removerRaiosEntrega();

    // Definir raios de entrega em metros
    const raiosEntrega = [
      { raio: 1000, cor: '#8B5CF6', opacidade: 0.3, peso: 2 },    // 1km - roxo claro
      { raio: 2000, cor: '#6B7280', opacidade: 0.25, peso: 1.5 }, // 2km - cinza
      { raio: 3000, cor: '#374151', opacidade: 0.2, peso: 1 },    // 3km - cinza escuro
      { raio: 5000, cor: '#1F2937', opacidade: 0.15, peso: 0.8 }  // 5km - cinza muito escuro
    ];

    raiosEntrega.forEach(({ raio, cor, opacidade, peso }) => {
      try {
        const circulo = (L as any).circle(coordenadas, {
          radius: raio,
          color: cor,
          fillColor: cor,
          fillOpacity: opacidade,
          weight: peso,
          opacity: opacidade + 0.1
        });

        circulo.addTo(mapInstanceRef.current);

        // Adicionar popup com informações do raio
        circulo.bindPopup(`
          <div class="p-2 text-center">
            <div class="font-semibold text-gray-800">Área de Entrega</div>
            <div class="text-sm text-gray-600">Raio: ${raio/1000}km</div>
          </div>
        `);

        deliveryRadiusLayersRef.current.push(circulo);
      } catch (error) {
        console.warn('Erro ao criar raio de entrega:', error);
      }
    });
  }, [showDeliveryRadius]);

  // Função para remover raios de entrega
  const removerRaiosEntrega = useCallback(() => {
    if (!mapInstanceRef.current) return;
    
    deliveryRadiusLayersRef.current.forEach(layer => {
      try {
        mapInstanceRef.current.removeLayer(layer);
      } catch (error) {
        console.warn('Erro ao remover raio:', error);
      }
    });
    deliveryRadiusLayersRef.current = [];
  }, []);

  // Função para buscar coordenadas de um endereço
  const buscarCoordenadasEndereco = useCallback(async (endereco: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1&countrycodes=br`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        return [lat, lon];
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar coordenadas do endereço:', error);
      return null;
    }
  }, []);

  // Função para marcar o endereço da loja no mapa
  const marcarEnderecoLoja = useCallback(async () => {
    if (!lojaEndereco || !mapInstanceRef.current) {
      return;
    }

    // Verificar se todos os campos necessários estão preenchidos
    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
    const camposVazios = camposObrigatorios.filter(campo => !lojaEndereco[campo as keyof typeof lojaEndereco]);
    
    if (camposVazios.length > 0) {
      return;
    }

    let coordenadas: [number, number] | null = null;
    
    // Primeiro, verificar se já temos coordenadas salvas
    if (lojaEndereco.coordenadas?.latitude && lojaEndereco.coordenadas?.longitude) {
      coordenadas = [lojaEndereco.coordenadas.latitude, lojaEndereco.coordenadas.longitude];
    } else {
      // Se não temos coordenadas, fazer geocodificação
      const enderecoCompleto = `${lojaEndereco.rua}, ${lojaEndereco.numero}, ${lojaEndereco.bairro}, ${lojaEndereco.cidade}, ${lojaEndereco.estado}, ${lojaEndereco.cep}`;
      coordenadas = await buscarCoordenadasEndereco(enderecoCompleto);
    }
    
    if (coordenadas) {
      // Remover marcador anterior da loja se existir
      if (lojaMarkerRef.current) {
        mapInstanceRef.current.removeLayer(lojaMarkerRef.current);
      }
      
      // Criar ícone personalizado para a loja
      const lojaIcon = (L as any).divIcon({
        className: 'custom-loja-marker',
        html: `
          <div class="w-8 h-8 bg-purple-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      
      // Adicionar marcador da loja
      const marker = (L as any).marker(coordenadas, { 
        icon: lojaIcon,
        zIndexOffset: 1000
      }).addTo(mapInstanceRef.current);
      
      lojaMarkerRef.current = marker;
      
      // Adicionar popup com informações da loja
      marker.bindPopup(`
        <div class="p-3">
          <h3 class="font-semibold text-gray-800 mb-2 text-center">🏪 Sua Loja</h3>
          <div class="text-sm text-gray-600 space-y-1">
            <p><strong>Endereço:</strong></p>
            <p>${lojaEndereco.rua}, ${lojaEndereco.numero}</p>
            <p>${lojaEndereco.bairro}</p>
            <p>${lojaEndereco.cidade} - ${lojaEndereco.estado}</p>
            <p>CEP: ${lojaEndereco.cep}</p>
          </div>
        </div>
      `);
      
      // Centralizar mapa na localização da loja
      mapInstanceRef.current.setView(coordenadas, 16);
      
      // Sempre recriar os raios de área de entrega se estiverem ativos
      // Isso garante que os raios sejam exibidos corretamente
      if (showDeliveryRadius) {
        criarRaiosEntrega(coordenadas);
      }
      
      // Abrir popup automaticamente
      marker.openPopup();
    }
  }, [lojaEndereco, showDeliveryRadius, criarRaiosEntrega, buscarCoordenadasEndereco]);

  // Função para criar dados do mapa de calor
  const criarDadosHeatmap = useCallback(async () => {
    try {
      setIsLoadingHeatmap(true);
      
      // Lista dos bairros para buscar coordenadas
      const bairros = [
        'Centro, Itaperuna, RJ, Brasil',
        'Niterói, Itaperuna, RJ, Brasil', 
        'Cidade Nova, Itaperuna, RJ, Brasil',
        'Horto Florestal, Itaperuna, RJ, Brasil',
        'Aeroporto, Itaperuna, RJ, Brasil',
        'Vinhosa, Itaperuna, RJ, Brasil',
        'Jardim Belvedere, Itaperuna, RJ, Brasil',
        'Jardim Valéria, Itaperuna, RJ, Brasil'
      ];
      
      const pontosHeatmap: [number, number, number][] = [];
      
      // Buscar coordenadas para cada bairro
      for (const bairro of bairros) {
        const coordenadas = await buscarCoordenadasEndereco(bairro);
        
        if (coordenadas) {
          // Adicionar ponto principal com intensidade máxima
          pontosHeatmap.push([coordenadas[0], coordenadas[1], 2.0]);
          
          // Adicionar pontos próximos para criar formas orgânicas
          for (let i = 0; i < 5; i++) {
            const latVariacao = (Math.random() - 0.5) * 0.01;
            const lngVariacao = (Math.random() - 0.5) * 0.01;
            const intensidadeVariacao = 1.2 + Math.random() * 0.8;
            
            pontosHeatmap.push([
              coordenadas[0] + latVariacao,
              coordenadas[1] + lngVariacao,
              intensidadeVariacao
            ]);
          }
        }
        
        // Aguardar entre requisições para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      return pontosHeatmap;
    } catch (error) {
      console.error('Erro ao criar dados do heatmap:', error);
      return [];
    } finally {
      setIsLoadingHeatmap(false);
    }
  }, [buscarCoordenadasEndereco]);

  // Função para alternar o mapa de calor
  const toggleHeatmap = useCallback(async () => {
    console.log('🔥 toggleHeatmap chamada:', { 
      showHeatmap, 
      hasMap: !!mapInstanceRef.current,
      hasHeatmapLayer: !!heatmapLayerRef.current
    });
    
    if (!mapInstanceRef.current) return;
    
    try {
      if (showHeatmap && !heatmapLayerRef.current) {
        // Garantir que o plugin leaflet.heat esteja carregado
        try {
          await import('leaflet.heat');
        } catch (e) {
          console.error('Erro ao carregar plugin leaflet.heat:', e);
          return;
        }
        // Criar mapa de calor
        const dadosHeatmap = await criarDadosHeatmap();
        
        if (dadosHeatmap.length > 0) {
          // @ts-ignore - leaflet.heat não tem tipagem completa
          heatmapLayerRef.current = (L as any).heatLayer(dadosHeatmap, {
            radius: 25,
            blur: 35,
            maxZoom: 17,
            minOpacity: 0.8,
            gradient: {
              0.0: 'darkblue',
              0.1: 'blue',
              0.2: 'cyan',
              0.3: 'lime',
              0.4: 'yellow',
              0.5: 'orange',
              0.7: 'red',
              0.9: 'darkred',
              1.0: 'crimson'
            }
          });

          heatmapLayerRef.current.addTo(mapInstanceRef.current);
          
          // Garantir que o pin da loja fique visível
          if (lojaMarkerRef.current) {
            lojaMarkerRef.current.remove();
            lojaMarkerRef.current.addTo(mapInstanceRef.current);
          }
          
          // Recriar os raios de entrega se estiverem ativos
          if (showDeliveryRadius && lojaMarkerRef.current) {
            const coordenadas = lojaMarkerRef.current.getLatLng();
            criarRaiosEntrega([coordenadas.lat, coordenadas.lng]);
          }
        }
      } else if (!showHeatmap && heatmapLayerRef.current) {
        // Remover mapa de calor
        mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
        heatmapLayerRef.current = null;
        
        // Recriar os raios de entrega se estiverem ativos
        if (showDeliveryRadius && lojaMarkerRef.current) {
          const coordenadas = lojaMarkerRef.current.getLatLng();
          criarRaiosEntrega([coordenadas.lat, coordenadas.lng]);
        }
      }
    } catch (error) {
      console.error('Erro ao alternar heatmap:', error);
      heatmapLayerRef.current = null;
    }
  }, [showHeatmap, showDeliveryRadius, criarRaiosEntrega]);

  // Inicializar o mapa
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    console.log('Inicializando mapa Leaflet...');
    
    // Criar o mapa
    const map = (L as any).map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Adicionar camada do MapTiler
    (L as any).tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=C39xPnvvLuVohIH2a93S', {
      attribution: '© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 22,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    // Marcar mapa como pronto
    setIsMapReady(true);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Limpar todas as camadas
        if (heatmapLayerRef.current) {
          mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
        }
        removerRaiosEntrega();
        
        // Remover mapa
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapReady(false);
      }
    };
  }, [center, zoom, removerRaiosEntrega]);

  // Marcar endereço da loja quando o mapa estiver pronto
  useEffect(() => {
    if (isMapReady && lojaEndereco?.rua) {
      marcarEnderecoLoja();
    }
  }, [isMapReady, lojaEndereco, marcarEnderecoLoja]);

  // Controlar mapa de calor
  useEffect(() => {
    if (isMapReady) {
      console.log('🔥 Controlando heatmap:', { showHeatmap, isMapReady });
      toggleHeatmap();
    }
  }, [showHeatmap, isMapReady, toggleHeatmap]);

  // Controlar raios de entrega
  useEffect(() => {
    if (isMapReady) {
      console.log('🎯 Controlando raios de entrega:', { 
        showDeliveryRadius, 
        isMapReady, 
        hasLojaMarker: !!lojaMarkerRef.current 
      });
      
      if (showDeliveryRadius) {
        // Se temos marcador da loja, usar suas coordenadas
        if (lojaMarkerRef.current) {
          const coordenadas = lojaMarkerRef.current.getLatLng();
          console.log('📍 Criando raios na posição da loja:', coordenadas);
          criarRaiosEntrega([coordenadas.lat, coordenadas.lng]);
        } else {
          // Se não temos marcador da loja, usar coordenadas padrão
          console.log('📍 Criando raios na posição padrão:', center);
          criarRaiosEntrega(center);
        }
      } else {
        console.log('🗑️ Removendo raios de entrega');
        removerRaiosEntrega();
      }
    }
  }, [showDeliveryRadius, isMapReady, criarRaiosEntrega, removerRaiosEntrega, center]);

  return (
    <div className="relative">
      {/* Mapa */}
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="rounded border overflow-hidden"
      />
    </div>
  );
}


