import React, { useState } from 'react';
import { usePDV } from '../../../hooks/usePDV';
import { Input } from '../../ui/input';
import { UserIcon } from '../../ui/UserIcon';
import { ModalSelecaoCliente } from '../../modals/ModalSelecaoCliente';
import { ModalEndereco } from '../../modals/ModalEndereco';
import { ModalSelecaoMotoboy } from '../../modals/ModalSelecaoMotoboy';

// Dados fictícios de clientes com endereços
const mockCustomers = [
  { 
    id: 1, 
    name: 'João Silva', 
    phone: '(11) 99999-1111',
    address: 'Rua das Flores, 123 - Jardim Primavera, São Paulo - SP, 01234-567'
  },
  { 
    id: 2, 
    name: 'Maria Oliveira', 
    phone: '(21) 98888-2222',
    address: 'Avenida Brasil, 456 - Centro, Rio de Janeiro - RJ, 12345-678'
  },
  { 
    id: 3, 
    name: 'Carlos Souza', 
    phone: '(31) 97777-3333',
    address: 'Rua da Praça, 789 - Savassi, Belo Horizonte - MG, 23456-789'
  },
  { 
    id: 4, 
    name: 'Ana Costa', 
    phone: '(41) 96666-4444',
    address: 'Rua das Palmeiras, 101 - Batel, Curitiba - PR, 34567-890'
  },
  { 
    id: 5, 
    name: 'Pedro Santos', 
    phone: '(51) 95555-5555',
    address: 'Avenida Liberdade, 202 - Liberdade, Porto Alegre - RS, 45678-901'
  },
  { 
    id: 6, 
    name: 'Juliana Pereira', 
    phone: '(61) 94444-6666',
    address: 'Rua dos Girassóis, 303 - Asa Sul, Brasília - DF, 56789-012'
  },
  { 
    id: 7, 
    name: 'Roberto Almeida', 
    phone: '(71) 93333-7777',
    address: 'Avenida Oceânica, 404 - Barra, Salvador - BA, 67890-123'
  },
  { 
    id: 8, 
    name: 'Fernanda Lima', 
    phone: '(81) 92222-8888',
    address: 'Rua do Comércio, 505 - Boa Vista, Recife - PE, 78901-234'
  },
];

// Dados fictícios de motoboys
const mockDeliveryPersons = [
  { 
    id: '1', 
    name: 'Carlos Silva', 
    phone: '(11) 98765-4321',
    vehicle: 'Moto Honda CG 160',
    available: true
  },
  { 
    id: '2', 
    name: 'Ana Oliveira', 
    phone: '(11) 99876-5432',
    vehicle: 'Moto Yamaha Factor',
    available: true
  },
  { 
    id: '3', 
    name: 'Roberto Santos', 
    phone: '(11) 91234-5678',
    vehicle: 'Moto Honda Bros',
    available: false
  },
  { 
    id: '4', 
    name: 'Fernanda Costa', 
    phone: '(11) 92345-6789',
    vehicle: 'Moto Yamaha Fazer',
    available: true
  },
];

interface Cliente {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export const OrderStatus: React.FC = () => {
  const { calculatedValues, customerName, customerPhone, observations, orderType, selectedDeliveryPerson, selectDeliveryPerson, setOrderType, updateCustomerName, updateCustomerPhone, updateObservations } = usePDV();
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeliveryPersonModalOpen, setIsDeliveryPersonModalOpen] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('');

  const handleCustomerSelect = (customer: Cliente) => {
    updateCustomerName(customer.name);
    updateCustomerPhone(customer.phone);
    setDisplayAddress(customer.address);
  };

  const handleAddressSave = (endereco: string) => {
    setDisplayAddress(endereco);
  };

