// Tipos específicos para o modal de categoria

export interface DadosNovaCategoria {
  nome: string;
  status: 'ativo' | 'inativo' | 'em falta';
  agendamentoPrevio: {
    ativo: boolean;
    valor: number;
    unidade: 'minutos' | 'horas' | 'dias';
  };
}

export interface CategoriaModal {
  id: string;
  nome: string;
  status: 'ativo' | 'inativo' | 'em falta';
  agendamentoPrevio: {
    ativo: boolean;
    valor: number;
    unidade: 'minutos' | 'horas' | 'dias';
  };
  posicao: number;
  lojaId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface FiltrosCategoriaModal {
  status?: 'ativo' | 'inativo' | 'em falta';
  agendamentoPrevio?: boolean;
  nome?: string;
  limit?: number;
}



