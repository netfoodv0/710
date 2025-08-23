import React from 'react';
import { X, User, MapPin, CreditCard, Package, Calendar, DollarSign } from 'lucide-react';
import { Pedido } from '../../types';

interface HistoricoModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HistoricoModal({ pedido, isOpen, onClose }: HistoricoModalProps) {
  if (!isOpen || !pedido) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'white !important' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Pedido #{pedido.numero}
            </h2>
            <p className="text-sm text-gray-500">
              {formatarData(pedido.dataHora)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informações do Cliente */}
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Informações do Cliente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Nome</p>
                <p className="text-gray-900">{pedido.cliente?.nome || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Telefone</p>
                <p className="text-gray-900">{pedido.cliente?.telefone || 'Não informado'}</p>
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          {pedido.endereco && (
            <div className="bg-gray-50 rounded p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Endereço de Entrega</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900">{pedido.endereco.rua}, {pedido.endereco.numero}</p>
                {pedido.endereco.complemento && (
                  <p className="text-gray-900">{pedido.endereco.complemento}</p>
                )}
                <p className="text-gray-900">
                  {pedido.endereco.bairro} - {pedido.endereco.cidade}/{pedido.endereco.estado}
                </p>
                <p className="text-gray-900">CEP: {pedido.endereco.cep}</p>
              </div>
            </div>
          )}

          {/* Informações de Pagamento */}
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Informações de Pagamento</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Forma de Pagamento</p>
                <p className="text-gray-900">{formatarFormaPagamento(pedido.formaPagamento)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Status do Pagamento</p>
                <p className={`font-medium ${pedido.pagamento.statusPagamento === 'pago' ? 'text-green-600' : 'text-orange-600'}`}>
                  {pedido.pagamento.statusPagamento === 'pago' ? 'Pago' : 'Pendente'}
                </p>
              </div>
            </div>
          </div>

          {/* Itens do Pedido */}
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Itens do Pedido</h3>
            </div>
            <div className="space-y-3">
              {pedido.itens.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.nome}</p>
                    {item.observacoes && (
                      <p className="text-sm text-gray-600">{item.observacoes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Qtd: {item.quantidade}</p>
                    <p className="font-medium text-gray-900">{formatarValor(item.preco)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Resumo do Pedido</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">{formatarValor(pedido.subtotal)}</span>
              </div>
              {pedido.taxaEntrega > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de Entrega:</span>
                  <span className="text-gray-900">{formatarValor(pedido.taxaEntrega)}</span>
                </div>
              )}
              {pedido.desconto > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Desconto:</span>
                  <span className="text-red-600">-{formatarValor(pedido.desconto)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="font-bold text-gray-900">{formatarValor(pedido.total)}</span>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Informações Adicionais</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Tempo Estimado</p>
                <p className="text-gray-900">{pedido.tempoEstimado}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Observações</p>
                <p className="text-gray-900">{pedido.observacoes || 'Nenhuma observação'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
} 