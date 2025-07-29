// Histórico Feature Types - Extraídos de src/types/index.ts

import { z } from 'zod';

// Re-exportar tipos de pedidos que são usados no histórico
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
  cliente: {
    nome: string;
    telefone: string;
    endereco?: string;
  };
  itens: ItemPedido[];
  status: StatusPedido;
  total: number;
  formaPagamento: string;
  tempoEstimado: string;
  observacoes?: string;
  dataHora: Date;
  // Campos adicionais que podem estar presentes
  pagamento?: {
    valorPago: number;
    statusPagamento: 'pendente' | 'pago' | 'parcial' | 'cancelado';
    dataPagamento?: Date;
  };
  formaEntrega?: 'delivery' | 'retirada' | 'balcao';
  origemPedido?: 'pdv' | 'cardapio_digital' | 'whatsapp' | 'telefone' | 'presencial';
  clienteNovo?: boolean;
  enderecoEntrega?: string;
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

export interface StatusBadgeProps {
  status: StatusPedido;
  size?: 'sm' | 'md' | 'lg';
}

// Tipo para o estado dos filtros de histórico
export interface FiltrosHistoricoState {
  status: 'todos' | 'novo' | 'pendente' | 'confirmado' | 'preparando' | 'pronto' | 'saiu_entrega' | 'entregue' | 'cancelado';
  dataInicio: string;
  dataFim: string;
  formaPagamento: 'todos' | 'dinheiro' | 'cartao' | 'pix';
}

// Schemas de validação Zod
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
export type FiltrosHistoricoValidado = z.infer<typeof filtrosHistoricoSchema>; 