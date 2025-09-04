import { FormaPedidaIconType } from '../types/global/icons';
import { FormaPedida, ProdutoVendido, PedidoEmAndamento } from '../types/global/dashboard';

// Serviço centralizado para dados mockados do dashboard
export interface MockDataConfig {
  produtos: ProdutoVendido[];
  pedidos: PedidoEmAndamento[];
  formas: FormaPedida[];
}

// Dados mockados centralizados
const mockData: MockDataConfig = {
  produtos: [
    {
      nome: 'Pizza Margherita',
      quantidade: 156,
      receita: 4680.00,
      posicao: 1
    },
    {
      nome: 'Hambúrguer Artesanal',
      quantidade: 134,
      receita: 4020.00,
      posicao: 2
    },
    {
      nome: 'Açaí 500ml',
      quantidade: 98,
      receita: 1470.00,
      posicao: 3
    },
    {
      nome: 'Sushi Combo',
      quantidade: 67,
      receita: 3350.00,
      posicao: 4
    },
    {
      nome: 'Salada Caesar',
      quantidade: 89,
      receita: 1780.00,
      posicao: 5
    },
    {
      nome: 'Batata Frita',
      quantidade: 123,
      receita: 1845.00,
      posicao: 6
    }
  ],
  pedidos: [
    {
      id: '1',
      numero: '001',
      cliente: 'João Silva',
      status: 'Em preparo',
      total: 45.90
    },
    {
      id: '2',
      numero: '002',
      cliente: 'Maria Santos',
      status: 'Aguardando',
      total: 32.50
    },
    {
      id: '3',
      numero: '003',
      cliente: 'Pedro Costa',
      status: 'Pronto',
      total: 28.80
    },
    {
      id: '4',
      numero: '004',
      cliente: 'Ana Oliveira',
      status: 'Em preparo',
      total: 52.30
    },
    {
      id: '5',
      numero: '005',
      cliente: 'Carlos Lima',
      status: 'Aguardando',
      total: 38.90
    },
    {
      id: '6',
      numero: '006',
      cliente: 'Fernanda Costa',
      status: 'Pronto',
      total: 41.20
    },
    {
      id: '7',
      numero: '007',
      cliente: 'Roberto Alves',
      status: 'Em preparo',
      total: 67.80
    },
    {
      id: '8',
      numero: '008',
      cliente: 'Patrícia Santos',
      status: 'Aguardando',
      total: 29.50
    },
    {
      id: '9',
      numero: '009',
      cliente: 'Lucas Mendes',
      status: 'Pronto',
      total: 44.20
    },
    {
      id: '10',
      numero: '010',
      cliente: 'Juliana Costa',
      status: 'Em preparo',
      total: 58.90
    },
    {
      id: '11',
      numero: '011',
      cliente: 'Marcelo Silva',
      status: 'Aguardando',
      total: 35.60
    },
    {
      id: '12',
      numero: '012',
      cliente: 'Camila Lima',
      status: 'Pronto',
      total: 49.30
    }
  ],
  formas: [
    {
      nome: 'Delivery',
      valor: 0,
      icone: 'truck',
      cor: '#3b82f6'
    },
    {
      nome: 'Mesas',
      valor: 0,
      icone: 'utensils',
      cor: '#10b981'
    },
    {
      nome: 'Retirada',
      valor: 0,
      icone: 'shopping-bag',
      cor: '#f59e0b'
    }
  ]
};

// Função para obter dados mockados por tipo
export const getMockData = <T extends keyof MockDataConfig>(type: T): MockDataConfig[T] => {
  return mockData[type] || [];
};

// Função para obter dados específicos
export const getMockProdutos = (): ProdutoVendido[] => getMockData('produtos');
export const getMockPedidos = (): PedidoEmAndamento[] => getMockData('pedidos');
export const getMockFormas = (): FormaPedida[] => getMockData('formas');

// Função para obter dados com fallback
export const getDataWithFallback = <T>(
  data: T[],
  type: keyof MockDataConfig
): T[] => {
  return data.length > 0 ? data : getMockData(type);
};
