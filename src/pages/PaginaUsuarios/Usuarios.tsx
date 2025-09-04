import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useUsuarios } from './hooks/useUsuarios';

// Componentes
import { UsuariosLayout } from './components/UsuariosLayout';

export default function Usuarios() {
  const { data } = useUsuarios();
  const { showNotification } = useNotificationContext();

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <UsuariosLayout data={data} />
      </div>
    </ErrorBoundary>
  );
}
