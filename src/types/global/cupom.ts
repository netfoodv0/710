// Tipos relacionados a cupons

export interface Cupom {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  tipo: 'percentual' | 'valor_fixo';
  valor: number;
  valorMinimo?: number;
  valorMaximo?: number;
  quantidadeTotal?: number;
  quantidadeUsada: number;
  ativo: boolean;
  dataInicio: Date;
  dataFim: Date;
  lojaId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  restricoes?: {
    produtos?: string[];
    categorias?: string[];
    clientes?: string[];
    primeiraCompra?: boolean;
  };
}

export interface CupomFormData {
  codigo: string;
  nome: string;
  descricao?: string;
  tipo: 'percentual' | 'valor_fixo';
  valor: number;
  valorMinimo?: number;
  valorMaximo?: number;
  quantidadeTotal?: number;
  ativo: boolean;
  dataInicio: Date;
  dataFim: Date;
  restricoes?: {
    produtos?: string[];
    categorias?: string[];
    clientes?: string[];
    primeiraCompra?: boolean;
  };
}

export interface CupomUsage {
  id: string;
  cupomId: string;
  pedidoId: string;
  clienteId: string;
  valorDesconto: number;
  dataUso: Date;
}