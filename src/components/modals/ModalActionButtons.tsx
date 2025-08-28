import React from 'react';

interface ModalActionButtonsProps {
  onOpenExampleModal: () => void;
  onOpenFormModal: () => void;
}

export const ModalActionButtons: React.FC<ModalActionButtonsProps> = ({
  onOpenExampleModal,
  onOpenFormModal
}) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onOpenExampleModal}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Abrir Modal de Exemplo
      </button>
      <button
        onClick={onOpenFormModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Abrir Modal de Formulário
      </button>
    </div>
  );
};

