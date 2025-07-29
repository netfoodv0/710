import { Categoria, Produto, CategoriaAdicional } from '../types';

export const categoriasMock: Categoria[] = [
  {
    id: '1',
    nome: 'Pizzas',
    descricao: 'Pizzas artesanais com massa tradicional',
    ativa: true,
    ordem: 1
  },
  {
    id: '2',
    nome: 'Hambúrgueres',
    descricao: 'Hambúrgueres artesanais com ingredientes selecionados',
    ativa: true,
    ordem: 2
  },
  {
    id: '3',
    nome: 'Massas',
    descricao: 'Massas frescas e molhos especiais',
    ativa: true,
    ordem: 3
  },
  {
    id: '4',
    nome: 'Peixes',
    descricao: 'Peixes frescos grelhados e assados',
    ativa: true,
    ordem: 4
  },
  {
    id: '5',
    nome: 'Bebidas',
    descricao: 'Refrigerantes, sucos e bebidas alcoólicas',
    ativa: true,
    ordem: 5
  },
  {
    id: '6',
    nome: 'Sobremesas',
    descricao: 'Doces e sobremesas da casa',
    ativa: false,
    ordem: 6
  }
];

export const produtosMock: Produto[] = [
  {
    id: '1',
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',
    preco: 35.90,
    categoria: 'Pizzas',
    categoriaId: '1',
    tempoPreparacao: 25,
    ativo: true,
    imagem: '/images/pizza-margherita.jpg',
    ingredientes: ['Massa de pizza', 'Molho de tomate', 'Mussarela', 'Manjericão', 'Azeite'],
    extras: [
      { nome: 'Borda recheada', preco: 8.00 },
      { nome: 'Queijo extra', preco: 5.00 }
    ]
  },
  {
    id: '2',
    nome: 'Pizza Portuguesa',
    descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola e azeitonas',
    preco: 42.90,
    categoria: 'Pizzas',
    categoriaId: '1',
    tempoPreparacao: 30,
    ativo: true,
    imagem: '/images/pizza-portuguesa.jpg',
    ingredientes: ['Massa de pizza', 'Molho de tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas'],
    extras: [
      { nome: 'Borda recheada', preco: 8.00 },
      { nome: 'Bacon extra', preco: 6.00 }
    ]
  },
  {
    id: '3',
    nome: 'Hambúrguer Artesanal',
    descricao: 'Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate e molho especial',
    preco: 28.90,
    categoria: 'Hambúrgueres',
    categoriaId: '2',
    tempoPreparacao: 20,
    ativo: true,
    imagem: '/images/hamburguer-artesanal.jpg',
    ingredientes: ['Pão brioche', 'Hambúrguer 180g', 'Queijo cheddar', 'Alface', 'Tomate', 'Molho especial'],
    extras: [
      { nome: 'Bacon', preco: 5.00 },
      { nome: 'Ovo', preco: 3.00 },
      { nome: 'Queijo extra', preco: 4.00 }
    ]
  },
  {
    id: '4',
    nome: 'Lasanha Bolonhesa',
    descricao: 'Massa fresca, molho bolonhesa, queijo e molho branco',
    preco: 32.50,
    categoria: 'Massas',
    categoriaId: '3',
    tempoPreparacao: 35,
    ativo: true,
    imagem: '/images/lasanha-bolonhesa.jpg',
    ingredientes: ['Massa de lasanha', 'Molho bolonhesa', 'Queijo mussarela', 'Molho branco', 'Parmesão'],
    extras: [
      { nome: 'Queijo extra', preco: 5.00 }
    ]
  },
  {
    id: '5',
    nome: 'Salmão Grelhado',
    descricao: 'Filé de salmão grelhado com legumes e arroz integral',
    preco: 45.00,
    categoria: 'Peixes',
    categoriaId: '4',
    tempoPreparacao: 25,
    ativo: true,
    imagem: '/images/salmao-grelhado.jpg',
    ingredientes: ['Filé de salmão', 'Legumes grelhados', 'Arroz integral', 'Molho de ervas'],
    extras: [
      { nome: 'Molho de alcaparras', preco: 4.00 }
    ]
  },
  {
    id: '6',
    nome: 'Risotto de Camarão',
    descricao: 'Arroz arbóreo cremoso com camarões e temperos especiais',
    preco: 38.90,
    categoria: 'Massas',
    categoriaId: '3',
    tempoPreparacao: 30,
    ativo: true,
    imagem: '/images/risotto-camarao.jpg',
    ingredientes: ['Arroz arbóreo', 'Camarões', 'Vinho branco', 'Queijo parmesão', 'Temperos especiais'],
    extras: [
      { nome: 'Camarões extras', preco: 8.00 }
    ]
  },
  {
    id: '7',
    nome: 'Refrigerante 2L',
    descricao: 'Refrigerante de cola 2 litros',
    preco: 8.50,
    categoria: 'Bebidas',
    categoriaId: '5',
    tempoPreparacao: 2,
    ativo: true,
    imagem: '/images/refrigerante.jpg',
    ingredientes: ['Refrigerante de cola']
  },
  {
    id: '8',
    nome: 'Suco Natural',
    descricao: 'Suco natural de laranja 500ml',
    preco: 7.50,
    categoria: 'Bebidas',
    categoriaId: '5',
    tempoPreparacao: 5,
    ativo: true,
    imagem: '/images/suco-laranja.jpg',
    ingredientes: ['Laranja natural', 'Açúcar (opcional)']
  },
  {
    id: '9',
    nome: 'Batata Frita',
    descricao: 'Porção de batata frita crocante',
    preco: 12.90,
    categoria: 'Hambúrgueres',
    categoriaId: '2',
    tempoPreparacao: 15,
    ativo: true,
    imagem: '/images/batata-frita.jpg',
    ingredientes: ['Batata', 'Óleo', 'Sal'],
    extras: [
      { nome: 'Molho barbecue', preco: 2.00 },
      { nome: 'Molho cheddar', preco: 3.00 }
    ]
  },
  {
    id: '10',
    nome: 'Tiramisu',
    descricao: 'Sobremesa italiana com café e mascarpone',
    preco: 18.90,
    categoria: 'Sobremesas',
    categoriaId: '6',
    tempoPreparacao: 5,
    ativo: false,
    imagem: '/images/tiramisu.jpg',
    ingredientes: ['Biscoito champagne', 'Café', 'Mascarpone', 'Cacau em pó']
  }
];

