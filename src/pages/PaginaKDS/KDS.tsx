import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageHeader } from '../../components/ui';
import { useResponsiveColumns } from '../../hooks/useResponsiveColumns';
import { usePedidosKDS, useKDSActions, useKDSTranslation } from './hooks';
import { KDSLayout } from './components';

export default function KDS() {
  // Hook para calcular colunas responsivas
  const maxColumns = useResponsiveColumns();
  
  // Hook para gerenciar pedidos
  const { pedidos, moverPedido } = usePedidosKDS(maxColumns);

  // Hook para ações do KDS
  const { handleDragEnd } = useKDSActions({ maxColumns, moverPedido });

  // Hook para traduções
  const { kds } = useKDSTranslation();

  // Contexto de notificações
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <ErrorBoundary>
      <main className="h-screen flex flex-col overflow-hidden dashboard-container" role="main">
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={removeNotification}
          />
        ))}

        {/* Cabeçalho da página */}
        <PageHeader
          title={kds.title}
          subtitle={kds.subtitle}
        />

        {/* Conteúdo Principal */}
        <KDSLayout 
          maxColumns={maxColumns}
          pedidos={pedidos}
          onDragEnd={handleDragEnd}
        />
      </main>
    </ErrorBoundary>
  );
}
