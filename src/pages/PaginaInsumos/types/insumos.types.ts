// Tipos específicos para a página de Insumos
import { DataTableColumn } from '../../../components/ui';

// Interface para insumo
export interface Insumo {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  precoUnitario: number;
  status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque';
  semControleEstoque: boolean;
  fichaTecnica: string;
  medida: string;
}

// Estados dos insumos
export interface InsumosState {
  insumos: Insumo[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  insumoSelecionado: Insumo | null;
}

// Props para componentes de Insumos
export interface InsumosLayoutProps {
  insumos: Insumo[];
  columns: DataTableColumn<Insumo>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  insumoSelecionado: Insumo | null;
  onOpenModal: (insumo: Insumo) => void;
  onCloseModal: () => void;
  onOpenModalDetalhes: (insumo: Insumo) => void;
  onCloseModalDetalhes: () => void;
  onAlterarEstoque: (insumo: Insumo) => void;
  onSave: (insumo: Insumo) => void;
}

export interface InsumosStatsProps {
  insumos: Insumo[];
}

export interface InsumosTableProps {
  insumos: Insumo[];
  columns: DataTableColumn<Insumo>[];
  onOpenModal: (insumo: Insumo) => void;
  onOpenModalDetalhes: (insumo: Insumo) => void;
}

export interface InsumosErrorProps {
  error: string;
  onRetry: () => void;
}

// Hook return types
export interface UseInsumosReturn {
  insumos: Insumo[];
  columns: DataTableColumn<Insumo>[];
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isModalDetalhesOpen: boolean;
  insumoSelecionado: Insumo | null;
  handleOpenModal: (insumo: Insumo) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (insumo: Insumo) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (insumo: Insumo) => void;
  handleSave: (insumo: Insumo) => void;
  handleRetry: () => void;
}

export interface UseInsumosActionsReturn {
  handleOpenModal: (insumo: Insumo) => void;
  handleCloseModal: () => void;
  handleOpenModalDetalhes: (insumo: Insumo) => void;
  handleCloseModalDetalhes: () => void;
  handleAlterarEstoque: (insumo: Insumo) => void;
  handleSave: (insumo: Insumo) => void;
  handleRetry: () => void;
}

// Tipos para dados dos insumos
export interface InsumosData {
  insumos: Insumo[];
  loading: boolean;
  error: string | null;
}

// Tipos para traduções
export interface InsumosTranslations {
  title: string;
  subtitle: string;
  stats: {
    totalInsumos: string;
    baixoEstoque: string;
    semEstoque: string;
    valorTotal: string;
  };
  table: {
    nome: string;
    categoria: string;
    quantidade: string;
    quantidadeMinima: string;
    precoCusto: string;
    custoEstoque: string;
    status: string;
    acoes: string;
  };
  modals: {
    editarEstoque: string;
    detalhesInsumo: string;
    alterarEstoque: string;
    salvar: string;
    cancelar: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
}
