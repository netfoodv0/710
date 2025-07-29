// Tipos globais para o sistema de gestão do restaurante

import { z } from 'zod';

// Tipos de pagamento e entrega
export type FormaPagamento = 'dinheiro' | 'pix' | 'cartao_credito' | 'cartao_debito' | 'vale_refeicao' | 'vale_alimentacao';
export type FormaEntrega = 'delivery' | 'retirada' | 'balcao';
export type OrigemPedido = 'pdv' | 'cardapio_digital' | 'whatsapp' | 'telefone' | 'presencial';
export type StatusPagamento = 'pendente' | 'pago' | 'parcial' | 'cancelado';

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

export interface Produto {
  id: string;
  restauranteId: string; // ID do restaurante
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem?: string;
  ativo: boolean;
  tempoPreparoMinutos: number;
  ingredientes: string[];
  extras: Extra[];
}

export interface Extra {
  id: string;
  nome: string;
  preco: number;
}

export interface Categoria {
  id: string;
  restauranteId: string; // ID do restaurante
  nome: string;
  descricao?: string;
  ativa: boolean;
  ordem: number;
}

export interface CategoriaAdicional {
  id: string;
  nome: string;
  descricao?: string;
  status: 'ativo' | 'inativo';
  disponibilidade: DisponibilidadeCategoria;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface DisponibilidadeCategoria {
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  domingo: boolean;
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
}

export interface Promocao {
  id: string;
  restauranteId: string; // ID do restaurante
  nome: string;
  descricao: string;
  tipo: 'desconto_percentual' | 'desconto_valor' | 'frete_gratis';
  valor: number;
  produtosAplicaveis: string[];
  dataInicio: Date;
  dataFim: Date;
  diasSemana: number[]; // 0-6 (domingo a sábado)
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  ativa: boolean;
  usoMaximo?: number;
  usoAtual: number;
}

export interface Avaliacao {
  id: string;
  restauranteId: string; // ID do restaurante
  pedidoId: string;
  clienteNome: string;
  nota: number; // 1-5
  comentario?: string;
  data: Date;
  respondida: boolean;
  resposta?: string;
  dataResposta?: Date;
}

export interface ConfiguracaoLoja {
  id: string;
  restauranteId: string; // ID do restaurante
  nomeRestaurante: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  horarioFuncionamento: {
    segunda: { abertura: string; fechamento: string; ativo: boolean };
    terca: { abertura: string; fechamento: string; ativo: boolean };
    quarta: { abertura: string; fechamento: string; ativo: boolean };
    quinta: { abertura: string; fechamento: string; ativo: boolean };
    sexta: { abertura: string; fechamento: string; ativo: boolean };
    sabado: { abertura: string; fechamento: string; ativo: boolean };
    domingo: { abertura: string; fechamento: string; ativo: boolean };
  };
  taxaEntrega: number;
  tempoPreparoMedio: number;
  valorMinimoEntrega: number;
  raioEntregaKm: number;
  ativo: boolean;
}

export type AbaConfiguracao = 'geral' | 'entrega' | 'horarios' | 'notificacoes' | 'aparencia';

export interface NotificacaoConfig {
  key: string;
  label: string;
  desc: string;
  ativo: boolean;
}

export interface RelatorioVendas {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  totalVendas: number;
  quantidadePedidos: number;
  ticketMedio: number;
  produtosMaisVendidos: {
    produto: string;
    quantidade: number;
    receita: number;
  }[];
  vendasPorDia: {
    data: string;
    vendas: number;
    pedidos: number;
  }[];
}

export type StatusPedido = 
  | 'novo'
  | 'pendente'
  | 'confirmado'
  | 'preparando'
  | 'pronto'
  | 'saiu_entrega'
  | 'entregue'
  | 'cancelado';

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

// Tipos para componentes UI
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface StatusBadgeProps {
  status: StatusPedido;
  size?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  noPadding?: boolean;
}

// Schemas de validação Zod
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

export const filtrosHistoricoSchema = z.object({
  status: z.enum(['todos', 'novo', 'pendente', 'confirmado', 'preparando', 'pronto', 'saiu_entrega', 'entregue', 'cancelado']),
  dataInicio: z.string(),
  dataFim: z.string(),
  formaPagamento: z.enum(['todos', 'dinheiro', 'cartao', 'pix']),
  cliente: z.string().optional(),
  valorMinimo: z.number().optional(),
  valorMaximo: z.number().optional()
});

// Tipo para o estado dos filtros de histórico
export interface FiltrosHistoricoState {
  status: 'todos' | 'novo' | 'pendente' | 'confirmado' | 'preparando' | 'pronto' | 'saiu_entrega' | 'entregue' | 'cancelado';
  dataInicio: string;
  dataFim: string;
  formaPagamento: 'todos' | 'dinheiro' | 'cartao' | 'pix';
}

// Tipos inferidos dos schemas
export type PedidoValidado = z.infer<typeof pedidoSchema>;
export type FiltrosHistoricoValidado = z.infer<typeof filtrosHistoricoSchema>;

// Tipos para Dashboard
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

export interface GraficoBarrasProps {
  title: string;
  data: Array<{ nome: string; valor: number; cor?: string }>;
  className?: string;
}

export interface CardMetricaProps {
  titulo: string;
  valor: string;
  variacao?: number;
  icone: string;
  cor: string;
  className?: string;
}