import React, { useState } from 'react';
import { CreditCard, DollarSign, Smartphone, Receipt, Plus, X, Edit2, Trash2 } from 'lucide-react';
import { usePDV } from '../../../hooks/usePDV';
import { PaymentMethod } from '../../../types/pdv';

export const PaymentMethods: React.FC = () => {
  const { selectedPaymentMethods, addPaymentMethod, removePaymentMethod, updatePaymentMethod } = usePDV();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);

  // Métodos de pagamento disponíveis
  const availableMethods = [
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      icon: <CreditCard size={20} />,
      color: 'bg-blue-100 text-blue-600',
      description: 'Visa, Mastercard, etc.'
    },
    {
      id: 'debit_card',
      name: 'Cartão de Débito',
      icon: <CreditCard size={20} />,
      color: 'bg-green-100 text-green-600',
      description: 'Débito automático'
    },
    {
      id: 'cash',
      name: 'Dinheiro',
      icon: <DollarSign size={20} />,
      color: 'bg-green-100 text-green-600',
      description: 'Pagamento em espécie'
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: <Smartphone size={20} />,
      color: 'bg-purple-100 text-purple-600',
      description: 'Transferência instantânea'
    },
    {
      id: 'transfer',
      name: 'Transferência',
      icon: <Receipt size={20} />,
      color: 'bg-orange-100 text-orange-600',
      description: 'TED/DOC bancário'
    }
  ];

  const handleAddMethod = (methodId: string) => {
    const method = availableMethods.find(m => m.id === methodId);
    if (method) {
      const newPaymentMethod: PaymentMethod = {
        id: `${methodId}_${Date.now()}`,
        type: methodId,
        name: method.name,
        amount: 0,
        installments: methodId.includes('credit') ? 1 : 1,
        maxInstallments: methodId.includes('credit') ? 12 : 1,
        description: '',
        isDefault: selectedPaymentMethods.length === 0
      };
      addPaymentMethod(newPaymentMethod);
      setShowAddForm(false);
    }
  };

  const handleRemoveMethod = (methodId: string) => {
    if (window.confirm('Tem certeza que deseja remover este método de pagamento?')) {
      removePaymentMethod(methodId);
    }
  };

  const handleUpdateMethod = (methodId: string, updates: Partial<PaymentMethod>) => {
    updatePaymentMethod(methodId, updates);
    setEditingMethod(null);
  };

  const handleSetDefault = (methodId: string) => {
    selectedPaymentMethods.forEach(method => {
      updatePaymentMethod(method.id, { isDefault: method.id === methodId });
    });
  };

  const getMethodInfo = (methodId: string) => {
    return availableMethods.find(m => m.id === methodId);
  };

  const getTotalAmount = () => {
    return selectedPaymentMethods.reduce((sum, method) => sum + method.amount, 0);
  };

  const getRemainingAmount = () => {
    const total = getTotalAmount();
    // Aqui você pode integrar com o total do pedido
    return Math.max(0, 100 - total); // Mock: pedido de R$ 100
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 flex items-center">
          <CreditCard size={16} className="mr-2" />
          Métodos de Pagamento
        </h4>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          <Plus size={16} />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Métodos Selecionados */}
      {selectedPaymentMethods.length > 0 && (
        <div className="space-y-3">
          {selectedPaymentMethods.map((method) => {
            const methodInfo = getMethodInfo(method.type);
            
            if (editingMethod?.id === method.id) {
              return (
                <PaymentMethodEditForm
                  key={method.id}
                  method={method}
                  onSave={(updates) => handleUpdateMethod(method.id, updates)}
                  onCancel={() => setEditingMethod(null)}
                />
              );
            }

            return (
              <div key={method.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${methodInfo?.color}`}>
                      {methodInfo?.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{methodInfo?.name}</h5>
                      <p className="text-sm text-gray-500">{methodInfo?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        Padrão
                      </span>
                    )}
                    <button
                      onClick={() => setEditingMethod(method)}
                      className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar método"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleRemoveMethod(method.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover método"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Valor:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      R$ {method.amount.toFixed(2)}
                    </span>
                  </div>
                  
                  {method.installments > 1 && (
                    <div>
                      <span className="text-gray-600">Parcelas:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {method.installments}x
                      </span>
                    </div>
                  )}
                  
                  {method.description && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Observação:</span>
                      <span className="ml-2 text-gray-900">{method.description}</span>
                    </div>
                  )}
                </div>

                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="mt-3 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded transition-colors"
                  >
                    Definir como padrão
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Resumo de Valores */}
      {selectedPaymentMethods.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Resumo de Pagamentos</h5>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Pago:</span>
              <span className="font-medium text-green-600">
                R$ {getTotalAmount().toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Restante:</span>
              <span className={`font-medium ${getRemainingAmount() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                R$ {getRemainingAmount().toFixed(2)}
              </span>
            </div>
            
            {getRemainingAmount() === 0 && (
              <div className="text-center mt-3 p-2 bg-green-100 text-green-800 rounded-lg text-xs">
                ✅ Pagamento completo!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para Adicionar Método */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Adicionar Método de Pagamento</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {availableMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleAddMethod(method.id)}
                    className="w-full p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {selectedPaymentMethods.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <CreditCard size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Nenhum método de pagamento selecionado</p>
          <p className="text-xs">Clique em "Adicionar" para começar</p>
        </div>
      )}
    </div>
  );
};

// Componente para editar método de pagamento
interface PaymentMethodEditFormProps {
  method: PaymentMethod;
  onSave: (updates: Partial<PaymentMethod>) => void;
  onCancel: () => void;
}

const PaymentMethodEditForm: React.FC<PaymentMethodEditFormProps> = ({ method, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: method.amount,
    installments: method.installments,
    description: method.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-purple-300">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              required
            />
          </div>
          
          {method.maxInstallments > 1 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Parcelas
              </label>
              <select
                value={formData.installments}
                onChange={(e) => setFormData(prev => ({ ...prev, installments: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                {Array.from({ length: method.maxInstallments }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}x</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Observação
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            placeholder="Ex: Cartão principal, PIX preferencial..."
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
