import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { useRelatorios } from '../../../features/relatorios/hooks/useRelatorios';
import { useEstatisticasPadrao } from '../../../components/shared';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { UseRelatoriosGeralReturn } from '../types';

export function useRelatoriosGeral(): UseRelatoriosGeralReturn {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');
  const [selectedReportType, setSelectedReportType] = useState<string>('geral');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Usar estatísticas padronizadas
  const { estatisticasGerais } = useEstatisticasPadrao();
  
  // Usar o hook de relatórios para buscar dados reais
  const {
    dados: dadosRelatorios,
    loading: loadingRelatorios,
    error: errorRelatorios,
    carregarDados: recarregarRelatorios
  } = useRelatorios(selectedPeriod);

  const {
    showSuccess,
    showError
  } = useNotificationContext();

  // Memoizar opções estáticas para evitar recriação a cada render
  const periodOptions = useMemo(() => [
    { value: 'monthly' as PeriodType, label: 'Mensal' },
    { value: 'quarterly' as PeriodType, label: 'Trimestral' },
    { value: 'yearly' as PeriodType, label: 'Anual' }
  ], []);

  const reportTypeOptions = useMemo(() => [
    { id: 'geral', label: 'Geral' },
    { id: 'produtos', label: 'Produtos' }
  ], []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
    // Recarregar dados quando o período mudar
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleReportTypeChange = useCallback((reportType: string) => {
    setSelectedReportType(reportType);
    
    // Navegar para a página correspondente
    switch (reportType) {
      case 'geral':
        navigate('/relatorios/geral');
        break;
      case 'produtos':
        navigate('/relatorios/produtos');
        break;
      default:
        navigate('/relatorios/geral');
    }
  }, [navigate]);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      // Simular exportação
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Relatório exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório');
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const handleRetry = useCallback(() => {
    setError(null);
    recarregarRelatorios();
  }, [recarregarRelatorios]);

  // Carregar dados quando o período mudar
  useEffect(() => {
    if (dadosRelatorios) {
      setError(null);
    }
  }, [dadosRelatorios, loadingRelatorios]);

  // Tratar erros dos relatórios
  useEffect(() => {
    if (errorRelatorios) {
      setError(errorRelatorios);
    }
  }, [errorRelatorios]);

  return {
    selectedPeriod,
    selectedReportType,
    loading,
    error,
    dadosRelatorios,
    periodOptions,
    reportTypeOptions,
    handlePeriodChange,
    handleReportTypeChange,
    handleExport,
    handleRetry
  };
}


