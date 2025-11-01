// Types específicos para a página de Histórico de Pedidos

import { Pedido, StatusPedido, FiltrosHistoricoState } from '../../../features/historico/types/historico.types';

export interface HistoricoPedidosData {
  pedidosHistorico: Pedido[];
  loading: boolean;
  error: string | null;
}

export interface HistoricoPedidosLayoutProps {
  data: HistoricoPedidosData;
  onViewPedido: (pedido: Pedido) => void;
  onRetry: () => void;
}

export interface HistoricoPedidosActions {
  carregarHistorico: () => Promise<void>;
  carregarEstatisticas: () => Promise<void>;
  refreshDados: () => void;
  handleViewPedido: (pedido: Pedido) => void;
  handleRetry: () => void;
}

export interface HistoricoPedidosTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface HistoricoPedidosTableProps {
  pedidos: Pedido[];
  loading: boolean;
  onViewPedido: (pedido: Pedido) => void;
}

export interface HistoricoPedidosStatsProps {
  totalPedidos: number;
  pedidosEntregues: number;
  pedidosCancelados: number;
  valorTotal: number;
}

export interface HistoricoPedidosFiltersProps {
  filtros: FiltrosHistoricoState;
  onFiltrosChange: (filtros: Partial<FiltrosHistoricoState>) => void;
}

// Re-exportar tipos do histórico
export type { Pedido, StatusPedido, FiltrosHistoricoState } from '../../../features/historico/types/historico.types';


