export interface EstatisticasGerais {
  totalPedidos: number;
  faturamentoTotal: number;
  clientesAtivos: number;
  ticketMedio: number;
}

export interface EstatisticasClientes {
  totalClientes: number;
  novosClientes: number;
  clientesAtivos: number;
  taxaRetencao: number;
}

export const estatisticasGerais: EstatisticasGerais = {
  totalPedidos: 1247,
  faturamentoTotal: 45678.90,
  clientesAtivos: 342,
  ticketMedio: 36.63
};

export const estatisticasClientes: EstatisticasClientes = {
  totalClientes: 456,
  novosClientes: 28,
  clientesAtivos: 342,
  taxaRetencao: 75.2
};
