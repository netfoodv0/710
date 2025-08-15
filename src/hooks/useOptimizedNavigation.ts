import { useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook para navegação otimizada que:
 * - Evita navegação para a mesma rota
 * - Preserva estado entre navegações
 * - Implementa cache inteligente
 */
export function useOptimizedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastRouteRef = useRef<string>('');
  const navigationHistoryRef = useRef<string[]>([]);

  const navigateTo = useCallback((path: string, options?: { replace?: boolean; state?: any }) => {
    // Evitar navegação para a mesma rota
    if (path === location.pathname) {
      console.log('🚫 Navegação para mesma rota ignorada:', path);
      return;
    }

    // Registrar na história de navegação
    if (!options?.replace) {
      navigationHistoryRef.current.push(location.pathname);
      // Manter apenas as últimas 10 rotas
      if (navigationHistoryRef.current.length > 10) {
        navigationHistoryRef.current.shift();
      }
    }

    lastRouteRef.current = location.pathname;
    
    console.log('🧭 Navegando para:', path, 'de:', location.pathname);
    navigate(path, options);
  }, [navigate, location.pathname]);

  const goBack = useCallback(() => {
    const previousRoute = navigationHistoryRef.current.pop();
    if (previousRoute) {
      navigate(previousRoute);
    } else {
      navigate(-1);
    }
  }, [navigate]);

  const canGoBack = useCallback(() => {
    return navigationHistoryRef.current.length > 0;
  }, []);

  const getNavigationHistory = useCallback(() => {
    return [...navigationHistoryRef.current];
  }, []);

  return {
    navigateTo,
    goBack,
    canGoBack,
    getNavigationHistory,
    currentPath: location.pathname,
    lastPath: lastRouteRef.current
  };
}

/**
 * Hook para detectar mudanças de rota e executar ações
 */
export function useRouteChangeEffect(callback: (from: string, to: string) => void) {
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  if (prevLocationRef.current !== location.pathname) {
    const from = prevLocationRef.current;
    const to = location.pathname;
    
    // Executar callback na próxima renderização
    setTimeout(() => callback(from, to), 0);
    
    prevLocationRef.current = location.pathname;
  }
}
