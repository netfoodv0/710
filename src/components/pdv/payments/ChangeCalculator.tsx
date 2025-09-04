import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Coins, Receipt, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface ChangeCalculatorProps {
  totalAmount: number;
  amountPaid: number;
  onAmountPaidChange: (amount: number) => void;
  onClose: () => void;
}

interface Denomination {
  value: number;
  label: string;
  type: 'bill' | 'coin';
  color: string;
}

const DENOMINATIONS: Denomination[] = [
  { value: 200, label: 'R$ 200', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 100, label: 'R$ 100', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 50, label: 'R$ 50', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 20, label: 'R$ 20', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 10, label: 'R$ 10', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 5, label: 'R$ 5', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 2, label: 'R$ 2', type: 'bill', color: 'bg-green-100 text-green-800' },
  { value: 1, label: 'R$ 1', type: 'coin', color: 'bg-yellow-100 text-yellow-800' },
  { value: 0.5, label: 'R$ 0,50', type: 'coin', color: 'bg-yellow-100 text-yellow-800' },
  { value: 0.25, label: 'R$ 0,25', type: 'coin', color: 'bg-yellow-100 text-yellow-800' },
  { value: 0.1, label: 'R$ 0,10', type: 'coin', color: 'bg-yellow-100 text-yellow-800' },
  { value: 0.05, label: 'R$ 0,05', type: 'coin', color: 'bg-yellow-100 text-yellow-800' },
  { value: 0.01, label: 'R$ 0,01', type: 'coin', color: 'bg-yellow-100 text-yellow-800' }
];

export const ChangeCalculator: React.FC<ChangeCalculatorProps> = ({
  totalAmount,
  amountPaid,
  onAmountPaidChange,
  onClose
}) => {
  const [quickAmounts, setQuickAmounts] = useState<number[]>([]);
  const [customAmount, setCustomAmount] = useState('');
  const [changeBreakdown, setChangeBreakdown] = useState<Record<number, number>>({});

  const change = Math.max(0, amountPaid - totalAmount);
  const remaining = Math.max(0, totalAmount - amountPaid);

  // Calcular troco em cédulas e moedas
  useEffect(() => {
    if (change > 0) {
      const breakdown = calculateChangeBreakdown(change);
      setChangeBreakdown(breakdown);
    } else {
      setChangeBreakdown({});
    }
  }, [change]);

  const calculateChangeBreakdown = (changeAmount: number): Record<number, number> => {
    const breakdown: Record<number, number> = {};
    let remainingChange = changeAmount;

    for (const denom of DENOMINATIONS) {
      if (remainingChange >= denom.value) {
        const count = Math.floor(remainingChange / denom.value);
        breakdown[denom.value] = count;
        remainingChange = Math.round((remainingChange - (count * denom.value)) * 100) / 100;
      }
    }

    return breakdown;
  };

  const addQuickAmount = (amount: number) => {
    const newAmount = amountPaid + amount;
    onAmountPaidChange(newAmount);
  };

  const handleCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onAmountPaidChange(amount);
      setCustomAmount('');
    }
  };

  const getStatusColor = () => {
    if (remaining > 0) return 'text-red-600';
    if (change > 0) return 'text-green-600';
    return 'text-gray-900';
  };

  const getStatusBadge = () => {
    if (remaining > 0) return <Badge variant="destructive">Pendente</Badge>;
    if (change > 0) return <Badge variant="default">Troco</Badge>;
    return <Badge variant="secondary">Pago</Badge>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Calculadora de Troco</h3>
      </div>

      {/* Resumo do Pedido */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Total do Pedido:</span>
          <span className="text-lg font-bold text-gray-900">R$ {totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Valor Pago:</span>
          <span className="text-lg font-bold text-green-600">R$ {amountPaid.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 mt-2 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            {getStatusBadge()}
          </div>
        </div>
      </div>

      {/* Valor Pago e Troco */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-blue-600 mb-1">Valor Pago</div>
            <div className="text-2xl font-bold text-blue-800">R$ {amountPaid.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-600 mb-1">Troco</div>
            <div className={`text-2xl font-bold ${change > 0 ? 'text-green-600' : 'text-gray-400'}`}>
              R$ {change.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Valores Rápidos */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Valores Rápidos</h4>
        <div className="grid grid-cols-3 gap-2">
          {[5, 10, 20, 50, 100, 200].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => addQuickAmount(amount)}
              className="text-sm"
            >
              +R$ {amount}
            </Button>
          ))}
        </div>
      </div>

      {/* Valor Personalizado */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor Personalizado
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            step="0.01"
            min="0"
          />
          <Button
            onClick={handleCustomAmount}
            disabled={!customAmount || parseFloat(customAmount) <= 0}
            size="sm"
          >
            Definir
          </Button>
        </div>
      </div>

      {/* Troco Detalhado */}
      {change > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Troco em Cédulas e Moedas</h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(changeBreakdown).map(([value, count]) => {
                const denom = DENOMINATIONS.find(d => d.value === parseFloat(value));
                if (!denom || count === 0) return null;
                
                return (
                  <div key={value} className="flex justify-between items-center">
                    <span className={denom.color + ' px-2 py-1 rounded text-xs font-medium'}>
                      {denom.label}
                    </span>
                    <span className="font-medium">x{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-green-200 mt-2 pt-2 text-center">
              <span className="text-sm font-medium text-green-800">
                Total do Troco: R$ {change.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Alertas */}
      {remaining > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-red-800 font-medium">
              Pagamento incompleto! Faltam R$ {remaining.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {change > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Coins className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800 font-medium">
              Prepare o troco: R$ {change.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Fechar
        </Button>
        <Button
          onClick={() => onAmountPaidChange(totalAmount)}
          className="flex-1"
        >
          Valor Exato
        </Button>
      </div>

      {/* Dicas de Uso */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2 text-sm">💡 Dicas</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use os valores rápidos para adicionar cédulas comuns</li>
          <li>• Digite valores personalizados para moedas</li>
          <li>• O sistema calcula automaticamente o troco ideal</li>
          <li>• Verifique se tem cédulas e moedas suficientes</li>
        </ul>
      </div>
    </div>
  );
};
