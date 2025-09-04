import React, { useState, useEffect } from 'react';
import { usePDV } from '../../../hooks/usePDV';
import { User, MapPin, Phone, Mail, Edit, Plus } from 'lucide-react';
import { CustomerForm } from './CustomerForm';
import { ThreeDotsIcon } from '../../ui/ThreeDotsIcon';

export const CustomerInfo: React.FC = () => {
  const { selectedCustomer, orderType } = usePDV();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCustomerMenu && !(event.target as Element).closest('.customer-menu')) {
        setShowCustomerMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustomerMenu]);

  if (!selectedCustomer) {
    return (
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Cliente</h4>
          <div className="relative customer-menu">
            <button 
              onClick={() => setShowCustomerMenu(!showCustomerMenu)}
              className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
            >
              <ThreeDotsIcon size={20} color="#666666" />
            </button>
            
            {/* Menu dropdown */}
            {showCustomerMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setShowCustomerMenu(false);
                      setShowCustomerForm(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Selecionar Cliente
                  </button>
                  <button 
                    onClick={() => {
                      setShowCustomerMenu(false);
                      setShowCustomerForm(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Novo Cliente
                  </button>
                  <button 
                    onClick={() => {
                      setShowCustomerMenu(false);
                      // Aqui você pode implementar a lógica para remover o cliente
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sem Cliente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Formulário de Cliente */}
        {showCustomerForm && (
          <CustomerForm
            onClose={() => setShowCustomerForm(false)}
            customer={null}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header do Cliente */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium">{selectedCustomer.name}</h4>
            <p className="text-blue-100 text-sm">
              Cliente {orderType === 'delivery' ? 'de Delivery' : 'da Mesa'}
            </p>
          </div>
          <button
            onClick={() => setShowCustomerForm(true)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
        </div>
      </div>

      {/* Informações do Cliente */}
      <div className="p-4 space-y-3">
        {/* Telefone */}
        {selectedCustomer.phone && (
          <div className="flex items-center space-x-3 text-sm">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-700">{selectedCustomer.phone}</span>
          </div>
        )}

        {/* Email */}
        {selectedCustomer.email && (
          <div className="flex items-center space-x-3 text-sm">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-700">{selectedCustomer.email}</span>
          </div>
        )}

        {/* Endereço */}
        {selectedCustomer.address && (
          <div className="flex items-start space-x-3 text-sm">
            <MapPin size={16} className="text-gray-400 mt-0.5" />
            <div className="text-gray-700">
              <p>{selectedCustomer.address.street}, {selectedCustomer.address.number}</p>
              {selectedCustomer.address.complement && (
                <p className="text-gray-500">{selectedCustomer.address.complement}</p>
              )}
              <p>{selectedCustomer.address.neighborhood} - {selectedCustomer.address.city}</p>
              <p>{selectedCustomer.address.state} - CEP: {selectedCustomer.address.zipCode}</p>
            </div>
          </div>
        )}

        {/* Observações */}
        {selectedCustomer.observations && (
          <div className="pt-3 border-t border-gray-200">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Observações</h5>
            <p className="text-sm text-gray-600">{selectedCustomer.observations}</p>
          </div>
        )}
      </div>

      {/* Modal de Formulário de Cliente */}
      {showCustomerForm && (
        <CustomerForm
          onClose={() => setShowCustomerForm(false)}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};
