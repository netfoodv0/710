import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useHistoricoPedidos } from './hooks/useHistoricoPedidos';

// Componentes
import { HistoricoPedidosLayout } from './components/HistoricoPedidosLayout';

export default function HistoricoPedidos() {
  const { 
    data, 
    handleViewPedido, 
    handleRetry 
  } = useHistoricoPedidos();

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <HistoricoPedidosLayout 
          data={data}
          onViewPedido={handleViewPedido}
          onRetry={handleRetry}
        />
      </div>
    </ErrorBoundary>
  );
}


