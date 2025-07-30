import { useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface DashboardAnalyticsProps {
  period: string;
  dataLoaded: boolean;
  error: string | null;
  refreshCount: number;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  period,
  dataLoaded,
  error,
  refreshCount
}) => {
  const { analytics } = useAnalytics();

  useEffect(() => {
    if (analytics && dataLoaded) {
      // Track dashboard view
      analytics.logEvent('dashboard_view', {
        period,
        timestamp: new Date().toISOString()
      });
    }
  }, [analytics, dataLoaded, period]);

  useEffect(() => {
    if (analytics && error) {
      // Track dashboard errors
      analytics.logEvent('dashboard_error', {
        error_message: error,
        period,
        timestamp: new Date().toISOString()
      });
    }
  }, [analytics, error, period]);

  useEffect(() => {
    if (analytics && refreshCount > 0) {
      // Track manual refresh
      analytics.logEvent('dashboard_refresh', {
        period,
        refresh_count: refreshCount,
        timestamp: new Date().toISOString()
      });
    }
  }, [analytics, refreshCount, period]);

  // Componente invisível - apenas para tracking
  return null;
}; 