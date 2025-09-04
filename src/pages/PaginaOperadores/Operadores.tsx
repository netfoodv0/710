import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useOperadores } from './hooks/useOperadores';

// Componentes
import { OperadoresLayout } from './components/OperadoresLayout';

export default function Operadores() {
  const { data } = useOperadores();
  const { showNotification } = useNotificationContext();

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <OperadoresLayout data={data} />
      </div>
    </ErrorBoundary>
  );
}
