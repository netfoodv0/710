import React from 'react';
import { 
  SkeletonFilters, 
  SkeletonClientTable, 
  SkeletonStatsCards, 
  SkeletonBarCharts,
  SkeletonFunilFidelidade
} from './SkeletonComponents';

interface ReportSkeletonProps {
  type?: 'full' | 'stats' | 'chart' | 'table' | 'clientes';
}

export function ReportSkeleton({ type = 'full' }: ReportSkeletonProps) {
  if (type === 'stats') {
    return (
      <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
        {/* Primeira linha - 4 cards */}
        <div className="grid gap-6 grid-cols-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
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

        {/* Segunda linha - 5 cards */}
        <div className="grid gap-6 grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 bg-white rounded-lg p-4 relative animate-pulse" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
              <div className="text-left h-full flex flex-col justify-between">
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
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

  if (type === 'chart') {
    return (
      <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
        <div className="h-3 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }



  if (type === 'clientes') {
    return (
      <div className="space-y-6" style={{ marginTop: '0px' }}>
        {/* Resumo estatístico */}
        <SkeletonStatsCards count={4} />

        {/* Funil de Fidelidade */}
        <SkeletonFunilFidelidade />

        {/* Container de Filtros */}
        <SkeletonFilters />

        {/* Tabela de Clientes */}
        <SkeletonClientTable />

        {/* Margem inferior da página */}
        <div className="h-25"></div>
      </div>
    );
  }

  // Skeleton completo da página de relatórios
  return (
    <div className="space-y-6 mt-4">
      {/* Estatísticas Detalhadas - Container principal */}
      <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
        {/* Primeira linha - 4 cards */}
        <div className="grid gap-6 grid-cols-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
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

        {/* Segunda linha - 5 cards */}
        <div className="grid gap-6 grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 bg-white rounded-lg p-4 relative animate-pulse" style={{ border: '1px solid #cfd1d3', height: '71px' }}>
              <div className="text-left h-full flex flex-col justify-between">
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <div className="p-2 bg-gray-200 rounded-full w-10 h-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primeira linha: 3 gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tipos de Pedidos */}
        <div className="bg-white border rounded-lg p-4 animate-pulse" style={{ borderColor: '#cfd1d3' }}>
          <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="bg-gray-100 rounded-lg" style={{ height: '250px', backgroundColor: '#f3f4f6' }}></div>
        </div>
        
        {/* Formas de Pagamento */}
        <div className="bg-white border rounded-lg p-4 animate-pulse" style={{ borderColor: '#cfd1d3' }}>
          <div className="h-3 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="bg-gray-100 rounded-lg" style={{ height: '250px', backgroundColor: '#f3f4f6' }}></div>
        </div>
        
        {/* Frequência de Pedidos */}
        <div className="bg-white border rounded-lg p-4 animate-pulse" style={{ borderColor: '#cfd1d3' }}>
          <div className="h-3 bg-gray-200 rounded w-28 mb-4"></div>
          <div className="bg-gray-100 rounded-lg" style={{ height: '250px', backgroundColor: '#f3f4f6' }}></div>
        </div>
      </div>
      
      {/* Segunda linha: Performance Semanal em largura total */}
      <div className="bg-white border rounded-lg p-4 mt-4 animate-pulse" style={{ borderColor: '#cfd1d3' }}>
        <div className="h-3 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="h-48 bg-gray-100 rounded-lg"></div>
      </div>

      {/* Card com Gráfico de Barras */}
      <div className="bg-white border rounded-lg p-6 animate-pulse" style={{ borderColor: 'rgb(207 209 211)' }}>
        <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-64 bg-gray-100 rounded-lg"></div>
      </div>

      {/* Margem inferior da página */}
      <div className="h-25"></div>
    </div>
  );
}
