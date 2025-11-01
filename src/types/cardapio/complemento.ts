export interface Complemento {
  id: string;
  lojaId: string;
  nome: string;
  categoria: string;
  descricao?: string;
  preco: number;
  status: 'ativo' | 'inativo';
  opcoes?: ComplementoOpcao[];
  obrigatorio?: boolean;
  limite?: {
    minimo?: number;
    maximo?: number;
  };
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface ComplementoOpcao {
  id: string;
  nome: string;
  preco: number;
  disponivel: boolean;
}

export interface CategoriaComplemento {
  id: string;
  lojaId: string;
  nome: string;
  descricao?: string;
  status: 'ativo' | 'inativo';
  posicao: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
}










