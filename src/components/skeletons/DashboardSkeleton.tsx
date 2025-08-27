import React from 'react';

// Skeleton para o container de estatísticas do dashboard
const EstatisticasContainerSkeleton = () => (
  <div className="dashboard-card dashboard-section-spacing flex-shrink-0">
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {/* Total de Pedidos */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Faturamento Total */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Clientes Ativos */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-4"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Ticket Médio */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Pedidos - 7 dias */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Receita - 7 dias */}
      <div className="dashboard-stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton para o card de Formas de Pedido
const FormasPedidoSkeleton = () => (
  <div className="dashboard-analytics-card pb-2">
    <div className="dashboard-analytics-header">
      <div className="h-5 bg-gray-200 rounded w-32"></div>
      <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
    </div>
    
    <div className="dashboard-analytics-content">
      <div className="h-full flex flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
          {/* Delivery */}
          <div className="flex items-center justify-between p-2 bg-white rounded-lg dashboard-card-border">
            <div className="flex items-center space-x-3">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex-shrink-0"></div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-5 bg-gray-200 rounded w-6 mb-1"></div>
              <div className="h-2 bg-gray-200 rounded w-12"></div>
            </div>
          </div>



          {/* Retirada */}
          <div className="flex items-center justify-between p-2 bg-white rounded-lg dashboard-card-border">
            <div className="flex items-center space-x-3">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex-shrink-0"></div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-5 bg-gray-200 rounded w-6 mb-1"></div>
              <div className="h-2 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="dashboard-info-box">
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-64"></div>
    </div>
  </div>
);

// Skeleton para o card de Top Produtos
const TopProdutosSkeleton = () => (
  <div className="dashboard-analytics-card">
    <div className="dashboard-analytics-header">
      <div className="h-5 bg-gray-200 rounded w-24"></div>
      <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
    </div>
    
    <div className="dashboard-analytics-content">
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 bg-white rounded-lg dashboard-card-border h-[62px]">
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="grid grid-rows-2 gap-1">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-2 flex-shrink-0">
          <div className="w-full h-10 bg-gray-200 rounded-[100px]"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton para o card de Pedidos em Andamento
const PedidosAndamentoSkeleton = () => (
  <div className="dashboard-analytics-card">
    <div className="dashboard-analytics-header">
      <div className="h-5 bg-gray-200 rounded w-36"></div>
      <div className="w-2 h-2 bg-gray-200 rounded-lg"></div>
    </div>
    
    <div className="dashboard-analytics-content">
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg dashboard-card-border">
              <div className="flex items-center space-x-3">
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-2 flex-shrink-0">
          <div className="w-full h-10 bg-gray-200 rounded-[100px]"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton para o grid de cards principais
const CardsGridSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 dashboard-grid-mobile">
    <FormasPedidoSkeleton />
    <TopProdutosSkeleton />
    <PedidosAndamentoSkeleton />
  </div>
);

// Skeleton para os cards de sessão da página de pedidos
const PedidosSessaoSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
    {/* Card Em Análise */}
    <div className="bg-white dashboard-card-border h-[62px] rounded-t-lg mb-3">
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>

    {/* Card Em Preparo */}
    <div className="bg-white dashboard-card-border h-[62px] rounded-t-lg mb-3">
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>

    {/* Card Em Entrega */}
    <div className="bg-white dashboard-card-border h-[62px] rounded-t-lg mb-3">
      <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
        <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2"></div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton para card de métrica
const MetricCardSkeleton = () => (
  <div className="dashboard-card-border rounded-lg p-4">
    <div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-8 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Skeleton para gráfico
const ChartSkeleton = () => (
  <div className="bg-white dashboard-card-border rounded-lg p-4">
    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="h-48 bg-gray-100 rounded flex items-center justify-center">

    </div>
  </div>
);

// Skeleton para pedidos recentes
const PedidosRecentesSkeleton = () => (
  <div className="bg-white dashboard-card-border rounded-lg p-4">
    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="dashboard-card-border rounded-lg p-4">
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
    <div className="bg-white dashboard-card-border rounded-lg p-4">
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

export { 
  EstatisticasContainerSkeleton, 
  FormasPedidoSkeleton, 
  TopProdutosSkeleton, 
  PedidosAndamentoSkeleton, 
  CardsGridSkeleton
};

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50">
    <HeaderSkeleton />
    
    <div className="px-4 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Container de Estatísticas */}
        <div className="mb-4">
          <EstatisticasContainerSkeleton />
        </div>

        {/* Grid de Cards Principais */}
        <div className="mb-4">
          <CardsGridSkeleton />
        </div>

        {/* Pedidos recentes */}
        <div className="grid grid-cols-1 gap-4">
          <PedidosRecentesSkeleton />
        </div>
      </div>
    </div>
  </div>
); 