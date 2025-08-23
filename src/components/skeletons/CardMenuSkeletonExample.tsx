import React from 'react';
import { CardMenuSkeleton } from './CardMenuSkeleton';

/**
 * Exemplos de uso do CardMenuSkeleton
 * Este arquivo demonstra diferentes formas de usar o skeleton
 */

export const CardMenuSkeletonExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-gray-900">Exemplos de CardMenuSkeleton</h2>
      
      {/* Exemplo 1: Skeleton padrão com 3 categorias */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Padrão (3 categorias)</h3>
        <CardMenuSkeleton />
      </div>
      
      {/* Exemplo 2: Skeleton com 5 categorias */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">5 categorias</h3>
        <CardMenuSkeleton numCategorias={5} />
      </div>
      
      {/* Exemplo 3: Skeleton compacto */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Compacto (2 categorias)</h3>
        <CardMenuSkeleton numCategorias={2} />
      </div>
    </div>
  );
};

/**
 * Hook para usar o CardMenuSkeleton em componentes
 */
export const useCardMenuSkeleton = (isLoading: boolean, numCategorias: number = 3) => {
  if (isLoading) {
    return <CardMenuSkeleton numCategorias={numCategorias} />;
  }
  return null;
};
