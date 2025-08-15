import React from 'react';
import { X, Star } from 'lucide-react';
import { Produto } from '../../types/produtos';

interface ModalProdutoHeaderProps {
  isEditing: boolean;
  produto?: Produto;
  onClose: () => void;
}

export function ModalProdutoHeader({ isEditing, produto, onClose }: ModalProdutoHeaderProps) {
  const getStatusColor = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-gray-100 text-gray-800';
      case 'em_falta':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'em_falta':
        return 'Em Falta';
      default:
        return status;
    }
  };

  return (
    <div className="flex items-center justify-between p-0 border-b" style={{ height: '73px' }}>
      <div className="flex items-center space-x-4" style={{ height: '73px' }}>
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        {produto && (
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(produto.status)}`}>
              {getStatusText(produto.status)}
            </span>
            {produto.destacado && (
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Destacado
              </span>
            )}
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
}