import { Produto } from '../../types/global/produtos';
import { DIAS_SEMANA } from './constantes';

export const pizzasMock: Produto[] = [
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
  }
]; 