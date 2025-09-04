import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Receipt, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { PaymentMethod } from './PaymentMethodSelector';

interface PaymentItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  discount?: number;
}

interface PaymentBreakdown {
  subtotal: number;
  taxAmount: number;
  serviceCharge: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  change: number;
  remaining: number;
}

interface PaymentFinalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentData: PaymentData) => void;
  items: PaymentItem[];
  breakdown: PaymentBreakdown;
  paymentMethod: PaymentMethod;
  orderType: 'dine-in' | 'delivery' | 'takeaway';
  customerName?: string;
  tableNumber?: string;
  deliveryAddress?: string;
}

export interface PaymentData {
  paymentMethod: PaymentMethod;
  breakdown: PaymentBreakdown;
  installments: number;
  changeAmount: number;
  notes: string;
  timestamp: Date;
}

export const PaymentFinalizationModal: React.FC<PaymentFinalizationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  items,
  breakdown,
  paymentMethod,
  orderType,
  customerName,
  tableNumber,
  deliveryAddress
}) => {
  const [installments, setInstallments] = useState(1);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (paymentMethod.allowsInstallments) {
      setInstallments(1);
    }
  }, [paymentMethod]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    try {
      const paymentData: PaymentData = {
        paymentMethod,
        breakdown,
        installments,
        changeAmount: breakdown.change,
        notes,
        timestamp: new Date()
      };

      await onConfirm(paymentData);
      onClose();
    } catch (error) {
      console.error('Erro ao finalizar pagamento:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getOrderTypeInfo = () => {
    switch (orderType) {
      case 'dine-in':
        return { icon: '🍽️', label: 'Mesa', value: tableNumber || 'N/A' };
      case 'delivery':
        return { icon: '🚚', label: 'Endereço', value: deliveryAddress || 'N/A' };
      case 'takeaway':
        return { icon: '📦', label: 'Retirada', value: 'Balcão' };
    }
  };

  const orderInfo = getOrderTypeInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Receipt className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Finalizar Pagamento</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações do Pedido */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Informações do Pedido</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Tipo:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span>{orderInfo.icon}</span>
                  <span className="font-medium capitalize">{orderType.replace('-', ' ')}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-600">{orderInfo.label}:</span>
                <div className="font-medium mt-1">{orderInfo.value}</div>
              </div>
              {customerName && (
                <div className="col-span-2">
                  <span className="text-gray-600">Cliente:</span>
                  <div className="font-medium mt-1">{customerName}</div>
                </div>
              )}
            </div>
          </div>

          {/* Resumo dos Itens */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Itens do Pedido</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                  <div>Item</div>
                  <div>Qtd</div>
                  <div>Preço</div>
                  <div>Total</div>
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="font-medium">{item.name}</div>
                      <div>{item.quantity}</div>
                      <div>R$ {item.unitPrice.toFixed(2)}</div>
                      <div className="font-medium">
                        R$ {(item.total - (item.discount || 0)).toFixed(2)}
                      </div>
                    </div>
                    {item.discount && item.discount > 0 && (
                      <div className="text-xs text-green-600 mt-1">
                        Desconto: -R$ {item.discount.toFixed(2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Forma de Pagamento</h3>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {paymentMethod.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">{paymentMethod.name}</div>
                <div className="text-sm text-gray-600">{paymentMethod.description}</div>
              </div>
            </div>

            {/* Parcelamento */}
            {paymentMethod.allowsInstallments && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parcelamento
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(parseInt(e.target.value))}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                >
                  {Array.from({ length: paymentMethod.maxInstallments || 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}x de R$ {(breakdown.total / num).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Resumo Financeiro */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Resumo Financeiro</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>R$ {breakdown.subtotal.toFixed(2)}</span>
              </div>
              
              {breakdown.taxAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Impostos:</span>
                  <span className="text-red-600">+R$ {breakdown.taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              {breakdown.serviceCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de Serviço:</span>
                  <span className="text-red-600">+R$ {breakdown.serviceCharge.toFixed(2)}</span>
                </div>
              )}
              
              {breakdown.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Desconto:</span>
                  <span className="text-green-600">-R$ {breakdown.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              {paymentMethod.processingFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de Processamento:</span>
                  <span className="text-red-600">
                    +R$ {(breakdown.total * paymentMethod.processingFee / 100).toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span className="text-purple-600">
                    R$ {breakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Valor Pago e Troco */}
              {breakdown.amountPaid > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Pago:</span>
                    <span className="text-green-600">R$ {breakdown.amountPaid.toFixed(2)}</span>
                  </div>
                  
                  {breakdown.change > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Troco:</span>
                      <span className="text-blue-600">R$ {breakdown.change.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {breakdown.remaining > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pendente:</span>
                      <span className="text-red-600">R$ {breakdown.remaining.toFixed(2)}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
              rows={3}
              placeholder="Adicione observações sobre o pagamento..."
            />
          </div>

          {/* Alertas */}
          {breakdown.remaining > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">
                  Pagamento incompleto! Faltam R$ {breakdown.remaining.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {breakdown.change > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Troco: R$ {breakdown.change.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1"
              disabled={breakdown.remaining > 0 || isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Confirmar Pagamento</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
