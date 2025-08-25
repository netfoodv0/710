import { useState, useEffect, useCallback } from 'react';

interface UseLazyChartOptions {
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export function useLazyChart(options: UseLazyChartOptions = {}) {
  const { threshold = 0.1, rootMargin = '50px', fallback } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    const element = document.querySelector('[data-lazy-chart]');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Simular um pequeno delay para melhor UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  const ChartContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div 
      data-lazy-chart 
      className={className}
    >
      {isVisible && isLoaded ? children : fallback || (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-gray-500 text-sm">Carregando gráfico...</p>
          </div>
        </div>
      )}
    </div>
  );

  return {
    isVisible,
    isLoaded,
    ChartContainer,
  };
}
