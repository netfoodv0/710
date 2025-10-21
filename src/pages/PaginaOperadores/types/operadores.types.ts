// Types específicos para a página de Operadores

export interface Operador {
  id: string;
  lojaId: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  status: 'ativo' | 'inativo';
  dataAdmissao: string;
  ultimoAcesso: string;
  permissoes: string[];
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface OperadoresData {
  operadores: Operador[];
  loading: boolean;
  error: string | null;
}

export interface OperadoresLayoutProps {
  data: OperadoresData;
  onCreate?: () => void;
}

export interface OperadoresActions {
  criarOperador: (operador: Partial<Operador>) => Promise<void>;
  editarOperador: (id: string, operador: Partial<Operador>) => Promise<void>;
  excluirOperador: (id: string) => Promise<void>;
}

export interface OperadoresTranslation {
  t: (key: string) => string;
}

// Props para componentes específicos
export interface OperadoresTableProps {
  operadores: Operador[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export interface OperadoresStatsProps {
  totalOperadores: number;
  operadoresAtivos: number;
  operadoresInativos: number;
}


