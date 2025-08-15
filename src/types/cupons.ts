// Tipos para o sistema de cupons

export interface Cupom {
  id: string;
  codigo: string;
  descricao: string;
  tipo: 'desconto_fixo' | 'desconto_percentual' | 'frete_gratis' | 'brinde';
  valor: number;
  valorMinimoPedido?: number;
  dataInicio: Date;
  dataFim: Date;
  limiteUsos?: number;
  usosAtuais: number;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CupomFormData {
  codigo: string;
  descricao: string;
  tipo: 'desconto_fixo' | 'desconto_percentual' | 'frete_gratis' | 'brinde';
  valor: number;
  valorMinimoPedido: number;
  dataInicio: string;
  dataFim: string;
  limiteUsos: number;
  ativo: boolean;
}

export interface CupomValidacao {
  codigo?: string;
  descricao?: string;
  valor?: string;
  dataInicio?: string;
  dataFim?: string;
  limiteUsos?: string;
}