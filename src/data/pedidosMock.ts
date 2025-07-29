import { Pedido } from '../types';

export const pedidosMock: Pedido[] = [
  {
    id: '1',
    numero: '#001',
    cliente: {
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123 - Vila Madalena'
    },
    itens: [
      { nome: 'Pizza Margherita', quantidade: 1, preco: 35.90 },
      { nome: 'Refrigerante 2L', quantidade: 1, preco: 8.50 }
    ],
    status: 'preparando',
    total: 44.40,
    formaPagamento: 'Cartão de Crédito',
    tempoEstimado: '25 min',
    observacoes: 'Sem cebola na pizza',
    dataHora: new Date('2024-01-15T14:30:00')
  },
  {
    id: '2',
    numero: '#002',
    cliente: {
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Principal, 456 - Centro'
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
      endereco: 'Rua do Comércio, 789 - Jardins'
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
  },
  {
    id: '4',
    numero: '#004',
    cliente: {
      nome: 'Ana Oliveira',
      telefone: '(11) 66666-6666',
      endereco: 'Rua das Palmeiras, 321 - Moema'
    },
    itens: [
      { nome: 'Salmão Grelhado', quantidade: 1, preco: 45.00 },
      { nome: 'Salada Caesar', quantidade: 1, preco: 18.50 }
    ],
    status: 'saiu_entrega',
    total: 63.50,
    formaPagamento: 'Cartão de Débito',
    tempoEstimado: '20 min',
    dataHora: new Date('2024-01-15T12:20:00')
  },
  {
    id: '5',
    numero: '#005',
    cliente: {
      nome: 'Carlos Ferreira',
      telefone: '(11) 55555-5555',
      endereco: 'Av. Paulista, 1000 - Bela Vista'
    },
    itens: [
      { nome: 'Risotto de Camarão', quantidade: 1, preco: 38.90 },
      { nome: 'Vinho Tinto', quantidade: 1, preco: 45.00 }
    ],
    status: 'cancelado',
    total: 83.90,
    formaPagamento: 'Cartão de Crédito',
    tempoEstimado: '40 min',
    observacoes: 'Cliente cancelou por demora',
    dataHora: new Date('2024-01-15T11:15:00')
  },
  {
    id: '6',
    numero: '#006',
    cliente: {
      nome: 'Lucia Mendes',
      telefone: '(11) 44444-4444',
      endereco: 'Rua Augusta, 567 - Consolação'
    },
    itens: [
      { nome: 'Pizza Portuguesa', quantidade: 1, preco: 42.90 },
      { nome: 'Suco Natural', quantidade: 2, preco: 7.50 }
    ],
    status: 'confirmado',
    total: 57.90,
    formaPagamento: 'PIX',
    tempoEstimado: '28 min',
    dataHora: new Date('2024-01-15T16:00:00')
  }
];