export const categoriasAdicionaisMock: CategoriaAdicional[] = [
  {
    id: 'add-1',
    nome: 'Bordas',
    descricao: 'Bordas especiais para pizzas',
    status: 'ativo',
    disponibilidade: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
      sabado: true,
      domingo: true,
      horarioInicio: '11:00',
      horarioFim: '23:00'
    },
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-15')
  },
  {
    id: 'add-2',
    nome: 'Molhos',
    descricao: 'Molhos especiais para acompanhar',
    status: 'ativo',
    disponibilidade: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
      sabado: true,
      domingo: true,
      horarioInicio: '11:00',
      horarioFim: '23:00'
    },
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-15')
  },
  {
    id: 'add-3',
    nome: 'Bebidas',
    descricao: 'Bebidas para acompanhar',
    status: 'ativo',
    disponibilidade: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
      sabado: true,
      domingo: true,
      horarioInicio: '11:00',
      horarioFim: '23:00'
    },
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-15')
  },
  {
    id: 'add-4',
    nome: 'Sobremesas',
    descricao: 'Sobremesas da casa',
    status: 'inativo',
    disponibilidade: {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: false,
      sexta: true,
      sabado: true,
      domingo: true,
      horarioInicio: '18:00',
      horarioFim: '22:00'
    },
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-15')
  }
];