// Relatórios Feature Types

import { z } from 'zod';

// Tipos de filtros para relatórios
export interface FiltrosRelatoriosState {
  categoria: 'todas' | string;
  formaPagamento: 'todos' | 'dinheiro' | 'cartao' | 'pix';
  dataInicio: string;
  dataFim: string;
  valorMinimo?: number;
  valorMaximo?: number;
  status: 'todos' | 'entregue' | 'cancelado';
}

// Dados de KPIs para relatórios
export interface RelatoriosKPIs {
  receitaTotal: number;
  receitaVariacao: number;
  pedidosTotal: number;
  pedidosVariacao: number;
  ticketMedio: number;
  ticketMedioVariacao: number;
  tempoMedioEntrega: number;
  tempoEntregaVariacao: number;
  avaliacaoMedia: number;
  avaliacaoVariacao: number;
  taxaCancelamento: number;
  taxaCancelamentoVariacao: number;
  produtosMaisVendidos: number;
  clientesAtivos: number;
  clientesAtivosVariacao: number;
}

// Dados de vendas por categoria
export interface VendasPorCategoria {
  categoria: string;
  valor: number;
  quantidade: number;
  percentual: number;
  cor: string;
}

// Dados de performance temporal
export interface PerformanceTemporal {
  periodo: string;
  receita: number;
  pedidos: number;
  ticketMedio: number;
  tempoEntrega: number;
}

// Dados de formas de pagamento
export interface FormaPagamentoRelatorio {
  tipo: string;
  valor: number;
  quantidade: number;
  percentual: number;
  cor: string;
}

// Top produtos
export interface TopProduto {
  id: string;
  nome: string;
  categoria: string;
  vendas: number;
  receita: number;
  precoMedio: number;
  margem: number;
  avaliacaoMedia: number;
  crescimentoVendas: number;
  totalAvaliacoes: number;
}

// Dados de horários de pico
export interface HorarioPico {
  hora: string;
  pedidos: number;
  receita: number;
  tempoMedioEntrega: number;
}

// Dados de satisfação do cliente
export interface SatisfacaoCliente {
  periodo: string;
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  distribuicaoNotas: {
    nota: number;
    quantidade: number;
    percentual: number;
  }[];
}

// Dados de crescimento
export interface DadosCrescimento {
  periodo: string;
  receitaAtual: number;
  receitaAnterior: number;
  crescimentoPercentual: number;
  pedidosAtual: number;
  pedidosAnterior: number;
  crescimentoPedidos: number;
}

// Dados completos do relatório
export interface DadosRelatorios {
  kpis: RelatoriosKPIs;
  vendasPorCategoria: VendasPorCategoria[];
  performanceTemporal: PerformanceTemporal[];
  formasPagamento: FormaPagamentoRelatorio[];
  topProdutos: TopProduto[];
  horariosPico: HorarioPico[];
  satisfacaoCliente: SatisfacaoCliente[];
  dadosCrescimento: DadosCrescimento[];
  metricasComparativas: {
    receitaAtual: number[];
    receitaAnterior: number[];
    categorias: string[];
  };
}

// Schemas de validação
export const filtrosRelatoriosSchema = z.object({
  categoria: z.string(),
  formaPagamento: z.enum(['todos', 'dinheiro', 'cartao', 'pix']),
  dataInicio: z.string(),
  dataFim: z.string(),
  valorMinimo: z.number().optional(),
  valorMaximo: z.number().optional(),
  status: z.enum(['todos', 'entregue', 'cancelado'])
});

export const topProdutoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  categoria: z.string(),
  vendas: z.number(),
  receita: z.number(),
  precoMedio: z.number(),
  margem: z.number(),
  avaliacaoMedia: z.number(),
  crescimentoVendas: z.number(),
  totalAvaliacoes: z.number()
});

// Tipos para exportação
export type ExportFormat = 'pdf' | 'excel' | 'csv';

export interface ExportOptions {
  format: ExportFormat;
  incluirGraficos: boolean;
  incluirDetalhes: boolean;
  periodo: string;
}