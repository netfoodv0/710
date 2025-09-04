// Tipos relacionados a pedidos

export type StatusPedido = 
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'saiu_entrega'
  | 'entregue'
  | 'cancelado';

export interface ClientePedido {
  id?: string;
  nome: string;
  telefone: string;
  email?: string;
}

export interface EnderecoEntrega {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia?: string;
}

export interface Adicional {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface ItemPedido {
  id: string;
  produtoId: string;
  nome: string;
  preco: number;
  quantidade: number;
  observacoes?: string;
  adicionais?: Adicional[];
  subtotal: number;
}

export interface PagamentoPedido {
  metodo: 'dinheiro' | 'cartao' | 'pix' | 'debito';
  valor: number;
  troco?: number;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

export interface Pedido {
  id: string;
  numero: string;
  lojaId: string;
  cliente: ClientePedido;
  enderecoEntrega?: EnderecoEntrega;
  itens: ItemPedido[];
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
  status: StatusPedido;
  pagamento: PagamentoPedido;
  observacoes?: string;
  dataHora: Date;
  tempoPreparo?: number;
  tempoEntrega?: number;
  motoboyId?: string;
  dataAtualizacao: Date;
}

// Estados e ações para gerenciamento de pedidos
export interface PedidosState {
  pedidos: Pedido[];
  isLoading: boolean;
  error: string | null;
  filtros: {
    status?: StatusPedido;
    dataInicio?: Date;
    dataFim?: Date;
    cliente?: string;
  };
}

export interface PedidosActions {
  carregarPedidos: () => Promise<void>;
  atualizarStatusPedido: (pedidoId: string, status: StatusPedido) => Promise<void>;
  adicionarPedido: (pedido: Omit<Pedido, 'id' | 'numero' | 'dataHora' | 'dataAtualizacao'>) => Promise<void>;
  removerPedido: (pedidoId: string) => Promise<void>;
  filtrarPedidos: (filtros: Partial<PedidosState['filtros']>) => void;
  limparFiltros: () => void;
}