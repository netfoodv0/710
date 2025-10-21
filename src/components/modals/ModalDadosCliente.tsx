import React, { useState, useEffect } from 'react';
import { User, Phone, MessageSquare } from 'lucide-react';
import { usePDVContext } from '../../context/PDVContext';
import { CUSTOMER_VALIDATION } from '../../constants/pdv';
import { Button } from '../ui/button';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { FormInput } from '../forms/FormInput';
import { ModalEndereco } from './ModalEndereco';

interface ModalDadosClienteProps {
  isOpen: boolean;
  onClose: () => void;
  onDataComplete: () => void;
}

// Dados fictícios de clientes
const mockCustomers = [
  { 
    id: 1, 
    name: 'João Silva', 
    phone: '(11) 99999-1111',
    addresses: [
      { id: 1, rua: 'Rua das Flores, 123', bairro: 'Jardim Primavera', cidade: 'São Paulo', cep: '01234-567', isDefault: true }
    ]
  },
  { 
    id: 2, 
    name: 'Maria Oliveira', 
    phone: '(21) 98888-2222',
    addresses: [
      { id: 2, rua: 'Avenida Brasil, 456', bairro: 'Centro', cidade: 'Rio de Janeiro', cep: '12345-678', isDefault: true }
    ]
  },
  { 
    id: 3, 
    name: 'Carlos Souza', 
    phone: '(31) 97777-3333',
    addresses: [
      { id: 3, rua: 'Rua da Praça, 789', bairro: 'Savassi', cidade: 'Belo Horizonte', cep: '23456-789', isDefault: true }
    ]
  }
];

// Dados fictícios de motoboys
const mockDeliveryPersons = [
  { id: '1', name: 'Pedro Santos', phone: '(11) 99999-0001', status: 'available' },
  { id: '2', name: 'Ana Costa', phone: '(11) 99999-0002', status: 'available' },
  { id: '3', name: 'Roberto Lima', phone: '(11) 99999-0003', status: 'busy' },
  { id: '4', name: 'Fernanda Silva', phone: '(11) 99999-0004', status: 'available' }
];

