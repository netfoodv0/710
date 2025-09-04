import { useState, useCallback, useMemo } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { DataTableColumn } from '../../../components/ui';
import { UseRelatoriosProdutosReturn, Produto } from '../types';
import { 
  HeaderRelatorioProdutos,
  useConfiguracaoTabelaProdutos 
} from '../../../components/relatorios';
import { 
  produtosFicticios, 
  estatisticasProdutos, 
  categorias
} from '../../../data/produtosMock';

export function useRelatoriosProdutos(): UseRelatoriosProdutosReturn {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Configuração da tabela
  const { columns } = useConfiguracaoTabelaProdutos();
  
  const {
    showSuccess,
    showError
  } = useNotificationContext();

  // Categorias únicas para filtros
  const categoriasFiltros = useMemo(() => {
    return categorias.map(cat => ({ value: cat, label: cat }));
  }, []);

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(produtosFicticios.map(p => p.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  // Destaque únicos para filtros
  const destaqueOptions = useMemo(() => {
    const destaque = [...new Set(produtosFicticios.map(p => p.destaque))];
    return destaque.map(d => ({ value: d.toString(), label: d ? 'Destaque' : 'Normal' }));
  }, []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      // Implementar exportação específica para produtos
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      showSuccess('Relatório de produtos exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório de produtos');
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const handleRetry = useCallback(() => {
    setError(null);
    // Implementar lógica de retry
  }, []);

  return {
    selectedPeriod,
    loading,
    error,
    produtos: produtosFicticios,
    columns,
    categoriasFiltros,
    statusOptions,
    destaqueOptions,
    estatisticasProdutos,
    handlePeriodChange,
    handleExport,
    handleRetry
  };
}
