import { useCallback } from 'react';

// Interface para as traduções do dashboard
interface DashboardTranslations {
  // Formas de Pedido
  formaPedido: string;
  pedidos: string;
  formaDePedido: string;
  
  // Produtos
  vendas: string;
  total: string;
  acessarRelatoriosCompletos: string;
  
  // Pedidos
  emPreparo: string;
  aguardando: string;
  pronto: string;
  acessarPainel: string;
  
  // Estatísticas
  totalDePedidos: string;
  faturamentoTotal: string;
  clientesAtivos: string;
  ticketMedio: string;
  pedidos7Dias: string;
  receita7Dias: string;
  
  // Estados
  nenhumItemEncontrado: string;
  economiaComTaxas: string;
  economiaComTaxasDescricao: string;
  
  // Títulos
  formasDePedido: string;
  topProdutos: string;
  pedidosEmAndamento: string;
  
  // Ações
  atualizarDados: string;
  dashboard: string;
  dashboardSubtitle: string;
}

// Traduções em português
const ptBR: DashboardTranslations = {
  formaPedido: 'Forma de pedido',
  pedidos: 'pedidos',
  formaDePedido: 'Forma de pedido',
  
  vendas: 'vendas',
  total: 'total',
  acessarRelatoriosCompletos: 'Acessar relatórios completos',
  
  emPreparo: 'Em preparo',
  aguardando: 'Aguardando',
  pronto: 'Pronto',
  acessarPainel: 'Acessar painel',
  
  totalDePedidos: 'Total de Pedidos',
  faturamentoTotal: 'Faturamento Total',
  clientesAtivos: 'Clientes Ativos',
  ticketMedio: 'Ticket Médio',
  pedidos7Dias: 'Pedidos - 7 dias',
  receita7Dias: 'Receita - 7 dias',
  
  nenhumItemEncontrado: 'Nenhum item encontrado',
  economiaComTaxas: 'Economia com taxas',
  economiaComTaxasDescricao: 'Comece a vender e deixe de pagar 25% do seu faturamento em taxas à plataformas!',
  
  formasDePedido: 'Formas de Pedido',
  topProdutos: 'Top Produtos',
  pedidosEmAndamento: 'Pedidos em Andamento',
  
  atualizarDados: 'Atualizar Dados',
  dashboard: 'Dashboard',
  dashboardSubtitle: 'Visão geral do desempenho do restaurante'
};

// Traduções em inglês (para futura expansão)
const enUS: DashboardTranslations = {
  formaPedido: 'Order type',
  pedidos: 'orders',
  formaDePedido: 'Order type',
  
  vendas: 'sales',
  total: 'total',
  acessarRelatoriosCompletos: 'Access complete reports',
  
  emPreparo: 'In preparation',
  aguardando: 'Waiting',
  pronto: 'Ready',
  acessarPainel: 'Access panel',
  
  totalDePedidos: 'Total Orders',
  faturamentoTotal: 'Total Revenue',
  clientesAtivos: 'Active Customers',
  ticketMedio: 'Average Ticket',
  pedidos7Dias: 'Orders - 7 days',
  receita7Dias: 'Revenue - 7 days',
  
  nenhumItemEncontrado: 'No items found',
  economiaComTaxas: 'Tax savings',
  economiaComTaxasDescricao: 'Start selling and stop paying 25% of your revenue in platform fees!',
  
  formasDePedido: 'Order Types',
  topProdutos: 'Top Products',
  pedidosEmAndamento: 'Orders in Progress',
  
  atualizarDados: 'Update Data',
  dashboard: 'Dashboard',
  dashboardSubtitle: 'Overview of restaurant performance'
};

// Hook de internacionalização
export const useTranslation = () => {
  // Por enquanto, sempre retorna português
  // No futuro, pode ser expandido para detectar idioma do usuário
  const locale = 'pt-BR';
  
  const t = useCallback((key: keyof DashboardTranslations): string => {
    const translations = locale === 'pt-BR' ? ptBR : enUS;
    return translations[key] || key;
  }, [locale]);
  
  return { t, locale };
};

// Hook específico para o dashboard
export const useDashboardTranslation = () => {
  const { t } = useTranslation();
  
  return {
    t,
    // Traduções específicas do dashboard
    dashboard: {
      formaPedido: t('formaPedido'),
      pedidos: t('pedidos'),
      formaDePedido: t('formaDePedido'),
      vendas: t('vendas'),
      total: t('total'),
      acessarRelatoriosCompletos: t('acessarRelatoriosCompletos'),
      emPreparo: t('emPreparo'),
      aguardando: t('aguardando'),
      pronto: t('pronto'),
      acessarPainel: t('acessarPainel'),
      totalDePedidos: t('totalDePedidos'),
      faturamentoTotal: t('faturamentoTotal'),
      clientesAtivos: t('clientesAtivos'),
      ticketMedio: t('ticketMedio'),
      pedidos7Dias: t('pedidos7Dias'),
      receita7Dias: t('receita7Dias'),
      nenhumItemEncontrado: t('nenhumItemEncontrado'),
      economiaComTaxas: t('economiaComTaxas'),
      economiaComTaxasDescricao: t('economiaComTaxasDescricao'),
      formasDePedido: t('formasDePedido'),
      topProdutos: t('topProdutos'),
      pedidosEmAndamento: t('pedidosEmAndamento'),
      atualizarDados: t('atualizarDados'),
      dashboard: t('dashboard'),
      dashboardSubtitle: t('dashboardSubtitle')
    }
  };
};
