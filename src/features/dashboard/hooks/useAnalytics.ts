import { useEffect, useState } from 'react';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import app from '../lib/firebase';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeAnalytics = async () => {
      try {
        // Verificar se estamos no browser
        if (typeof window === 'undefined') {
          return;
        }

        // Verificar se o Analytics é suportado
        const supported = await isSupported();
        
        if (!supported) {
          setError('Analytics não suportado');
          return;
        }

        // Inicializar Analytics
        const analyticsInstance = getAnalytics(app);
        
        if (mounted) {
          setAnalytics(analyticsInstance);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAnalytics();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    analytics,
    isLoading,
    error,
    isSupported: analytics !== null
  };
} 