import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { PageHeader, DataTable, DataTableColumn } from '../../../components/ui';
import { HistoricoModal } from '../../../features/historico/components';
import { HistoricoPedidosLayoutProps, Pedido } from '../types';
import { formatarData, formatarValor, formatarFormaPagamento } from '../utils';

export function HistoricoPedidosLayout({ 
  data, 
  onViewPedido, 
  onExport, 
  onRetry 
}: HistoricoPedidosLayoutProps) {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewPedido = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setShowModal(true);
    onViewPedido(pedido);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  // Error state
  if (data.error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar histórico</h3>
          </div>
          <p className="text-red-700 mb-4">{data.error}</p>
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
    );
  }

  // Definir colunas da tabela
  const columns: DataTableColumn<Pedido>[] = useMemo(() => [
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
  ], []);

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

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho da página */}
        <PageHeader
          title="Histórico de Pedidos"
          subtitle="Visualize e gerencie o histórico de pedidos"
          actionButton={{
            label: "Exportar Histórico",
            onClick: onExport,
            variant: "secondary",
            size: "md"
          }}
        />

        {/* Conteúdo principal */}
        <div className="px-6 py-6 space-y-6">
          {/* Tabela de Histórico */}
          <DataTable
            data={data.pedidosHistorico}
            columns={columns}
            loading={data.loading}
            searchPlaceholder="Buscar pedidos..."
            searchFields={['numero', 'cliente.nome', 'cliente.telefone']}
            filters={{
              statuses: statusOptions,
              categories: formaPagamentoOptions,
              showDateRange: true
            }}
            actions={{
              onView: handleViewPedido
            }}
            pagination={{
              itemsPerPageOptions: [10, 20, 50, 100],
              defaultItemsPerPage: 20
            }}
          />

          {/* Modal de Detalhes */}
          {showModal && selectedPedido && (
            <HistoricoModal
              pedido={selectedPedido}
              isOpen={showModal}
              onClose={handleCloseModal}
            />
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
