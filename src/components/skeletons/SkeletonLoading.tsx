import React from 'react';

interface SkeletonLoadingProps {
  type?: 'table' | 'cards' | 'stats' | 'historico' | 'pedidos';
  rows?: number;
}

export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ type = 'historico', rows = 5 }) => {
  // Componente base para skeleton items
  const SkeletonItem = ({ className = "h-4 bg-gray-200 rounded w-20" }: { className?: string }) => (
    <div className={className}></div>
  );

  // Componente para cards de sessão
  const SessionCard = () => (
    <div className="bg-white border border-gray-300 h-[62px] rounded-t-lg mb-3">
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 absolute top-2 right-2"></div>
        <SkeletonItem className="h-4 bg-gray-200 rounded w-20 mb-1" />
        <SkeletonItem className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  );

  // Fallback específico para pedidos
  if (type === 'pedidos') {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header skeleton */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/30 h-[73px] px-6">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <SkeletonItem className="h-6 bg-gray-200 rounded w-20" />
              <SkeletonItem className="h-10 bg-gray-200 rounded w-80" />
            </div>
            <SkeletonItem className="h-10 bg-gray-200 rounded w-40" />
          </div>
        </div>
        
        {/* Content skeleton - Cards de sessão */}
        <div className="px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SessionCard />
            <SessionCard />
            <SessionCard />
          </div>
        </div>
      </div>
    );
  }

  // Fallback específico para histórico que não causa piscada
  if (type === 'historico') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header skeleton */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <SkeletonItem className="h-8 bg-gray-200 rounded w-64 mb-2" />
              <SkeletonItem className="h-4 bg-gray-200 rounded w-96" />
            </div>
            <SkeletonItem className="h-10 bg-gray-200 rounded w-40" />
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="px-6 pt-6">
          {/* Filtros skeleton */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 lg:w-80">
                <SkeletonItem className="h-10 bg-gray-200 rounded-lg" />
              </div>
              <div className="lg:w-80">
                <SkeletonItem className="h-10 bg-gray-200 rounded-lg" />
              </div>
              <div className="lg:w-40">
                <SkeletonItem className="h-10 bg-gray-200 rounded-lg" />
              </div>
              <div className="lg:w-40">
                <SkeletonItem className="h-10 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
          
          {/* Tabela skeleton */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              {/* Header da tabela */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="grid grid-cols-7 gap-4">
                  {['Pedido', 'Cliente', 'Pagamento', 'Status', 'Data/Hora', 'Total', 'Ações'].map((header) => (
                    <SkeletonItem key={header} className="h-4 bg-gray-200 rounded w-20" />
                  ))}
                </div>
              </div>
              
              {/* Linhas da tabela */}
              <div className="divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <div key={rowIndex} className="px-4 py-3">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {Array.from({ length: 7 }).map((_, colIndex) => (
                        <SkeletonItem key={colIndex} className="h-4 bg-gray-200 rounded w-20" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer com paginação */}
            <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <SkeletonItem className="h-4 bg-gray-200 rounded w-48" />
                  <SkeletonItem className="h-10 bg-gray-200 rounded w-32" />
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonItem key={i} className="h-8 bg-gray-200 rounded w-8" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 h-[73px]">
              <tr>
                {['Produto', 'Categoria', 'Preço', 'Status', 'Vendas', 'Criado em', 'Ações'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonItem className="h-4 bg-gray-200 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mr-3"></div>
                      <div>
                        <SkeletonItem className="h-4 bg-gray-200 rounded w-32 mb-2" />
                        <SkeletonItem className="h-3 bg-gray-200 rounded w-48" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SkeletonItem className="h-4 bg-gray-200 rounded w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SkeletonItem className="h-4 bg-gray-200 rounded w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SkeletonItem className="h-6 bg-gray-200 rounded w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SkeletonItem className="h-4 bg-gray-200 rounded w-12" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SkeletonItem className="h-4 bg-gray-200 rounded w-24" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <SkeletonItem className="h-4 bg-gray-200 rounded w-8 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <SkeletonItem className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <SkeletonItem className="h-4 bg-gray-200 rounded w-full" />
              <SkeletonItem className="h-4 bg-gray-200 rounded w-3/4" />
              <SkeletonItem className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <SkeletonItem className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <SkeletonItem className="h-8 bg-gray-200 rounded w-16" />
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-2">
              <SkeletonItem className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}; 
