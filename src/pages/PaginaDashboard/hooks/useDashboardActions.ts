import { useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';

export const useDashboardActions = (refreshData: () => Promise<void>) => {
  const { showError } = useNotificationContext();

  const handleRefresh = useCallback(async () => {
    try {
      await refreshData();
    } catch (err) {
      showError('Erro ao atualizar dados do dashboard');
    }
  }, [refreshData, showError]);

  const handleRetry = useCallback(() => {
    refreshData();
  }, [refreshData]);

  return {
    handleRefresh,
    handleRetry
  };
};

