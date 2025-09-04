// Types específicos para a página de Usuários

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  status: 'ativo' | 'inativo';
  dataAdmissao: string;
  ultimoAcesso: string;
  permissoes: string[];
}

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

export interface UsuariosData {
  operadores: Usuario[];
  motoboys: Motoboy[];
  loading: boolean;
  error: string | null;
}

export interface UsuariosLayoutProps {
  data: UsuariosData;
}

export interface UsuariosActions {
  criarOperador: (operador: Partial<Usuario>) => Promise<void>;
  editarOperador: (id: number, operador: Partial<Usuario>) => Promise<void>;
  excluirOperador: (id: number) => Promise<void>;
  criarMotoboy: (motoboy: Partial<Motoboy>) => Promise<void>;
  editarMotoboy: (id: number, motoboy: Partial<Motoboy>) => Promise<void>;
  excluirMotoboy: (id: number) => Promise<void>;
}

export interface UsuariosTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface UsuariosMenuProps {
  onNavigate: (path: string) => void;
}

export interface OperadoresTableProps {
  operadores: Usuario[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export interface MotoboysTableProps {
  motoboys: Motoboy[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export interface UsuariosStatsProps {
  totalOperadores: number;
  totalMotoboys: number;
  operadoresAtivos: number;
  motoboysAtivos: number;
}
