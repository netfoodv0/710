import React from 'react';
import { Truck, Chair, Package, MapPin, Clock, User } from 'lucide-react';
import { OrderType } from '../../../types/global/orders';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/badge';

interface OrderTypeSelectorProps {
  selectedType: OrderType;
  onTypeChange: (type: OrderType) => void;
  customerName?: string;
  tableNumber?: string;
  deliveryAddress?: string;
  estimatedTime?: string;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  customerName,
  tableNumber,
  deliveryAddress,
  estimatedTime
}) => {
  const orderTypes = [
    {
      type: 'delivery' as OrderType,
      label: 'Delivery',
      icon: Truck,
      description: 'Entrega em endereço',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'table' as OrderType,
      label: 'Mesa',
      icon: Chair,
      description: 'Consumo no local',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'pickup' as OrderType,
      label: 'Retirada',
      icon: Package,
      description: 'Cliente busca no local',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const getTypeInfo = (type: OrderType) => {
    return orderTypes.find(t => t.type === type);
  };

  const renderTypeInfo = () => {
    const typeInfo = getTypeInfo(selectedType);
    if (!typeInfo) return null;

    const Icon = typeInfo.icon;

    return (
      <div className={`p-4 rounded-lg ${typeInfo.bgColor} border border-current ${typeInfo.textColor} border-opacity-20`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${typeInfo.color} text-white`}>
            <Icon size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{typeInfo.label}</h3>
            <p className="text-sm text-gray-600">{typeInfo.description}</p>
          </div>
        </div>

        {/* Type-specific information */}
        {selectedType === 'delivery' && deliveryAddress && (
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-700">
            <MapPin size={16} />
            <span className="truncate">{deliveryAddress}</span>
          </div>
        )}

        {selectedType === 'table' && tableNumber && (
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-700">
            <Chair size={16} />
            <span>Mesa {tableNumber}</span>
          </div>
        )}

        {selectedType === 'pickup' && estimatedTime && (
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-700">
            <Clock size={16} />
            <span>Pronto em {estimatedTime}</span>
          </div>
        )}

        {customerName && (
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-700">
            <User size={16} />
            <span>{customerName}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de Pedido
        </label>
        <div className="grid grid-cols-3 gap-3">
          {orderTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.type;
            
            return (
              <button
                key={type.type}
                onClick={() => onTypeChange(type.type)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? `border-${type.color.replace('bg-', '')} ${type.bgColor}`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? type.color : 'bg-gray-100'
                  } text-white`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-center">
                    <div className={`font-medium text-sm ${
                      isSelected ? type.textColor : 'text-gray-700'
                    }`}>
                      {type.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {type.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Type Information */}
      {renderTypeInfo()}

      {/* Type-specific Actions */}
      {selectedType === 'delivery' && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            Taxa de entrega será calculada automaticamente
          </span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Delivery
          </Badge>
        </div>
      )}

      {selectedType === 'table' && (
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-sm text-green-700">
            Pedido será preparado para mesa {tableNumber || 'N/A'}
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Mesa
          </Badge>
        </div>
      )}

      {selectedType === 'pickup' && (
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <span className="text-sm text-orange-700">
            Cliente será notificado quando estiver pronto
          </span>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            Retirada
          </Badge>
        </div>
      )}
    </div>
  );
};
