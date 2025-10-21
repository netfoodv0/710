import React, { useState, useMemo, useCallback } from 'react';
import { usePDVContext } from '../../../context/PDVContext';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { Copy, CreditCard, Trash2, Check, User } from 'lucide-react';
import { ModalFormasPagamento } from '../../modals/ModalFormasPagamento';
import { ModalDadosCliente } from '../../modals/ModalDadosCliente';
import { PDV_CONSTANTS, PDV_MESSAGES, PDV_LABELS, CUSTOMER_VALIDATION } from '../../../constants/pdv';

export const PDVValuesDisplay: React.FC = () => {
  const {
    calculatedValues, 
    paymentMethods, 
    selectedProducts, 
    clearOrder, 
    createOrder,
    isPaymentComplete, 
    setPaymentComplete,
    isCustomerDataComplete,
    setCustomerDataComplete,
    selectedCustomer,
    selectedDeliveryPerson,
    orderType,
    customerName,
    customerPhone,
    observations
  } = usePDVContext();
  const { showSuccess, showError } = useNotificationContext();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Calcular o valor pago (memoizado)
  const valorPago = useMemo(() => {
    return (paymentMethods || []).reduce((total, method) => {
      // Verificar se o método tem valor, independente do enabled
      if (method.value && method.value > 0) {
        return total + method.value;
      }
      return total;
    }, 0);
  }, [paymentMethods]);
  
  // Calcular o valor a pagar (memoizado)
  const valorAPagar = useMemo(() => {
    return (calculatedValues?.total || 0) - valorPago;
  }, [calculatedValues?.total, valorPago]);

  // Formatar valores como moeda (memoizado)
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat(PDV_CONSTANTS.CURRENCY_FORMAT.locale, {
      style: PDV_CONSTANTS.CURRENCY_FORMAT.style,
      currency: PDV_CONSTANTS.CURRENCY_FORMAT.currency
    }).format(value);
  }, []);

  // Handlers para os botões (com tratamento de erro)
  const handleCopyOrder = useCallback(async () => {
    try {
      const orderText = (selectedProducts || []).map(p => 
        `${p.name} x${p.quantity} - ${formatCurrency(p.price * p.quantity)}`
      ).join('\n');
      
      await navigator.clipboard.writeText(orderText);
      showSuccess(PDV_MESSAGES.ORDER_COPIED);
    } catch (error) {
      console.error('Erro ao copiar:', error);
      showError(PDV_MESSAGES.ERROR_COPY);
    }
  }, [selectedProducts, formatCurrency, showSuccess, showError]);

  const handlePrintOrder = useCallback(() => {
    try {
      window.print();
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      showError(PDV_MESSAGES.ERROR_PRINT);
    }
  }, [showError]);

  const handleExportOrder = useCallback(() => {
    try {
      const orderData = {
        products: selectedProducts,
        total: calculatedValues?.total || 0,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(orderData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pedido-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      showError(PDV_MESSAGES.ERROR_EXPORT);
    }
  }, [selectedProducts, calculatedValues?.total, showError]);

  const handleClearOrder = () => {
    setShowConfirmClear(true);
  };

  const confirmClearOrder = () => {
    clearOrder();
    setPaymentComplete(false);
    setShowConfirmClear(false);
  };

  const handleCancelOrder = useCallback(() => {
    // Lógica para cancelar o pedido
    console.log(PDV_MESSAGES.ORDER_CANCELLED);
    setShowCancelModal(false);
  }, []);

  const handlePaymentMethods = useCallback(() => {
    // Abrir modal de formas de pagamento
    setShowPaymentModal(true);
  }, []);

  const handleCustomerData = useCallback(() => {
    // Abrir modal de dados do cliente
    setShowCustomerModal(true);
  }, []);

  // Função para validar dados do cliente baseado no tipo de pedido
  const validateCustomerData = useCallback(() => {
    const requiredFields = CUSTOMER_VALIDATION.REQUIRED_FIELDS[orderType as keyof typeof CUSTOMER_VALIDATION.REQUIRED_FIELDS] || [];
    
    // Validar nome do cliente
    if (requiredFields.includes('name')) {
      const name = selectedCustomer?.name || customerName;
      if (!name || name.trim() === '') {
        return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_NAME };
      }
    }
    
    // Validar telefone do cliente
    if (requiredFields.includes('phone')) {
      const phone = selectedCustomer?.phone || customerPhone;
      if (!phone || phone.trim() === '') {
        return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_PHONE };
      }
    }
    
    // Validar endereço para delivery
    if (requiredFields.includes('address')) {
      // Para delivery, verificar se há endereço selecionado ou manual
      const hasSelectedAddress = selectedCustomer?.addresses && selectedCustomer.addresses.length > 0;
      // Como não temos acesso direto ao endereço manual do modal, vamos assumir que se o cliente foi selecionado, o endereço está ok
      // Se não há cliente selecionado, assumir que o endereço manual foi preenchido no modal
      if (!hasSelectedAddress && !selectedCustomer) {
        // Se não há cliente selecionado, assumir que o endereço foi preenchido manualmente no modal
        // Esta validação será feita no próprio modal
        return { isValid: true, message: '' };
      }
      if (!hasSelectedAddress) {
        return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_ADDRESS };
      }
    }
    
    // Validar motoboy para delivery
    if (requiredFields.includes('deliveryPerson')) {
      if (!selectedDeliveryPerson) {
        return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_DELIVERY_PERSON };
      }
    }
    
    return { isValid: true, message: '' };
  }, [orderType, selectedCustomer, customerName, customerPhone, selectedDeliveryPerson]);

  const handleFinalizeOrder = useCallback(async () => {
    // Validar pagamento
    if (!isPaymentComplete) {
      console.log(PDV_MESSAGES.PAYMENT_REQUIRED);
      showError(PDV_MESSAGES.PAYMENT_REQUIRED);
      return;
    }
    
    // Validar dados do cliente
    const customerValidation = validateCustomerData();
    if (!customerValidation.isValid) {
      console.log(customerValidation.message);
      showError(customerValidation.message);
      return;
    }
    
    try {
      // Criar e salvar o pedido no Firebase
      await createOrder();
      
      // Mostrar notificação de sucesso
      showSuccess(PDV_MESSAGES.ORDER_FINALIZED, PDV_CONSTANTS.NOTIFICATION_DURATION);
      
      // Limpar o pedido após finalizar
      clearOrder();
      setPaymentComplete(false);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      showError('Erro ao finalizar pedido. Tente novamente.');
    }
  }, [isPaymentComplete, validateCustomerData, createOrder, showSuccess, showError, clearOrder, setPaymentComplete]);

  // Verificar se há produtos no pedido (validação melhorada)
  const hasProducts = useMemo(() => {
    return selectedProducts?.length > 0 && 
           selectedProducts.every(p => p.quantity > 0 && p.price > 0);
  }, [selectedProducts]);

  // Usar o estado do contexto para dados do cliente

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-bl-2xl">
      {/* RESUMOS EM CIMA - NA MESMA LINHA HORIZONTAL */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">{PDV_LABELS.SUBTOTAL}</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(calculatedValues?.subtotal || 0)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">{PDV_LABELS.DISCOUNT}</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(calculatedValues?.discountTotal || 0)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">{PDV_LABELS.PAID}</div>
          <div className="text-sm font-bold text-purple-600 opacity-80">
            {formatCurrency(valorPago)}
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xs font-medium text-gray-600 mb-1">
            {valorAPagar < 0 ? 'Troco' : PDV_LABELS.TO_PAY}
          </div>
          <div className="text-sm font-bold text-purple-600">
            {formatCurrency(Math.abs(valorAPagar))}
          </div>
        </div>
      </div>

      {/* BOTÕES EM BAIXO */}
      <div className="space-y-3">
        {/* Botões de Cliente, Pagamento e Finalizar - NA MESMA LINHA */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleCustomerData}
            disabled={!hasProducts}
            aria-label="Abrir modal de dados do cliente"
            className={`flex items-center justify-center px-3 py-2 rounded font-medium text-sm transition-all ${
              hasProducts
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Cliente
          </button>
          
          <button
            onClick={handlePaymentMethods}
            disabled={!hasProducts}
            aria-label="Abrir modal de formas de pagamento"
            className={`flex items-center justify-center px-3 py-2 rounded font-medium text-sm transition-all ${
              hasProducts
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {PDV_LABELS.PAYMENT}
          </button>
          
          <button
            onClick={handleFinalizeOrder}
            disabled={!hasProducts || !isPaymentComplete || !isCustomerDataComplete}
            aria-label={
              !hasProducts 
                ? 'Adicione produtos ao pedido'
                : !isPaymentComplete 
                  ? 'Complete o pagamento primeiro'
                  : !isCustomerDataComplete
                    ? 'Complete os dados do cliente'
                    : 'Finalizar pedido'
            }
            className={`flex items-center justify-center px-3 py-2 rounded font-medium text-sm transition-all ${
              hasProducts && isPaymentComplete && isCustomerDataComplete
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {PDV_LABELS.FINALIZE}
          </button>
        </div>

        {/* Botões de ação em grid - POR BAIXO */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCancelOrder}
            disabled={!hasProducts}
            aria-label="Cancelar pedido"
            className={`p-2 rounded flex flex-col items-center justify-center text-sm font-bold transition-colors ${
              hasProducts
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {PDV_LABELS.CANCEL}
          </button>
          
          <button
            onClick={handleClearOrder}
            disabled={!hasProducts}
            aria-label="Limpar pedido"
            className={`p-2 rounded flex flex-col items-center justify-center text-sm font-bold transition-colors ${
              hasProducts
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {PDV_LABELS.CLEAR}
          </button>
        </div>
      </div>

      {/* Modal de Formas de Pagamento */}
      <ModalFormasPagamento
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={() => {
          console.log(PDV_MESSAGES.PAYMENT_COMPLETE);
          setPaymentComplete(true);
          setShowPaymentModal(false);
        }}
      />

      {/* Modal de Dados do Cliente */}
      <ModalDadosCliente
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onDataComplete={() => {
          // Dados foram salvos, modal será fechado automaticamente
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