  return (
    <div className="space-y-3">
      {/* Abas de Navegação */}
      <div className="flex rounded-lg border border-gray-300 overflow-hidden">
        <button
          className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
            orderType === 'delivery' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setOrderType('delivery')}
        >
          Delivery
        </button>
        <button
          className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
            orderType === 'pickup' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setOrderType('pickup')}
        >
          Retirada
        </button>
        <button
          className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
            orderType === 'table' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setOrderType('table')}
        >
          Balcão
        </button>
      </div>

      {/* Inputs de Nome e Telefone do Cliente */}
      <div className="grid grid-cols-2 gap-3">
        {/* Input Nome do Cliente */}
        <div className="flex items-center">
          <div 
            className="p-1 border border-gray-300 border-r-0 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-white"
            style={{ height: '36px', width: '36px' }}
            onClick={() => setIsCustomerModalOpen(true)}
          >
            <UserIcon size={20} className="text-purple-600" />
          </div>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => updateCustomerName(e.target.value)}
            placeholder="Nome do cliente"
            className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-l-none rounded-r-lg bg-white"
            style={{ height: '36px' }}
          />
        </div>

        {/* Input Telefone do Cliente */}
        <div className="flex items-center">
          <div 
            className="p-1 border border-gray-300 border-r-0 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-white"
            style={{ height: '36px', width: '36px' }}
            onClick={() => setIsCustomerModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <Input
            type="text"
            value={customerPhone}
            onChange={(e) => updateCustomerPhone(e.target.value)}
            placeholder="Telefone"
            className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-l-none rounded-r-lg bg-white"
            style={{ height: '36px' }}
          />
        </div>
      </div>

      {/* Botão Endereço - Apenas para Delivery */}
      {orderType === 'delivery' && (
        <div className="flex items-center">
                  <div 
          className="p-1 border border-gray-300 border-r-0 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-white"
          style={{ height: '36px', width: '36px' }}
          onClick={() => setIsAddressModalOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <Input
            type="text"
            value={displayAddress}
            readOnly
            placeholder="Endereço"
            className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-l-none rounded-r-lg bg-white cursor-pointer"
            style={{ height: '36px' }}
            onClick={() => setIsAddressModalOpen(true)}
          />
        </div>
      )}

      {/* Campo de Seleção de Motoboy - Apenas para Delivery */}
      {orderType === 'delivery' && (
        <div className="flex items-center">
                  <div 
          className="p-1 border border-gray-300 border-r-0 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-white"
          style={{ height: '36px', width: '36px' }}
          onClick={() => setIsDeliveryPersonModalOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-4a1 1 0 00-.293-.707l-4-4A1 1 0 0016 4H3z" />
            </svg>
          </div>
          <Input
            type="text"
            value={selectedDeliveryPerson ? selectedDeliveryPerson.name : ''}
            readOnly
            placeholder="Selecionar motoboy"
            className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-l-none rounded-r-lg bg-white cursor-pointer"
            style={{ height: '36px' }}
            onClick={() => setIsDeliveryPersonModalOpen(true)}
          />
        </div>
      )}

      {/* Campo de Observações */}
      <div className="flex items-center">
        <div 
          className="p-1 border border-gray-300 border-r-0 rounded-l-lg flex items-center justify-center"
          style={{ height: '36px', width: '36px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <Input
          type="text"
          value={observations}
          onChange={(e) => updateObservations(e.target.value)}
          placeholder="Observações"
          className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-l-none rounded-r-lg bg-white"
          style={{ height: '36px' }}
        />
      </div>

      {/* Modal de Seleção de Motoboy */}
      <ModalSelecaoMotoboy
        isOpen={isDeliveryPersonModalOpen}
        onClose={() => setIsDeliveryPersonModalOpen(false)}
        onSelect={selectDeliveryPerson}
        motoboys={mockDeliveryPersons}
        selectedMotoboy={selectedDeliveryPerson}
      />

      {/* Modal de Seleção de Cliente */}
      <ModalSelecaoCliente
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSelect={handleCustomerSelect}
        clientes={mockCustomers}
      />

      {/* Modal de Endereço */}
      <ModalEndereco
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleAddressSave}
      />
    </div>
  );
};
