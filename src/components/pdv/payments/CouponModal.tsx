import React from 'react';
import { X, Tag, Percent, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { useState } from 'react';

interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (coupon: Coupon) => void;
  currentOrderValue: number;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  currentOrderValue
}) => {
  const [couponCode, setCouponCode] = React.useState('');
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    coupon?: Coupon;
    message: string;
    discountAmount?: number;
  } | null>(null);

  // Cupons serão carregados do Firebase/API
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);

  const validateCoupon = async (code: string) => {
    setIsValidating(true);
    setValidationResult(null);

    // Simular delay de validação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const coupon = availableCoupons.find(c => 
      c.code.toUpperCase() === code.toUpperCase() && c.isActive
    );

    if (!coupon) {
      setValidationResult({
        isValid: false,
        message: 'Cupom não encontrado ou inativo'
      });
      setIsValidating(false);
      return;
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      setValidationResult({
        isValid: false,
        message: 'Cupom fora do período de validade'
      });
      setIsValidating(false);
      return;
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      setValidationResult({
        isValid: false,
        message: 'Cupom esgotado'
      });
      setIsValidating(false);
      return;
    }

    if (coupon.minOrderValue && currentOrderValue < coupon.minOrderValue) {
      setValidationResult({
        isValid: false,
        message: `Pedido mínimo de ${formatPrice(coupon.minOrderValue)}`
      });
      setIsValidating(false);
      return;
    }

    // Calcular desconto
    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (currentOrderValue * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.value;
    }

    setValidationResult({
      isValid: true,
      coupon,
      message: `Cupom válido! Desconto de ${formatPrice(discountAmount)}`,
      discountAmount
    });

    setIsValidating(false);
  };

  const handleApplyCoupon = () => {
    if (validationResult?.isValid && validationResult.coupon) {
      onApplyCoupon(validationResult.coupon);
      onClose();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getCouponIcon = (type: 'percentage' | 'fixed') => {
    return type === 'percentage' ? Percent : DollarSign;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Aplicar Cupom</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Coupon Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Código do Cupom
            </label>
            <div className="flex space-x-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Digite o código do cupom"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && couponCode.trim()) {
                    validateCoupon(couponCode.trim());
                  }
                }}
              />
              <Button
                onClick={() => validateCoupon(couponCode.trim())}
                disabled={!couponCode.trim() || isValidating}
                className="px-4"
              >
                {isValidating ? 'Validando...' : 'Validar'}
              </Button>
            </div>
          </div>

          {/* Validation Result */}
          {validationResult && (
            <div className={`p-3 rounded-lg border ${
              validationResult.isValid 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {validationResult.isValid ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                <span className="text-sm font-medium">{validationResult.message}</span>
              </div>
              
              {validationResult.isValid && validationResult.coupon && (
                <div className="mt-2 text-sm">
                  <p>Desconto: {formatPrice(validationResult.discountAmount || 0)}</p>
                  <p>Valor final: {formatPrice(currentOrderValue - (validationResult.discountAmount || 0))}</p>
                </div>
              )}
            </div>
          )}

          {/* Available Coupons */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Cupons Disponíveis</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCoupons.map((coupon) => {
                const Icon = getCouponIcon(coupon.type);
                const isExpired = new Date() > coupon.validUntil;
                const isUsedUp = coupon.usageLimit ? coupon.usedCount >= coupon.usageLimit : false;
                const isDisabled = !coupon.isActive || isExpired || isUsedUp;
                
                return (
                  <div
                    key={coupon.code}
                    className={`p-3 rounded-lg border ${
                      isDisabled 
                        ? 'bg-gray-50 border-gray-200 opacity-50' 
                        : 'bg-white border-gray-200 hover:border-purple-300 cursor-pointer'
                    } transition-colors`}
                    onClick={() => !isDisabled && setCouponCode(coupon.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-purple-100 rounded">
                          <Icon size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{coupon.code}</div>
                          <div className="text-sm text-gray-600">
                            {coupon.type === 'percentage' 
                              ? `${coupon.value}% de desconto`
                              : `${formatPrice(coupon.value)} de desconto`
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-xs text-gray-500">
                        <div>Válido até {formatDate(coupon.validUntil)}</div>
                        {coupon.minOrderValue && (
                          <div>Mín: {formatPrice(coupon.minOrderValue)}</div>
                        )}
                      </div>
                    </div>
                    
                    {coupon.maxDiscount && coupon.type === 'percentage' && (
                      <div className="mt-2 text-xs text-gray-500">
                        Máximo: {formatPrice(coupon.maxDiscount)}
                      </div>
                    )}
                    
                    {isDisabled && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {isExpired ? 'Expirado' : isUsedUp ? 'Esgotado' : 'Inativo'}
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Value Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Valor atual do pedido</div>
            <div className="text-lg font-bold text-gray-900">{formatPrice(currentOrderValue)}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          
          <Button
            onClick={handleApplyCoupon}
            disabled={!validationResult?.isValid}
            className="flex-1"
          >
            Aplicar Cupom
          </Button>
        </div>
      </div>
    </div>
  );
};
