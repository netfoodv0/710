import React from 'react';
import { usePDV } from '../../../hooks/usePDV';
import { X, CreditCard, CheckCircle, ShoppingCart, Plus } from 'lucide-react';

export const PDVActionBar: React.FC = () => {
  const { 
    hasProducts, 
    hasCustomer, 
    orderType, 
    canCreateOrder, 
    calculatedValues,
    clearOrder,
    createOrder
  } = usePDV();

  const handleCreateOrder = async () => {
    try {
      await createOrder();
      // Aqui você pode adicionar notificação de sucesso
      console.log('Pedido criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      // Aqui você pode adicionar notificação de erro
    }
  };

  const handleClearOrder = () => {
    if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      clearOrder();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo - Ações de Produtos */}
        <div className="flex items-center space-x-3">
          {/* Botão Editar Produtos */}
          {hasProducts && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <ShoppingCart size={16} />
              <span>Editar {calculatedValues.subtotal > 0 ? calculatedValues.subtotal.toFixed(0) : 0}</span>
            </button>
          )}

          {/* Botão Adicionar Produtos */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus size={16} />
            <span>Adicionar R$ {calculatedValues.subtotal.toFixed(2)}</span>
          </button>
        </div>

        {/* Lado Direito - Ações do Pedido */}
        <div className="flex items-center space-x-3">
          {/* Botão Cancelar */}
          <button
            onClick={handleClearOrder}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <X size={18} />
            <span>Cancelar</span>
          </button>

          {/* Botão Pagar */}
          <button
            disabled={!canCreateOrder}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <CreditCard size={18} />
            <span>Pagar</span>
          </button>

          {/* Botão Aceitar */}
          <button
            disabled={!canCreateOrder}
            onClick={handleCreateOrder}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle size={18} />
            <span>Aceitar</span>
          </button>
        </div>
      </div>

      {/* Barra de Status */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Status: {hasProducts ? 'Produtos selecionados' : 'Aguardando produtos'}</span>
            {orderType === 'delivery' && (
              <span>Cliente: {hasCustomer ? 'Selecionado' : 'Não selecionado'}</span>
            )}
          </div>
          
          <div className="text-right">
            <span className="font-medium">Total: R$ {calculatedValues.total.toFixed(2)}</span>
            {calculatedValues.discountTotal > 0 && (
              <span className="ml-3 text-green-600">
                Desconto: R$ {calculatedValues.discountTotal.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
