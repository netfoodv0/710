import React from 'react';
import { Plus, Minus, Trash2, Edit3, MessageSquare } from 'lucide-react';
import { OrderItem as OrderItemType } from '../../../types/global/orders';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/badge';

interface OrderItemProps {
  item: OrderItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateObservations: (itemId: string, observations: string) => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateObservations
}) => {
  const [showObservationsModal, setShowObservationsModal] = React.useState(false);
  const [observations, setObservations] = React.useState(item.observations || '');

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleSaveObservations = () => {
    onUpdateObservations(item.id, observations);
    setShowObservationsModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const totalItemPrice = item.price * item.quantity;

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowObservationsModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <MessageSquare size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              className="p-2 text-red-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Observations Badge */}
        {item.observations && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              <MessageSquare size={12} className="mr-1" />
              {item.observations}
            </Badge>
          </div>
        )}

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= 99}
                className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {formatPrice(item.price)} × {item.quantity}
            </div>
            <div className="font-semibold text-gray-900">
              {formatPrice(totalItemPrice)}
            </div>
          </div>
        </div>
      </div>

      {/* Observations Modal */}
      {showObservationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Observações - {item.name}
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações do item
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Ex: Sem cebola, bem passado, sem sal..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowObservationsModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveObservations}
                className="flex-1"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
