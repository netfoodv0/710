// Types específicos para a página de Motoboys

export interface Motoboy {
  id: number;
  nome: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  dataContratacao: string;
  ultimaEntrega: string;
  avaliacao: number;
  totalEntregas: number;
}

export interface MotoboysData {
  motoboys: Motoboy[];
  loading: boolean;
  error: string | null;
}

export interface MotoboysLayoutProps {
  data: MotoboysData;
}

export interface MotoboysActions {
  criarMotoboy: (motoboy: Partial<Motoboy>) => Promise<void>;
  editarMotoboy: (id: number, motoboy: Partial<Motoboy>) => Promise<void>;
  excluirMotoboy: (id: number) => Promise<void>;
}

export interface MotoboysTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface MotoboysTableProps {
  motoboys: Motoboy[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export interface MotoboysStatsProps {
  totalMotoboys: number;
  motoboysAtivos: number;
  motoboysInativos: number;
}
