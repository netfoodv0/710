import React from 'react';
import { X } from 'lucide-react';
import { Produto } from '../../../types';

interface ModalProdutoHeaderProps {
  produto: Produto;
  modoEdicao: boolean;
  onClose: () => void;
}

export function ModalProdutoHeader({ produto, modoEdicao, onClose }: ModalProdutoHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {modoEdicao ? 'Editar Produto' : 'Detalhes do Produto'}
          </h2>
          <p className="text-gray-600 mt-1">
            {produto.categoria}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 