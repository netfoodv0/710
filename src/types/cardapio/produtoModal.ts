// Tipos específicos para o modal de produto

export interface HorarioDisponibilidade {
  dia: string;
  inicio: string;
  fim: string;
  ativo: boolean;
}

export interface DadosNovoProduto {
  // Campos Essenciais
  nome: string;
  categoria: string;
  descricao: string;
  precoVenda: number;
  precoCusto: number;
  estoqueAtual: number;
  estoqueMinimo: number;
  controleEstoque: boolean;
  status: 'ativo' | 'inativo';
  
  // Campos Importantes
  codigoBarras?: string;
  codigoSku?: string;
  unidadeMedida: 'unidade' | 'kg' | 'litro' | 'grama' | 'ml';
  imagem?: string;
  horariosDisponibilidade: HorarioDisponibilidade[];
}

export interface ProdutoModal extends DadosNovoProduto {
  id: string;
  lojaId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface FiltrosProdutoModal {
  categoria?: string;
  status?: 'ativo' | 'inativo';
  nome?: string;
  limit?: number;
}

// Tipos para as abas do modal
export type AbaProduto = 'essenciais' | 'importantes';

export interface AbaProdutoConfig {
  id: AbaProduto;
  label: string;
  icon?: string;
}
