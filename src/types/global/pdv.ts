// Tipos relacionados ao PDV (Ponto de Venda)

export interface PDVState {
  carrinho: OrderItem[];
  cliente?: Customer;
  enderecoEntrega?: Address;
  tipoPedido: OrderType;
  pagamento: PaymentMethod;
  desconto?: Discount;
  taxaServico?: ServiceCharge;
  observacoes?: string;
  isLoading: boolean;
  error?: string;
}

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

export interface Product {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  ativo: boolean;
  imagem?: string;
  descricao?: string;
  tempoPreparo?: number;
  adicionais?: Array<{
    id: string;
    nome: string;
    preco: number;
    obrigatorio: boolean;
  }>;
}

export interface Customer {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  enderecos: Address[];
}

export interface Address {
  id?: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  cep: string;
  referencia?: string;
  principal?: boolean;
}

export interface DeliveryPerson {
  id: string;
  nome: string;
  telefone: string;
  ativo: boolean;
  disponivel: boolean;
  ultimaAtividade?: Date;
}

export type OrderType = 'delivery' | 'pickup' | 'dine_in';

export interface PaymentMethod {
  tipo: 'dinheiro' | 'cartao' | 'pix' | 'debito';
  valor: number;
  troco?: number;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

export interface Discount {
  tipo: 'percentual' | 'valor_fixo';
  valor: number;
  codigo?: string;
  descricao?: string;
}

export interface ServiceCharge {
  tipo: 'taxa_entrega' | 'taxa_servico';
  valor: number;
  descricao?: string;
}