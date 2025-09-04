import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Star, Save, X, Plus } from 'lucide-react';
import { usePDV } from '../../../hooks/usePDV';
import { Customer, Address } from '../../../types/global/customers';

interface CustomerFormProps {
  onClose: () => void;
  customer?: Customer | null;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onClose, customer }) => {
  const { selectCustomer } = usePDV();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    isFavorite: customer?.isFavorite || false
  });
  const [addresses, setAddresses] = useState<Address[]>(
    customer?.addresses || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddressChange = (index: number, field: string, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: `temp-${Date.now()}`,
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    
    // Se removemos o endereço padrão, definir o primeiro como padrão
    if (newAddresses.length > 0 && addresses[index].isDefault) {
      newAddresses[0].isDefault = true;
    }
    
    setAddresses(newAddresses);
  };

  const handleSetDefaultAddress = (index: number) => {
    const newAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setAddresses(newAddresses);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (addresses.length > 0) {
      addresses.forEach((address, index) => {
        if (!address.street.trim()) {
          newErrors[`address_${index}_street`] = 'Rua é obrigatória';
        }
        if (!address.number.trim()) {
          newErrors[`address_${index}_number`] = 'Número é obrigatório';
        }
        if (!address.neighborhood.trim()) {
          newErrors[`address_${index}_neighborhood`] = 'Bairro é obrigatório';
        }
        if (!address.city.trim()) {
          newErrors[`address_${index}_city`] = 'Cidade é obrigatória';
        }
        if (!address.state.trim()) {
          newErrors[`address_${index}_state`] = 'Estado é obrigatório';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newCustomer: Customer = {
      id: customer?.id || `customer-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      addresses: addresses,
      isFavorite: formData.isFavorite,
      createdAt: customer?.createdAt || new Date(),
      updatedAt: new Date()
    };

    selectCustomer(newCustomer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {customer ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <p className="text-sm text-gray-500">
                {customer ? 'Atualize as informações do cliente' : 'Preencha os dados do novo cliente'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Dados Básicos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Digite o nome completo"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="cliente@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Favorito */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFavorite}
                    onChange={(e) => handleInputChange('isFavorite', e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Cliente Favorito</span>
                </label>
                <Star size={16} className="text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Endereços */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Endereços</h3>
              <button
                type="button"
                onClick={handleAddAddress}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus size={16} />
                <span>Adicionar Endereço</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Nenhum endereço cadastrado</p>
                <p className="text-xs">Clique em "Adicionar Endereço" para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Endereço {index + 1}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            Principal
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(index)}
                            className="text-xs text-purple-600 hover:text-purple-700"
                          >
                            Definir como principal
                          </button>
                        )}
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAddress(index)}
                            className="p-1 text-red-400 hover:text-red-600"
                            title="Remover endereço"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Rua */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Rua *
                        </label>
                        <input
                          type="text"
                          value={address.street}
                          onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                            errors[`address_${index}_street`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nome da rua"
                        />
                        {errors[`address_${index}_street`] && (
                          <p className="text-xs text-red-600 mt-1">{errors[`address_${index}_street`]}</p>
                        )}
                      </div>

                      {/* Número */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Número *
                        </label>
                        <input
                          type="text"
                          value={address.number}
                          onChange={(e) => handleAddressChange(index, 'number', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                            errors[`address_${index}_number`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors[`address_${index}_number`] && (
                          <p className="text-xs text-red-600 mt-1">{errors[`address_${index}_number`]}</p>
                        )}
                      </div>

                      {/* Bairro */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          value={address.neighborhood}
                          onChange={(e) => handleAddressChange(index, 'neighborhood', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                            errors[`address_${index}_neighborhood`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nome do bairro"
                        />
                        {errors[`address_${index}_neighborhood`] && (
                          <p className="text-xs text-red-600 mt-1">{errors[`address_${index}_neighborhood`]}</p>
                        )}
                      </div>

                      {/* Cidade */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                            errors[`address_${index}_city`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Nome da cidade"
                        />
                        {errors[`address_${index}_city`] && (
                          <p className="text-xs text-red-600 mt-1">{errors[`address_${index}_city`]}</p>
                        )}
                      </div>

                      {/* Estado */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Estado *
                        </label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent ${
                            errors[`address_${index}_state`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="SP"
                          maxLength={2}
                        />
                        {errors[`address_${index}_state`] && (
                          <p className="text-xs text-red-600 mt-1">{errors[`address_${index}_state`]}</p>
                        )}
                      </div>

                      {/* CEP */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          CEP
                        </label>
                        <input
                          type="text"
                          value={address.zipCode}
                          onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="01234-567"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Save size={16} />
              <span>{customer ? 'Atualizar' : 'Salvar'} Cliente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
