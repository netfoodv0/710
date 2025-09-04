import React, { useState, useMemo } from 'react';
import { Receipt, DollarSign, Percent, X, Save, Calculator, Package, Truck } from 'lucide-react';
import { usePDV } from '../../../hooks/usePDV';

interface ServiceChargeModalProps {
  onClose: () => void;
  onApply: (serviceCharge: ServiceChargeData) => void;
  currentServiceCharge?: ServiceChargeData | null;
  orderTotal: number;
}

interface ServiceChargeData {
  id: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  category: string;
  isActive: boolean;
  isOptional: boolean;
}

export const ServiceChargeModal: React.FC<ServiceChargeModalProps> = ({
  onClose,
  onApply,
  currentServiceCharge,
  orderTotal
}) => {
  const [chargeType, setChargeType] = useState<'percentage' | 'fixed'>(
    currentServiceCharge?.type || 'percentage'
  );
  const [chargeValue, setChargeValue] = useState(
    currentServiceCharge?.value || 0
  );
  const [chargeDescription, setChargeDescription] = useState(
    currentServiceCharge?.description || ''
  );
  const [chargeCategory, setChargeCategory] = useState(
    currentServiceCharge?.category || ''
  );
  const [isOptional, setIsOptional] = useState(
    currentServiceCharge?.isOptional || false
  );

  // Categorias de taxas predefinidas
  const predefinedCategories = [
    'Taxa de Serviço',
    'Taxa de Entrega',
    'Taxa de Embalagem',
    'Taxa de Mesa',
    'Taxa de Estacionamento',
    'Taxa de Limpeza',
    'Taxa de Segurança',
    'Outra'
  ];

  // Calcular taxa
  const calculatedCharge = useMemo(() => {
    if (chargeType === 'percentage') {
      return (orderTotal * chargeValue) / 100;
    }
    return chargeValue;
  }, [chargeType, chargeValue, orderTotal]);

  // Calcular novo total
  const newTotal = useMemo(() => {
    return orderTotal + calculatedCharge;
  }, [orderTotal, calculatedCharge]);

  // Validar taxa
  const isValidCharge = useMemo(() => {
    if (chargeType === 'percentage') {
      return chargeValue >= 0 && chargeValue <= 50; // Máximo 50%
    }
    return chargeValue >= 0 && chargeValue <= orderTotal * 0.5; // Máximo 50% do pedido
  }, [chargeType, chargeValue, orderTotal]);

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidCharge) return;

    const serviceChargeData: ServiceChargeData = {
      id: currentServiceCharge?.id || `service_charge_${Date.now()}`,
      type: chargeType,
      value: chargeValue,
      description: chargeDescription,
      category: chargeCategory,
      isActive: true,
      isOptional
    };

    onApply(serviceChargeData);
    onClose();
  };

  const handleClearCharge = () => {
    setChargeValue(0);
    setChargeDescription('');
    setChargeCategory('');
    setIsOptional(false);
  };

  const handleQuickCharge = (percentage: number) => {
    setChargeType('percentage');
    setChargeValue(percentage);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Taxa de Entrega':
        return <Truck size={16} className="text-blue-600" />;
      case 'Taxa de Embalagem':
        return <Package size={16} className="text-orange-600" />;
      case 'Taxa de Serviço':
        return <Receipt size={16} className="text-green-600" />;
      default:
        return <Receipt size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Receipt size={20} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentServiceCharge ? 'Editar Taxa' : 'Adicionar Taxa'}
              </h2>
              <p className="text-sm text-gray-500">
                {currentServiceCharge ? 'Modifique as informações da taxa' : 'Configure uma taxa adicional para este pedido'}
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
          {/* Taxas Rápidas */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Taxas Rápidas</h3>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((percentage) => (
                <button
                  key={percentage}
                  type="button"
                  onClick={() => handleQuickCharge(percentage)}
                  className={`p-2 text-xs rounded-lg border transition-colors ${
                    chargeType === 'percentage' && chargeValue === percentage
                      ? 'bg-orange-100 border-orange-300 text-orange-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>

          {/* Categoria da Taxa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria da Taxa
            </label>
            <select
              value={chargeCategory}
              onChange={(e) => setChargeCategory(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              {predefinedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de Taxa */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tipo de Taxa</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value="percentage"
                  checked={chargeType === 'percentage'}
                  onChange={(e) => setChargeType(e.target.value as 'percentage' | 'fixed')}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
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
                  checked={chargeType === 'fixed'}
                  onChange={(e) => setChargeType(e.target.value as 'percentage' | 'fixed')}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Valor Fixo (R$)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Valor da Taxa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da Taxa
              {chargeType === 'percentage' && <span className="text-gray-500"> (%)</span>}
              {chargeType === 'fixed' && <span className="text-gray-500"> (R$)</span>}
            </label>
            <div className="relative">
              <input
                type="number"
                step={chargeType === 'percentage' ? '0.1' : '0.01'}
                min="0"
                max={chargeType === 'percentage' ? '50' : orderTotal * 0.5}
                value={chargeValue}
                onChange={(e) => setChargeValue(parseFloat(e.target.value) || 0)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  !isValidCharge ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={chargeType === 'percentage' ? '0.0' : '0.00'}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {chargeType === 'percentage' ? (
                  <Percent size={20} className="text-gray-400" />
                ) : (
                  <DollarSign size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {!isValidCharge && (
              <p className="text-sm text-red-600 mt-1">
                {chargeType === 'percentage' 
                  ? 'Percentual deve estar entre 0% e 50%'
                  : 'Valor deve estar entre R$ 0,00 e 50% do total do pedido'
                }
              </p>
            )}
          </div>

          {/* Taxa Opcional */}
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isOptional}
                onChange={(e) => setIsOptional(e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Taxa Opcional</span>
            </label>
            <span className="text-xs text-gray-500">
              (Cliente pode escolher se quer pagar)
            </span>
          </div>

          {/* Descrição da Taxa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Taxa
            </label>
            <textarea
              value={chargeDescription}
              onChange={(e) => setChargeDescription(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Detalhes sobre a taxa, quando se aplica, etc..."
            />
          </div>

          {/* Resumo da Taxa */}
          {isValidCharge && chargeValue > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-800 mb-3 flex items-center">
                <Calculator size={16} className="mr-2" />
                Resumo da Taxa
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-700">Total Original:</span>
                  <span className="font-medium text-orange-800">{formatCurrency(orderTotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-orange-700">Taxa Adicional:</span>
                  <span className="font-medium text-orange-800">
                    +{formatCurrency(calculatedCharge)}
                    {chargeType === 'percentage' && ` (${chargeValue}%)`}
                  </span>
                </div>
                
                <div className="border-t border-orange-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-orange-800">Novo Total:</span>
                    <span className="text-lg font-bold text-orange-800">{formatCurrency(newTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClearCharge}
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
                disabled={!isValidCharge || chargeValue === 0 || !chargeCategory}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span>{currentServiceCharge ? 'Atualizar' : 'Adicionar'} Taxa</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
