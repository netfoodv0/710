// Tipos para a página de Complementos

export interface Complemento {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  status: 'ativo' | 'inativo';
  tipo: 'obrigatorio' | 'opcional';
  maxSelecoes?: number;
  minSelecoes?: number;
  disponibilidade: {
    dias: string[];
    horarios: {
      inicio: string;
      fim: string;
    }[];
  };
  dataCriacao: Date;
  dataAtualizacao: Date;
  lojaId: string;
}

export interface CategoriaComplemento {
  id: string;
  nome: string;
  descricao?: string;
  status: 'ativo' | 'inativo';
  ordem: number;
  tipo: 'produto' | 'complemento';
  dataCriacao: Date;
  dataAtualizacao: Date;
  lojaId: string;
}

export interface ComplementoFormData {
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  status: 'ativo' | 'inativo';
  tipo: 'obrigatorio' | 'opcional';
  maxSelecoes?: number;
  minSelecoes?: number;
  disponibilidade: {
    dias: string[];
    horarios: {
      inicio: string;
      fim: string;
    }[];
  };
}

export interface ComplementoStats {
  total: number;
  ativos: number;
  inativos: number;
  porCategoria: {
    categoria: string;
    quantidade: number;
  }[];
  porTipo: {
    tipo: string;
    quantidade: number;
  }[];
}

export interface ComplementoFilters {
  categoria?: string;
  status?: 'ativo' | 'inativo';
  tipo?: 'obrigatorio' | 'opcional';
  busca?: string;
}

export interface ComplementoModalProps {
  isOpen: boolean;
  onClose: () => void;
  complemento?: Complemento;
  onSave: (complemento: ComplementoFormData) => void;
  onDelete?: (id: string) => void;
}

export interface ComplementoListProps {
  complementos: Complemento[];
  categorias: CategoriaComplemento[];
  filtros: ComplementoFilters;
  onFiltrosChange: (filtros: ComplementoFilters) => void;
  onEdit: (complemento: Complemento) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  isLoading?: boolean;
}

export interface ComplementoFormProps {
  complemento?: Complemento;
  categorias: CategoriaComplemento[];
  onSubmit: (data: ComplementoFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Hook return types
export interface UseComplementosReturn {
  complementos: Complemento[];
  categorias: CategoriaComplemento[];
  filtros: ComplementoFilters;
  stats: ComplementoStats;
  isLoading: boolean;
  error: string | null;
  setFiltros: (filtros: ComplementoFilters) => void;
  refreshData: () => Promise<void>;
}

export interface UseComplementosActionsReturn {
  createComplemento: (data: ComplementoFormData) => Promise<void>;
  updateComplemento: (id: string, data: ComplementoFormData) => Promise<void>;
  deleteComplemento: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  duplicateComplemento: (id: string) => Promise<void>;
  reorderComplementos: (complementos: Complemento[]) => Promise<void>;
}
















