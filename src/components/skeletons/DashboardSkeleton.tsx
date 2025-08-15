import React from 'react';

// Skeleton para card de métrica
const MetricCardSkeleton = () => (
      <div className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

// Skeleton para gráfico
const ChartSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="h-48 bg-gray-100 rounded flex items-center justify-center">

    </div>
  </div>
);

// Skeleton para pedidos recentes
const PedidosRecentesSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton para cabeçalho
const HeaderSkeleton = () => (
  <div className="p-4">
    <div className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50">
    <HeaderSkeleton />
    
    <div className="px-4 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        {/* Pedidos recentes */}
        <div className="grid grid-cols-1 gap-4">
          <PedidosRecentesSkeleton />
        </div>
      </div>
    </div>
  </div>
); 