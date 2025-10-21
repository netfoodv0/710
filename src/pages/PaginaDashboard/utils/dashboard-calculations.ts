import { 
  PedidoComFormaEntrega, 
  ProdutoCalculado, 
  FormaPedidoCalculada, 
  EstatisticasCalculadas 
} from '../types/dashboard-calculations.types';
import { 
  DASHBOARD_CONSTANTS, 
  PRODUCT_PLACEHOLDER_SVG, 
  PRODUCT_IMAGE_MAP,
  FORMA_ENTREGA 
} from '../constants/dashboard.constants';

// Função para obter imagem do produto
export const getProductImageUrl = (nomeProduto: string): string => {
  const lowerName = nomeProduto.toLowerCase();
  
  for (const [key, imageUrl] of Object.entries(PRODUCT_IMAGE_MAP)) {
    if (lowerName.includes(key)) {
      return imageUrl;
    }
  }
  
  return PRODUCT_PLACEHOLDER_SVG;
};

// Função para calcular produtos mais vendidos
export const calcularProdutosMaisVendidos = (pedidos: PedidoComFormaEntrega[]): ProdutoCalculado[] => {
  if (!pedidos || pedidos.length === 0) {
    return [
      { 
        nome: 'Nenhum produto', 
        quantidade: 0, 
        preco: 0, 
        valorTotal: 0, 
        imagem: PRODUCT_PLACEHOLDER_SVG 
      }
    ];
  }

  const produtosMap = new Map<string, ProdutoCalculado>();
  
  pedidos.forEach(pedido => {
    if (pedido.itens && Array.isArray(pedido.itens)) {
      pedido.itens.forEach(item => {
        const nomeProduto = item.nome || 'Produto sem nome';
        const quantidade = Number(item.quantidade) || 0;
        const preco = Number(item.preco) || 0;
        const subtotal = Number(item.subtotal) || (quantidade * preco);
        const imagem = getProductImageUrl(nomeProduto);
        
        if (produtosMap.has(nomeProduto)) {
          const produto = produtosMap.get(nomeProduto)!;
          produto.quantidade += quantidade;
          produto.valorTotal += subtotal;
          produto.preco = preco; // Manter preço mais recente
        } else {
          produtosMap.set(nomeProduto, {
            nome: nomeProduto,
            quantidade,
            preco,
            valorTotal: subtotal,
            imagem
          });
        }
      });
    }
  });

  return Array.from(produtosMap.values())
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, DASHBOARD_CONSTANTS.TOP_PRODUCTS_LIMIT);
};

// Função para calcular formas de pedido
export const calcularFormasPedidoReais = (pedidos: PedidoComFormaEntrega[]): FormaPedidoCalculada[] => {
  if (!pedidos || pedidos.length === 0) {
    return [
      { nome: 'Delivery', valor: 0, icone: 'delivery' },
      { nome: 'Retirada', valor: 0, icone: 'pickup' },
      { nome: 'Balcão', valor: 0, icone: 'dine_in' }
    ];
  }

  const formasEntrega = {
    [FORMA_ENTREGA.DELIVERY]: 0,
    [FORMA_ENTREGA.RETIRADA]: 0,
    [FORMA_ENTREGA.BALCAO]: 0
  };
  
  pedidos.forEach(pedido => {
    const formaEntrega = pedido.formaEntrega || FORMA_ENTREGA.DELIVERY;
    formasEntrega[formaEntrega] = (formasEntrega[formaEntrega] || 0) + 1;
  });

  return [
    { nome: 'Delivery', valor: formasEntrega[FORMA_ENTREGA.DELIVERY], icone: 'delivery' },
    { nome: 'Retirada', valor: formasEntrega[FORMA_ENTREGA.RETIRADA], icone: 'pickup' },
    { nome: 'Balcão', valor: formasEntrega[FORMA_ENTREGA.BALCAO], icone: 'dine_in' }
  ];
};

// Função para calcular estatísticas
export const calcularEstatisticasReais = (
  pedidos: PedidoComFormaEntrega[], 
  clientesUnicos: number = 0
): EstatisticasCalculadas => {
  if (!pedidos || pedidos.length === 0) {
    return {
      totalPedidos: 0,
      faturamentoTotal: 0,
      totalClientes: 0,
      ticketMedio: 0,
      pedidos7Dias: 0,
      receita7Dias: 0,
      pedidosPendentes: 0
    };
  }

  const totalPedidos = pedidos.length;
  const faturamentoTotal = pedidos.reduce((total, pedido) => total + (pedido.total || 0), 0);
  const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;
  
  const totalClientes = clientesUnicos > 0 ? clientesUnicos : 
    new Set(pedidos.map(p => p.cliente?.telefone || 'sem-telefone')).size;

  // Calcular dados dos últimos 7 dias
  const agora = new Date();
  const dataInicio7Dias = new Date(agora.getTime() - DASHBOARD_CONSTANTS.DAYS_7_MS);
  const pedidos7Dias = pedidos.filter(p => {
    const dataPedido = new Date(p.dataHora);
    return dataPedido >= dataInicio7Dias;
  });
  
  const pedidos7DiasCount = pedidos7Dias.length;
  const receita7Dias = pedidos7Dias.reduce((total, pedido) => total + (pedido.total || 0), 0);

  return {
    totalPedidos,
    faturamentoTotal,
    totalClientes,
    ticketMedio,
    pedidos7Dias: pedidos7DiasCount,
    receita7Dias,
    pedidosPendentes: 0 // Será preenchido pelos dados do Firebase
  };
};
