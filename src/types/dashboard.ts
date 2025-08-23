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
  pedidosPendentes?: number;
}

// Novos tipos para os componentes do dashboard
export interface FormaPedida {
  nome: string;
  valor: number;
  icone: string;
  cor: string;
}

export interface ProdutoVendido {
  nome: string;
  quantidade: number;
  receita: number;
}

export interface PedidoEmAndamento {
  id: string;
  numero: string;
  cliente: string;
  status: string;
  total: number;
}

export interface DashboardData {
  estatisticas: DashboardEstatisticas;
  formasPedidas: FormaPagamento[];
  produtosVendidos: ProdutoVendido[];
  pedidosEmAndamento: PedidoEmAndamento[];
}

export interface DashboardEstatisticas {
  totalPedidos: number;
  faturamentoTotal: number;
  totalClientes: number;
  ticketMedio: number;
  pedidos7Dias: number;
  receita7Dias: number;
  pedidosPendentes: number;
}

export interface FormaPagamento {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
  percentual: number;
}

export interface ProdutoVendido {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
  categoria: string;
}

export interface PedidoEmAndamento {
  id: string;
  numero: string;
  cliente: string;
  status: string;
  valor: number;
  horario: string;
} 