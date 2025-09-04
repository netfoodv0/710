import React, { useState, useMemo } from 'react';
import { Percent, DollarSign, Tag, X, Save, Calculator } from 'lucide-react';
import { usePDV } from '../../../hooks/usePDV';

interface DiscountModalProps {
  onClose: () => void;
  onApply: (discount: DiscountData) => void;
  currentDiscount?: DiscountData | null;
  orderTotal: number;
}

interface DiscountData {
  id: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  reason: string;
  isActive: boolean;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  onClose,
  onApply,
  currentDiscount,
  orderTotal
}) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(
    currentDiscount?.type || 'percentage'
  );
  const [discountValue, setDiscountValue] = useState(
    currentDiscount?.value || 0
  );
  const [discountDescription, setDiscountDescription] = useState(
    currentDiscount?.description || ''
  );
  const [discountReason, setDiscountReason] = useState(
    currentDiscount?.reason || ''
  );

  // Motivos de desconto predefinidos
  const predefinedReasons = [
    'Cliente VIP',
    'Primeira compra',
    'Promoção sazonal',
    'Cupom de desconto',
    'Fidelidade',
    'Pacote/Combo',
    'Cliente recorrente',
    'Outro'
  ];

  // Calcular desconto
  const calculatedDiscount = useMemo(() => {
    if (discountType === 'percentage') {
      return (orderTotal * discountValue) / 100;
    }
    return discountValue;
  }, [discountType, discountValue, orderTotal]);

  // Calcular novo total
  const newTotal = useMemo(() => {
    return Math.max(0, orderTotal - calculatedDiscount);
  }, [orderTotal, calculatedDiscount]);

  // Validar desconto
  const isValidDiscount = useMemo(() => {
    if (discountType === 'percentage') {
      return discountValue >= 0 && discountValue <= 100;
    }
    return discountValue >= 0 && discountValue <= orderTotal;
  }, [discountType, discountValue, orderTotal]);

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidDiscount) return;

    const discountData: DiscountData = {
      id: currentDiscount?.id || `discount_${Date.now()}`,
      type: discountType,
      value: discountValue,
      description: discountDescription,
      reason: discountReason,
      isActive: true
    };

    onApply(discountData);
    onClose();
  };

  const handleClearDiscount = () => {
    setDiscountValue(0);
    setDiscountDescription('');
    setDiscountReason('');
  };

  const handleQuickDiscount = (percentage: number) => {
    setDiscountType('percentage');
    setDiscountValue(percentage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Percent size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDiscount ? 'Editar Desconto' : 'Aplicar Desconto'}
              </h2>
              <p className="text-sm text-gray-500">
                {currentDiscount ? 'Modifique as informações do desconto' : 'Configure o desconto para este pedido'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Descontos Rápidos */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Descontos Rápidos</h3>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((percentage) => (
                <button
                  key={percentage}
                  type="button"
                  onClick={() => handleQuickDiscount(percentage)}
                  className={`p-2 text-xs rounded-lg border transition-colors ${
                    discountType === 'percentage' && discountValue === percentage
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Desconto */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tipo de Desconto</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="percentage"
                  checked={discountType === 'percentage'}
                  onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <Percent size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Percentual (%)</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="fixed"
                  checked={discountType === 'fixed'}
                  onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Valor Fixo (R$)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Valor do Desconto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Desconto
              {discountType === 'percentage' && <span className="text-gray-500"> (%)</span>}
              {discountType === 'fixed' && <span className="text-gray-500"> (R$)</span>}
            </label>
            <div className="relative">
              <input
                type="number"
                step={discountType === 'percentage' ? '0.1' : '0.01'}
                min="0"
                max={discountType === 'percentage' ? '100' : orderTotal}
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  !isValidDiscount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={discountType === 'percentage' ? '0.0' : '0.00'}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {discountType === 'percentage' ? (
                  <Percent size={20} className="text-gray-400" />
                ) : (
                  <DollarSign size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {!isValidDiscount && (
              <p className="text-sm text-red-600 mt-1">
                {discountType === 'percentage' 
                  ? 'Percentual deve estar entre 0% e 100%'
                  : 'Valor deve estar entre R$ 0,00 e o total do pedido'
                }
              </p>
            )}
          </div>

          {/* Motivo do Desconto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo do Desconto
            </label>
            <select
              value={discountReason}
              onChange={(e) => setDiscountReason(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione um motivo</option>
              {predefinedReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {/* Descrição Adicional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição Adicional
            </label>
            <textarea
              value={discountDescription}
              onChange={(e) => setDiscountDescription(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Detalhes adicionais sobre o desconto..."
            />
          </div>

          {/* Resumo do Desconto */}
          {isValidDiscount && discountValue > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3 flex items-center">
                <Calculator size={16} className="mr-2" />
                Resumo do Desconto
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Total Original:</span>
                  <span className="font-medium text-green-800">{formatCurrency(orderTotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-green-700">Desconto:</span>
                  <span className="font-medium text-green-800">
                    -{formatCurrency(calculatedDiscount)}
                    {discountType === 'percentage' && ` (${discountValue}%)`}
                  </span>
                </div>
                
                <div className="border-t border-green-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-green-800">Novo Total:</span>
                    <span className="text-lg font-bold text-green-800">{formatCurrency(newTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClearDiscount}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                disabled={!isValidDiscount || discountValue === 0}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span>{currentDiscount ? 'Atualizar' : 'Aplicar'} Desconto</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
