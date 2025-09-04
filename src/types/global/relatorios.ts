// Tipos relacionados a relatórios

export interface DadosRelatorioGeral {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  vendas: {
    total: number;
    quantidade: number;
    ticketMedio: number;
    crescimento: number;
  };
  pedidos: {
    total: number;
    confirmados: number;
    cancelados: number;
    taxaConfirmacao: number;
  };
  produtos: {
    maisVendidos: Array<{
      id: string;
      nome: string;
      quantidade: number;
      receita: number;
    }>;
    menosVendidos: Array<{
      id: string;
      nome: string;
      quantidade: number;
      receita: number;
    }>;
  };
  clientes: {
    novos: number;
    recorrentes: number;
    total: number;
  };
  horarios: Array<{
    hora: string;
    pedidos: number;
    receita: number;
  }>;
  dias: Array<{
    dia: string;
    pedidos: number;
    receita: number;
  }>;
}

export interface DadosRelatorioClientes {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  clientes: Array<{
    id: string;
    nome: string;
    telefone: string;
    email?: string;
    totalPedidos: number;
    totalGasto: number;
    ultimoPedido: Date;
    ticketMedio: number;
  }>;
  estatisticas: {
    totalClientes: number;
    clientesNovos: number;
    clientesRecorrentes: number;
    ticketMedio: number;
    valorMedioGasto: number;
  };
}

export interface DadosFiltrados {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  filtros: {
    status?: string[];
    categoria?: string[];
    cliente?: string;
    valorMin?: number;
    valorMax?: number;
  };
  dados: any[];
  total: number;
  paginacao: {
    pagina: number;
    limite: number;
    totalPaginas: number;
  };
}

export interface ConfigRelatorio {
  tipo: 'geral' | 'clientes' | 'produtos' | 'vendas';
  formato: 'pdf' | 'excel' | 'csv';
  periodo: {
    inicio: Date;
    fim: Date;
  };
  filtros?: {
    status?: string[];
    categoria?: string[];
    cliente?: string;
    valorMin?: number;
    valorMax?: number;
  };
  incluirGraficos?: boolean;
  incluirDetalhes?: boolean;
}