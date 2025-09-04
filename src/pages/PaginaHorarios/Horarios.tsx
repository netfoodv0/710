import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useHorarios } from './hooks';
import { HorariosLayout } from './components';

export default function Horarios() {
  const { 
    data,
    handleSave,
    handleRetry,
    handleHorarioChange,
    adicionarPausa,
    removerPausa,
    atualizarPausa,
    adicionarHorarioEspecial,
    removerHorarioEspecial,
    atualizarHorarioEspecial,
    atualizarConfiguracaoAvancada
  } = useHorarios();

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

        {/* Conteúdo Principal */}
        <HorariosLayout 
          data={data}
          onSave={handleSave}
          onRetry={handleRetry}
          loading={data.loading}
        />
      </main>
    </ErrorBoundary>
  );
}
