import { z } from 'zod';

// Tipos de pagamento e entrega
export type FormaPagamento = 'dinheiro' | 'pix' | 'cartao_credito' | 'cartao_debito' | 'vale_refeicao' | 'vale_alimentacao';
export type FormaEntrega = 'delivery' | 'retirada' | 'balcao';
export type OrigemPedido = 'pdv' | 'cardapio_digital' | 'whatsapp' | 'telefone' | 'presencial';
export type StatusPagamento = 'pendente' | 'pago' | 'parcial' | 'cancelado';
export type StatusPedido = 
  | 'novo'
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'saiu_entrega'
  | 'entregue'
  | 'cancelado';

export interface Pedido {
  id: string;
  numero: string;
  lojaId: string; // ✅ NOVO: Campo para isolamento por loja
  status: StatusPedido;
  dataHora: Date;
  cliente: ClientePedido;
  itens: ItemPedido[];
  total: number;
  formaPagamento: string;
  formaEntrega: 'delivery' | 'retirada';
  origemPedido: 'ifood' | 'rappi' | 'uber' | 'proprio';
  pagamento: PagamentoPedido;
  clienteNovo: boolean;
  tempoEstimado: string;
  enderecoEntrega?: EnderecoEntrega;
  observacoes?: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ItemPedido {
  id?: string;
  produtoId?: string;
  nome: string;
  preco: number;
  quantidade: number;
  observacoes?: string;
  extras?: Extra[];
}

export interface Extra {
  id: string;
  nome: string;
  preco: number;
}

export interface ClientePedido {
  nome: string;
  telefone: string;
  endereco?: string;
}

export interface PagamentoPedido {
  valorPago: number;
  statusPagamento: 'pendente' | 'pago' | 'parcial' | 'cancelado';
  dataPagamento?: Date;
  formaPagamento?: string;
}

export interface EnderecoEntrega {
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

// Schemas de validação Zod para pedidos
export const pedidoSchema = z.object({
  id: z.string(),
  numero: z.string(),
  cliente: z.object({
    nome: z.string(),
    telefone: z.string(),
    endereco: z.string().optional()
  }),
  itens: z.array(z.object({
    id: z.string().optional(),
    produtoId: z.string().optional(),
    nome: z.string(),
    preco: z.number(),
    quantidade: z.number(),
    observacoes: z.string().optional(),
    extras: z.array(z.object({
      id: z.string(),
      nome: z.string(),
      preco: z.number()
    })).optional()
  })),
  status: z.enum(['novo', 'pendente', 'confirmado', 'preparando', 'pronto', 'saiu_entrega', 'entregue', 'cancelado']),
  total: z.number(),
  formaPagamento: z.string(),
  tempoEstimado: z.string(),
  observacoes: z.string().optional(),
  dataHora: z.date(),
  pagamento: z.object({
    valorPago: z.number(),
    statusPagamento: z.enum(['pendente', 'pago', 'parcial', 'cancelado']),
    dataPagamento: z.date().optional()
  }).optional(),
  formaEntrega: z.enum(['delivery', 'retirada', 'balcao']).optional(),
  origemPedido: z.enum(['pdv', 'cardapio_digital', 'whatsapp', 'telefone', 'presencial']).optional(),
  clienteNovo: z.boolean().optional(),
  enderecoEntrega: z.string().optional()
});

// Tipo para o estado dos filtros de histórico
export interface FiltrosHistoricoState {
  status: 'todos' | 'novo' | 'pendente' | 'confirmado' | 'preparando' | 'pronto' | 'saiu_entrega' | 'entregue' | 'cancelado';
  dataInicio: string;
  dataFim: string;
  formaPagamento: 'todos' | 'dinheiro' | 'cartao' | 'pix';
}

export const filtrosHistoricoSchema = z.object({
  status: z.enum(['todos', 'novo', 'pendente', 'confirmado', 'preparando', 'pronto', 'saiu_entrega', 'entregue', 'cancelado']),
  dataInicio: z.string(),
  dataFim: z.string(),
  formaPagamento: z.enum(['todos', 'dinheiro', 'cartao', 'pix']),
  cliente: z.string().optional(),
  valorMinimo: z.number().optional(),
  valorMaximo: z.number().optional()
});

// Tipos inferidos dos schemas
export type PedidoValidado = z.infer<typeof pedidoSchema>;
export type FiltrosHistoricoValidado = z.infer<typeof filtrosHistoricoSchema>; 