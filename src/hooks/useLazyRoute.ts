import { useState, useEffect, useCallback } from 'react';

interface UseLazyRouteOptions {
  preload?: boolean;
  preloadDelay?: number;
}

export function useLazyRoute(options: UseLazyRouteOptions = {}) {
  const { preload = false, preloadDelay = 2000 } = options;
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Preload da rota após um delay
  useEffect(() => {
    if (preload && !isPreloaded) {
      const timer = setTimeout(() => {
        setIsPreloaded(true);
      }, preloadDelay);

      return () => clearTimeout(timer);
    }
  }, [preload, preloadDelay, isPreloaded]);

  // Função para preload manual
  const preloadRoute = useCallback(() => {
    setIsPreloaded(true);
  }, []);

  // Função para verificar se deve preload
  const shouldPreload = useCallback((isHovered: boolean, isNearViewport: boolean) => {
    return preload && (isHovered || isNearViewport);
  }, [preload]);

  return {
    isPreloaded,
    preloadRoute,
    shouldPreload,
  };
}

// Hook específico para preload de rotas baseado em hover
export function useRoutePreload() {
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());

  const preloadRoute = useCallback((routePath: string) => {
    if (!preloadedRoutes.has(routePath)) {
      setPreloadedRoutes(prev => new Set(prev).add(routePath));
    }
  }, [preloadedRoutes]);

  const isRoutePreloaded = useCallback((routePath: string) => {
    return preloadedRoutes.has(routePath);
  }, [preloadedRoutes]);

  return {
    preloadRoute,
    isRoutePreloaded,
    preloadedRoutes: Array.from(preloadedRoutes),
  };
}
