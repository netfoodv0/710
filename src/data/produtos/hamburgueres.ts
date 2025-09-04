import { Produto } from '../../types/global/produtos';
import { DIAS_SEMANA } from './constantes';

export const hamburgueresMock: Produto[] = [
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
  }
]; 