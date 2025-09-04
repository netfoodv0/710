import React from 'react';
import { usePDV } from '../../../hooks/usePDV';
import { Clock, MapPin, User, Truck, Table, Package, Home } from 'lucide-react';

export const PDVHeader: React.FC = () => {
  const { orderType, selectedCustomer, selectedDeliveryPerson, calculatedValues } = usePDV();

  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case 'delivery':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'table':
        return <Table className="w-4 h-4 text-green-600" />;
      case 'pickup':
        return <Package className="w-4 h-4 text-orange-600" />;
      default:
        return <Home className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOrderTypeLabel = (type: string) => {
    switch (type) {
      case 'delivery':
        return 'Delivery';
      case 'table':
        return 'Mesa';
      case 'pickup':
        return 'Retirada';
      default:
        return 'Não definido';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        {/* Informações do Pedido */}
        <div className="flex items-center space-x-6">
          {/* Tipo de Pedido */}
          <div className="flex items-center space-x-2">
            {getOrderTypeIcon(orderType)}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Tipo</p>
              <p className="text-sm font-medium text-gray-900">{getOrderTypeLabel(orderType)}</p>
            </div>
          </div>

          {/* Cliente */}
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Cliente</p>
              <p className="text-sm font-medium text-gray-900">
                {selectedCustomer ? selectedCustomer.name : 'Não selecionado'}
              </p>
            </div>
          </div>

          {/* Endereço/Entrega */}
          {orderType === 'delivery' && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Endereço</p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedCustomer?.addresses.find(addr => addr.isDefault)?.neighborhood || 'Não definido'}
                </p>
              </div>
            </div>
          )}

          {/* Entregador */}
          {orderType === 'delivery' && selectedDeliveryPerson && (
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Entregador</p>
                <p className="text-sm font-medium text-gray-900">{selectedDeliveryPerson.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Valores do Pedido */}
        <div className="flex items-center space-x-6">
          {/* Subtotal */}
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
            <p className="text-lg font-semibold text-gray-900">
              R$ {calculatedValues.subtotal.toFixed(2)}
            </p>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
            <p className="text-2xl font-bold text-purple-600">
              R$ {calculatedValues.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de Progresso do Pedido */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Progresso do Pedido</span>
          <span>{calculatedValues.subtotal > 0 ? 'Em andamento' : 'Aguardando produtos'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${calculatedValues.subtotal > 0 ? Math.min((calculatedValues.subtotal / 100) * 100, 100) : 0}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};
