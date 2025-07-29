import React, { useState, useEffect, useCallback } from 'react';
import { Download, AlertCircle, Loader2 } from 'lucide-react';
import { useHistoricoPedidos } from '../hooks/useHistoricoPedidos';
import { useFiltrosHistorico } from '../hooks/useFiltrosHistorico';
import { useNotificationContext } from '../context/notificationContextUtils';
import { HistoricoTable, HistoricoModal, FiltrosHistorico, EstatisticasHistorico } from '../components/historico';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Pedido } from '../types';

export function HistoricoPedidos() {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);

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
        <div className="bg-red-50 border border-red-200 rounded p-6">
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
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
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

        {/* Cabeçalho Fixo */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-white border border-slate-200 rounded" style={{ height: '72px' }}>
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ height: '100%' }}>
              {/* Esquerda: Título e subtítulo */}
              <div>
                <h1 className="text-sm font-bold text-gray-900">Histórico de Pedidos</h1>
                <p className="text-gray-600 mt-1 text-xs">Visualize todos os pedidos finalizados, entregues e cancelados</p>
              </div>
              
              {/* Direita: Ações */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExport}
                  disabled={loading.exportacao}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading.exportacao ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {loading.exportacao ? 'Exportando...' : 'Exportar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col px-4 pb-4">
          {/* Estatísticas */}
          {estatisticas && (
            <div className="flex-shrink-0 mb-4">
              <EstatisticasHistorico estatisticas={estatisticas} />
            </div>
          )}

          {/* Filtros */}
          <div className="flex-shrink-0 mb-4">
            <FiltrosHistorico
              filtros={filtros}
              onFiltrosChange={handleFiltrosChange}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Tabela */}
          <div className="flex-1 bg-white border border-slate-200 rounded">
            <div>
              <HistoricoTable
                pedidos={pedidosFiltrados}
                onViewPedido={handleViewPedido}
              />
            </div>
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