import React, { useCallback, useMemo, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
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
import { PeriodType } from '../components/filters/FiltroPeriodo';
import { RelatorioHeader } from '../features/relatorios/components/RelatorioHeader';

// Componente de erro otimizado
const DashboardError = React.memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
    <div className="flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md w-full">
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

          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  </div>
));



// Componente de KPIs otimizado
const KPIGrid = React.memo(({ kpis }: { kpis: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <GraficoPizza
        title="Formas de Pagamento"
        data={formasPagamento}
      />
      <div className="lg:col-span-1">
        <GraficoArea
          title="Performance"
          period={selectedPeriod}
        />
      </div>
    </div>
  );
});

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
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
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

        {/* Cabeçalho fixo reutilizável */}
        <RelatorioHeader
          title="Dashboard"
          subtitle="Visão geral do desempenho do restaurante"
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onExportExcel={handleRefresh}
          onExportPDF={handleRefresh}
          loading={loading}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[82px]" />

        {/* Conteúdo Principal */}
        <div className="px-6 pb-6">
          <div>
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
        </div>
      </div>
    </ErrorBoundary>
  );
}