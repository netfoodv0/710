import { ProdutoModal } from '../types/cardapio/produtoModal';
import { CategoriaModal } from '../types/cardapio/categoriaModal';

/**
 * Dados de exemplo para produtos
 * Usado apenas quando não há produtos cadastrados no Firebase
 */
export const getProdutosExemplo = (lojaId: string): ProdutoModal[] => [
  {
    id: 'mock-1',
    lojaId,
    nome: 'Hambúrguer Clássico',
    categoria: 'Lanches',
    descricao: 'Hambúrguer com carne, queijo, alface e tomate',
    precoVenda: 15.90,
    precoCusto: 8.50,
    estoqueAtual: 50,
    estoqueMinimo: 10,
    controleEstoque: true,
    status: 'ativo',
    codigoBarras: '123456789',
    codigoSku: 'HB001',
    unidadeMedida: 'unidade',
    imagem: '',
    horariosDisponibilidade: [],
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'mock-2',
    lojaId,
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    descricao: 'Pizza com molho de tomate, mussarela e manjericão',
    precoVenda: 25.90,
    precoCusto: 12.00,
    estoqueAtual: 30,
    estoqueMinimo: 5,
    controleEstoque: true,
    status: 'ativo',
    codigoBarras: '123456790',
    codigoSku: 'PZ001',
    unidadeMedida: 'unidade',
    imagem: '',
    horariosDisponibilidade: [],
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'mock-3',
    lojaId,
    nome: 'Coca-Cola 350ml',
    categoria: 'Bebidas',
    descricao: 'Refrigerante de cola gelado',
    precoVenda: 4.50,
    precoCusto: 2.00,
    estoqueAtual: 100,
    estoqueMinimo: 20,
    controleEstoque: true,
    status: 'ativo',
    codigoBarras: '123456791',
    codigoSku: 'BB001',
    unidadeMedida: 'unidade',
    imagem: '',
    horariosDisponibilidade: [],
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'mock-4',
    lojaId,
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    descricao: 'Batata frita crocante',
    precoVenda: 8.90,
    precoCusto: 3.50,
    estoqueAtual: 40,
    estoqueMinimo: 10,
    controleEstoque: true,
    status: 'ativo',
    codigoBarras: '123456792',
    codigoSku: 'AC001',
    unidadeMedida: 'unidade',
    imagem: '',
    horariosDisponibilidade: [],
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'mock-5',
    lojaId,
    nome: 'Sorvete de Chocolate',
    categoria: 'Sobremesas',
    descricao: 'Sorvete cremoso de chocolate',
    precoVenda: 6.90,
    precoCusto: 3.00,
    estoqueAtual: 25,
    estoqueMinimo: 5,
    controleEstoque: true,
    status: 'ativo',
    codigoBarras: '123456793',
    codigoSku: 'SB001',
    unidadeMedida: 'unidade',
    imagem: '',
    horariosDisponibilidade: [],
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  }
];

/**
 * Dados de exemplo para categorias
 * Usado apenas quando não há categorias cadastradas no Firebase
 */
export const getCategoriasExemplo = (lojaId: string): CategoriaModal[] => [
  {
    id: 'cat-mock-1',
    lojaId,
    nome: 'Lanches',
    status: 'ativo',
    agendamentoPrevio: { ativo: false, diasAntecedencia: 0 },
    posicao: 1,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'cat-mock-2',
    lojaId,
    nome: 'Pizzas',
    status: 'ativo',
    agendamentoPrevio: { ativo: false, diasAntecedencia: 0 },
    posicao: 2,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'cat-mock-3',
    lojaId,
    nome: 'Bebidas',
    status: 'ativo',
    agendamentoPrevio: { ativo: false, diasAntecedencia: 0 },
    posicao: 3,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'cat-mock-4',
    lojaId,
    nome: 'Acompanhamentos',
    status: 'ativo',
    agendamentoPrevio: { ativo: false, diasAntecedencia: 0 },
    posicao: 4,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  },
  {
    id: 'cat-mock-5',
    lojaId,
    nome: 'Sobremesas',
    status: 'ativo',
    agendamentoPrevio: { ativo: false, diasAntecedencia: 0 },
    posicao: 5,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  }
];










