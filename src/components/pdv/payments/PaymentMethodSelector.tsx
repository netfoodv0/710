import React, { useState } from 'react';
import { CreditCard, DollarSign, QrCode, Smartphone, Building, Wallet, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'pix' | 'transfer' | 'voucher' | 'points';
  icon: React.ReactNode;
  description: string;
  requiresChange: boolean;
  allowsInstallments: boolean;
  maxInstallments?: number;
  processingFee?: number;
  isAvailable: boolean;
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
  totalAmount: number;
  onInstallmentsChange?: (installments: number) => void;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Dinheiro',
    type: 'cash',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Pagamento em espécie',
    requiresChange: true,
    allowsInstallments: false,
    isAvailable: true
  },
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    type: 'card',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Visa, Mastercard, Elo, etc.',
    requiresChange: false,
    allowsInstallments: true,
    maxInstallments: 12,
    processingFee: 2.99,
    isAvailable: true
  },
  {
    id: 'debit_card',
    name: 'Cartão de Débito',
    type: 'card',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Débito automático',
    requiresChange: false,
    allowsInstallments: false,
    processingFee: 1.99,
    isAvailable: true
  },
  {
    id: 'pix',
    name: 'PIX',
    type: 'pix',
    icon: <QrCode className="h-5 w-5" />,
    description: 'Transferência instantânea',
    requiresChange: false,
    allowsInstallments: false,
    isAvailable: true
  },
  {
    id: 'transfer',
    name: 'Transferência',
    type: 'transfer',
    icon: <Building className="h-5 w-5" />,
    description: 'TED/DOC bancário',
    requiresChange: false,
    allowsInstallments: false,
    isAvailable: true
  },
  {
    id: 'voucher',
    name: 'Vale/Alimentação',
    type: 'voucher',
    icon: <Wallet className="h-5 w-5" />,
    description: 'Vale refeição, alimentação',
    requiresChange: false,
    allowsInstallments: false,
    isAvailable: true
  },
  {
    id: 'points',
    name: 'Pontos/Fidelidade',
    type: 'points',
    icon: <Smartphone className="h-5 w-5" />,
    description: 'Programa de pontos',
    requiresChange: false,
    allowsInstallments: false,
    isAvailable: true
  }
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
  totalAmount,
  onInstallmentsChange
}) => {
  const [installments, setInstallments] = useState(1);
  const [showInstallments, setShowInstallments] = useState(false);

  const handleMethodSelect = (method: PaymentMethod) => {
    onMethodSelect(method);
    setShowInstallments(method.allowsInstallments);
    if (!method.allowsInstallments) {
      setInstallments(1);
      onInstallmentsChange?.(1);
    }
  };

  const handleInstallmentsChange = (value: number) => {
    setInstallments(value);
    onInstallmentsChange?.(value);
  };

  const getMethodStatus = (method: PaymentMethod) => {
    if (!method.isAvailable) return 'Indisponível';
    if (method.processingFee) return `Taxa: ${method.processingFee}%`;
    return 'Disponível';
  };

  const getMethodStatusColor = (method: PaymentMethod) => {
    if (!method.isAvailable) return 'bg-gray-100 text-gray-500';
    if (method.processingFee) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const calculateInstallmentValue = () => {
    if (!selectedMethod?.allowsInstallments) return totalAmount;
    
    const fee = selectedMethod.processingFee || 0;
    const totalWithFee = totalAmount * (1 + fee / 100);
    return totalWithFee / installments;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Forma de Pagamento</h3>
        <p className="text-sm text-gray-600">Selecione como o cliente irá pagar</p>
      </div>

      {/* Métodos de Pagamento */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method)}
            disabled={!method.isAvailable}
            className={`p-3 border rounded-lg text-left transition-all duration-200 ${
              selectedMethod?.id === method.id
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${!method.isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedMethod?.id === method.id ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                {method.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">{method.name}</div>
                <div className="text-xs text-gray-500">{method.description}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs mt-1 ${getMethodStatusColor(method)}`}
                >
                  {getMethodStatus(method)}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Configurações do Método Selecionado */}
      {selectedMethod && (
        <div className="border-t border-gray-200 pt-4">
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Configurações: {selectedMethod.name}
            </h4>
            
            {/* Parcelamento */}
            {selectedMethod.allowsInstallments && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parcelamento
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={installments}
                    onChange={(e) => handleInstallmentsChange(parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {Array.from({ length: selectedMethod.maxInstallments || 12 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}x
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-600">
                    de R$ {calculateInstallmentValue().toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Taxa de Processamento */}
            {selectedMethod.processingFee && (
              <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Taxa de processamento: {selectedMethod.processingFee}%
                  </span>
                </div>
                <div className="text-sm text-yellow-700 mt-1">
                  Total com taxa: R$ {(totalAmount * (1 + selectedMethod.processingFee / 100)).toFixed(2)}
                </div>
              </div>
            )}

            {/* Troco */}
            {selectedMethod.requiresChange && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Este método requer cálculo de troco
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resumo do Pagamento */}
      {selectedMethod && (
        <div className="border-t border-gray-200 pt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <h5 className="font-medium text-gray-900 mb-2">Resumo do Pagamento</h5>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>R$ {totalAmount.toFixed(2)}</span>
              </div>
              
              {selectedMethod.processingFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa ({selectedMethod.processingFee}%):</span>
                  <span className="text-red-600">
                    +R$ {(totalAmount * selectedMethod.processingFee / 100).toFixed(2)}
                  </span>
                </div>
              )}
              
              {selectedMethod.allowsInstallments && installments > 1 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Parcelas ({installments}x):</span>
                  <span className="text-blue-600">
                    R$ {calculateInstallmentValue().toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-1">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span className="text-lg">
                    R$ {selectedMethod.processingFee 
                      ? (totalAmount * (1 + selectedMethod.processingFee / 100)).toFixed(2)
                      : totalAmount.toFixed(2)
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
