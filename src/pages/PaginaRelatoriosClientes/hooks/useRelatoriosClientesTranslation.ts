import { useMemo } from 'react';
import { RelatoriosClientesTranslations } from '../types';

export function useRelatoriosClientesTranslation(): RelatoriosClientesTranslations {
  const translations = useMemo(() => ({
    title: 'Relatórios de Clientes',
    subtitle: 'Análise detalhada dos clientes',
    
    header: {
      title: 'Relatórios de Clientes',
      subtitle: 'Análise detalhada dos clientes',
      exportButton: 'Exportar',
      periodLabel: 'Período'
    },
    
    content: {
      loading: 'Carregando dados dos clientes...',
      noData: 'Nenhum cliente encontrado'
    },
    
    error: {
      title: 'Erro ao carregar dados',
      message: 'Ocorreu um erro ao carregar os dados dos clientes',
      retry: 'Tentar novamente'
    },
    
    periods: {
      weekly: 'Semanal',
      monthly: 'Mensal',
      quarterly: 'Trimestral',
      yearly: 'Anual'
    },
    
    reportTypes: {
      geral: 'Geral',
      clientes: 'Clientes',
      produtos: 'Produtos'
    },
    
    statistics: {
      totalClientes: 'Total de Clientes',
      novosClientes: 'Novos Clientes',
      clientesAtivos: 'Clientes Ativos',
      taxaRetencao: 'Taxa de Retenção'
    }
  }), []);

  return translations;
}
