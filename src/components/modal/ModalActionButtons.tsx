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
    <div className="space-y-3">
      <button
        onClick={onOpenExampleModal}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Abrir Modal de Exemplo
      </button>
      
      <button
        onClick={onOpenFormModal}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Abrir Modal de Formulário
      </button>
    </div>
  );
};
