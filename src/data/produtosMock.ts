import { Produto, ClassificacaoProduto, DescontoProduto, DisponibilidadeProduto, DiaSemana } from '../types/produtos';

const DIAS_SEMANA: DiaSemana[] = [
  { id: 0, nome: 'Domingo', ativo: true },
  { id: 1, nome: 'Segunda', ativo: true },
  { id: 2, nome: 'Terça', ativo: true },
  { id: 3, nome: 'Quarta', ativo: true },
  { id: 4, nome: 'Quinta', ativo: true },
  { id: 5, nome: 'Sexta', ativo: true },
  { id: 6, nome: 'Sábado', ativo: true }
];

export const produtosMock: Produto[] = [
  {
    id: '1',
    nome: 'Smashelândia Burger',
    descricao: 'Hambúrguer artesanal com queijo cheddar, alface, tomate, cebola caramelizada e molho especial da casa. Pão brioche tostado na manteiga.',
    preco: 28.90,
    categoria: 'Hambúrgueres',
    categoriaId: '2',
    imagem: '/images/smashelandia-burger.jpg',
    ativo: true,
    status: 'ativo',
    tempoPreparoMinutos: 20,
    ingredientes: ['Pão brioche', 'Hambúrguer 180g', 'Queijo cheddar', 'Alface', 'Tomate', 'Cebola caramelizada', 'Molho especial'],
    extras: [
      { id: 'extra-1', nome: 'Bacon', preco: 5.00 },
      { id: 'extra-2', nome: 'Ovo', preco: 3.00 },
      { id: 'extra-3', nome: 'Queijo extra', preco: 4.00 }
    ],
    tamanhoPorcao: 1,
    agendamentoObrigatorio: false,
    destacado: true,
    galeriaFotos: [
      '/images/smashelandia-burger-1.jpg',
      '/images/smashelandia-burger-2.jpg',
      '/images/smashelandia-burger-3.jpg'
    ],
    complementos: ['add-1', 'add-2'], // Queijos e Molhos
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: false,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    },
    disponibilidade: {
      id: 'disp-prod-1',
      produtoId: '1',
      diasSemana: DIAS_SEMANA,
      horarioInicio: '11:00',
      horarioFim: '22:00',
      ativo: true
    },
    slug: 'smashelandia-burger',
    tags: ['hamburguer', 'artesanal', 'queijo', 'bacon'],
    metaDescription: 'Hambúrguer artesanal com queijo cheddar e molho especial',
    vendasTotais: 156,
    avaliacaoMedia: 4.8,
    numeroAvaliacoes: 23,
    estoque: {
      quantidade: 50,
      minimo: 10,
      maximo: 100,
      alertaEstoque: false
    },
    variacoes: [
      { id: 'var-1', nome: 'Pequeno', preco: 22.90, ativo: true },
      { id: 'var-2', nome: 'Médio', preco: 28.90, ativo: true },
      { id: 'var-3', nome: 'Grande', preco: 34.90, ativo: true }
    ],
    ingredientesObrigatorios: ['Pão brioche', 'Hambúrguer'],
    ingredientesOpcionais: ['Bacon', 'Ovo', 'Queijo extra'],
    codigoExterno: 'SMASH001',
    sincronizadoComIfood: true,
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-15')
  },
  {
    id: '2',
    nome: 'Pizza Margherita',
    descricao: 'Pizza tradicional italiana com molho de tomate, mussarela fresca, manjericão orgânico e azeite extra virgem. Massa fermentada naturalmente por 24 horas.',
    preco: 35.90,
    categoria: 'Pizzas',
    categoriaId: '1',
    imagem: '/images/pizza-margherita.jpg',
    ativo: true,
    status: 'ativo',
    tempoPreparoMinutos: 25,
    ingredientes: ['Massa de pizza', 'Molho de tomate', 'Mussarela fresca', 'Manjericão orgânico', 'Azeite extra virgem'],
    extras: [
      { id: 'extra-4', nome: 'Borda recheada', preco: 8.00 },
      { id: 'extra-5', nome: 'Queijo extra', preco: 5.00 }
    ],
    tamanhoPorcao: 2,
    agendamentoObrigatorio: false,
    destacado: true,
    galeriaFotos: [
      '/images/pizza-margherita-1.jpg',
      '/images/pizza-margherita-2.jpg'
    ],
    complementos: ['add-1', 'add-3'], // Queijos e Bordas
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: true,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: true,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    },
    disponibilidade: {
      id: 'disp-prod-2',
      produtoId: '2',
      diasSemana: DIAS_SEMANA,
      horarioInicio: '18:00',
      horarioFim: '23:00',
      ativo: true
    },
    slug: 'pizza-margherita',
    tags: ['pizza', 'italiana', 'margherita', 'tradicional'],
    metaDescription: 'Pizza tradicional italiana com ingredientes frescos',
    vendasTotais: 89,
    avaliacaoMedia: 4.9,
    numeroAvaliacoes: 15,
    estoque: {
      quantidade: 30,
      minimo: 5,
      maximo: 50,
      alertaEstoque: false
    },
    variacoes: [
      { id: 'var-4', nome: 'Pequena (25cm)', preco: 28.90, ativo: true },
      { id: 'var-5', nome: 'Média (30cm)', preco: 35.90, ativo: true },
      { id: 'var-6', nome: 'Grande (35cm)', preco: 42.90, ativo: true }
    ],
    ingredientesObrigatorios: ['Massa de pizza', 'Molho de tomate', 'Mussarela'],
    ingredientesOpcionais: ['Borda recheada', 'Queijo extra'],
    codigoExterno: 'PIZZA001',
    sincronizadoComIfood: true,
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-10')
  },
  {
    id: '3',
    nome: 'Suco Natural de Laranja',
    descricao: 'Suco 100% natural de laranja pera, espremido na hora. Rico em vitamina C e sem conservantes.',
    preco: 7.50,
    categoria: 'Bebidas',
    categoriaId: '5',
    imagem: '/images/suco-laranja.jpg',
    ativo: true,
    status: 'ativo',
    tempoPreparoMinutos: 5,
    ingredientes: ['Laranja pera natural'],
    extras: [
      { id: 'extra-6', nome: 'Gelo extra', preco: 0.50 },
      { id: 'extra-7', nome: 'Açúcar', preco: 0.00 }
    ],
    tamanhoPorcao: 1,
    agendamentoObrigatorio: false,
    destacado: false,
    galeriaFotos: [
      '/images/suco-laranja-1.jpg'
    ],
    complementos: [],
    classificacoes: {
      semIngredientesOrigemAnimal: true,
      semCarne: true,
      semLactose: true,
      semAcucar: false,
      cultivadoSemAgrotoxicos: true,
      servidoGelado: true,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: true
    },
    disponibilidade: {
      id: 'disp-prod-3',
      produtoId: '3',
      diasSemana: DIAS_SEMANA,
      horarioInicio: '08:00',
      horarioFim: '22:00',
      ativo: true
    },
    slug: 'suco-natural-laranja',
    tags: ['suco', 'natural', 'laranja', 'vitamina-c'],
    metaDescription: 'Suco natural de laranja espremido na hora',
    vendasTotais: 234,
    avaliacaoMedia: 4.7,
    numeroAvaliacoes: 45,
    estoque: {
      quantidade: 100,
      minimo: 20,
      maximo: 200,
      alertaEstoque: false
    },
    variacoes: [
      { id: 'var-7', nome: '300ml', preco: 5.50, ativo: true },
      { id: 'var-8', nome: '500ml', preco: 7.50, ativo: true },
      { id: 'var-9', nome: '1L', preco: 12.00, ativo: true }
    ],
    ingredientesObrigatorios: ['Laranja natural'],
    ingredientesOpcionais: ['Gelo', 'Açúcar'],
    codigoExterno: 'SUCO001',
    sincronizadoComIfood: true,
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-05')
  },
  {
    id: '4',
    nome: 'Tiramisu Tradicional',
    descricao: 'Sobremesa italiana tradicional com mascarpone, café expresso, biscoitos champagne e cacau em pó. Preparado diariamente.',
    preco: 18.90,
    categoria: 'Sobremesas',
    categoriaId: '6',
    imagem: '/images/tiramisu.jpg',
    ativo: false,
    status: 'em_falta',
    tempoPreparoMinutos: 5,
    ingredientes: ['Mascarpone', 'Café expresso', 'Biscoitos champagne', 'Cacau em pó', 'Ovos', 'Açúcar'],
    extras: [
      { id: 'extra-8', nome: 'Café extra', preco: 2.00 }
    ],
    tamanhoPorcao: 1,
    agendamentoObrigatorio: true,
    destacado: false,
    galeriaFotos: [
      '/images/tiramisu-1.jpg',
      '/images/tiramisu-2.jpg'
    ],
    complementos: [],
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: true,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: true,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    },
    disponibilidade: {
      id: 'disp-prod-4',
      produtoId: '4',
      diasSemana: DIAS_SEMANA.filter(dia => [5, 6].includes(dia.id)), // Apenas sexta e sábado
      horarioInicio: '14:00',
      horarioFim: '22:00',
      ativo: false
    },
    slug: 'tiramisu-tradicional',
    tags: ['sobremesa', 'italiana', 'tiramisu', 'tradicional'],
    metaDescription: 'Sobremesa italiana tradicional com mascarpone',
    vendasTotais: 67,
    avaliacaoMedia: 4.9,
    numeroAvaliacoes: 12,
    estoque: {
      quantidade: 0,
      minimo: 5,
      maximo: 20,
      alertaEstoque: true
    },
    variacoes: [
      { id: 'var-10', nome: 'Individual', preco: 18.90, ativo: true },
      { id: 'var-11', nome: 'Família (4 porções)', preco: 65.00, ativo: true }
    ],
    ingredientesObrigatorios: ['Mascarpone', 'Café expresso', 'Biscoitos champagne'],
    ingredientesOpcionais: ['Café extra'],
    codigoExterno: 'TIRAMISU001',
    sincronizadoComIfood: false,
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-20')
  },
  {
    id: '5',
    nome: 'Cerveja Artesanal IPA',
    descricao: 'Cerveja artesanal estilo IPA (India Pale Ale) com teor alcoólico de 6.2%. Amarga e aromática, perfeita para acompanhar hambúrgueres.',
    preco: 12.90,
    categoria: 'Bebidas',
    categoriaId: '5',
    imagem: '/images/cerveja-ipa.jpg',
    ativo: true,
    status: 'ativo',
    tempoPreparoMinutos: 2,
    ingredientes: ['Malte', 'Lúpulo', 'Água', 'Levedura'],
    extras: [
      { id: 'extra-9', nome: 'Chope (500ml)', preco: 15.90 },
      { id: 'extra-10', nome: 'Garrafa (600ml)', preco: 18.90 }
    ],
    tamanhoPorcao: 1,
    agendamentoObrigatorio: false,
    destacado: true,
    galeriaFotos: [
      '/images/cerveja-ipa-1.jpg',
      '/images/cerveja-ipa-2.jpg'
    ],
    complementos: [],
    classificacoes: {
      semIngredientesOrigemAnimal: true,
      semCarne: true,
      semLactose: true,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: true,
      teorAlcoolico: 6.2,
      preparadoComFrutasFrescas: false
    },
    disponibilidade: {
      id: 'disp-prod-5',
      produtoId: '5',
      diasSemana: DIAS_SEMANA,
      horarioInicio: '11:00',
      horarioFim: '23:00',
      ativo: true
    },
    slug: 'cerveja-artesanal-ipa',
    tags: ['cerveja', 'artesanal', 'ipa', 'alcoólica'],
    metaDescription: 'Cerveja artesanal IPA com 6.2% de álcool',
    vendasTotais: 189,
    avaliacaoMedia: 4.6,
    numeroAvaliacoes: 34,
    estoque: {
      quantidade: 80,
      minimo: 15,
      maximo: 150,
      alertaEstoque: false
    },
    variacoes: [
      { id: 'var-12', nome: 'Lata (350ml)', preco: 12.90, ativo: true },
      { id: 'var-13', nome: 'Chope (500ml)', preco: 15.90, ativo: true },
      { id: 'var-14', nome: 'Garrafa (600ml)', preco: 18.90, ativo: true }
    ],
    ingredientesObrigatorios: ['Malte', 'Lúpulo', 'Água', 'Levedura'],
    ingredientesOpcionais: [],
    codigoExterno: 'CERVEJA001',
    sincronizadoComIfood: true,
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-12')
  }
];

