import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';

import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { useRelatorios } from '../../features/relatorios/hooks/useRelatorios';
import { HeaderRelatoriosCompartilhado } from '../../components/relatorios';
import {
  RelatoriosErrorState,
  RelatoriosContent
} from '../../components/relatorios';
import { EstatisticasUnificadas, useEstatisticasPadrao } from '../../components/shared';

export default function RelatoriosGeral() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [selectedReportType, setSelectedReportType] = useState<string>('geral');
  
  // Usar estatísticas padronizadas
  const { estatisticasGerais } = useEstatisticasPadrao();
  
  // Memoizar opções estáticas para evitar recriação a cada render
  const periodOptions = useMemo(() => [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ], []);

  const reportTypeOptions = useMemo(() => [
    { id: 'geral', label: 'Geral' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'produtos', label: 'Produtos' }
  ], []);

  // Usar o hook de relatórios para buscar dados reais
  const {
    dados: dadosRelatorios,
    loading: loadingRelatorios,
    error: errorRelatorios,
    carregarDados: recarregarRelatorios
  } = useRelatorios(selectedPeriod);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

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
      case 'clientes':
        navigate('/relatorios/clientes');
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

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar dados</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}

        {/* Cabeçalho da página */}
        <HeaderRelatoriosCompartilhado
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
          loading={loading}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-6 pt-2 pb-12 p-8-24-50-24">
          {/* Conteúdo principal */}
          <RelatoriosContent dadosFiltrados={dadosRelatorios} selectedPeriod={selectedPeriod} />
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
