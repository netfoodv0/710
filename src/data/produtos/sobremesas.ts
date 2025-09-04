import { Produto } from '../../types/global/produtos';
import { DIAS_SEMANA } from './constantes';

export const sobremesasMock: Produto[] = [
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
  }
]; 