// Templates de produtos
export const templatesProduto = [
  {
    id: 'template-1',
    nome: 'Hambúrguer Artesanal',
    categoria: 'Hambúrgueres',
    camposPredefinidos: {
      tempoPreparoMinutos: 20,
      agendamentoObrigatorio: false,
      destacado: true,
      tamanhoPorcao: 1
    },
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: false,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    }
  },
  {
    id: 'template-2',
    nome: 'Pizza Tradicional',
    categoria: 'Pizzas',
    camposPredefinidos: {
      tempoPreparoMinutos: 25,
      agendamentoObrigatorio: false,
      destacado: true,
      tamanhoPorcao: 2
    },
    classificacoes: {
      semIngredientesOrigemAnimal: false,
      semCarne: true,
      semLactose: false,
      semAcucar: false,
      cultivadoSemAgrotoxicos: true,
      servidoGelado: false,
      teorAlcoolico: undefined,
      preparadoComFrutasFrescas: false
    }
  },
  {
    id: 'template-3',
    nome: 'Bebida Alcoólica',
    categoria: 'Bebidas',
    camposPredefinidos: {
      tempoPreparoMinutos: 2,
      agendamentoObrigatorio: false,
      destacado: false,
      tamanhoPorcao: 1
    },
    classificacoes: {
      semIngredientesOrigemAnimal: true,
      semCarne: true,
      semLactose: true,
      semAcucar: false,
      cultivadoSemAgrotoxicos: false,
      servidoGelado: true,
      teorAlcoolico: 5.0,
      preparadoComFrutasFrescas: false
    }
  }
]; 