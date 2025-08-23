// Dados fictícios para cupons
export const cuponsFicticios = [
  {
    id: 1,
    codigo: 'DESCONTO10',
    descricao: 'Desconto de 10% em todo o cardápio',
    tipo: 'percentual',
    valor: 10,
    status: 'ativo',
    categoria: 'Desconto Percentual',
    dataCriacao: '2024-01-15',
    dataExpiracao: '2024-12-31',
    usoMaximo: 100,
    usosAtuais: 45,
    valorMinimo: 30
  },
  {
    id: 2,
    codigo: 'FRETE0',
    descricao: 'Frete grátis para pedidos acima de R$ 50',
    tipo: 'valor_fixo',
    valor: 0,
    status: 'ativo',
    categoria: 'Frete Grátis',
    dataCriacao: '2024-01-20',
    dataExpiracao: '2024-12-31',
    usoMaximo: 200,
    usosAtuais: 78,
    valorMinimo: 50
  },
  {
    id: 3,
    codigo: 'LANCHE15',
    descricao: 'R$ 15 de desconto em lanches',
    tipo: 'valor_fixo',
    valor: 15,
    status: 'ativo',
    categoria: 'Desconto Fixo',
    dataCriacao: '2024-02-01',
    dataExpiracao: '2024-06-30',
    usoMaximo: 150,
    usosAtuais: 89,
    valorMinimo: 25
  },
  {
    id: 4,
    codigo: 'BEBIDA20',
    descricao: '20% de desconto em bebidas',
    tipo: 'percentual',
    valor: 20,
    status: 'inativo',
    categoria: 'Desconto Percentual',
    dataCriacao: '2024-01-10',
    dataExpiracao: '2024-03-31',
    usoMaximo: 80,
    usosAtuais: 80,
    valorMinimo: 15
  },
  {
    id: 5,
    codigo: 'PRIMEIRA20',
    descricao: '20% de desconto para primeira compra',
    tipo: 'percentual',
    valor: 20,
    status: 'ativo',
    categoria: 'Desconto Percentual',
    dataCriacao: '2024-01-01',
    dataExpiracao: '2024-12-31',
    usoMaximo: 500,
    usosAtuais: 234,
    valorMinimo: 20
  },
  {
    id: 6,
    codigo: 'BRINDE01',
    descricao: 'Refrigerante grátis em pedidos acima de R$ 40',
    tipo: 'brinde',
    valor: 0,
    status: 'ativo',
    categoria: 'Brinde',
    dataCriacao: '2024-02-15',
    dataExpiracao: '2024-12-31',
    usoMaximo: 100,
    usosAtuais: 12,
    valorMinimo: 40
  },
  {
    id: 7,
    codigo: 'FIXO5',
    descricao: 'R$ 5 de desconto em qualquer pedido',
    tipo: 'valor_fixo',
    valor: 5,
    status: 'ativo',
    categoria: 'Desconto Fixo',
    dataCriacao: '2024-01-25',
    dataExpiracao: '2024-08-31',
    usoMaximo: 300,
    usosAtuais: 156,
    valorMinimo: 20
  },
  {
    id: 8,
    codigo: 'ESPECIAL30',
    descricao: '30% de desconto em produtos especiais',
    tipo: 'percentual',
    valor: 30,
    status: 'ativo',
    categoria: 'Desconto Percentual',
    dataCriacao: '2024-03-01',
    dataExpiracao: '2024-05-31',
    usoMaximo: 50,
    usosAtuais: 23,
    valorMinimo: 35
  },
  {
    id: 9,
    codigo: 'FRETELIVRE',
    descricao: 'Entrega gratuita sem valor mínimo',
    tipo: 'frete_gratis',
    valor: 0,
    status: 'ativo',
    categoria: 'Frete Grátis',
    dataCriacao: '2024-03-10',
    dataExpiracao: '2024-07-31',
    usoMaximo: 75,
    usosAtuais: 34,
    valorMinimo: 0
  },
  {
    id: 10,
    codigo: 'BRINDE02',
    descricao: 'Sobremesa grátis em pedidos acima de R$ 60',
    tipo: 'brinde',
    valor: 0,
    status: 'ativo',
    categoria: 'Brinde',
    dataCriacao: '2024-02-20',
    dataExpiracao: '2024-09-30',
    usoMaximo: 120,
    usosAtuais: 67,
    valorMinimo: 60
  }
];

// Estatísticas dos cupons
export const estatisticasCupons = {
  totalCupons: 10,
  cuponsAtivos: 9,
  cuponsInativos: 1,
  totalUsos: 717,
  cuponsExpirados: 1,
  cuponsExpiramEm30Dias: 2,
  valorTotalDescontos: 1250.50,
  cupomMaisUsado: 'PRIMEIRA20',
  categoriaMaisPopular: 'Desconto Percentual'
};

// Categorias de cupons
export const categorias = [
  'Desconto Fixo',
  'Desconto Percentual',
  'Frete Grátis',
  'Brinde'
];

// Percentuais para os cards de distribuição
export const cardPercentages = [
  { categoria: 'Desconto Fixo', percentual: 25 },
  { categoria: 'Desconto Percentual', percentual: 45 },
  { categoria: 'Frete Grátis', percentual: 20 },
  { categoria: 'Brinde', percentual: 10 }
];
