import { useState, useEffect, useMemo } from 'react';

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

interface FiltrosMapa {
  statusPedidos: string;
  entregadores: string;
  camadas: string;
  dataInicio: string;
  dataFim: string;
}

// Dados simulados mais realistas
const generateMockData = (): MapMarker[] => {
  const basePosition: [number, number] = [-23.5505, -46.6333]; // São Paulo
  const markers: MapMarker[] = [];

  // Loja principal
  markers.push({
    id: 'loja-1',
    position: basePosition,
    title: 'NetFood - Loja Principal',
    type: 'loja'
  });

  // Pedidos simulados
  const pedidos = [
    { id: 'pedido-1', offset: [0.002, 0.003], status: 'entrega' as const, cliente: 'João Silva', valor: 45.90 },
    { id: 'pedido-2', offset: [-0.001, 0.002], status: 'preparacao' as const, cliente: 'Maria Santos', valor: 32.50 },
    { id: 'pedido-3', offset: [0.003, -0.001], status: 'entregue' as const, cliente: 'Pedro Costa', valor: 28.75 },
    { id: 'pedido-4', offset: [-0.002, -0.002], status: 'entrega' as const, cliente: 'Ana Oliveira', valor: 52.30 },
    { id: 'pedido-5', offset: [0.001, -0.003], status: 'cancelado' as const, cliente: 'Carlos Lima', valor: 38.90 },
    { id: 'pedido-6', offset: [0.004, 0.001], status: 'preparacao' as const, cliente: 'Lucia Ferreira', valor: 41.20 },
    { id: 'pedido-7', offset: [-0.003, 0.004], status: 'entregue' as const, cliente: 'Roberto Alves', valor: 29.80 },
  ];

  pedidos.forEach((pedido, index) => {
    markers.push({
      id: pedido.id,
      position: [
        basePosition[0] + pedido.offset[0],
        basePosition[1] + pedido.offset[1]
      ],
      title: `Pedido #${1000 + index + 1}`,
      status: pedido.status,
      type: 'pedido',
      cliente: pedido.cliente,
      valor: pedido.valor,
      timestamp: new Date(Date.now() - Math.random() * 3600000) // Últimas 1 hora
    });
  });

  // Entregadores simulados
  const entregadores = [
    { id: 'entregador-1', offset: [0.0015, 0.0025], nome: 'João Motoqueiro' },
    { id: 'entregador-2', offset: [-0.0008, 0.0035], nome: 'Maria Ciclista' },
    { id: 'entregador-3', offset: [0.0025, -0.0015], nome: 'Pedro Delivery' },
    { id: 'entregador-4', offset: [-0.0035, -0.0008], nome: 'Ana Express' },
  ];

  entregadores.forEach((entregador) => {
    markers.push({
      id: entregador.id,
      position: [
        basePosition[0] + entregador.offset[0],
        basePosition[1] + entregador.offset[1]
      ],
      title: entregador.nome,
      type: 'entregador'
    });
  });

  return markers;
};

export function useMapData(filtros: FiltrosMapa) {
  const [allMarkers] = useState<MapMarker[]>(() => generateMockData());
  const [isLoading, setIsLoading] = useState(true);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrar marcadores baseado nos filtros
  const filteredMarkers = useMemo(() => {
    return allMarkers.filter(marker => {
      // Filtro por status de pedidos
      if (filtros.statusPedidos !== 'todos' && marker.type === 'pedido') {
        if (marker.status !== filtros.statusPedidos) return false;
      }

      // Filtro por tipo (entregadores)
      if (filtros.entregadores !== 'todos') {
        if (filtros.entregadores === 'disponiveis' && marker.type === 'entregador') {
          // Simular entregadores disponíveis
          return Math.random() > 0.5;
        }
        if (filtros.entregadores === 'rota' && marker.type === 'entregador') {
          // Simular entregadores em rota
          return Math.random() > 0.7;
        }
        if (filtros.entregadores === 'coletando' && marker.type === 'entregador') {
          // Simular entregadores coletando
          return Math.random() > 0.8;
        }
      }

      // Filtro por data (se aplicável)
      if (filtros.dataInicio && marker.timestamp) {
        const dataInicio = new Date(filtros.dataInicio);
        if (marker.timestamp < dataInicio) return false;
      }

      if (filtros.dataFim && marker.timestamp) {
        const dataFim = new Date(filtros.dataFim);
        dataFim.setHours(23, 59, 59, 999); // Fim do dia
        if (marker.timestamp > dataFim) return false;
      }

      return true;
    });
  }, [allMarkers, filtros]);

  // Estatísticas dos dados
  const stats = useMemo(() => {
    const pedidos = filteredMarkers.filter(m => m.type === 'pedido');
    const entregadores = filteredMarkers.filter(m => m.type === 'entregador');
    
    return {
      totalPedidos: pedidos.length,
      totalEntregadores: entregadores.length,
      pedidosEntregues: pedidos.filter(p => p.status === 'entregue').length,
      pedidosEmAndamento: pedidos.filter(p => p.status === 'entrega' || p.status === 'preparacao').length,
      valorTotal: pedidos.reduce((sum, p) => sum + (p.valor || 0), 0)
    };
  }, [filteredMarkers]);

  return {
    markers: filteredMarkers,
    isLoading,
    stats
  };
}