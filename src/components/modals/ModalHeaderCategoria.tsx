import React from 'react';
import { X } from 'lucide-react';

interface ModalCategoriaHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export function ModalCategoriaHeader({ isEditing, onClose }: ModalCategoriaHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-900">
        {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
} 