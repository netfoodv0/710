// Tipos específicos para a página de Relatórios Clientes
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { DataTableColumn } from '../../../components/ui';

// Interface para cliente
export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  totalPedidos: number;
  valorTotal: number;
  primeiroPedido: string | null;
  ultimoPedido: string | null;
  categoria: 'curiosos' | 'novatos' | 'fieis' | 'super_clientes';
  status: 'ativo' | 'inativo';
}

// Estados dos relatórios de clientes
export interface RelatoriosClientesState {
  selectedPeriod: PeriodType;
  selectedReportType: string;
  loading: boolean;
  error: string | null;
  cardValues: number[];
  cardPercentages: number[];
  mostrarAnimacoes: boolean;
  carregamentoCompleto: boolean;
  alturasAnimadas: number[];
}

// Props para componentes de Relatórios Clientes
export interface RelatoriosClientesLayoutProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onReportTypeChange: (reportType: string) => void;
  onExport: () => void;
  loading: boolean;
  error: string | null;
  clientes: Cliente[];
  columns: DataTableColumn<Cliente>[];
  categorias: Array<{ value: string; label: React.ReactNode }>;
  statusOptions: Array<{ value: string; label: string }>;
  estatisticasClientes: {
    totalClientes: number;
    novosClientes: number;
    clientesAtivos: number;
    taxaRetencao: number;
  };
  cardValues: number[];
  cardPercentages: number[];
  mostrarAnimacoes: boolean;
  carregamentoCompleto: boolean;
  alturasAnimadas: number[];
}

export interface RelatoriosClientesHeaderProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
  selectedReportType: string;
  onReportTypeChange: (reportType: string) => void;
}

export interface RelatoriosClientesContentProps {
  clientes: Cliente[];
  columns: DataTableColumn<Cliente>[];
  categorias: Array<{ value: string; label: React.ReactNode }>;
  statusOptions: Array<{ value: string; label: string }>;
  estatisticasClientes: {
    totalClientes: number;
    novosClientes: number;
    clientesAtivos: number;
    taxaRetencao: number;
  };
  cardValues: number[];
  cardPercentages: number[];
  mostrarAnimacoes: boolean;
  carregamentoCompleto: boolean;
  alturasAnimadas: number[];
}

export interface RelatoriosClientesErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseRelatoriosClientesReturn {
  selectedPeriod: PeriodType;
  selectedReportType: string;
  loading: boolean;
  error: string | null;
  clientes: Cliente[];
  columns: DataTableColumn<Cliente>[];
  categorias: Array<{ value: string; label: React.ReactNode }>;
  statusOptions: Array<{ value: string; label: string }>;
  estatisticasClientes: {
    totalClientes: number;
    novosClientes: number;
    clientesAtivos: number;
    taxaRetencao: number;
  };
  cardValues: number[];
  cardPercentages: number[];
  mostrarAnimacoes: boolean;
  carregamentoCompleto: boolean;
  alturasAnimadas: number[];
  periodOptions: Array<{ value: PeriodType; label: string }>;
  reportTypeOptions: Array<{ id: string; label: string }>;
  handlePeriodChange: (period: PeriodType) => void;
  handleReportTypeChange: (reportType: string) => void;
  handleExport: () => void;
  handleRetry: () => void;
  handleCardValueChange: (index: number, value: number) => void;
  handleCardValueIncrement: (index: number, increment: boolean) => void;
}

export interface UseRelatoriosClientesActionsReturn {
  handlePeriodChange: (period: PeriodType) => void;
  handleReportTypeChange: (reportType: string) => void;
  handleExport: () => void;
  handleRetry: () => void;
  handleCardValueChange: (index: number, value: number) => void;
  handleCardValueIncrement: (index: number, increment: boolean) => void;
}

// Tipos para dados dos relatórios de clientes
export interface RelatoriosClientesData {
  clientes: Cliente[];
  estatisticasClientes: {
    totalClientes: number;
    novosClientes: number;
    clientesAtivos: number;
    taxaRetencao: number;
  };
  loading: boolean;
  error: string | null;
}

// Tipos para opções
export interface PeriodOption {
  value: PeriodType;
  label: string;
}

export interface ReportTypeOption {
  id: string;
  label: string;
}

// Tipos para traduções
export interface RelatoriosClientesTranslations {
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
  reportTypes: {
    geral: string;
    clientes: string;
    produtos: string;
  };
  statistics: {
    totalClientes: string;
    novosClientes: string;
    clientesAtivos: string;
    taxaRetencao: string;
  };
}
