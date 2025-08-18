import React from 'react';

// Skeleton para filtros
interface SkeletonFiltersProps {
  className?: string;
}

export function SkeletonFilters({ className = '' }: SkeletonFiltersProps) {
  return (
    <div className={`bg-white rounded-lg p-6 mb-6 ${className}`} style={{ border: '1px solid rgb(207, 209, 211)' }}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Campo de busca - flex-1 lg:w-80 */}
        <div className="flex-1 lg:w-80">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        {/* Filtro de data - lg:w-80 */}
        <div className="lg:w-80">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        {/* Filtro de status - lg:w-40 */}
        <div className="lg:w-40">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para tabela
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function SkeletonTable({ 
  rows = 8, 
  columns = 7, 
  showHeader = true, 
  showFooter = true,
  className = '' 
}: SkeletonTableProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`} style={{ border: '1px solid rgb(207, 209, 211)' }}>
      <div className="overflow-x-auto">
        {/* Cabeçalho da tabela */}
        {showHeader && (
          <div className="bg-gray-50 border-b px-4 py-2" style={{ borderColor: 'rgb(207, 209, 211)' }}>
            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {Array.from({ length: columns }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Linhas da tabela */}
        <div className="divide-y" style={{ borderColor: 'rgb(207, 209, 211)' }}>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="px-4 py-3">
              <div className={`grid gap-4 items-center`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer da tabela com paginação */}
      {showFooter && (
        <div className="bg-gray-50 px-4 py-4 border-t" style={{ borderColor: 'rgb(207, 209, 211)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton para tabela específica de clientes
export function SkeletonClientTable({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`} style={{ border: '1px solid rgb(207, 209, 211)' }}>
      <div className="overflow-x-auto">
        {/* Cabeçalho da tabela */}
        <div className="bg-gray-50 border-b px-4 py-2" style={{ borderColor: 'rgb(207, 209, 211)' }}>
          <div className="grid grid-cols-7 gap-4">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        
        {/* Linhas da tabela */}
        <div className="divide-y" style={{ borderColor: 'rgb(207, 209, 211)' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="px-4 py-3">
              <div className="grid grid-cols-7 gap-4 items-center">
                {/* Cliente */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Endereço */}
                <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
                
                {/* Total Pedidos */}
                <div className="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                
                {/* Valor Total */}
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                
                {/* Categoria */}
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                
                {/* Último Pedido */}
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                
                {/* Ações */}
                <div className="h-6 bg-gray-200 rounded w-6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer da tabela com paginação */}
      <div className="bg-gray-50 px-4 py-4 border-t" style={{ borderColor: 'rgb(207, 209, 211)' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para cards de estatísticas
interface SkeletonStatsCardsProps {
  count?: number;
  className?: string;
}

export function SkeletonStatsCards({ count = 4, className = '' }: SkeletonStatsCardsProps) {
  return (
    <div className={`bg-white rounded-lg ${className}`} style={{ border: '1px solid #cfd1d3', padding: '16px' }}>
      <div className="grid gap-6 grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-1 bg-white rounded-lg p-4 relative animate-pulse" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
            <div className="text-left h-full flex flex-col justify-between">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="p-2 bg-gray-200 rounded-full w-10 h-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton para gráficos de barras
interface SkeletonBarChartsProps {
  count?: number;
  height?: string;
  className?: string;
}

export function SkeletonBarCharts({ count = 4, height = '200px', className = '' }: SkeletonBarChartsProps) {
  return (
    <div className={`bg-white rounded-lg p-4 ${className}`} style={{ border: '1px solid #cfd1d3' }}>
      <div className="h-5 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
      
      {/* Cards internos com dimensões específicas */}
      <div className="mt-6 flex justify-between gap-6 flex-wrap w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i}
            className="bg-white rounded-lg relative flex-1 overflow-hidden animate-pulse"
            style={{ minWidth: '160px', height, border: '1px solid #cfd1d3' }}
          >
            {/* Área do gráfico de barras */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-b-lg" style={{ height: '60%' }}></div>
            
            {/* Labels */}
            <div className="absolute top-2 left-4">
              <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
            </div>
            
            {/* Percentual */}
            <div className="absolute bottom-2 left-2">
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton específico para Distribuição por Categoria
export function SkeletonDistribuicaoCategoria({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg p-4 mb-6 ${className}`} style={{ border: '1px solid rgb(207, 209, 211)' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 rounded animate-pulse" style={{ height: '12px', width: '200px' }}></div>
      </div>
      
      {/* Cards internos com dimensões específicas */}
      <div className="mt-6 flex justify-between gap-6 flex-wrap w-full">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-lg relative flex-1 overflow-hidden animate-pulse"
            style={{ minWidth: '160px', height: '200px', border: '1px solid rgb(207, 209, 211)' }}
          >
            {/* Área do gráfico de barras */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-b-lg" style={{ height: '60%' }}></div>
            
            {/* Labels */}
            <div className="absolute top-2 left-4">
              <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
            </div>
            
            {/* Percentual */}
            <div className="absolute bottom-2 left-2">
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton específico para Funil de Fidelidade
export function SkeletonFunilFidelidade({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg p-4 mb-6 ${className}`} style={{ border: '1px solid rgb(207, 209, 211)' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 rounded animate-pulse" style={{ height: '12px', width: '160px' }}></div>
      </div>
      
      {/* Cards internos com dimensões específicas */}
      <div className="mt-6 flex justify-between gap-6 flex-wrap w-full">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-lg relative flex-1 overflow-hidden animate-pulse"
            style={{ minWidth: '160px', height: '200px', border: '1px solid rgb(207, 209, 211)' }}
          >
            {/* Área do gráfico de barras */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 rounded-b-lg" style={{ height: '60%' }}></div>
            
            {/* Labels */}
            <div className="absolute top-2 left-4">
              <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
            </div>
            
            {/* Percentual */}
            <div className="absolute bottom-2 left-2">
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
