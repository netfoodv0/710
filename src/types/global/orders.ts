// Tipos relacionados a pedidos/orders (PDV)

export type OrderType = 'delivery' | 'pickup' | 'dine_in';

export interface OrderItem {
  id: string;
  produtoId: string;
  nome: string;
  preco: number;
  quantidade: number;
  observacoes?: string;
  adicionais?: Array<{
    id: string;
    nome: string;
    preco: number;
  }>;
  subtotal: number;
}

export interface Order {
  id: string;
  numero: string;
  tipo: OrderType;
  cliente?: {
    id?: string;
    nome: string;
    telefone: string;
    email?: string;
  };
  endereco?: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    cep: string;
    referencia?: string;
  };
  itens: OrderItem[];
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
  status: 'pendente' | 'confirmado' | 'preparando' | 'pronto' | 'entregue' | 'cancelado';
  pagamento: {
    metodo: 'dinheiro' | 'cartao' | 'pix' | 'debito';
    valor: number;
    troco?: number;
    status: 'pendente' | 'aprovado' | 'rejeitado';
  };
  observacoes?: string;
  dataHora: Date;
  tempoPreparo?: number;
  tempoEntrega?: number;
  motoboyId?: string;
  dataAtualizacao: Date;
}