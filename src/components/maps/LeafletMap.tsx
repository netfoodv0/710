import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/leaflet-custom.css';

// Fix para os ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  status?: 'entregue' | 'preparacao' | 'entrega' | 'cancelado';
  type?: 'pedido' | 'entregador' | 'loja';
  timestamp?: Date;
  cliente?: string;
  valor?: number;
}

interface LeafletMapProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (markerId: string) => void;
}

const statusColors = {
  entregue: '#10b981', // green
  preparacao: '#f59e0b', // amber
  entrega: '#3b82f6', // blue
  cancelado: '#ef4444', // red
};

const typeIcons = {
  pedido: '📦',
  entregador: '🚴',
  loja: '🏪',
};

export function LeafletMap({ 
  height = '60vh', 
  center = [-23.5505, -46.6333], // São Paulo como padrão
  zoom = 13,
  markers = [],
  onMarkerClick 
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Inicializar o mapa
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Adicionar camada de tiles do OpenStreetMap (gratuito)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Criar layer group para os marcadores
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    // Limpar marcadores existentes
    markersLayerRef.current.clearLayers();

    // Adicionar novos marcadores
    markers.forEach((marker) => {
      const color = marker.status ? statusColors[marker.status] : '#6b7280';
      const icon = marker.type ? typeIcons[marker.type] : '📍';

      // Criar ícone customizado
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-size: 14px;
          ">
            ${icon}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      // Criar conteúdo do popup baseado no tipo
      let popupContent = `<div style="padding: 8px; min-width: 200px;">`;
      
      if (marker.type === 'loja') {
        popupContent += `
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${marker.title}</h3>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">🏪 Loja Principal</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">📍 São Paulo, SP</p>
        `;
      } else if (marker.type === 'pedido') {
        const statusText = {
          'entregue': '✅ Entregue',
          'preparacao': '🍳 Em preparação',
          'entrega': '🚴 Em entrega',
          'cancelado': '❌ Cancelado'
        }[marker.status || 'preparacao'];
        
        popupContent += `
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${marker.title}</h3>
          <p style="margin: 0; font-size: 12px; color: ${color}; font-weight: 500;">${statusText}</p>
          ${marker.cliente ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">👤 ${marker.cliente}</p>` : ''}
          ${marker.valor ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #059669; font-weight: 500;">💰 R$ ${marker.valor.toFixed(2)}</p>` : ''}
          ${marker.timestamp ? `<p style="margin: 4px 0 0 0; font-size: 11px; color: #9ca3af;">🕒 ${marker.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>` : ''}
        `;
      } else if (marker.type === 'entregador') {
        popupContent += `
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${marker.title}</h3>
          <p style="margin: 0; font-size: 12px; color: #059669;">🚴 Entregador Ativo</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">📱 Disponível para entregas</p>
        `;
      }
      
      popupContent += `</div>`;

      const leafletMarker = L.marker(marker.position, { icon: customIcon })
        .bindPopup(popupContent);

      if (onMarkerClick) {
        leafletMarker.on('click', () => onMarkerClick(marker.id));
      }

      markersLayerRef.current?.addLayer(leafletMarker);
    });

    // Ajustar visualização para mostrar todos os marcadores
    if (markers.length > 0) {
      const group = new L.featureGroup(markersLayerRef.current.getLayers());
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [markers, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }}
      className="rounded border overflow-hidden"
    />
  );
}