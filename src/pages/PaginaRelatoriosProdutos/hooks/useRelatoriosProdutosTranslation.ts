import { useMemo } from 'react';
import { RelatoriosProdutosTranslations } from '../types';

export function useRelatoriosProdutosTranslation(): RelatoriosProdutosTranslations {
  const translations = useMemo(() => ({
    title: 'Relatórios de Produtos',
    subtitle: 'Análise detalhada dos produtos',
    
    header: {
      title: 'Relatórios de Produtos',
      subtitle: 'Análise detalhada dos produtos',
      exportButton: 'Exportar',
      periodLabel: 'Período'
    },
    
    content: {
      loading: 'Carregando dados dos produtos...',
      noData: 'Nenhum produto encontrado'
    },
    
    error: {
      title: 'Erro ao carregar dados',
      message: 'Ocorreu um erro ao carregar os dados dos produtos',
      retry: 'Tentar novamente'
    },
    
    periods: {
      weekly: 'Semanal',
      monthly: 'Mensal',
      quarterly: 'Trimestral',
      yearly: 'Anual'
    },
    
    statistics: {
      totalProdutos: 'Total de Produtos',
      novosProdutos: 'Novos Produtos',
      produtosDestaque: 'Produtos em Destaque',
      taxaVendas: 'Taxa de Vendas'
    }
  }), []);

  return translations;
}
