import React, { useState, useEffect } from 'react';
import { Calculator, Percent, DollarSign, Receipt, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

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

interface AdvancedTotalCalculatorProps {
  items: PaymentItem[];
  orderType: 'dine-in' | 'delivery' | 'takeaway';
  onTotalChange: (breakdown: PaymentBreakdown) => void;
}

export const AdvancedTotalCalculator: React.FC<AdvancedTotalCalculatorProps> = ({
  items,
  orderType,
  onTotalChange
}) => {
  const [taxRate, setTaxRate] = useState(8.5); // ICMS padrão
  const [serviceCharge, setServiceCharge] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [breakdown, setBreakdown] = useState<PaymentBreakdown>({
    subtotal: 0,
    taxAmount: 0,
    serviceCharge: 0,
    discountAmount: 0,
    total: 0,
    amountPaid: 0,
    change: 0,
    remaining: 0
  });

  // Calcular totais sempre que items ou configurações mudarem
  useEffect(() => {
    calculateTotals();
  }, [items, taxRate, serviceCharge, discountType, discountValue, amountPaid]);

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => {
      const itemTotal = item.total - (item.discount || 0);
      return sum + itemTotal;
    }, 0);

    const taxAmount = (subtotal * taxRate) / 100;
    const serviceChargeAmount = (subtotal * serviceCharge) / 100;
    
    let discountAmount = 0;
    if (discountType === 'percentage') {
      discountAmount = (subtotal * discountValue) / 100;
    } else {
      discountAmount = discountValue;
    }

    const total = subtotal + taxAmount + serviceChargeAmount - discountAmount;
    const change = Math.max(0, amountPaid - total);
    const remaining = Math.max(0, total - amountPaid);

    const newBreakdown: PaymentBreakdown = {
      subtotal,
      taxAmount,
      serviceCharge: serviceChargeAmount,
      discountAmount,
      total,
      amountPaid,
      change,
      remaining
    };

    setBreakdown(newBreakdown);
    onTotalChange(newBreakdown);
  };

  const handleAmountPaidChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setAmountPaid(numValue);
  };

  const getTotalColor = () => {
    if (breakdown.remaining > 0) return 'text-red-600';
    if (breakdown.change > 0) return 'text-green-600';
    return 'text-gray-900';
  };

  const getStatusBadge = () => {
    if (breakdown.remaining > 0) return <Badge variant="destructive">Pendente</Badge>;
    if (breakdown.change > 0) return <Badge variant="default">Troco</Badge>;
    return <Badge variant="secondary">Pago</Badge>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Cálculo de Totais</h3>
      </div>

      {/* Resumo dos Itens */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Itens ({items.length})</span>
          <span className="text-sm text-gray-600">
            {items.reduce((sum, item) => sum + item.quantity, 0)} unidades
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          R$ {breakdown.subtotal.toFixed(2)}
        </div>
      </div>

      {/* Configurações de Taxas */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taxa de Imposto (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              step="0.1"
              min="0"
              max="100"
            />
            <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taxa de Serviço (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              step="0.1"
              min="0"
              max="100"
            />
            <Percent className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Sistema de Desconto */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Percent className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Desconto</span>
        </div>
        
        <div className="flex space-x-2 mb-2">
          <Button
            variant={discountType === 'percentage' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDiscountType('percentage')}
            className="text-xs"
          >
            %
          </Button>
          <Button
            variant={discountType === 'fixed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDiscountType('fixed')}
            className="text-xs"
          >
            R$
          </Button>
        </div>

        <input
          type="number"
          value={discountValue}
          onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border border-blue-200 rounded-lg text-sm"
          step="0.01"
          min="0"
          placeholder={discountType === 'percentage' ? '0.00' : '0.00'}
        />
      </div>

      {/* Valor Pago */}
      <div className="mb-4 p-3 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Valor Pago</span>
        </div>
        
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => handleAmountPaidChange(e.target.value)}
          className="w-full p-2 border border-green-200 rounded-lg text-sm font-medium"
          step="0.01"
          min="0"
          placeholder="0.00"
        />
      </div>

      {/* Resumo Final */}
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">R$ {breakdown.subtotal.toFixed(2)}</span>
          </div>
          
          {breakdown.taxAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Impostos ({taxRate}%):</span>
              <span className="font-medium text-red-600">+R$ {breakdown.taxAmount.toFixed(2)}</span>
            </div>
          )}
          
          {breakdown.serviceCharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxa de Serviço ({serviceCharge}%):</span>
              <span className="font-medium text-red-600">+R$ {breakdown.serviceCharge.toFixed(2)}</span>
            </div>
          )}
          
          {breakdown.discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Desconto:</span>
              <span className="font-medium text-green-600">-R$ {breakdown.discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getTotalColor()}`}>
                  R$ {breakdown.total.toFixed(2)}
                </span>
                {getStatusBadge()}
              </div>
            </div>
          </div>
        </div>

        {/* Troco ou Pendente */}
        {breakdown.change > 0 && (
          <div className="p-3 bg-green-100 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-800">Troco:</span>
              <span className="text-lg font-bold text-green-600">
                R$ {breakdown.change.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {breakdown.remaining > 0 && (
          <div className="p-3 bg-red-100 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-red-800">Pendente:</span>
              <span className="text-lg font-bold text-red-600">
                R$ {breakdown.remaining.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Alertas */}
      {breakdown.total > 0 && breakdown.amountPaid === 0 && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Informe o valor pago para calcular o troco
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
