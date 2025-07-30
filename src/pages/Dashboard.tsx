import React, { useCallback, useMemo } from 'react';
import { RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { useNotificationContext } from '../context/notificationContextUtils';
import { 
  CardMetrica, 
  GraficoBarras, 
  GraficoArea,
  PedidosRecentes,
  GraficoPizza 
} from '../features/dashboard/components';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { usePeriod } from '../context/periodContext';
import { PeriodFilter, PeriodType } from '../components/filters/FiltroPeriodo';

// Componente de erro otimizado
const DashboardError = React.memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="h-full p-4">
    <div className="bg-red-50 border border-red-200 rounded p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
        <h3 className="text-lg font-medium text-red-800">Erro ao carregar dashboard</h3>
      </div>
      <p className="text-red-700 mb-4">{error}</p>
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
        >
          Recarregar Página
        </button>
      </div>
    </div>
  </div>
));

// Componente de loading otimizado
const DashboardLoading = React.memo(() => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600">Carregando dados do dashboard...</p>
    </div>
  </div>
));

// Componente de cabeçalho otimizado
const DashboardHeader = React.memo(({ 
  selectedPeriod, 
  onPeriodChange, 
  onRefresh, 
  loading 
}: {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onRefresh: () => void;
  loading: boolean;
}) => (
  <div className="p-4">
    <div className="bg-white border border-slate-200 rounded p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-xs">
            Visão geral do desempenho do restaurante • 
            <span className="ml-1 font-medium text-blue-600">
              {selectedPeriod === 'weekly' ? 'Período Semanal' : 'Período Mensal'}
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <PeriodFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
            className="rounded-[4px]"
          />
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>
      </div>
    </div>
  </div>
));

// Componente de KPIs otimizado
const KPIGrid = React.memo(({ kpis }: { kpis: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    {kpis.map((kpi, index) => (
      <CardMetrica
        key={`${kpi.titulo}-${index}`}
        titulo={kpi.titulo}
        valor={kpi.valor}
        variacao={kpi.variacao}
        icone={kpi.icone}
        cor={kpi.cor}
      />
    ))}
  </div>
));

// Componente de gráficos otimizado
const ChartsGrid = React.memo(({ 
  formasPagamento, 
  selectedPeriod 
}: { 
  formasPagamento: any[]; 
  selectedPeriod: PeriodType; 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
    <GraficoPizza
      title="Formas de Pagamento"
      data={formasPagamento}
    />
    <GraficoArea
      title="Comparação de Receita"
      period={selectedPeriod}
    />
  </div>
));

export function Dashboard() {
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
      <div className="min-h-screen bg-slate-50">
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

        {/* Cabeçalho */}
        <DashboardHeader
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* Conteúdo Principal */}
        <div className="px-4 pb-4">
          {loading ? (
            <DashboardLoading />
          ) : (
            <div className="max-w-7xl mx-auto">
              {/* KPIs Grid */}
              <KPIGrid kpis={memoizedData.kpis} />

              {/* Gráficos de pizza e área */}
              <ChartsGrid 
                formasPagamento={memoizedData.formasPagamento}
                selectedPeriod={selectedPeriod}
              />

              {/* Pedidos recentes */}
              <div className="grid grid-cols-1 gap-4">
                <PedidosRecentes pedidos={memoizedData.pedidosRecentes} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}