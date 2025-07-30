import React, { useMemo } from 'react';
import { Eye, Calendar, User, CreditCard, DollarSign } from 'lucide-react';
import { Pedido } from '../../../types';
import { StatusBadge } from './StatusBadge';
import { usePagination } from '../../../hooks/usePagination';
import { LoadMoreButton } from '../../../components/LoadMoreButton';

interface HistoricoTableProps {
  pedidos: Pedido[];
  onViewPedido: (pedido: Pedido) => void;
}

export const HistoricoTable = React.memo(function HistoricoTable({ pedidos, onViewPedido }: HistoricoTableProps) {
  // Paginação
  const {
    currentItems: pedidosPaginados,
    hasMore,
    loadMore,
    totalItems,
  } = usePagination(pedidos, { itemsPerPage: 10 });
  // Memoizar funções de formatação
  const formatarData = useMemo(() => (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }, []);

  const formatarValor = useMemo(() => (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }, []);

  const formatarFormaPagamento = useMemo(() => (forma: string) => {
    const formas = {
      dinheiro: 'Dinheiro',
      pix: 'PIX',
      cartao_credito: 'Cartão de Crédito',
      cartao_debito: 'Cartão de Débito',
      vale_refeicao: 'Vale Refeição',
      vale_alimentacao: 'Vale Alimentação'
    };
    return formas[forma as keyof typeof formas] || forma;
  }, []);

  // Memoizar o handler de clique
  const handleViewPedido = useMemo(() => (pedido: Pedido) => {
    onViewPedido(pedido);
  }, [onViewPedido]);

  if (pedidosPaginados.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
        <p className="text-gray-500 text-xs">
          Não há pedidos entregues ou cancelados no período selecionado.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pedido
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pagamento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data/Hora
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {pedidosPaginados.map((pedido) => (
            <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
              {/* Número do Pedido */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-xs font-medium text-gray-900">
                    #{pedido.numero}
                  </div>
                  <div className="ml-2 text-xs text-gray-500">
                    {pedido.itens.length} itens
                  </div>
                </div>
              </td>

              {/* Cliente */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-xs font-medium text-gray-900">
                    {pedido.cliente?.nome || 'Cliente não identificado'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pedido.cliente?.telefone || 'N/A'}
                  </div>
                </div>
              </td>

              {/* Pagamento */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-xs font-medium text-gray-900">
                    {formatarFormaPagamento(pedido.formaPagamento)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pedido.pagamento.statusPagamento === 'pago' ? 'Pago' : 'Pendente'}
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={pedido.status} />
              </td>

              {/* Data/Hora */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-xs font-medium text-gray-900">
                    {formatarData(pedido.dataHora)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pedido.tempoEstimado}
                  </div>
                </div>
              </td>

              {/* Total */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    {formatarValor(pedido.total)}
                  </div>
                </div>
              </td>

              {/* Ações */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                <button
                  onClick={() => handleViewPedido(pedido)}
                  className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors rounded"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Botão Carregar Mais */}
      {pedidos.length > 10 && (
        <LoadMoreButton
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={false}
          totalItems={totalItems}
          currentItems={pedidosPaginados.length}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}); 