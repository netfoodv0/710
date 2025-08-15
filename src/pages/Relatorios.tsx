import React, { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../context/notificationContextUtils';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';

import { PeriodType } from '../components/filters/FiltroPeriodo';
import { useRelatorios } from '../features/relatorios/hooks/useRelatorios';
import { useFiltrosRelatorios } from '../features/relatorios/hooks/useFiltrosRelatorios';
import { RelatorioHeader } from '../features/relatorios/components/RelatorioHeader';
import {
  RelatoriosErrorState,
  RelatoriosContent
} from '../components/relatorios';

export function Relatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  
  const {
    dados,
    loading,
    error,
    carregarDados,
    exportarRelatorio,
    limparErro
  } = useRelatorios(selectedPeriod);




  const {
    filtros,
    dadosFiltrados,
    handleFiltrosChange,
    limparFiltros
  } = useFiltrosRelatorios(dados);

  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  useEffect(() => {
    carregarDados();
  }, [selectedPeriod, carregarDados]);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportarRelatorio(filtros, selectedPeriod);
      showSuccess('Relatório exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório');
    }
  }, [exportarRelatorio, filtros, selectedPeriod, showSuccess, showError]);

  const handleRetry = useCallback(() => {
    limparErro();
    carregarDados();
  }, [limparErro, carregarDados]);

  // Error state
  if (error) {
    return <RelatoriosErrorState error={error} onRetry={handleRetry} />;
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

        {/* Cabeçalho fixo reutilizável */}
        <RelatorioHeader
          title="Relatórios"
          subtitle="Análise completa do desempenho do restaurante"
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExportExcel={handleExport}
          onExportPDF={handleExport}
          loading={loading}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[66px]" />

        {/* Content */}
        <div className="p-4" style={{ padding: '16px' }}>
          <RelatoriosContent
            dadosFiltrados={dadosFiltrados}
            selectedPeriod={selectedPeriod}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}