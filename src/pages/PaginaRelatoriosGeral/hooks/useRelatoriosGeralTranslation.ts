import { useMemo } from 'react';
import { RelatoriosGeralTranslations } from '../types';

export function useRelatoriosGeralTranslation(): RelatoriosGeralTranslations {
  const translations = useMemo(() => ({
    title: 'Relatórios',
    subtitle: 'Análise geral dos dados',
    
    header: {
      title: 'Relatórios',
      subtitle: 'Análise geral dos dados',
      exportButton: 'Exportar',
      periodLabel: 'Período'
    },
    
    content: {
      loading: 'Carregando relatórios...',
      noData: 'Nenhum dado encontrado'
    },
    
    error: {
      title: 'Erro ao carregar dados',
      message: 'Ocorreu um erro ao carregar os relatórios',
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
    }
  }), []);

  return translations;
}
