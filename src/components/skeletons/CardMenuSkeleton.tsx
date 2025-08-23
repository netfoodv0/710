import React from 'react';

interface CardMenuSkeletonProps {
  /** Número de categorias para mostrar no skeleton (padrão: 3) */
  numCategorias?: number;
}

export const CardMenuSkeleton: React.FC<CardMenuSkeletonProps> = ({ 
  numCategorias = 3
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 card-menu-skeleton-container" style={{ borderColor: 'rgb(207, 209, 211)' }}>
      {/* Header das Categorias - APENAS O HEADER */}
      <div className="bg-white border rounded-lg p-4 mb-4 card-menu-skeleton-header" style={{ borderColor: 'rgb(207, 209, 211)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded-lg animate-pulse w-36"></div>
        </div>
      </div>
    </div>
  );
};
