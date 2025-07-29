import React from 'react';
import { X, User, Phone, MapPin, CreditCard, Clock, FileText } from 'lucide-react';
import { Pedido } from '../../types';
import { StatusActions } from './StatusActions';

interface ModalDetalhesPedidoProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (pedidoId: string, novoStatus: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    novo: { label: 'Novo', color: 'bg-blue-100 text-blue-800' },
    confirmado: { label: 'Confirmado', color: 'bg-yellow-100 text-yellow-800' },
    preparando: { label: 'Preparando', color: 'bg-orange-100 text-orange-800' },
    saiu_entrega: { label: 'Saiu para Entrega', color: 'bg-purple-100 text-purple-800' },
    entregue: { label: 'Entregue', color: 'bg-green-100 text-green-800' },
    cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.novo;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export function ModalDetalhesPedido({ pedido, isOpen, onClose, onStatusChange }: ModalDetalhesPedidoProps) {
  if (!isOpen || !pedido) return null;

  const subtotal = pedido.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const taxaEntrega = 5.00; // Valor fixo para demonstração

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Pedido {pedido.numero}
            </h2>
            <StatusBadge status={pedido.status} />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Informações do Cliente */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Informações do Cliente
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{pedido.cliente.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{pedido.cliente.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{pedido.cliente.endereco}</span>
              </div>
            </div>
          </div>

          {/* Itens do Pedido */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Itens do Pedido</h3>
            <div className="space-y-2">
              {pedido.itens.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium text-gray-900">{item.nome}</span>
                    <span className="text-gray-500 ml-2">x{item.quantidade}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Resumo Financeiro</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Entrega:</span>
                <span className="text-gray-900">R$ {taxaEntrega.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">R$ {pedido.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Pagamento:</span>
              <span className="text-gray-900">{pedido.formaPagamento}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Tempo Estimado:</span>
              <span className="text-gray-900">{pedido.tempoEstimado}</span>
            </div>
          </div>

          {/* Observações */}
          {pedido.observacoes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Observações
              </h3>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                {pedido.observacoes}
              </p>
            </div>
          )}

          {/* Ações */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Ações:</span>
              <StatusActions
                status={pedido.status}
                onStatusChange={(novoStatus) => onStatusChange(pedido.id, novoStatus)}
              />
            </div>
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}