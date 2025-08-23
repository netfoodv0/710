import React from 'react';

// Skeleton para os cards de sessão da página de pedidos com transições suaves
export const PedidosSessaoSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
    {/* Card Em Análise */}
    <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse transition-all duration-300 ease-in-out" style={{ borderColor: 'rgb(207, 209, 211)' }}>
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Card Em Preparo */}
    <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse transition-all duration-300 ease-in-out" style={{ borderColor: 'rgb(207, 209, 211)' }}>
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Card Em Entrega */}
    <div className="bg-white border h-[62px] rounded-t-lg mb-3 animate-pulse transition-all duration-300 ease-in-out" style={{ borderColor: 'rgb(207, 209, 211)' }}>
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton para a lista de pedidos com transições suaves
export const PedidosListaSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="bg-white border rounded-lg p-4 animate-pulse transition-all duration-300 ease-in-out" style={{ borderColor: 'rgb(207, 209, 211)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

// Skeleton completo para a página de pedidos com transições suaves
export const PedidosPageSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-white border-b px-6 py-4 animate-pulse transition-all duration-300 ease-in-out" style={{ borderColor: 'rgb(207, 209, 211)' }}>
      <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
    </div>

    {/* Cards de Sessão */}
    <div className="py-6">
      <PedidosSessaoSkeleton />
    </div>

    {/* Lista de Pedidos */}
    <div className="px-6">
      <PedidosListaSkeleton />
    </div>
  </div>
);
