import React from 'react';
import { Save, Copy, Trash2 } from 'lucide-react';

interface ModalProdutoActionsProps {
  isEditing: boolean;
  activeTab: 'formulario' | 'preview' | 'score';
  loading: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onFormSubmit: () => void;
}

export function ModalProdutoActions({
  isEditing,
  activeTab,
  loading,
  onClose,
  onDelete,
  onDuplicate,
  onFormSubmit
}: ModalProdutoActionsProps) {
  return (
    <div className="flex items-center justify-between p-0 border-t border-gray-200 bg-white">
      <div className="flex space-x-2">
        {isEditing && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-gray-200 transition-colors"
          >
            <Trash2 size={16} className="mr-1" />
            Excluir
          </button>
        )}
        {isEditing && onDuplicate && (
          <button
            type="button"
            onClick={onDuplicate}
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-gray-200 transition-colors"
          >
            <Copy size={16} className="mr-1" />
            Duplicar
          </button>
        )}
      </div>
      
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
        >
          Cancelar
        </button>
        {activeTab === 'formulario' && (
          <button
            type="button"
            onClick={onFormSubmit}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded border border-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} className="mr-1" />
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
          </button>
        )}
      </div>
    </div>
  );
}