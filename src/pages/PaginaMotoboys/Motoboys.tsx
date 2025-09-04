import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useMotoboys } from './hooks/useMotoboys';

// Componentes
import { MotoboysLayout } from './components/MotoboysLayout';

export default function Motoboys() {
  const { data } = useMotoboys();
  const { showNotification } = useNotificationContext();

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <MotoboysLayout data={data} />
      </div>
    </ErrorBoundary>
  );
}