export const ModalDadosCliente: React.FC<ModalDadosClienteProps> = ({
  isOpen,
  onClose,
  onDataComplete
}) => {
  const {
    orderType,
    selectedCustomer,
    customerName,
    customerPhone,
    customerAddress,
    observations,
    selectedDeliveryPerson,
    selectCustomer,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerAddress,
    updateObservations,
    selectDeliveryPerson,
    setOrderType,
    setCustomerDataComplete
  } = usePDVContext();

  const [localCustomerName, setLocalCustomerName] = useState('');
  const [localCustomerPhone, setLocalCustomerPhone] = useState('');
  const [localObservations, setLocalObservations] = useState('');
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [showDeliveryPersonList, setShowDeliveryPersonList] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [manualAddress, setManualAddress] = useState('');

  // Inicializar valores quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setLocalCustomerName(selectedCustomer?.name || customerName || '');
      setLocalCustomerPhone(selectedCustomer?.phone || customerPhone || '');
      setLocalObservations(observations || '');
      setSelectedAddress(selectedCustomer?.addresses?.find((addr: any) => addr.isDefault) || selectedCustomer?.addresses?.[0] || null);
      setManualAddress(customerAddress || '');
    }
  }, [isOpen, selectedCustomer, customerName, customerPhone, customerAddress, observations]);

  // Salvar dados automaticamente no contexto quando mudarem
  useEffect(() => {
    if (isOpen) {
      updateCustomerName(localCustomerName);
      updateCustomerPhone(localCustomerPhone);
      updateObservations(localObservations);
      updateCustomerAddress(manualAddress);
    }
  }, [localCustomerName, localCustomerPhone, localObservations, manualAddress, isOpen, updateCustomerName, updateCustomerPhone, updateObservations, updateCustomerAddress]);

  // Validar se os dados estão completos
  const validateData = () => {
    const requiredFields = CUSTOMER_VALIDATION.REQUIRED_FIELDS[orderType as keyof typeof CUSTOMER_VALIDATION.REQUIRED_FIELDS] || [];
    
    // Validar nome
    if (requiredFields.includes('name') && (!localCustomerName || localCustomerName.trim() === '')) {
      return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_NAME };
    }
    
    // Validar telefone
    if (requiredFields.includes('phone') && (!localCustomerPhone || localCustomerPhone.trim() === '')) {
      return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_PHONE };
    }
    
    // Validar endereço para delivery
    if (requiredFields.includes('address') && !selectedAddress && !manualAddress.trim()) {
      return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_ADDRESS };
    }
    
    // Validar motoboy para delivery
    if (requiredFields.includes('deliveryPerson') && !selectedDeliveryPerson) {
      return { isValid: false, message: CUSTOMER_VALIDATION.MESSAGES.MISSING_DELIVERY_PERSON };
    }
    
    return { isValid: true, message: '' };
  };

  const handleSave = () => {
    const validation = validateData();
    
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Salvar dados no contexto
    updateCustomerName(localCustomerName);
    updateCustomerPhone(localCustomerPhone);
    updateObservations(localObservations);
    
    // Se selecionou um cliente, salvar no contexto
    if (selectedCustomer) {
      selectCustomer(selectedCustomer);
    }
    
    // Marcar dados do cliente como completos
    setCustomerDataComplete(true);
    
    onDataComplete();
    onClose();
  };

  const handleCustomerSelect = (customer: any) => {
    selectCustomer(customer);
    setLocalCustomerName(customer.name);
    setLocalCustomerPhone(customer.phone);
    setSelectedAddress(customer.addresses?.find((addr: any) => addr.isDefault) || customer.addresses?.[0] || null);
    setManualAddress(''); // Limpar endereço manual quando cliente for selecionado
    setShowCustomerList(false);
  };

  const handleDeliveryPersonSelect = (deliveryPerson: any) => {
    selectDeliveryPerson(deliveryPerson);
    setShowDeliveryPersonList(false);
  };

  const handleAddressSave = (address: string) => {
    setManualAddress(address);
    updateCustomerAddress(address); // Salvar no contexto
    setSelectedAddress(null); // Limpar endereço selecionado quando salvar manual
    setShowAddressModal(false);
  };

  const getRequiredFields = () => {
    return CUSTOMER_VALIDATION.REQUIRED_FIELDS[orderType as keyof typeof CUSTOMER_VALIDATION.REQUIRED_FIELDS] || [];
  };

  const requiredFields = getRequiredFields();

  return (
    <>
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dados do Cliente"
      size="sm"
    >
      <ModalBody className="max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {/* Seleção de Tipo de Pedido */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tipo de Pedido <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                  orderType === 'delivery'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                  orderType === 'pickup'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Retirada
              </button>
              <button
                type="button"
                onClick={() => setOrderType('balcao')}
                className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                  orderType === 'balcao'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Balcão
              </button>
            </div>
          </div>


          {/* Nome do Cliente */}
          <FormInput
            label="Nome do Cliente"
            type="text"
            value={localCustomerName}
            onChange={(value) => setLocalCustomerName(value as string)}
            placeholder="Digite o nome do cliente"
            required={requiredFields.includes('name')}
            className={requiredFields.includes('name') && !localCustomerName ? 'border-red-300' : ''}
          />

          {/* Telefone do Cliente */}
          <div className="flex gap-2">
            <div className="flex-1">
              <FormInput
                label="Telefone"
                type="tel"
                value={localCustomerPhone}
                onChange={(value) => setLocalCustomerPhone(value as string)}
                placeholder="Digite o telefone"
                required={requiredFields.includes('phone')}
                className={requiredFields.includes('phone') && !localCustomerPhone ? 'border-red-300' : ''}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowCustomerList(true)}
              className="px-3 self-end"
            >
              Buscar
            </Button>
          </div>

          {/* Endereço - Apenas para Delivery */}
          {orderType === 'delivery' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Endereço de Entrega {requiredFields.includes('address') && <span className="text-red-500">*</span>}
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddressModal(true)}
                className="w-full justify-start h-10 text-left"
              >
                {selectedAddress ? `${selectedAddress.rua}, ${selectedAddress.bairro}, ${selectedAddress.cidade} - ${selectedAddress.cep}` : manualAddress || 'Clique para adicionar endereço'}
              </Button>
            </div>
          )}

          {/* Motoboy - Apenas para Delivery */}
          {orderType === 'delivery' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Motoboy {requiredFields.includes('deliveryPerson') && <span className="text-red-500">*</span>}
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeliveryPersonList(true)}
                className="w-full justify-start"
              >
                {selectedDeliveryPerson ? selectedDeliveryPerson.name : 'Selecionar motoboy'}
              </Button>
            </div>
          )}

          {/* Observações */}
          <FormInput
            label="Observações"
            type="textarea"
            value={localObservations}
            onChange={(value) => setLocalObservations(value as string)}
            placeholder="Observações do pedido (opcional)"
            rows={3}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          Salvar Dados
        </Button>
      </ModalFooter>

      {/* Modal de Lista de Clientes */}
      {showCustomerList && (
        <Modal
          isOpen={showCustomerList}
          onClose={() => setShowCustomerList(false)}
          title="Selecionar Cliente"
          size="sm"
        >
          <ModalBody>
            <div className="space-y-2">
              {mockCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </button>
              ))}
            </div>
          </ModalBody>
        </Modal>
      )}


    </Modal>

    {/* Modal de Lista de Motoboys - Fora do modal principal */}
    {showDeliveryPersonList && (
      <Modal
        isOpen={showDeliveryPersonList}
        onClose={() => setShowDeliveryPersonList(false)}
        title="Selecionar Motoboy"
        size="sm"
      >
        <ModalBody>
          <div className="space-y-2">
            {mockDeliveryPersons.map((person) => (
              <button
                key={person.id}
                onClick={() => handleDeliveryPersonSelect(person)}
                disabled={person.status === 'busy'}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  person.status === 'busy'
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{person.name}</div>
                <div className="text-sm text-gray-500">{person.phone}</div>
                <div className={`text-xs ${person.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                  {person.status === 'available' ? 'Disponível' : 'Ocupado'}
                </div>
              </button>
            ))}
          </div>
        </ModalBody>
      </Modal>
    )}

    {/* Modal de Endereço - Fora do modal principal */}
    <ModalEndereco
      isOpen={showAddressModal}
      onClose={() => setShowAddressModal(false)}
      onSave={handleAddressSave}
    />
    </>
  );
};
