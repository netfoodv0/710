// Types específicos para a página de Motoboys

export interface Motoboy {
  id: string;
  lojaId: string;
  nome: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  dataContratacao: string;
  ultimaEntrega: string;
  avaliacao: number;
  totalEntregas: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface MotoboysData {
  motoboys: Motoboy[];
  loading: boolean;
  error: string | null;
}

export interface MotoboysLayoutProps {
  data: MotoboysData;
  onCreate?: () => void;
}

export interface MotoboysActions {
  criarMotoboy: (motoboy: Partial<Motoboy>) => Promise<void>;
  editarMotoboy: (id: string, motoboy: Partial<Motoboy>) => Promise<void>;
  excluirMotoboy: (id: string) => Promise<void>;
}

export interface MotoboysTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface MotoboysTableProps {
  motoboys: Motoboy[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export interface MotoboysStatsProps {
  totalMotoboys: number;
  motoboysAtivos: number;
  motoboysInativos: number;
}


