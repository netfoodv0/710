import { Pedido } from '../types/global/pedidos';

export const pedidosMock: Pedido[] = [
  {
    id: '1',
    numero: '#PED123456',
    horario: '14:30',
    cliente: 'João Silva',
    endereco: 'Rua A, 123',
    itens: 'X-Burger + Batata + Refri',
    itensDetalhados: [
      { nome: 'X-Burger', quantidade: 1, preco: 12.90, adicionais: [
        { nome: 'Queijo Extra', quantidade: 2, preco: 1.50 },
        { nome: 'Bacon', quantidade: 1, preco: 2.00 }
      ]},
      { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
      { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
    ],
    valor: 'R$ 23,40',
    status: 'analise',
    tipoPagamento: 'pix'
  },
  {
    id: '2',
    numero: '#PED123457',
    horario: '14:45',
    cliente: 'Maria Santos',
    endereco: 'Av. B, 456',
    itens: 'X-Salada + Suco',
    itensDetalhados: [
      { nome: 'X-Salada', quantidade: 1, preco: 15.90, adicionais: [
        { nome: 'Sem cebola', quantidade: 1, preco: 0.00 },
        { nome: 'Molho extra', quantidade: 2, preco: 1.00 }
      ]},
      { nome: 'Suco Natural', quantidade: 1, preco: 6.50 }
    ],
    valor: 'R$ 22,40',
    status: 'analise',
    tipoPagamento: 'cartao'
  },
  {
    id: '3',
    numero: '#PED123455',
    horario: '14:15',
    cliente: 'Pedro Oliveira',
    endereco: 'Rua C, 789',
    itens: 'X-Tudo + Batata + Refri',
    itensDetalhados: [
      { nome: 'X-Tudo', quantidade: 1, preco: 18.90, adicionais: [
        { nome: 'Queijo Extra', quantidade: 3, preco: 1.50 },
        { nome: 'Bacon Extra', quantidade: 2, preco: 2.00 },
        { nome: 'Molho especial', quantidade: 1, preco: 1.50 }
      ]},
      { nome: 'Batata Frita', quantidade: 1, preco: 8.50, adicionais: [
        { nome: 'Queijo ralado', quantidade: 2, preco: 1.00 }
      ]},
      { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
    ],
    valor: 'R$ 28,90',
    status: 'preparo',
    tipoPagamento: 'pix'
  },
  {
    id: '4',
    numero: '#PED123454',
    horario: '13:45',
    cliente: 'Ana Costa',
    endereco: 'Av. D, 101',
    itens: 'X-Bacon + Batata + Refri',
    itensDetalhados: [
      { nome: 'X-Bacon', quantidade: 1, preco: 22.90, adicionais: [
        { nome: 'Queijo Extra', quantidade: 1, preco: 1.50 },
        { nome: 'Bacon Extra', quantidade: 3, preco: 2.00 }
      ]},
      { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
      { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
    ],
    valor: 'R$ 31,40',
    status: 'entrega',
    tipoPagamento: 'cartao'
  },
  {
    id: '5',
    numero: '#PED123458',
    horario: '15:00',
    cliente: 'Carlos Ferreira',
    endereco: 'Rua E, 202',
    itens: 'X-Frango + Batata + Refri',
    itensDetalhados: [
      { nome: 'X-Frango', quantidade: 1, preco: 16.90, adicionais: [
        { nome: 'Catupiry', quantidade: 2, preco: 1.50 }
      ]},
      { nome: 'Batata Frita', quantidade: 1, preco: 8.50 },
      { nome: 'Refrigerante', quantidade: 1, preco: 2.00 }
    ],
    valor: 'R$ 25,90',
    status: 'analise',
    tipoPagamento: 'dinheiro'
  }
];
