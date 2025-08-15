import React, { useState, useEffect, useCallback } from 'react';
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { useHistoricoPedidos } from '../hooks/useHistoricoPedidos';
import { useFiltrosHistorico } from '../hooks/useFiltrosHistorico';
import { useNotificationContext } from '../context/notificationContextUtils';

import { HistoricoTable, HistoricoModal, FiltrosHistorico, EstatisticasHistorico } from '../features/historico/components';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { RelatorioHeader } from '../features/relatorios/components/RelatorioHeader';
import { usePeriodFilter } from '../hooks/usePeriodFilter';
import { Pedido } from '../types';

export function HistoricoPedidos() {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { selectedPeriod, handlePeriodChange } = usePeriodFilter();




  const {
    pedidosHistorico,
    loading,
    error,
    estatisticas,
    carregarHistorico,
    exportarHistorico,
    limparErro
  } = useHistoricoPedidos();

  const {
    filtros,
    searchTerm,
    pedidosFiltrados,
    estatisticasFiltros,
    handleFiltrosChange,
    setSearchTerm
  } = useFiltrosHistorico(pedidosHistorico);

  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  const handleViewPedido = useCallback((pedido: Pedido) => {
    setSelectedPedido(pedido);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedPedido(null);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportarHistorico(filtros);
      showSuccess('Histórico exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar histórico');
    }
  }, [exportarHistorico, filtros, showSuccess, showError]);

  const handleRetry = useCallback(() => {
    limparErro();
    carregarHistorico();
  }, [limparErro, carregarHistorico]);

  // Error state
  if (error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded p-0">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
  
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
    );
  }

  const handleExportExcel = async () => {
    await handleExport();
  };

  const handleExportPDF = async () => {
    await handleExport();
  };

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
          title="Histórico de Pedidos"
          subtitle="Visualize todos os pedidos finalizados, entregues e cancelados"
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExportExcel={handleExportExcel}
          onExportPDF={handleExportPDF}
          loading={loading.exportacao}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[66px]" />

        {/* Conteúdo Principal */}
        <div className="p-4" style={{ padding: '16px' }}>
          {/* Estatísticas */}
          {estatisticas && (
            <div className="mt-4 mb-4" style={{ marginBottom: '16px' }}>
              <EstatisticasHistorico estatisticas={estatisticas} />
            </div>
          )}

          {/* Filtros */}
          <div className="mb-4" style={{ marginBottom: '16px' }}>
            <FiltrosHistorico
              filtros={filtros}
              onFiltrosChange={handleFiltrosChange}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Tabela */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <HistoricoTable
              pedidos={pedidosFiltrados}
              onViewPedido={handleViewPedido}
            />
          </div>
        </div>

        {/* Modal de detalhes */}
        {showModal && selectedPedido && (
          <HistoricoModal
            pedido={selectedPedido}
            isOpen={showModal}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}