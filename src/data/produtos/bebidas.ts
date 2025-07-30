import { Produto } from '../../types/produtos';
import { DIAS_SEMANA } from './constantes';

export const bebidasMock: Produto[] = [
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