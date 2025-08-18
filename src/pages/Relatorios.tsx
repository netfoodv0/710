import React, { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../context/notificationContextUtils';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';

import { PeriodType } from '../components/filters/FiltroPeriodo';
import { useRelatorios } from '../features/relatorios/hooks/useRelatorios';
import { useFiltrosRelatorios } from '../features/relatorios/hooks/useFiltrosRelatorios';
import { PageHeader, CustomDropdown, DropdownOption } from '../components/ui';
import { ReportNavigation } from '../components/ui/ReportNavigation';
import { ReportSkeleton } from '../components/ui/ReportSkeleton';
import {
  RelatoriosErrorState,
  RelatoriosContent
} from '../components/relatorios';

export function Relatorios() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  
  // Opções do dropdown de período
  const periodOptions: DropdownOption[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

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
    // Simular carregamento apenas para filtros
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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

  // Simular carregamento inicial apenas uma vez
  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
        <PageHeader
          title="Relatórios Gerais"
          subtitle="Análise completa do desempenho do restaurante"
          leftContent={
            <ReportNavigation currentPage="relatorios" />
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <div className="px-6 pt-2 pb-12" style={{ padding: '8px 24px 50px 24px' }}>
          {/* Loading state apenas para operações específicas */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Processando...</span>
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

                    {/* Conteúdo principal com skeleton loading contextual */}
          {!dataLoaded ? (
            <ReportSkeleton type="full" />
          ) : (
            <RelatoriosContent dadosFiltrados={null} selectedPeriod={selectedPeriod} />
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}