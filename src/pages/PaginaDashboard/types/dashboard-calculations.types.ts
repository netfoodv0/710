// Tipos para cálculos do dashboard
export interface PedidoComFormaEntrega {
  id: string;
  dataHora: Date;
  total: number;
  cliente: {
    telefone?: string;
    nome?: string;
  };
  formaEntrega?: 'delivery' | 'retirada' | 'balcao';
  itens?: ItemPedido[];
}

export interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
  subtotal?: number;
}

export interface ProdutoCalculado {
  nome: string;
  quantidade: number;
  preco: number;
  valorTotal: number;
  imagem: string;
}

export interface FormaPedidoCalculada {
  nome: string;
  valor: number;
  icone: 'delivery' | 'pickup' | 'dine_in';
}

export interface EstatisticasCalculadas {
  totalPedidos: number;
  faturamentoTotal: number;
  totalClientes: number;
  ticketMedio: number;
  pedidos7Dias: number;
  receita7Dias: number;
  pedidosPendentes: number;
}
