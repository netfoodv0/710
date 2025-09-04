import React, { useState } from 'react';
import { usePDVContext } from '../../../context/PDVContext';
import { Copy, CreditCard, Trash2 } from 'lucide-react';
import { ModalFormasPagamento } from '../../modals/ModalFormasPagamento';

export const PDVValuesDisplay: React.FC = () => {
  const { calculatedValues, paymentMethods, selectedProducts, clearOrder } = usePDVContext();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Calcular o valor pago (soma dos valores dos métodos de pagamento selecionados)
  const valorPago = paymentMethods.reduce((total, method) => {
    if (method.enabled && method.value) {
      return total + method.value;
    }
    return total;
  }, 0);
  
  // Calcular o valor a pagar (total - valor pago)
  const valorAPagar = calculatedValues.total - valorPago;

  // Formatar valores como moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Handlers para os botões
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
      total: calculatedValues.total,
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

  const handleClearOrder = () => {
    setShowConfirmClear(true);
  };

  const confirmClearOrder = () => {
    clearOrder();
    setShowConfirmClear(false);
  };

  const handleCancelOrder = () => {
    // Lógica para cancelar o pedido
    console.log('Pedido cancelado');
    setShowCancelModal(false);
  };

  const handlePaymentMethods = () => {
    // Abrir modal de formas de pagamento
    setShowPaymentModal(true);
  };

  // Verificar se há produtos no pedido
  const hasProducts = selectedProducts.length > 0;

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-bl-2xl">
      {/* RESUMOS EM CIMA - NA MESMA LINHA HORIZONTAL */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">Subtotal</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(calculatedValues.subtotal)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">Desconto</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(calculatedValues.discountTotal || 0)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">Pago</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(valorPago)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">A pagar</div>
          <div className="text-sm font-bold text-purple-600">
            {formatCurrency(valorAPagar)}
          </div>
        </div>
      </div>

      {/* BOTÕES EM BAIXO */}
      <div className="space-y-3">
        {/* Botão de Forma de Pagamento - POR CIMA */}
        <button
          onClick={handlePaymentMethods}
          disabled={!hasProducts}
          className={`w-full flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            hasProducts
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Forma de pagamento
        </button>

        {/* Botões de ação em grid - POR BAIXO */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCancelOrder}
            disabled={!hasProducts}
            className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
              hasProducts
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Copy className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          
          <button
            onClick={handleClearOrder}
            disabled={!hasProducts}
            className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
              hasProducts
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4 mb-1" />
            Limpar
          </button>
        </div>
      </div>

      {/* Modal de Formas de Pagamento */}
      <ModalFormasPagamento
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={() => {
          console.log('Pagamento concluído');
          setShowPaymentModal(false);
        }}
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
