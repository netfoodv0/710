// Interfaces para dados de relatórios
export interface DadosRelatorioGeral {
  totalPedidos: number;
  faturamentoTotal: number;
  clientesAtivos: number;
  ticketMedio: number;
  pedidosPorDia?: PedidoPorDia[];
  formasPagamento?: FormaPagamento[];
  tiposPedido?: TipoPedido[];
  performanceSemanal?: PerformanceSemanal[];
}

export interface PedidoPorDia {
  data: string;
  quantidade: number;
  valor: number;
}

export interface FormaPagamento {
  tipo: 'cartao_credito' | 'cartao_debito' | 'dinheiro' | 'pix';
  quantidade: number;
  percentual: number;
}

export interface TipoPedido {
  tipo: 'Balcão' | 'Delivery' | 'Retirada';
  quantidade: number;
  percentual: number;
}

export interface PerformanceSemanal {
  semana: string;
  pedidos: number;
  faturamento: number;
  clientes: number;
}

export interface DadosRelatorioClientes {
  totalClientes: number;
  novosClientes: number;
  clientesAtivos: number;
  taxaRetencao: number;
  distribuicaoCategoria: DistribuicaoCategoria[];
  historicoPedidos: HistoricoPedido[];
}

export interface DistribuicaoCategoria {
  categoria: 'curiosos' | 'novatos' | 'fieis' | 'super_clientes';
  quantidade: number;
  percentual: number;
}

export interface HistoricoPedido {
  clienteId: string;
  nome: string;
  totalPedidos: number;
  valorTotal: number;
  primeiroPedido: string;
  ultimoPedido: string;
  categoria: string;
  status: 'ativo' | 'inativo';
}

export interface DadosRelatorioProdutos {
  totalProdutos: number;
  produtosAtivos: number;
  produtosEmEstoque: number;
  produtosSemEstoque: number;
  produtosVendidos: ProdutoVendido[];
  categoriasVendidas: CategoriaVendida[];
}

export interface ProdutoVendido {
  id: string;
  nome: string;
  categoria: string;
  quantidadeVendida: number;
  valorTotal: number;
  percentualVendas: number;
}

export interface CategoriaVendida {
  categoria: string;
  quantidadeVendida: number;
  valorTotal: number;
  percentualVendas: number;
}

// Interface para dados filtrados genéricos
export interface DadosFiltrados {
  periodo: string;
  dados: DadosRelatorioGeral | DadosRelatorioClientes | DadosRelatorioProdutos;
  timestamp: number;
  filtros: Record<string, any>;
}

// Interface para configuração de relatórios
export interface ConfigRelatorio {
  tipo: 'geral' | 'clientes' | 'produtos';
  periodo: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  filtros: Record<string, any>;
  ordenacao?: {
    campo: string;
    direcao: 'asc' | 'desc';
  };
}

// Interface para resposta de API de relatórios
export interface RespostaRelatorio<T> {
  sucesso: boolean;
  dados: T;
  mensagem?: string;
  erro?: string;
  timestamp: number;
  paginacao?: {
    pagina: number;
    totalPaginas: number;
    itensPorPagina: number;
    totalItens: number;
  };
}
