import React, { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';

import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { useRelatorios } from '../../features/relatorios/hooks/useRelatorios';
import { PageHeader, CustomDropdown, DropdownOption } from '../../components/ui';
import Toggle from '../../components/ui/Toggle';
// ReportNavigation removido

import {
  RelatoriosErrorState,
  RelatoriosContent
} from '../../components/relatorios';

export default function Relatorios() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [selectedReportType, setSelectedReportType] = useState<string>('geral');
  
  // Opções do dropdown de período
  const periodOptions: DropdownOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  // Opções para o componente Radio (tipos de relatório)
  const reportTypeOptions = [
    { id: 'geral', label: 'Geral' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'produtos', label: 'Produtos' }
  ];

  // Usar o hook de relatórios para buscar dados reais
  const {
    dados: dadosRelatorios,
    loading: loadingRelatorios,
    error: errorRelatorios,
    carregarDados: recarregarRelatorios
  } = useRelatorios(selectedPeriod);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

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
      setDataLoaded(true);
      setError(null);
    }
  }, [dadosRelatorios]);

  // Tratar erros dos relatórios
  useEffect(() => {
    if (errorRelatorios) {
      setError(errorRelatorios);
    }
  }, [errorRelatorios]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
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
        <PageHeader
          title=""
          subtitle=""
          leftContent={
            <div className="flex items-center gap-2">
              {/* Componente Toggle para tipos de relatório */}
              <div className="flex items-center gap-2">
                <Toggle
                  options={reportTypeOptions}
                  name="reportType"
                  defaultValue={selectedReportType}
                  onChange={handleReportTypeChange}
                  size="small"
                  color="#8b5cf6"
                  backgroundColor="#f3f4f6"
                />
              </div>
            </div>
          }
          rightContent={
            <div className="flex items-center gap-4">
              {/* Filtro de período */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Período:</label>
                <CustomDropdown
                  options={periodOptions}
                  selectedValue={selectedPeriod}
                  onValueChange={handlePeriodChange}
                  size="sm"
                  className="min-w-[140px]"
                />
              </div>
              
              {/* Botões de exportação */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
              </div>
            </div>
          }
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-6 pt-2 pb-12 p-8-24-50-24">
          {/* Loading state apenas para operações específicas */}
          {loading && (
            <div className="space-y-6 mt-4">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando relatórios...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
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
          )}

          {/* Conteúdo principal com loading */}
          {!dataLoaded || loadingRelatorios ? (
            <div className="space-y-6 mt-4">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando dados dos relatórios...</p>
              </div>
            </div>
          ) : (
            <RelatoriosContent dadosFiltrados={dadosRelatorios} selectedPeriod={selectedPeriod} />
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
