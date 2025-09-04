import React, { useState, useMemo, useEffect } from 'react';
import { Truck, Search, User, Phone, MapPin, Star, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { usePDV } from '../../../hooks/usePDV';
import { DeliveryPerson } from '../../../types/global/pdv';
import { ThreeDotsIcon } from '../../ui/ThreeDotsIcon';

export const DeliverySelector: React.FC = () => {
  const { selectedDeliveryPerson, selectDeliveryPerson, orderType } = usePDV();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && !(event.target as Element).closest('.delivery-menu')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  // Mock de entregadores para demonstração
  const mockDeliveryPersons: DeliveryPerson[] = [
    {
      id: '1',
      name: 'Carlos Silva',
      phone: '(11) 99999-1111',
      email: 'carlos@entregas.com',
      vehicle: 'Moto Honda CG 150',
      licensePlate: 'ABC-1234',
      status: 'available',
      rating: 4.8,
      totalDeliveries: 1250,
      isFavorite: true,
      currentLocation: 'Centro',
      estimatedArrival: '5 min'
    },
    {
      id: '2',
      name: 'Ana Santos',
      phone: '(11) 88888-2222',
      email: 'ana@entregas.com',
      vehicle: 'Carro Fiat Mobi',
      licensePlate: 'XYZ-5678',
      status: 'available',
      rating: 4.9,
      totalDeliveries: 890,
      isFavorite: false,
      currentLocation: 'Bela Vista',
      estimatedArrival: '12 min'
    },
    {
      id: '3',
      name: 'Roberto Costa',
      phone: '(11) 77777-3333',
      email: 'roberto@entregas.com',
      vehicle: 'Moto Yamaha YBR 125',
      licensePlate: 'DEF-9012',
      status: 'busy',
      rating: 4.7,
      totalDeliveries: 2100,
      isFavorite: true,
      currentLocation: 'Vila Madalena',
      estimatedArrival: '25 min'
    },
    {
      id: '4',
      name: 'Fernanda Lima',
      phone: '(11) 66666-4444',
      email: 'fernanda@entregas.com',
      vehicle: 'Bicicleta Elétrica',
      licensePlate: '',
      status: 'available',
      rating: 4.6,
      totalDeliveries: 650,
      isFavorite: false,
      currentLocation: 'Pinheiros',
      estimatedArrival: '8 min'
    }
  ];

  const handleDeliveryPersonSelect = (deliveryPerson: DeliveryPerson) => {
    selectDeliveryPerson(deliveryPerson);
    setShowSearchModal(false);
    setShowMenu(false);
  };

  const handleRemoveDeliveryPerson = () => {
    selectDeliveryPerson(null);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponível',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={14} className="text-green-600" />
        };
      case 'busy':
        return {
          label: 'Ocupado',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertCircle size={14} className="text-yellow-600" />
        };
      case 'offline':
        return {
          label: 'Offline',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <X size={14} className="text-gray-600" />
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={14} className="text-gray-600" />
        };
    }
  };

  // Só mostrar se for pedido de delivery
  if (orderType !== 'delivery') {
    return null;
  }

  if (selectedDeliveryPerson) {
    const statusInfo = getStatusInfo(selectedDeliveryPerson.status);
    
    return (
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900">Entregador</h4>
          <button
            onClick={handleRemoveDeliveryPerson}
            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Remover entregador"
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-gray-900 text-sm truncate">{selectedDeliveryPerson.name}</h5>
              <p className="text-xs text-gray-600">{selectedDeliveryPerson.vehicle}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} border`}>
              {statusInfo.label}
            </span>
          </div>

          <div className="bg-blue-50 rounded p-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-700">Tempo:</span>
              <span className="text-blue-800 font-medium">{selectedDeliveryPerson.estimatedArrival}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs text-blue-600">{selectedDeliveryPerson.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">Entregador</h4>
        <div className="relative delivery-menu">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            <ThreeDotsIcon size={20} color="#666666" />
          </button>
          
          {/* Menu dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-1">
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowSearchModal(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Selecionar Entregador
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Novo Entregador
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sem Entregador
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Busca de Entregadores */}
      {showSearchModal && (
        <DeliverySearchModal
          deliveryPersons={mockDeliveryPersons}
          onSelect={handleDeliveryPersonSelect}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
};

// Modal compacto para busca de entregadores
interface DeliverySearchModalProps {
  deliveryPersons: DeliveryPerson[];
  onSelect: (person: DeliveryPerson) => void;
  onClose: () => void;
}

const DeliverySearchModal: React.FC<DeliverySearchModalProps> = ({
  deliveryPersons,
  onSelect,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeliveryPersons = useMemo(() => {
    if (!searchTerm) return deliveryPersons;
    
    return deliveryPersons.filter(delivery =>
      delivery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.phone.includes(searchTerm) ||
      delivery.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deliveryPersons, searchTerm]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponível',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={14} className="text-green-600" />
        };
      case 'busy':
        return {
          label: 'Ocupado',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertCircle size={14} className="text-yellow-600" />
        };
      case 'offline':
        return {
          label: 'Offline',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <X size={14} className="text-gray-600" />
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={14} className="text-gray-600" />
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Selecionar Entregador</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Barra de Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou veículo..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
          </div>

          {/* Lista de Entregadores */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredDeliveryPersons.map((person) => {
              const statusInfo = getStatusInfo(person.status);
              const isAvailable = person.status === 'available';
              
              return (
                <div
                  key={person.id}
                  onClick={() => isAvailable && onSelect(person)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    isAvailable
                      ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h6 className="font-medium text-gray-900 text-sm">{person.name}</h6>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} border`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Truck size={10} className="mr-1" />
                          {person.vehicle}
                        </span>
                        <span className="flex items-center">
                          <Star size={10} className="mr-1" />
                          {person.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock size={10} className="mr-1" />
                          {person.estimatedArrival}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDeliveryPersons.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">Nenhum entregador encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
