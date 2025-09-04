// Types específicos para a página de Operadores

export interface Operador {
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

export interface OperadoresData {
  operadores: Operador[];
  loading: boolean;
  error: string | null;
}

export interface OperadoresLayoutProps {
  data: OperadoresData;
}

export interface OperadoresActions {
  criarOperador: (operador: Partial<Operador>) => Promise<void>;
  editarOperador: (id: number, operador: Partial<Operador>) => Promise<void>;
  excluirOperador: (id: number) => Promise<void>;
}

export interface OperadoresTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface OperadoresTableProps {
  operadores: Operador[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export interface OperadoresStatsProps {
  totalOperadores: number;
  operadoresAtivos: number;
  operadoresInativos: number;
}
