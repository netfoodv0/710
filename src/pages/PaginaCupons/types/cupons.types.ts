import { PeriodType } from '../../../components/filters/FiltroPeriodo';

// Tipos específicos para a página de Cupons
export interface Cupom {
  id: string;
  codigo: string;
  descricao: string;
  tipo: 'percentual' | 'valor_fixo' | 'brinde' | 'frete_gratis';
  valor: number;
  status: 'ativo' | 'inativo';
  categoria: string;
  dataCriacao: string;
  dataExpiracao: string;
  usoMaximo: number;
  usosAtuais: number;
  valorMinimo: number;
  lojaId?: string;
  dataAtualizacao?: string;
}

export interface EstatisticaCupom {
  titulo: string;
  valor: string;
  variacao: number;
  icone: string;
  cor: string;
}

export interface CuponsData {
  cupons: Cupom[];
  estatisticas: EstatisticaCupom[];
  categorias: string[];
  cardPercentages: Array<{ percentual: number }>;
  selectedPeriod: PeriodType;
  loading: boolean;
  error: string | null;
}

// Props para componentes de Cupons
export interface CuponsLayoutProps {
  data: CuponsData;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => Promise<void>;
  onView: (cupom: Cupom) => void;
  onEdit: (cupom: Cupom) => void;
  onDelete: (cupom: Cupom) => void;
  onAdd: () => void;
  loading?: boolean;
}

export interface CuponsStatsProps {
  estatisticas: EstatisticaCupom[];
  carregamentoCompleto: boolean;
  mostrarAnimacoes: boolean;
  alturasAnimadas: number[];
}

export interface CuponsTableProps {
  cupons: Cupom[];
  columns: any[];
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  tipoOptions: Array<{ value: string; label: string }>;
  onView: (cupom: Cupom) => void;
  onEdit: (cupom: Cupom) => void;
  onDelete: (cupom: Cupom) => void;
  onAdd: () => void;
}

export interface CuponsChartProps {
  categorias: string[];
  percentuais: number[];
  alturasAnimadas: number[];
  mostrarAnimacoes: boolean;
}

// Hook return types
export interface UseCuponsReturn {
  data: CuponsData;
  handlePeriodChange: (period: PeriodType) => void;
  handleExport: () => Promise<void>;
  handleView: (cupom: Cupom) => void;
  handleEdit: (cupom: Cupom) => void;
  handleDelete: (cupom: Cupom) => void;
  handleAdd: () => void;
  categoriasFiltros: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  tipoOptions: Array<{ value: string; label: string }>;
  columns: any[];
  carregamentoCompleto: boolean;
  mostrarAnimacoes: boolean;
  alturasAnimadas: number[];
  isModalOpen: boolean;
  handleCupomCriado: (cupom: Cupom) => void;
  handleCloseModal: () => void;
}

export interface UseCuponsActionsReturn {
  handlePeriodChange: (period: PeriodType) => void;
  handleExport: () => Promise<void>;
  handleView: (cupom: Cupom) => void;
  handleEdit: (cupom: Cupom) => void;
  handleDelete: (cupom: Cupom) => void;
  handleAdd: () => void;
}

// Tipos para filtros
export interface FiltroCategoria {
  value: string;
  label: string;
}

export interface FiltroStatus {
  value: string;
  label: string;
}

export interface FiltroTipo {
  value: string;
  label: string;
}


