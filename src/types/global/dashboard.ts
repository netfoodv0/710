// Tipos relacionados ao dashboard

export interface FormaPedida {
  tipo: string;
  nome: string;
  quantidade: number;
  percentual: number;
  cor: string;
  icone: string;
}

export interface ProdutoVendido {
  id: string;
  nome: string;
  quantidade: number;
  receita: number;
  categoria: string;
  imagem?: string;
}

export interface PedidoEmAndamento {
  id: string;
  numero: string;
  cliente: string;
  status: string;
  valor: number;
  tempo: string;
  tipo: string;
}

export interface DashboardData {
  vendas: {
    total: number;
    variacao: number;
    periodo: string;
  };
  pedidos: {
    total: number;
    variacao: number;
    periodo: string;
  };
  clientes: {
    total: number;
    variacao: number;
    periodo: string;
  };
  ticketMedio: {
    valor: number;
    variacao: number;
    periodo: string;
  };
  formasPedida: FormaPedida[];
  produtosVendidos: ProdutoVendido[];
  pedidosEmAndamento: PedidoEmAndamento[];
}

export interface DashboardEstatisticas {
  vendas: {
    total: number;
    variacao: number;
    periodo: string;
  };
  pedidos: {
    total: number;
    variacao: number;
    periodo: string;
  };
  clientes: {
    total: number;
    variacao: number;
    periodo: string;
  };
  ticketMedio: {
    valor: number;
    variacao: number;
    periodo: string;
  };
}

export type PeriodType = 'hoje' | 'ontem' | '7dias' | '30dias' | '90dias' | 'personalizado';
