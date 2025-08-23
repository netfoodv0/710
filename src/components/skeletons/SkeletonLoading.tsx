import React from 'react';

interface SkeletonLoadingProps {
  type?: 'table' | 'cards' | 'stats' | 'historico' | 'pedidos';
  rows?: number;
}

export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ type = 'historico', rows = 5 }) => {
  // Fallback específico para pedidos
  if (type === 'pedidos') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Header skeleton */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/30 h-[73.03px] px-6">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-80"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-40"></div>
          </div>
        </div>
        
        {/* Content skeleton - Cards de sessão */}
        <div className="px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Em Análise */}
            <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse" style={{ borderColor: 'rgb(207, 209, 211)' }}>
              <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
                <div className="bg-gray-200 rounded-full w-6 h-6 absolute top-2 right-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Card Em Preparo */}
            <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse" style={{ borderColor: 'rgb(207, 209, 211)' }}>
              <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
                <div className="bg-gray-200 rounded-full w-6 h-6 absolute top-2 right-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Card Em Entrega */}
            <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse" style={{ borderColor: 'rgb(207, 209, 211)' }}>
              <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
                <div className="bg-gray-200 rounded-full w-6 h-6 absolute top-2 right-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
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
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-40"></div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="px-6 pt-6">
          {/* Filtros skeleton */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 lg:w-80">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="lg:w-80">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="lg:w-40">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="lg:w-40">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
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
                    <div key={header} className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Linhas da tabela */}
              <div className="divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <div key={rowIndex} className="px-4 py-3">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {Array.from({ length: 7 }).map((_, colIndex) => (
                        <div key={colIndex} className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
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
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50" style={{ height: '73px' }}>
              <tr>
                {['Produto', 'Categoria', 'Preço', 'Status', 'Vendas', 'Criado em', 'Ações'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ height: '73px' }}>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mr-3"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-48"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-8 ml-auto"></div>
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
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
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
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="mt-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}; 