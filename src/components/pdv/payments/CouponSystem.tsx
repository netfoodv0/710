import React, { useState, useEffect } from 'react';
import { Tag, Percent, DollarSign, Calendar, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'buy_one_get_one';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  maxUses?: number;
  currentUses: number;
  applicableCategories?: string[];
  applicableProducts?: string[];
  isActive: boolean;
  createdAt: Date;
}

interface CouponSystemProps {
  onCouponApply: (coupon: Coupon, discountAmount: number) => void;
  onCouponRemove: () => void;
  currentTotal: number;
  appliedCoupon?: Coupon;
  appliedDiscount?: number;
}

// Cupons de exemplo (em produção viriam do banco de dados)
const SAMPLE_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    name: 'Bem-vindo 10%',
    description: '10% de desconto para novos clientes',
    type: 'percentage',
    value: 10,
    minOrderAmount: 30,
    maxDiscount: 50,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    maxUses: 1000,
    currentUses: 150,
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    code: 'FREESHIP',
    name: 'Frete Grátis',
    description: 'Frete grátis para pedidos acima de R$ 50',
    type: 'free_shipping',
    value: 0,
    minOrderAmount: 50,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    maxUses: 500,
    currentUses: 89,
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    code: 'SAVE20',
    name: 'Economia 20',
    description: 'R$ 20 de desconto para pedidos acima de R$ 100',
    type: 'fixed',
    value: 20,
    minOrderAmount: 100,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    maxUses: 200,
    currentUses: 45,
    isActive: true,
    createdAt: new Date('2024-01-01')
  }
];

export const CouponSystem: React.FC<CouponSystemProps> = ({
  onCouponApply,
  onCouponRemove,
  currentTotal,
  appliedCoupon,
  appliedDiscount
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);

  const validateCoupon = async (code: string): Promise<Coupon | null> => {
    setIsValidating(true);
    setValidationError('');

    try {
      // Simular validação assíncrona
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const coupon = SAMPLE_COUPONS.find(c => 
        c.code.toUpperCase() === code.toUpperCase() && c.isActive
      );

      if (!coupon) {
        setValidationError('Cupom não encontrado ou inativo');
        return null;
      }

      // Verificar validade
      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validUntil) {
        setValidationError('Cupom fora da validade');
        return null;
      }

      // Verificar limite de uso
      if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
        setValidationError('Cupom esgotado');
        return null;
      }

      // Verificar valor mínimo
      if (coupon.minOrderAmount && currentTotal < coupon.minOrderAmount) {
        setValidationError(`Pedido mínimo de R$ ${coupon.minOrderAmount.toFixed(2)}`);
        return null;
      }

      return coupon;
    } catch (error) {
      setValidationError('Erro ao validar cupom');
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setValidationError('Digite um código de cupom');
      return;
    }

    const coupon = await validateCoupon(couponCode);
    if (!coupon) return;

    const discountAmount = calculateDiscount(coupon, currentTotal);
    onCouponApply(coupon, discountAmount);
    setCouponCode('');
    setValidationError('');
  };

  const calculateDiscount = (coupon: Coupon, total: number): number => {
    switch (coupon.type) {
      case 'percentage':
        let discount = (total * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
        return discount;
      
      case 'fixed':
        return Math.min(coupon.value, total);
      
      case 'free_shipping':
        // Em um sistema real, calcularia o valor do frete
        return 8.50; // Valor exemplo do frete
      
      case 'buy_one_get_one':
        // Lógica para compra 1 leva 1
        return total * 0.5;
      
      default:
        return 0;
    }
  };

  const getCouponTypeIcon = (type: Coupon['type']) => {
    switch (type) {
      case 'percentage': return <Percent className="h-4 w-4" />;
      case 'fixed': return <DollarSign className="h-4 w-4" />;
      case 'free_shipping': return <Tag className="h-4 w-4" />;
      case 'buy_one_get_one': return <Users className="h-4 w-4" />;
    }
  };

  const getCouponTypeLabel = (type: Coupon['type']) => {
    switch (type) {
      case 'percentage': return 'Percentual';
      case 'fixed': return 'Valor Fixo';
      case 'free_shipping': return 'Frete Grátis';
      case 'buy_one_get_one': return '1+1 Grátis';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Cupons e Descontos</h3>
      </div>

      {/* Cupom Aplicado */}
      {appliedCoupon && appliedDiscount && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800">{appliedCoupon.name}</div>
                <div className="text-sm text-green-600">{appliedCoupon.code}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                -R$ {appliedDiscount.toFixed(2)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onCouponRemove}
                className="text-xs mt-1"
              >
                Remover
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Aplicar Cupom */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aplicar Cupom
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Digite o código do cupom"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm uppercase"
            disabled={isValidating}
          />
          <Button
            onClick={handleApplyCoupon}
            disabled={isValidating || !couponCode.trim()}
            size="sm"
          >
            {isValidating ? 'Validando...' : 'Aplicar'}
          </Button>
        </div>
        
        {validationError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">{validationError}</span>
            </div>
          </div>
        )}
      </div>

      {/* Cupons Disponíveis */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Cupons Disponíveis</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
          >
            {showAvailableCoupons ? 'Ocultar' : 'Mostrar'}
          </Button>
        </div>

        {showAvailableCoupons && (
          <div className="space-y-2">
            {SAMPLE_COUPONS.map((coupon) => (
              <div
                key={coupon.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
                onClick={() => {
                  setCouponCode(coupon.code);
                  handleApplyCoupon();
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {getCouponTypeIcon(coupon.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{coupon.name}</div>
                      <div className="text-sm text-gray-600">{coupon.description}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getCouponTypeLabel(coupon.type)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Válido até {formatDate(coupon.validUntil)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-purple-600">
                      {coupon.type === 'percentage' && `${coupon.value}%`}
                      {coupon.type === 'fixed' && `R$ ${coupon.value.toFixed(2)}`}
                      {coupon.type === 'free_shipping' && 'Frete Grátis'}
                      {coupon.type === 'buy_one_get_one' && '1+1 Grátis'}
                    </div>
                    {coupon.minOrderAmount && (
                      <div className="text-xs text-gray-500">
                        Mín: R$ {coupon.minOrderAmount.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Informações do Cupom */}
      {appliedCoupon && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Detalhes do Cupom</h4>
          <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Código:</span>
              <span className="font-medium">{appliedCoupon.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="font-medium">{getCouponTypeLabel(appliedCoupon.type)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valor:</span>
              <span className="font-medium">
                {appliedCoupon.type === 'percentage' && `${appliedCoupon.value}%`}
                {appliedCoupon.type === 'fixed' && `R$ ${appliedCoupon.value.toFixed(2)}`}
                {appliedCoupon.type === 'free_shipping' && 'Frete Grátis'}
                {appliedCoupon.type === 'buy_one_get_one' && '1+1 Grátis'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Desconto Aplicado:</span>
              <span className="font-medium text-green-600">
                -R$ {appliedDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Validade:</span>
              <span className="font-medium">
                Até {formatDate(appliedCoupon.validUntil)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
