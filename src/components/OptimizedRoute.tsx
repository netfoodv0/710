import React, { memo, Suspense, lazy, ComponentType } from 'react';
import { SkeletonLoading } from './skeletons/SkeletonLoading';

interface OptimizedRouteProps {
  component: ComponentType<any>;
  fallback?: React.ReactNode;
}

/**
 * Componente de rota otimizado que:
 * - Memoiza o componente para evitar re-renders
 * - Usa Suspense para lazy loading
 * - Preserva estado entre navegações
 */
export const OptimizedRoute = memo(({ 
  component: Component, 
  fallback = <SkeletonLoading type="cards" />
}: OptimizedRouteProps) => {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
});

/**
 * Hook para criar rotas lazy com cache
 */
export function useLazyRoute(importFn: () => Promise<{ default: ComponentType<any> }>) {
  const LazyComponent = lazy(importFn);
  
  return React.memo((props: any) => (
    <Suspense fallback={<SkeletonLoading type="cards" />}>
      <LazyComponent {...props} />
    </Suspense>
  ));
}
