export interface Cupom {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  tipoDesconto: 'fixo' | 'percentual' | 'frete_gratis' | 'brinde';
  valorDesconto: number;
  valorMinimo: number;
  maximoUsos: number;
  usosAtuais: number;
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface CupomFormData {
  codigo: string;
  descricao: string;
  categoria: string;
  tipoDesconto: 'fixo' | 'percentual' | 'frete_gratis' | 'brinde';
  valorDesconto: number;
  valorMinimo: number;
  maximoUsos: number;
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
}

export interface EstatisticasCupons {
  totalCupons: number;
  cuponsAtivos: number;
  cuponsInativos: number;
  cuponsExpirados: number;
  cuponsExpiramEm30Dias: number;
  totalUsos: number;
  valorTotalDescontos: number;
  cupomMaisUsado: string;
}


