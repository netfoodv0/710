import React, { useState } from 'react';
import { Edit2, Trash2, Copy, Share2, Printer, Download, Eye, CreditCard, DollarSign, QrCode, Truck } from 'lucide-react';
import { usePDVContext } from '../../../context/PDVContext';
import { ModalFormasPagamento } from '../../modals/ModalFormasPagamento';

export const OrderActions: React.FC = () => {
  const { 
    selectedProducts, 
    clearOrder, 
    createOrder,
    deliveryFee,
    discounts,
    serviceCharges
  } = usePDVContext();
  
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Calcular totais
  const subtotal = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const discountTotal = (discounts || []).reduce((sum, d) => {
    if (d.type === 'percentage') {
      return sum + (subtotal * (d.value / 100));
    }
    return sum + d.value;
  }, 0);
  const serviceTotal = (serviceCharges || []).reduce((sum, s) => sum + s.value, 0);
  const total = subtotal - discountTotal + serviceTotal + (deliveryFee || 0);

  const handleClearOrder = () => {
    setShowConfirmClear(true);
  };

  const confirmClearOrder = () => {
    clearOrder();
    setShowConfirmClear(false);
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder();
      console.log('Pedido criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  const handleCopyOrder = () => {
    const orderText = selectedProducts.map(p => 
      `${p.name} x${p.quantity} - R$ ${(p.price * p.quantity).toFixed(2)}`
    ).join('\n');
    
    navigator.clipboard.writeText(orderText).then(() => {
      console.log('Pedido copiado para a área de transferência!');
    });
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleExportOrder = () => {
    const orderData = {
      products: selectedProducts,
      total: total,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(orderData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedido-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Verificar se há produtos no pedido
  const hasProducts = selectedProducts.length > 0;

  return (
    <div className="space-y-3">
      {/* Botão de Pagamento */}
      <button
        onClick={() => setShowPaymentModal(true)}
        disabled={!hasProducts}
        className={`w-full flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-all ${
          hasProducts
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        <DollarSign className="w-4 h-4 mr-2" />
        Pagamento
        <span className="ml-2 font-bold">
          R$ {total.toFixed(2)}
        </span>
      </button>

      {/* Outras ações */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleCopyOrder}
          disabled={!hasProducts}
          className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
            hasProducts
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Copy className="w-4 h-4 mb-1" />
          Copiar
        </button>
        
        <button
          onClick={handlePrintOrder}
          disabled={!hasProducts}
          className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
            hasProducts
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Printer className="w-4 h-4 mb-1" />
          Imprimir
        </button>
        
        <button
          onClick={handleExportOrder}
          disabled={!hasProducts}
          className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
            hasProducts
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4 mb-1" />
          Exportar
        </button>
      </div>

      {/* Botão de Limpar Pedido */}
      <button
        onClick={handleClearOrder}
        disabled={!hasProducts}
        className={`w-full flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-all ${
          hasProducts
            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Limpar
      </button>

      {/* Modal de Formas de Pagamento */}
      <ModalFormasPagamento
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handleCreateOrder}
      />

      {/* Modal de Confirmação para Limpar Pedido */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trash2 size={20} className="text-red-600" />
              </div>
              
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Limpar Pedido?
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                Tem certeza que deseja limpar o pedido?
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-3 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  Cancelar
                </button>
                
                <button
                  onClick={confirmClearOrder}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};