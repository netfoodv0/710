// Dados mockados para histórico de pedidos
import { Pedido } from '../../../types';

export const mockHistoricoPedidos: Pedido[] = [
  {
    id: '1',
    numero: '001',
    cliente: {
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123'
    },
    itens: [
      {
        id: '1',
        produtoId: '1',
        nome: 'Pizza Margherita',
        preco: 35.90,
        quantidade: 1,
        observacoes: 'Sem cebola'
      },
      {
        id: '2',
        produtoId: '2',
        nome: 'Coca-Cola 350ml',
        preco: 5.50,
        quantidade: 2
      }
    ],
    status: 'entregue',
    total: 46.90,
    formaPagamento: 'pix',
    tempoEstimado: '30 min',
    observacoes: 'Entregar no portão',
    dataHora: new Date('2024-01-15T19:30:00'),
    pagamento: {
      valorPago: 46.90,
      statusPagamento: 'pago',
      dataPagamento: new Date('2024-01-15T19:25:00')
    },
    formaEntrega: 'delivery',
    origemPedido: 'cardapio_digital',
    clienteNovo: false,
    enderecoEntrega: 'Rua das Flores, 123'
  },
  {
    id: '2',
    numero: '002',
    cliente: {
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Principal, 456'
    },
    itens: [
      {
        id: '3',
        produtoId: '3',
        nome: 'Hambúrguer Artesanal',
        preco: 28.90,
        quantidade: 1
      },
      {
        id: '4',
        produtoId: '4',
        nome: 'Batata Frita',
        preco: 12.90,
        quantidade: 1
      }
    ],
    status: 'cancelado',
    total: 41.80,
    formaPagamento: 'dinheiro',
    tempoEstimado: '25 min',
    dataHora: new Date('2024-01-15T18:45:00'),
    pagamento: {
      valorPago: 0,
      statusPagamento: 'cancelado'
    },
    formaEntrega: 'delivery',
    origemPedido: 'whatsapp',
    clienteNovo: true,
    enderecoEntrega: 'Av. Principal, 456'
  },
  {
    id: '3',
    numero: '003',
    cliente: {
      nome: 'Pedro Oliveira',
      telefone: '(11) 77777-7777',
      endereco: 'Rua do Comércio, 789'
    },
    itens: [
      {
        id: '5',
        produtoId: '5',
        nome: 'Pizza Portuguesa',
        preco: 42.90,
        quantidade: 1
      },
      {
        id: '6',
        produtoId: '6',
        nome: 'Refrigerante Lata',
        preco: 4.50,
        quantidade: 3
      }
    ],
    status: 'entregue',
    total: 56.40,
    formaPagamento: 'cartao',
    tempoEstimado: '35 min',
    dataHora: new Date('2024-01-15T17:20:00'),
    pagamento: {
      valorPago: 56.40,
      statusPagamento: 'pago',
      dataPagamento: new Date('2024-01-15T17:15:00')
    },
    formaEntrega: 'delivery',
    origemPedido: 'telefone',
    clienteNovo: false,
    enderecoEntrega: 'Rua do Comércio, 789'
  },
  {
    id: '4',
    numero: '004',
    cliente: {
      nome: 'Ana Costa',
      telefone: '(11) 66666-6666',
      endereco: 'Rua das Palmeiras, 321'
    },
    itens: [
      {
        id: '7',
        produtoId: '7',
        nome: 'Salada Caesar',
        preco: 18.90,
        quantidade: 1
      },
      {
        id: '8',
        produtoId: '8',
        nome: 'Suco Natural',
        preco: 8.90,
        quantidade: 1
      }
    ],
    status: 'entregue',
    total: 27.80,
    formaPagamento: 'pix',
    tempoEstimado: '20 min',
    dataHora: new Date('2024-01-15T16:10:00'),
    pagamento: {
      valorPago: 27.80,
      statusPagamento: 'pago',
      dataPagamento: new Date('2024-01-15T16:05:00')
    },
    formaEntrega: 'delivery',
    origemPedido: 'cardapio_digital',
    clienteNovo: true,
    enderecoEntrega: 'Rua das Palmeiras, 321'
  },
  {
    id: '5',
    numero: '005',
    cliente: {
      nome: 'Carlos Mendes',
      telefone: '(11) 55555-5555',
      endereco: 'Av. Central, 654'
    },
    itens: [
      {
        id: '9',
        produtoId: '9',
        nome: 'Pizza Quatro Queijos',
        preco: 38.90,
        quantidade: 1
      },
      {
        id: '10',
        produtoId: '10',
        nome: 'Cerveja 350ml',
        preco: 6.90,
        quantidade: 2
      }
    ],
    status: 'entregue',
    total: 52.70,
    formaPagamento: 'dinheiro',
    tempoEstimado: '40 min',
    dataHora: new Date('2024-01-15T15:30:00'),
    pagamento: {
      valorPago: 52.70,
      statusPagamento: 'pago',
      dataPagamento: new Date('2024-01-15T15:25:00')
    },
    formaEntrega: 'delivery',
    origemPedido: 'whatsapp',
    clienteNovo: false,
    enderecoEntrega: 'Av. Central, 654'
  }
];


