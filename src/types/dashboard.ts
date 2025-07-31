export interface KPI {
  titulo: string;
  valor: string;
  variacao: number;
  icone: string;
  cor: string;
}

export interface DashboardKPIs {
  pedidosHoje: number;
  vendasHoje: number;
  ticketMedio: number;
  tempoMedioEntrega: number;
  avaliacaoMedia: number;
  pedidosPendentes: number;
}

export interface DadosFormaPagamento {
  name: string;
  value: number;
  color: string;
}

export interface EstatisticasGerais {
  faturamentoTotal: number;
  ticketMedio: number;
  totalPedidos: number;
  totalClientes: number;
  receita7Dias: number;
  pedidos7Dias: number;
  tempoMedioEntrega: number;
  avaliacaoMedia: number;
} 