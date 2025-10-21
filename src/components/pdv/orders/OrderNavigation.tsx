import React, { useState } from 'react';
import { ShoppingBag, User, ChevronRight, AlertCircle } from 'lucide-react';
import { usePDVContext } from '../../../context/PDVContext';
import { CUSTOMER_VALIDATION } from '../../../constants/pdv';

type TabType = 'sacola' | 'cliente';

interface OrderNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const OrderNavigation: React.FC<OrderNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const { 
    orderType, 
    selectedCustomer, 
    customerName, 
    customerPhone, 
    selectedDeliveryPerson 
  } = usePDVContext();

  // Função para validar dados do cliente
  const validateCustomerData = () => {
    const requiredFields = CUSTOMER_VALIDATION.REQUIRED_FIELDS[orderType as keyof typeof CUSTOMER_VALIDATION.REQUIRED_FIELDS] || [];
    
    // Validar nome do cliente
    if (requiredFields.includes('name')) {
      const name = selectedCustomer?.name || customerName;
      if (!name || name.trim() === '') {
        return false;
      }
    }
    
    // Validar telefone do cliente
    if (requiredFields.includes('phone')) {
      const phone = selectedCustomer?.phone || customerPhone;
      if (!phone || phone.trim() === '') {
        return false;
      }
    }
    
    // Validar endereço para delivery
    if (requiredFields.includes('address')) {
      const address = selectedCustomer?.addresses?.find(addr => addr.isDefault) || selectedCustomer?.addresses?.[0];
      if (!address || !address.rua || !address.bairro) {
        return false;
      }
    }
    
    // Validar motoboy para delivery
    if (requiredFields.includes('deliveryPerson')) {
      if (!selectedDeliveryPerson) {
        return false;
      }
    }
    
    return true;
  };

  const isCustomerDataComplete = validateCustomerData();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex">
        {/* Tab Sacola */}
        <button
          onClick={() => onTabChange('sacola')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sacola'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag size={18} />
          <span>Sacola</span>
        </button>

        {/* Tab Cliente com indicador */}
        <button
          onClick={() => onTabChange('cliente')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'cliente'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <User size={18} />
          <span>Cliente</span>
          
          {/* Indicador de dados incompletos */}
          {!isCustomerDataComplete && (
            <div className="absolute -top-1 -right-1">
              <div className="bg-red-500 text-white rounded-full p-1 flex items-center justify-center">
                <AlertCircle size={12} />
              </div>
            </div>
          )}
        </button>
      </div>
      
      {/* Mensagem de alerta quando dados estão incompletos */}
      {!isCustomerDataComplete && activeTab === 'cliente' && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <div className="text-sm text-red-700">
              <p className="font-medium">Dados do cliente incompletos</p>
              <p className="text-xs mt-1">
                {orderType === 'delivery' 
                  ? 'Preencha: Nome, Telefone, Endereço e Motoboy'
                  : 'Preencha: Nome e Telefone'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

