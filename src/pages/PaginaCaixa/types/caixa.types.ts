export interface Caixa {
  id: string;
  lojaId: string;
  usuarioId: string;
  dataAbertura: Date;
  dataFechamento?: Date;
  saldoInicial: number;
  saldoFinal?: number;
  status: 'aberto' | 'fechado';
  observacoes?: string;
  totalVendas?: number;
  totalEntradas?: number;
  totalSaidas?: number;
}

export interface DadosAberturaCaixa {
  saldoInicial: number;
  observacoes?: string;
}

export interface DadosFechamentoCaixa {
  saldoFinal: number;
  observacoes?: string;
}

export interface CaixaResumo {
  id: string;
  dataAbertura: string;
  dataFechamento?: string;
  saldoInicial: number;
  saldoFinal?: number;
  totalVendas: number;
  status: 'aberto' | 'fechado';
}

export interface MovimentoCaixa {
  id: string;
  caixaId: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  descricao: string;
  data: Date;
  categoria: 'venda' | 'troco' | 'retirada' | 'outros';
}








