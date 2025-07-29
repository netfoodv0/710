import { KPI, Pedido } from '../types';

export const kpisMock: KPI[] = [
  {
    titulo: 'Faturamento Total',
    valor: 'R$ 45.847,50',
    variacao: 12.5,
    icone: 'DollarSign',
    cor: 'green'
  },
  {
    titulo: 'Ticket Médio',
    valor: 'R$ 123,80',
    variacao: -2.1,
    icone: 'TrendingUp',
    cor: 'purple'
  },
  {
    titulo: 'Total de Pedidos',
    valor: '371',
    variacao: 8.3,
    icone: 'ShoppingBag',
    cor: 'blue'
  },
  {
    titulo: 'Total de Clientes',
    valor: '156',
    variacao: 15.7,
    icone: 'Users',
    cor: 'indigo'
  }
];

export const formasPagamentoMock = [
  {
    name: 'PIX',
    value: 45,
    color: '#10B981'
  },
  {
    name: 'Cartão de Crédito',
    value: 30,
    color: '#3B82F6'
  },
  {
    name: 'Cartão de Débito',
    value: 15,
    color: '#8B5CF6'
  },
  {
    name: 'Dinheiro',
    value: 10,
    color: '#F59E0B'
  }
];

export const pedidosRecentesMock: Pedido[] = [
  {
    id: '1',
    numero: '#001',
    cliente: {
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123'
    },
    itens: [
      { nome: 'Pizza Margherita', quantidade: 1, preco: 35.90 },
      { nome: 'Refrigerante 2L', quantidade: 1, preco: 8.50 }
    ],
    status: 'preparando',
    total: 44.40,
    formaPagamento: 'Cartão de Crédito',
    tempoEstimado: '25 min',
    observacoes: 'Sem cebola',
    dataHora: new Date('2024-01-15T14:30:00')
  },
  {
    id: '2',
    numero: '#002',
    cliente: {
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Principal, 456'
    },
    itens: [
      { nome: 'Hambúrguer Artesanal', quantidade: 2, preco: 28.90 },
      { nome: 'Batata Frita', quantidade: 1, preco: 12.90 }
    ],
    status: 'entregue',
    total: 70.70,
    formaPagamento: 'PIX',
    tempoEstimado: '30 min',
    dataHora: new Date('2024-01-15T13:45:00')
  },
  {
    id: '3',
    numero: '#003',
    cliente: {
      nome: 'Pedro Costa',
      telefone: '(11) 77777-7777',
      endereco: 'Rua do Comércio, 789'
    },
    itens: [
      { nome: 'Lasanha Bolonhesa', quantidade: 1, preco: 32.50 }
    ],
    status: 'novo',
    total: 32.50,
    formaPagamento: 'Dinheiro',
    tempoEstimado: '35 min',
    observacoes: 'Troco para R$ 50,00',
    dataHora: new Date('2024-01-15T15:10:00')
  }
];

export const dadosGraficoPizzaMock = [
  {
    name: 'Pizza',
    value: 35,
    color: '#10B981'
  },
  {
    name: 'Hambúrguer',
    value: 25,
    color: '#F59E0B'
  },
  {
    name: 'Lasanha',
    value: 20,
    color: '#3B82F6'
  },
  {
    name: 'Salmão',
    value: 15,
    color: '#8B5CF6'
  },
  {
    name: 'Risotto',
    value: 5,
    color: '#EF4444'
  }
];

export const estatisticasGerais = {
  faturamentoTotal: 45847.50,
  ticketMedio: 123.80,
  totalPedidos: 371,
  totalClientes: 156,
  receita7Dias: 8234.20,
  pedidos7Dias: 67,
  tempoMedioEntrega: 32,
  avaliacaoMedia: 4.8
};