import React, { useMemo } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useNotificationContext } from '../context/notificationContextUtils';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { useDashboardActions } from '../hooks/useDashboardActions';
import { useDashboardTranslation } from '../hooks/useTranslation';

// Componentes refatorados
import { 
  DashboardLayout,
  DashboardError
} from '../components/dashboard';

import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { usePeriod } from '../context/periodContext';
import { PageHeader } from '../components/ui';
import { 
  EstatisticasContainerSkeleton, 
  CardsGridSkeleton 
} from '../components/skeletons/DashboardSkeleton';

// Estilos
import '../styles/dashboard.css';

export default function Dashboard() {
  const { selectedPeriod } = usePeriod();
  const { data, loading, error, refreshData } = useDashboard(selectedPeriod);
  const { notifications, removeNotification } = useNotificationContext();
  const { handleRefresh, handleRetry } = useDashboardActions(refreshData);
  const showSkeleton = useSkeletonDelay({ delay: 600 });
  const { dashboard } = useDashboardTranslation();

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

        {/* Cabeçalho da página */}
        <PageHeader
          title={dashboard.dashboard}
          subtitle={dashboard.dashboardSubtitle}
          actionButton={{
            label: dashboard.atualizarDados,
            onClick: handleRefresh,
            loading: loading,
            disabled: loading,
            variant: "primary",
            size: "md"
          }}
        />

        {/* Conteúdo Principal */}
        <div className="px-6 pt-6 flex-1 overflow-hidden">
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
