import React from 'react';
import { X } from 'lucide-react';
import { CouponIcon } from '../ui';

interface ModalCupomHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export function ModalCupomHeader({ isEditing, onClose }: ModalCupomHeaderProps) {
  return (
    <div className="flex items-center justify-between p-0 border-b border-gray-200" style={{ height: '73px' }}>
      <div className="flex items-center gap-3 h-full">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CouponIcon size={24} color="#2563eb" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Cupom' : 'Criar Novo Cupom'}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditing 
              ? 'Modifique as informações do cupom de desconto'
              : 'Preencha as informações para criar um novo cupom de desconto'
            }
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        type="button"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}