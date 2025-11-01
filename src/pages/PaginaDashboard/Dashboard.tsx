import React, { useMemo, useEffect } from 'react';
import { useDashboard, useDashboardActions, useSkeletonDelay } from './hooks';
import { useNotificationContext } from '../../context/notificationContextUtils';

// Componentes refatorados
import { 
  DashboardLayout,
  DashboardError
} from './components';

import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { usePeriod } from '../../context/periodContext';
import { 
  EstatisticasContainerSkeleton, 
  CardsGridSkeleton 
} from '../../components/skeletons/DashboardSkeleton';
import { usePageHeader } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { selectedPeriod } = usePeriod();
  const { data, loading, error, refreshData } = useDashboard(selectedPeriod);
  const { notifications, removeNotification } = useNotificationContext();
  const { handleRetry } = useDashboardActions(refreshData);
  const showSkeleton = useSkeletonDelay({ delay: 600 });
  const { setHeader, clearHeader } = usePageHeader();
  const { loja } = useAuth();

  // Configurar o cabeçalho quando o componente montar
  useEffect(() => {
    setHeader({
      title: 'Dashboard',
      subtitle: loja?.nome
    });
    
    // Cleanup quando desmontar
    return () => {
      clearHeader();
    };
  }, [setHeader, clearHeader, loja]);

  // Memoizar dados para evitar re-renders desnecessários
  const memoizedData = useMemo(() => data, [data]);

  // Error state
  if (error) {
    return <DashboardError error={error} onRetry={handleRetry} />;
  }

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
        <div className="px-6 pt-6 flex-1 overflow-hidden mt-[50px]">
          {loading || showSkeleton ? (
            <div className="space-y-6">
              <EstatisticasContainerSkeleton />
              <CardsGridSkeleton />
            </div>
          ) : (
            <DashboardLayout 
              data={memoizedData} 
              selectedPeriod={selectedPeriod}
              loading={loading}
            />
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}




