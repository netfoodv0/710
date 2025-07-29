import { useContext } from 'react';
import { AnalyticsContext } from './analyticsContext';
import { Analytics } from 'firebase/analytics';

interface AnalyticsContextType {
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext deve ser usado dentro de um AnalyticsProvider');
  }
  return context;
} 