import React, { useState, useCallback, useMemo } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { Edit2, CheckCircle, Eye } from 'lucide-react';
import { usePDVContext } from '../../context/PDVContext';
import { CustomDropdown } from '../ui/CustomDropdown';

interface PaymentMethod {
  id: string;
  name: string;
  value: number;
  enabled: boolean;
}

const PAYMENT_METHODS = [
  { id: 'cash', name: 'Dinheiro', value: 0, enabled: false },
  { id: 'pix', name: 'PIX', value: 0, enabled: false },
  { id: 'credit', name: 'Crédito', value: 0, enabled: false },
  { id: 'debit', name: 'Débito', value: 0, enabled: false },
];

// Interface para item do histórico de pagamento
interface PaymentHistoryItem {
  id: string;
  method: string;
  amount: number;
  status: 'paid' | 'pending';
  timestamp: string;
}



interface ModalFormasPagamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
}

// Componente para o card de valor financeiro
const FinancialCard: React.FC<{
  label: string;
  value: number;
  isEditable?: boolean;
  onEdit?: () => void;
  valueColor?: string;
  showHistory?: boolean;
  onShowHistory?: () => void;
}> = ({ label, value, isEditable = false, onEdit, valueColor = 'text-gray-800', showHistory = false, onShowHistory }) => (
  <div className="bg-white rounded-lg p-3 border border-gray-200">
    <div className="text-xs text-gray-600 mb-1">{label}</div>
    <div className="flex items-center justify-between">
      <div className={`text-base font-medium ${valueColor}`}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
      </div>
      <div className="flex items-center space-x-1">
        {showHistory && onShowHistory && (
          <button
            onClick={onShowHistory}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
            title="Ver histórico"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
        {isEditable && onEdit && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
            title="Editar valor"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);

// Componente para o card de método de pagamento
const PaymentMethodCard: React.FC<{
  method: PaymentMethod;
  onEdit: () => void;
}> = ({ method, onEdit }) => (
  <div className="bg-white rounded-lg p-3 border border-gray-200">
    <div className="text-xs text-gray-600 mb-1">{method.name}</div>
    <div className="flex items-center justify-between">
      <div className="text-base font-medium text-gray-800">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(method.value)}
      </div>
      <button
        onClick={onEdit}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
      >
        <Edit2 className="h-4 w-4" />
      </button>
    </div>
  </div>
);



// Modal de edição de serviço
const ServiceEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  value: number;
  onSave: (value: number) => void;
}> = ({ isOpen, onClose, value, onSave }) => {
  const [serviceValue, setServiceValue] = useState(value);

  // Resetar valor quando o modal abre
  React.useEffect(() => {
    if (isOpen) {
      setServiceValue(value);
    }
  }, [isOpen, value]);

  const handleSave = () => {
    onSave(serviceValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Valor do Serviço" size="sm">
      <ModalBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Serviço
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">R$</span>
              <input
                type="number"
                value={serviceValue}
                onChange={(e) => setServiceValue(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 p-2 border border-gray-300 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0 focus:border-purple-500"
                step="0.01"
                min="0"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
                <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
                </button>
                
                <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
            Salvar
                </button>
              </div>
      </ModalFooter>
    </Modal>
  );
};

// Modal de edição de desconto/acréscimo
const DiscountEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  value: number;
  type: 'discount' | 'addition';
  onSave: (value: number, type: 'discount' | 'addition') => void;
}> = ({ isOpen, onClose, value, type, onSave }) => {
  const [discountValue, setDiscountValue] = useState(value);
  const [discountType, setDiscountType] = useState(type);

  // Resetar valores quando o modal abre
  React.useEffect(() => {
    if (isOpen) {
      setDiscountValue(value);
      setDiscountType(type);
    }
  }, [isOpen, value, type]);

  const handleSave = () => {
    onSave(discountValue, discountType);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Valor do Desconto/Acréscimo" size="sm">
      <ModalBody>
        <div className="space-y-4">
                    <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Operação
                      </label>
            <CustomDropdown
              options={[
                { value: 'discount', label: 'Desconto (Reduz o valor)' },
                { value: 'addition', label: 'Acréscimo (Aumenta o valor)' }
              ]}
              selectedValue={discountType}
              onValueChange={(value) => setDiscountType(value as 'discount' | 'addition')}
              placeholder="Selecione o tipo"
              size="md"
            />
                    </div>
                    
                    <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do {discountType === 'discount' ? 'Desconto' : 'Acréscimo'}
                      </label>
                      <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">R$</span>
                        <input
                          type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 p-2 border border-gray-300 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0 focus:border-purple-500"
                          step="0.01"
                          min="0"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Modal de edição de método de pagamento
const PaymentMethodEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  method: PaymentMethod;
  onSave: (methodId: string, value: number) => void;
}> = ({ isOpen, onClose, method, onSave }) => {
  const [paymentValue, setPaymentValue] = useState(method.value);

  // Resetar valor quando o modal abre
  React.useEffect(() => {
    if (isOpen) {
      setPaymentValue(method.value);
    }
  }, [isOpen, method.value]);

  const handleSave = () => {
    onSave(method.id, paymentValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar Valor - ${method.name}`} size="sm">
      <ModalBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Pagamento
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">R$</span>
              <input
                type="number"
                value={paymentValue}
                onChange={(e) => setPaymentValue(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 p-2 border border-gray-300 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0 focus:border-purple-500"
                step="0.01"
                min="0"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Modal de histórico de pagamento
const PaymentHistoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  paymentHistory: PaymentHistoryItem[];
}> = ({ isOpen, onClose, paymentHistory }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Histórico de Pagamento" size="sm">
      <ModalBody>
        <div className="space-y-3">
          {paymentHistory.length > 0 ? (
            paymentHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Pagamento #{item.id}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.status === 'paid' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-blue-600 bg-blue-100'
                  }`}>
                    {item.status === 'paid' ? 'Pago' : 'Pendente'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {item.method} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount)}
                </div>
                <div className="text-xs text-gray-500">{item.timestamp}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Nenhum pagamento registrado ainda.</p>
              <p className="text-xs mt-1">Os pagamentos aparecerão aqui conforme forem realizados.</p>
            </div>
          )}
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export const ModalFormasPagamento: React.FC<ModalFormasPagamentoProps> = ({
  isOpen,
  onClose,
  onPaymentComplete
}) => {
  const { calculatedValues, paymentMethods: contextPaymentMethods, updatePaymentMethods } = usePDVContext();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(contextPaymentMethods || PAYMENT_METHODS);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
  const [summaryValues, setSummaryValues] = useState({
    subtotal: 0,
    discount: 0,
    service: 0,
    paid: 0,
    toPay: 0
  });

  // Atualizar valores do resumo quando o modal abrir ou os valores calculados mudarem
  React.useEffect(() => {
    if (isOpen && calculatedValues) {
      setSummaryValues({
        subtotal: calculatedValues.subtotal || 0,
        discount: calculatedValues.discountTotal || 0,
        service: calculatedValues.serviceTotal || 0,
        paid: 0,
        toPay: calculatedValues.total || 0
      });
    }
  }, [isOpen, calculatedValues]);

  // Sincronizar métodos de pagamento com o contexto
  React.useEffect(() => {
    if (isOpen && contextPaymentMethods) {
      setPaymentMethods(contextPaymentMethods);
    }
  }, [isOpen, contextPaymentMethods]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  const getTotalPaid = useCallback(() => {
    return paymentMethods.reduce((total, method) => total + method.value, 0);
  }, [paymentMethods]);

  const getRemainingAmount = useCallback(() => {
    return (calculatedValues?.total || 0) - getTotalPaid();
  }, [calculatedValues?.total, getTotalPaid]);

  const isPaymentComplete = useCallback(() => {
    return getRemainingAmount() <= 0;
  }, [getRemainingAmount]);

  const handleServiceSave = useCallback((value: number) => {
    setSummaryValues(prev => ({
      ...prev,
      service: value,
      toPay: prev.subtotal + value - prev.discount - prev.paid
    }));
  }, []);

  const handleDiscountSave = useCallback((value: number, type: 'discount' | 'addition') => {
    const discountValue = type === 'discount' ? value : -value;
    setSummaryValues(prev => ({
      ...prev,
      discount: discountValue,
      toPay: prev.subtotal + prev.service - discountValue - prev.paid
    }));
  }, []);

  const handlePaymentMethodEdit = useCallback((methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (method) {
      setSelectedPaymentMethod(method);
      setShowPaymentMethodModal(true);
    }
  }, [paymentMethods]);

  const handlePaymentMethodModalClose = useCallback(() => {
    setShowPaymentMethodModal(false);
    setSelectedPaymentMethod(null);
  }, []);

  const handlePaymentMethodSave = useCallback((methodId: string, value: number) => {
    const updatedMethods = paymentMethods.map(method => 
      method.id === methodId 
        ? { ...method, value } 
        : method
    );
    
    setPaymentMethods(updatedMethods);
    updatePaymentMethods(updatedMethods);

    // Adicionar ao histórico se o valor for maior que 0
    if (value > 0) {
      const method = paymentMethods.find(m => m.id === methodId);
      if (method) {
        const newPayment: PaymentHistoryItem = {
          id: Date.now().toString(),
          method: method.name,
          amount: value,
          status: 'paid',
          timestamp: new Date().toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        };
        setPaymentHistory(prev => [...prev, newPayment]);
      }
    }

    // Atualizar valores do resumo
    setTimeout(() => {
      const totalPaid = paymentMethods.reduce((total, method) => {
        if (method.id === methodId) {
          return total + value;
        }
        return total + method.value;
      }, 0);
      
      setSummaryValues(prev => ({
        ...prev,
        paid: totalPaid,
        toPay: Math.max(0, prev.subtotal + prev.service - prev.discount - totalPaid)
      }));
    }, 100);
  }, [paymentMethods]);

  const handleCompletePayment = useCallback(() => {
    // Atualizar o contexto com os métodos de pagamento atuais
    updatePaymentMethods(paymentMethods);
    
    // Implementar lógica para concluir pagamento
    console.log('Pagamento concluído');
    onPaymentComplete?.();
    onClose();
  }, [onClose, onPaymentComplete, paymentMethods, updatePaymentMethods]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Formas de pagamento"
        size="sm"
      >
        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
              {/* Resumo financeiro em cards */}
              <div className="grid grid-cols-3 gap-3">
                <FinancialCard
                  label="Subtotal"
                  value={summaryValues.subtotal}
                />
                
                <FinancialCard
                  label="Serviço"
                  value={summaryValues.service}
                  isEditable
                  onEdit={() => setShowServiceModal(true)}
                />
                
                <FinancialCard
                  label="Desconto"
                  value={summaryValues.discount}
                  isEditable
                  onEdit={() => setShowDiscountModal(true)}
                />
                
                <FinancialCard
                  label="Pago"
                  value={summaryValues.paid}
                  valueColor="text-green-600"
                  showHistory
                  onShowHistory={() => setShowHistoryModal(true)}
                />
                
                <FinancialCard
                  label="A pagar"
                  value={summaryValues.toPay}
                  valueColor={summaryValues.toPay > 0 ? 'text-red-600' : 'text-green-600'}
                />
              </div>

              {/* Cards de formas de pagamento */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Formas de Pagamento</h3>
                <div className="grid grid-cols-4 gap-3">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      onEdit={() => handlePaymentMethodEdit(method.id)}
                    />
                  ))}
                </div>
              </div>


            </div>
        </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex justify-between w-full">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            
            <button
              onClick={() => {
                setPaymentMethods(PAYMENT_METHODS);
                setPaymentHistory([]);
                setSummaryValues({
                  subtotal: calculatedValues?.subtotal || 0,
                  discount: calculatedValues?.discountTotal || 0,
                  service: calculatedValues?.serviceTotal || 0,
                  paid: 0,
                  toPay: calculatedValues?.total || 0
                });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar
            </button>
          </div>
          
          <button
            onClick={handleCompletePayment}
            disabled={!isPaymentComplete()}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isPaymentComplete()
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Concluir
          </button>
        </div>
      </ModalFooter>
    </Modal>

      {/* Modais de edição */}
      <ServiceEditModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        value={calculatedValues?.serviceTotal || 0}
        onSave={handleServiceSave}
      />

      <DiscountEditModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        value={calculatedValues?.discountTotal || 0}
        type="discount"
        onSave={handleDiscountSave}
      />

      {selectedPaymentMethod && (
        <PaymentMethodEditModal
          isOpen={showPaymentMethodModal}
          onClose={handlePaymentMethodModalClose}
          method={selectedPaymentMethod}
          onSave={handlePaymentMethodSave}
        />
      )}

      <PaymentHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        paymentHistory={paymentHistory}
      />
    </>
  );
};