// Tipos específicos para a página de Relatórios Produtos
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { DataTableColumn } from '../../../components/ui';

// Interface para produto
export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  vendas: number;
  status: 'ativo' | 'inativo';
  destaque: boolean;
  dataCriacao: string;
  ultimaVenda: string | null;
}

// Estados dos relatórios de produtos
export interface RelatoriosProdutosState {
  selectedPeriod: PeriodType;
  loading: boolean;
  error: string | null;
}

// Props para componentes de Relatórios Produtos
export interface RelatoriosProdutosLayoutProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
  error: string | null;
  produtos: Produto[];
  columns: DataTableColumn<Produto>[];
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  destaqueOptions: Array<{ value: string; label: string }>;
  estatisticasProdutos: {
    totalProdutos: number;
    novosProdutos: number;
    produtosDestaque: number;
    taxaVendas: number;
  };
}

export interface RelatoriosProdutosHeaderProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
}

export interface RelatoriosProdutosContentProps {
  produtos: Produto[];
  columns: DataTableColumn<Produto>[];
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  destaqueOptions: Array<{ value: string; label: string }>;
  estatisticasProdutos: {
    totalProdutos: number;
    novosProdutos: number;
    produtosDestaque: number;
    taxaVendas: number;
  };
}

export interface RelatoriosProdutosErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseRelatoriosProdutosReturn {
  selectedPeriod: PeriodType;
  loading: boolean;
  error: string | null;
  produtos: Produto[];
  columns: DataTableColumn<Produto>[];
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  destaqueOptions: Array<{ value: string; label: string }>;
  estatisticasProdutos: {
    totalProdutos: number;
    novosProdutos: number;
    produtosDestaque: number;
    taxaVendas: number;
  };
  handlePeriodChange: (period: PeriodType) => void;
  handleExport: () => void;
  handleRetry: () => void;
}

export interface UseRelatoriosProdutosActionsReturn {
  handlePeriodChange: (period: PeriodType) => void;
  handleExport: () => void;
  handleRetry: () => void;
}

// Tipos para dados dos relatórios de produtos
export interface RelatoriosProdutosData {
  produtos: Produto[];
  estatisticasProdutos: {
    totalProdutos: number;
    novosProdutos: number;
    produtosDestaque: number;
    taxaVendas: number;
  };
  loading: boolean;
  error: string | null;
}

// Tipos para opções
export interface PeriodOption {
  value: PeriodType;
  label: string;
}

// Tipos para traduções
export interface RelatoriosProdutosTranslations {
  title: string;
  subtitle: string;
  header: {
    title: string;
    subtitle: string;
    exportButton: string;
    periodLabel: string;
  };
  content: {
    loading: string;
    noData: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
  periods: {
    weekly: string;
    monthly: string;
    quarterly: string;
    yearly: string;
  };
  statistics: {
    totalProdutos: string;
    novosProdutos: string;
    produtosDestaque: string;
    taxaVendas: string;
  };
}


