import React from 'react';
import { X, Plus, Minus, ShoppingCart, Star, Clock, MapPin } from 'lucide-react';
import { Product } from '../../../types/global/products';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/badge';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (product: Product, quantity: number, observations?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToOrder
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [observations, setObservations] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setObservations('');
    }
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToOrder = () => {
    onAddToOrder(product, quantity, observations);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detalhes do Produto</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Product Image */}
          {product.image && (
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              {product.isPopular && (
                <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                  <Star size={14} className="mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {product.preparationTime && (
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2" />
                <span>{product.preparationTime} min</span>
              </div>
            )}
            {product.category && (
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>{product.category}</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantidade</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 99}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Observações (opcional)
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ex: Sem cebola, bem passado..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Total */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Total:</span>
            <span className="text-lg font-bold text-purple-600">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleAddToOrder}
            className="w-full flex items-center justify-center space-x-2"
            size="lg"
          >
            <ShoppingCart size={20} />
            <span>Adicionar ao Pedido</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
