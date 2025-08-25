import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { useNotificationContext } from '../context/notificationContextUtils';
import { useNavigate } from 'react-router-dom';

import { HistoricoModal } from '../features/historico/components';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader, DataTable, DataTableColumn } from '../components/ui';


import { Pedido } from '../types';
import { useHistoricoPedidos } from '../hooks/useHistoricoPedidos';

export default function HistoricoPedidos() {
  const navigate = useNavigate();
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Usar o hook real de histórico
  const {
    pedidosHistorico,
    loading: loadingHistorico,
    error: errorHistorico,
    carregarHistorico,
    carregarEstatisticas,
    refreshDados
  } = useHistoricoPedidos();

  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  // O hook useHistoricoPedidos já gerencia o carregamento e listener em tempo real
  // Não é necessário chamar carregarHistorico e carregarEstatisticas aqui

  // Debug: verificar dados carregados
  useEffect(() => {
    console.log('📊 HistoricoPedidos: Dados carregados:', {
      pedidos: pedidosHistorico?.length || 0,
      loading: loadingHistorico,
      error: errorHistorico
    });
  }, [pedidosHistorico, loadingHistorico, errorHistorico]);

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
      // setLoading(true); // This line was removed as per the new_code
      // Simular exportação como na página de relatórios
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Histórico exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar histórico');
    } finally {
      // setLoading(false); // This line was removed as per the new_code
    }
  }, [showSuccess, showError]);

  const handleRetry = useCallback(() => {
    // Recarregar dados e reativar listener
    refreshDados();
  }, [refreshDados]);

  // Funções auxiliares para formatação
  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarFormaPagamento = (forma: string) => {
    const formas = {
      dinheiro: 'Dinheiro',
      pix: 'PIX',
      cartao_credito: 'Cartão de Crédito',
      cartao_debito: 'Cartão de Débito',
      vale_refeicao: 'Vale Refeição',
      vale_alimentacao: 'Vale Alimentação'
    };
    return formas[forma as keyof typeof formas] || forma;
  };

  // Definir colunas da tabela
  const columns: DataTableColumn<Pedido>[] = [
    {
      key: 'numero',
      label: 'Pedido',
      sortable: true,
      render: (produto) => (
        <div className="flex flex-col">
          <p className="text-small">#{produto.numero}</p>
          <p className="text-xs text-default-400">{produto.itens.length} itens</p>
        </div>
      )
    },
    {
      key: 'cliente',
      label: 'Cliente',
      sortable: true,
      render: (produto) => (
        <div className="flex flex-col">
          <p className="text-small">{produto.cliente?.nome || 'Cliente não identificado'}</p>
          <p className="text-xs text-default-400">{produto.cliente?.telefone || 'N/A'}</p>
        </div>
      )
    },
    {
      key: 'formaPagamento',
      label: 'Pagamento',
      sortable: true,
      render: (produto) => (
        <div className="flex flex-col">
          <p className="text-small capitalize">{formatarFormaPagamento(produto.formaPagamento)}</p>
          <p className="text-xs text-default-400 capitalize">
            {produto.pagamento?.statusPagamento === 'pago' ? 'Pago' : 'Pendente'}
          </p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => {
        const statusColor = produto.status === 'entregue' ? 'bg-purple-100 text-purple-800' :
        produto.status === 'cancelado' ? 'bg-gray-100 text-gray-800' :
        'bg-purple-100 text-purple-800';
        
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {produto.status}
          </span>
        );
      }
    },
    {
      key: 'dataHora',
      label: 'Data/Hora',
      sortable: true,
      render: (produto) => (
        <div className="flex flex-col">
          <p className="text-small">{formatarData(produto.dataHora)}</p>
          <p className="text-xs text-default-400 capitalize">{produto.tempoEstimado}</p>
        </div>
      )
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (produto) => <span className="text-small">{formatarValor(produto.total)}</span>
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  // Opções para filtros
  const statusOptions = [
    { value: 'entregue', label: 'Entregue' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'finalizado', label: 'Finalizado' }
  ];

  const formaPagamentoOptions = [
    { value: 'dinheiro', label: 'Dinheiro' },
    { value: 'pix', label: 'PIX' },
    { value: 'cartao_credito', label: 'Cartão de Crédito' },
    { value: 'cartao_debito', label: 'Cartão de Débito' },
    { value: 'vale_refeicao', label: 'Vale Refeição' },
    { value: 'vale_alimentacao', label: 'Vale Alimentação' }
  ];

  // Error state
  if (errorHistorico) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
          </div>
          <p className="text-red-700 mb-4">{errorHistorico}</p>
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
      <div className="min-h-screen bg-dashboard">
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
          title="Histórico de Pedidos"
          subtitle="Visualize todos os pedidos finalizados, entregues e cancelados"
          actionButton={{
            label: "Exportar Histórico",
            onClick: handleExport,
            loading: loadingHistorico.exportacao,
            disabled: loadingHistorico.exportacao,
            variant: "primary",
            size: "md"
          }}
        />

        {/* Content */}
        <div className="px-6 pt-6 pb-4">


          {/* Renderização condicional com loading */}
          {loadingHistorico.data ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-600">Carregando...</p>
            </div>
          ) : (
            <DataTable
              data={pedidosHistorico || []}
              columns={columns}
              searchPlaceholder="Buscar por número do pedido, cliente, telefone..."
              searchFields={['numero']}
              filters={{
                statuses: statusOptions,
                showDateRange: true
              }}
              actions={{
                onView: handleViewPedido
              }}
              pagination={{
                itemsPerPageOptions: [5, 10, 15, 20],
                defaultItemsPerPage: 10
              }}
              className="mt-0"
            />
          )}
          
          {/* Margem inferior da página */}
          <div className="h-12"></div>
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