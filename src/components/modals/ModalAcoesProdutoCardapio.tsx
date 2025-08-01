import React from 'react';

interface ModalProdutoActionsProps {
  modoEdicao: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: () => void;
}

export function ModalProdutoActions({ modoEdicao, onClose, onEdit, onSave }: ModalProdutoActionsProps) {
  return (
    <div className="p-6 border-t border-gray-200 flex justify-between">
      <button
        onClick={onClose}
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Fechar
      </button>
      <div className="flex gap-2">
        {!modoEdicao ? (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Editar
          </button>
        ) : (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Salvar
          </button>
        )}
      </div>
    </div>
  );
} 