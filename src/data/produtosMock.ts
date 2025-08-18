export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  status: string;
  vendas: number;
  receita: number;
  avaliacao: number;
  estoque: number;
  destaque: boolean;
}

export const produtosFicticios: Produto[] = [
  {
    id: 1,
    nome: 'X-Burger Clássico',
    categoria: 'Hambúrgueres',
    preco: 25.90,
    status: 'ativo',
    vendas: 156,
    receita: 4034.40,
    avaliacao: 4.8,
    estoque: 45,
    destaque: true
  },
  {
    id: 2,
    nome: 'Batata Frita Grande',
    categoria: 'Acompanhamentos',
    preco: 12.50,
    status: 'ativo',
    vendas: 89,
    receita: 1112.50,
    avaliacao: 4.5,
    estoque: 120,
    destaque: false
  },
  {
    id: 3,
    nome: 'Refrigerante Cola 350ml',
    categoria: 'Bebidas',
    preco: 6.90,
    status: 'ativo',
    vendas: 234,
    receita: 1614.60,
    avaliacao: 4.2,
    estoque: 200,
    destaque: false
  },
  {
    id: 4,
    nome: 'X-Salada Premium',
    categoria: 'Hambúrgueres',
    preco: 32.90,
    status: 'ativo',
    vendas: 78,
    receita: 2566.20,
    avaliacao: 4.9,
    estoque: 25,
    destaque: true
  },
  {
    id: 5,
    nome: 'Milk Shake Chocolate',
    categoria: 'Sobremesas',
    preco: 18.50,
    status: 'ativo',
    vendas: 45,
    receita: 832.50,
    avaliacao: 4.7,
    estoque: 60,
    destaque: false
  },
  {
    id: 6,
    nome: 'Onion Rings',
    categoria: 'Acompanhamentos',
    preco: 15.90,
    status: 'ativo',
    vendas: 67,
    receita: 1065.30,
    avaliacao: 4.3,
    estoque: 80,
    destaque: false
  },
  {
    id: 7,
    nome: 'X-Bacon Especial',
    categoria: 'Hambúrgueres',
    preco: 28.90,
    status: 'ativo',
    vendas: 92,
    receita: 2658.80,
    avaliacao: 4.6,
    estoque: 35,
    destaque: true
  },
  {
    id: 8,
    nome: 'Água Mineral 500ml',
    categoria: 'Bebidas',
    preco: 4.50,
    status: 'ativo',
    vendas: 189,
    receita: 850.50,
    avaliacao: 4.0,
    estoque: 150,
    destaque: false
  }
];

export const estatisticasProdutos = {
  totalProdutos: 156,
  novosProdutos: 23,
  produtosDestaque: 45,
  taxaVendas: 87.5
};

export const categorias = ['Bebidas', 'Hambúrgueres', 'Acompanhamentos', 'Sobremesas'];
export const cardPercentages = [25, 35, 28, 12];
