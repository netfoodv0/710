import React from 'react';
import { NotificationToast } from '../../../components/NotificationToast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { HeaderRelatoriosCompartilhado } from '../../../components/relatorios';
import { RelatoriosContent } from '../../../components/relatorios';
import { RelatoriosGeralLayoutProps } from '../types';

export function RelatoriosGeralLayout({
  selectedPeriod,
  onPeriodChange,
  onExport,
  loading,
  error,
  dadosRelatorios
}: RelatoriosGeralLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Cabeçalho da página */}
        <HeaderRelatoriosCompartilhado
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
          onExport={onExport}
          loading={loading}
        />

        {/* Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12" style={{ paddingTop: '16px' }}>
          {/* Conteúdo principal */}
          <RelatoriosContent dadosFiltrados={dadosRelatorios} selectedPeriod={selectedPeriod} />
          
          {/* Margem inferior da página */}
          <div className="h-6 sm:h-8 lg:h-10"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}


