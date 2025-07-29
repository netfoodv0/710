import { createContext } from 'react';
import React, { ReactNode } from 'react';
import { Analytics } from 'firebase/analytics';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsContextType {
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const analyticsData = useAnalytics();

  return (
    <AnalyticsContext.Provider value={analyticsData}>
      {children}
    </AnalyticsContext.Provider>
  );
} 