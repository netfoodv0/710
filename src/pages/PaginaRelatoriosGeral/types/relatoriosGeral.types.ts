// Tipos específicos para a página de Relatórios Geral
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

// Estados dos relatórios
export interface RelatoriosGeralState {
  selectedPeriod: PeriodType;
  selectedReportType: string;
  loading: boolean;
  error: string | null;
}

// Props para componentes de Relatórios Geral
export interface RelatoriosGeralLayoutProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
  error: string | null;
  dadosRelatorios: any;
}

export interface RelatoriosGeralHeaderProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
}

export interface RelatoriosGeralContentProps {
  dadosFiltrados: any;
  selectedPeriod: PeriodType;
}

export interface RelatoriosGeralErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseRelatoriosGeralReturn {
  selectedPeriod: PeriodType;
  selectedReportType: string;
  loading: boolean;
  error: string | null;
  dadosRelatorios: any;
  periodOptions: Array<{ value: PeriodType; label: string }>;
  reportTypeOptions: Array<{ id: string; label: string }>;
  handlePeriodChange: (period: PeriodType) => void;
  handleReportTypeChange: (reportType: string) => void;
  handleExport: () => void;
  handleRetry: () => void;
}

export interface UseRelatoriosGeralActionsReturn {
  handlePeriodChange: (period: PeriodType) => void;
  handleReportTypeChange: (reportType: string) => void;
  handleExport: () => void;
  handleRetry: () => void;
}

// Tipos para dados dos relatórios
export interface RelatoriosGeralData {
  dadosRelatorios: any;
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
export interface RelatoriosGeralTranslations {
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
}


