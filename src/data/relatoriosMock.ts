import { RelatorioVendas, ProdutoVendido } from '../types';

export const relatorioMock: RelatorioVendas = {
  periodo: {
    inicio: new Date('2024-01-01'),
    fim: new Date('2024-01-31')
  },
  vendas: {
    total: 45680.50,
    quantidade: 234,
    ticketMedio: 195.22,
    crescimento: 12.5
  },
  produtosMaisVendidos: [
    { nome: 'Pizza Margherita', quantidade: 45, receita: 1350.00 },
    { nome: 'Hambúrguer Artesanal', quantidade: 38, receita: 1140.00 },
    { nome: 'Lasanha Bolonhesa', quantidade: 32, receita: 960.00 },
    { nome: 'Salmão Grelhado', quantidade: 28, receita: 1120.00 },
    { nome: 'Risotto de Camarão', quantidade: 25, receita: 875.00 }
  ],
  vendasPorDia: [
    { data: new Date('2024-01-01'), vendas: 1250.00, pedidos: 8 },
    { data: new Date('2024-01-02'), vendas: 1890.50, pedidos: 12 },
    { data: new Date('2024-01-03'), vendas: 2340.00, pedidos: 15 },
    { data: new Date('2024-01-04'), vendas: 1670.25, pedidos: 11 },
    { data: new Date('2024-01-05'), vendas: 2100.75, pedidos: 14 },
    { data: new Date('2024-01-06'), vendas: 2890.00, pedidos: 18 },
    { data: new Date('2024-01-07'), vendas: 3240.50, pedidos: 21 }
  ],
  vendasPorHorario: [
    { horario: '11:00', vendas: 450.00 },
    { horario: '12:00', vendas: 1250.00 },
    { horario: '13:00', vendas: 1890.00 },
    { horario: '18:00', vendas: 2340.00 },
    { horario: '19:00', vendas: 2890.00 },
    { horario: '20:00', vendas: 3240.00 },
    { horario: '21:00', vendas: 2100.00 }
  ]
};

export const metricasComparativas = {
  mesAnterior: {
    vendas: 40560.25,
    pedidos: 198,
    ticketMedio: 204.85,
    novosClientes: 45
  },
  mesAtual: {
    vendas: 45680.50,
    pedidos: 234,
    ticketMedio: 195.22,
    novosClientes: 52
  }
};