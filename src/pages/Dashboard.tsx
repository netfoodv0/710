import React, { useCallback, useMemo, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { useNotificationContext } from '../context/notificationContextUtils';

// Importar novos componentes
import { 
  FormasPedidas,
  ProdutosVendidos,
  PedidosAndamento
} from '../components/analytics';

import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { usePeriod } from '../context/periodContext';
import { PeriodType } from '../components/filters/FiltroPeriodo';
import { PageHeader, BagIcon, RevenueIcon, UsersIcon, TicketIcon, RevenueGeneratedIcon, Calendar7DaysIcon } from '../components/ui';


// Componente de erro otimizado
const DashboardError = React.memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen" style={{ backgroundColor: 'rgb(238, 235, 235)' }}>
    <div className="flex items-center justify-center p-6">
      <div className="bg-white border rounded-lg p-6 max-w-md w-full" style={{ borderColor: '#cfd1d3' }}>
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-medium text-red-800">Erro ao carregar dashboard</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#cfd1d3' }}
          >
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  </div>
));



// Componente de gráficos otimizado
const ChartsGrid = React.memo(({ 
  formasPagamento, 
  selectedPeriod 
}: { 
  formasPagamento: any[]; 
  selectedPeriod: PeriodType; 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* GraficoPizza removed */}
      <div className="lg:col-span-1">
        {/* GraficoArea removed */}
      </div>
    </div>
  );
});

// Novo componente para o layout principal do dashboard
const DashboardLayout = React.memo(({ 
  data, 
  selectedPeriod 
}: { 
  data: any; 
  selectedPeriod: PeriodType; 
}) => {
  return (
    <div className="space-y-6">
      {/* Estatísticas do Dashboard */}
      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total de Pedidos</p>
                <p className="text-lg font-bold text-gray-900">{data.estatisticas?.totalPedidos || 0}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <BagIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Faturamento Total</p>
                <p className="text-lg font-bold text-gray-900">
                  R$ {(data.estatisticas?.faturamentoTotal || 0).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <RevenueIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-lg font-bold text-gray-900">{data.estatisticas?.totalClientes || 0}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <UsersIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Ticket Médio</p>
                <p className="text-lg font-bold text-gray-900">
                  R$ {(data.estatisticas?.ticketMedio || 0).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <TicketIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Pedidos - 7 dias</p>
                <p className="text-lg font-bold text-gray-900">{data.estatisticas?.pedidos7Dias || 0}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar7DaysIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Receita - 7 dias</p>
                <p className="text-lg font-bold text-gray-900">
                  R$ {(data.estatisticas?.receita7Dias || 0).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <RevenueGeneratedIcon size={24} color="#6b7280" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Análise de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-4 pb-2 h-[500px]" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Formas de Pedido</h2>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <FormasPedidas formas={data.formasPedidas || []} />
          
          <div className="mt-4 p-3 bg-green-50 border rounded-lg" style={{ borderColor: '#cfd1d3' }}>
            <h3 className="text-sm font-semibold text-green-800 mb-2">Economia com taxas</h3>
            <p className="text-xs text-green-700">
              Comece a vender e deixe de pagar 25% do seu faturamento em taxas à plataformas!
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 h-full flex flex-col" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Top Produtos</h2>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
          <div className="flex-1">
            <ProdutosVendidos produtos={data.produtosVendidos || []} />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 h-full flex flex-col" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Pedidos em Andamento</h2>
            <div className="w-2 h-2 bg-red-500 rounded-lg"></div>
          </div>
          <div className="flex-1">
            <PedidosAndamento 
              pedidosEmAndamento={data.estatisticas?.pedidosPendentes || 0}
              pedidos={data.pedidosEmAndamento || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Dashboard() {
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  const { data, loading, error, refreshData } = useDashboard(selectedPeriod);
  const { notifications, showError, removeNotification } = useNotificationContext();

  const handleRefresh = useCallback(async () => {
    try {
      await refreshData();
    } catch (err) {
      showError('Erro ao atualizar dados do dashboard');
    }
  }, [refreshData, showError]);

  const handleRetry = useCallback(() => {
    refreshData();
  }, [refreshData]);

  // Memoizar dados para evitar re-renders desnecessários
  const memoizedData = useMemo(() => data, [data]);

  // Error state
  if (error) {
    return <DashboardError error={error} onRetry={handleRetry} />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: 'rgb(238, 235, 235)' }}>
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={removeNotification}
          />
        ))}

        {/* Cabeçalho da página */}
        <PageHeader
          title="Dashboard"
          subtitle="Visão geral do desempenho do restaurante"
          actionButton={{
            label: "Atualizar Dados",
            onClick: handleRefresh,
            loading: loading,
            disabled: loading,
            variant: "primary",
            size: "md"
          }}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Conteúdo Principal */}
        <div className="px-6 pt-6">
          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-64 bg-gray-200 rounded-lg"></div>
                <div className="space-y-6">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ) : (
            <DashboardLayout data={memoizedData} selectedPeriod={selectedPeriod} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}