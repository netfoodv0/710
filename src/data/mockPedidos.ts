import { Pedido } from '../types';

export type PedidoComColuna = Pedido & { coluna: string };

export const mockPedidos: PedidoComColuna[] = [
  {
    id: '1',
    numero: '001',
    horario: '14:30',
    cliente: 'João Silva',
    endereco: 'Rua das Flores, 123 - Centro',
    itens: 'X-Burger, Batata Frita',
    itensDetalhados: [
      {
        nome: 'X-Burger',
        quantidade: 2,
        preco: 22.95,
        adicionais: [
          { nome: 'Queijo Extra', quantidade: 1, preco: 3.00 },
          { nome: 'Bacon', quantidade: 2, preco: 4.50 }
        ]
      },
      { nome: 'Batata Frita', quantidade: 1, preco: 12.50 }
    ],
    valor: 'R$ 58,40',
    status: 'analise' as const,
    tipoPagamento: 'dinheiro' as const,
    timestampAceito: Date.now() - (5 * 60000),
    coluna: 'coluna-1'
  },
  {
    id: '2',
    numero: '002',
    horario: '15:15',
    cliente: 'Maria Santos',
    endereco: 'Av. Principal, 456 - Jardim',
    itens: 'Pizza Margherita, Refrigerante',
    itensDetalhados: [
      {
        nome: 'Pizza Margherita',
        quantidade: 1,
        preco: 32.50,
        adicionais: [
          { nome: 'Borda Recheada', quantidade: 1, preco: 5.00 }
        ]
      },
      { nome: 'Refrigerante', quantidade: 2, preco: 6.00 }
    ],
    valor: 'R$ 44,50',
    status: 'preparo' as const,
    tipoPagamento: 'pix' as const,
    timestampAceito: Date.now() - (12 * 60000),
    coluna: 'coluna-2'
  },
  {
    id: '3',
    numero: '003',
    horario: '15:45',
    cliente: 'Carlos Oliveira',
    endereco: 'Rua do Comércio, 789 - Vila Nova',
    itens: 'Açaí, Tapioca',
    itensDetalhados: [
      {
        nome: 'Açaí Tradicional',
        quantidade: 1,
        preco: 18.00,
        adicionais: [
          { nome: 'Granola', quantidade: 1, preco: 2.00 },
          { nome: 'Banana', quantidade: 1, preco: 1.50 }
        ]
      },
      { nome: 'Tapioca de Frango', quantidade: 1, preco: 15.00 }
    ],
    valor: 'R$ 36,50',
    status: 'analise' as const,
    tipoPagamento: 'cartao' as const,
    timestampAceito: Date.now() - (8 * 60000),
    coluna: 'coluna-3'
  },
  {
    id: '4',
    numero: '004',
    horario: '16:00',
    cliente: 'Ana Costa',
    endereco: 'Av. das Palmeiras, 321 - Centro',
    itens: 'Sushi, Sashimi',
    itensDetalhados: [
      {
        nome: 'Combo Sushi',
        quantidade: 1,
        preco: 45.00,
        adicionais: [
          { nome: 'Wasabi Extra', quantidade: 1, preco: 1.00 },
          { nome: 'Gengibre', quantidade: 1, preco: 1.00 }
        ]
      },
      { nome: 'Sashimi Salmão', quantidade: 1, preco: 28.00 }
    ],
    valor: 'R$ 75,00',
    status: 'preparo' as const,
    tipoPagamento: 'pix' as const,
    timestampAceito: Date.now() - (15 * 60000),
    coluna: 'coluna-4'
  },
  {
    id: '5',
    numero: '005',
    horario: '16:15',
    cliente: 'Roberto Lima',
    endereco: 'Rua das Acácias, 654 - Jardim',
    itens: 'Churrasco, Farofa',
    itensDetalhados: [
      {
        nome: 'Picanha',
        quantidade: 1,
        preco: 55.00,
        adicionais: [
          { nome: 'Farofa de Bacon', quantidade: 1, preco: 8.00 },
          { nome: 'Vinagrete', quantidade: 1, preco: 5.00 }
        ]
      },
      { nome: 'Linguiça', quantidade: 2, preco: 18.00 }
    ],
    valor: 'R$ 86,00',
    status: 'analise' as const,
    tipoPagamento: 'dinheiro' as const,
    timestampAceito: Date.now() - (3 * 60000),
    coluna: 'coluna-1'
  },
  {
    id: '6',
    numero: '006',
    horario: '16:30',
    cliente: 'Fernanda Rocha',
    endereco: 'Av. dos Ipês, 987 - Vila',
    itens: 'Doces, Brigadeiro',
    itensDetalhados: [
      {
        nome: 'Brigadeiro Gourmet',
        quantidade: 6,
        preco: 24.00,
        adicionais: [
          { nome: 'Granulado Colorido', quantidade: 1, preco: 2.00 }
        ]
      },
      { nome: 'Beijinho', quantidade: 4, preco: 16.00 }
    ],
    valor: 'R$ 42,00',
    status: 'preparo' as const,
    tipoPagamento: 'cartao' as const,
    timestampAceito: Date.now() - (10 * 60000),
    coluna: 'coluna-2'
  },
  {
    id: '7',
    numero: '007',
    horario: '16:45',
    cliente: 'Lucas Mendes',
    endereco: 'Rua das Orquídeas, 147 - Centro',
    itens: 'Marmita, Suco',
    itensDetalhados: [
      {
        nome: 'Marmita Executiva',
        quantidade: 1,
        preco: 22.00,
        adicionais: [
          { nome: 'Arroz Integral', quantidade: 1, preco: 2.00 },
          { nome: 'Feijão Preto', quantidade: 1, preco: 2.00 }
        ]
      },
      { nome: 'Suco Natural', quantidade: 2, preco: 12.00 }
    ],
    valor: 'R$ 38,00',
    status: 'analise' as const,
    tipoPagamento: 'pix' as const,
    timestampAceito: Date.now() - (6 * 60000),
    coluna: 'coluna-3'
  },
  {
    id: '8',
    numero: '008',
    horario: '17:00',
    cliente: 'Patrícia Alves',
    endereco: 'Av. das Margaridas, 258 - Jardim',
    itens: 'Pizza, Bebida',
    itensDetalhados: [
      {
        nome: 'Pizza Quatro Queijos',
        quantidade: 1,
        preco: 38.00,
        adicionais: [
          { nome: 'Borda Recheada', quantidade: 1, preco: 5.00 },
          { nome: 'Catupiry Extra', quantidade: 1, preco: 3.00 }
        ]
      },
      { nome: 'Refrigerante', quantidade: 1, preco: 6.00 }
    ],
    valor: 'R$ 52,00',
    status: 'preparo' as const,
    tipoPagamento: 'dinheiro' as const,
    timestampAceito: Date.now() - (18 * 60000),
    coluna: 'coluna-4'
  },
  {
    id: '9',
    numero: '009',
    horario: '17:15',
    cliente: 'Diego Santos',
    endereco: 'Rua das Violetas, 369 - Vila',
    itens: 'Hambúrguer, Batata',
    itensDetalhados: [
      {
        nome: 'Hambúrguer Artesanal',
        quantidade: 2,
        preco: 32.00,
        adicionais: [
          { nome: 'Queijo Cheddar', quantidade: 2, preco: 4.00 },
          { nome: 'Bacon Crocante', quantidade: 2, preco: 6.00 }
        ]
      },
      { nome: 'Batata Rústica', quantidade: 1, preco: 15.00 }
    ],
    valor: 'R$ 57,00',
    status: 'analise' as const,
    tipoPagamento: 'cartao' as const,
    timestampAceito: Date.now() - (4 * 60000),
    coluna: 'coluna-1'
  },
  {
    id: '10',
    numero: '010',
    horario: '17:30',
    cliente: 'Camila Ferreira',
    endereco: 'Av. das Rosas, 741 - Centro',
    itens: 'Salada, Água',
    itensDetalhados: [
      {
        nome: 'Salada Caesar',
        quantidade: 1,
        preco: 25.00,
        adicionais: [
          { nome: 'Frango Grelhado', quantidade: 1, preco: 8.00 },
          { nome: 'Croutons', quantidade: 1, preco: 2.00 }
        ]
      },
      { nome: 'Água com Gás', quantidade: 1, preco: 4.00 }
    ],
    valor: 'R$ 39,00',
    status: 'preparo' as const,
    tipoPagamento: 'pix' as const,
    timestampAceito: Date.now() - (13 * 60000),
    coluna: 'coluna-2'
  }
];
