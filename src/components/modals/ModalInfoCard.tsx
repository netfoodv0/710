import React from 'react';
import { Card } from '../Card';
import { ModalActionButtons } from './ModalActionButtons';
import { ModalSizeButtons } from './ModalSizeButtons';
import { ModalSize } from '../../types/modal';

interface ModalInfoCardProps {
  modalSize: ModalSize;
  onSizeChange: (size: ModalSize) => void;
  onOpenExampleModal: () => void;
  onOpenFormModal: () => void;
}

export const ModalInfoCard: React.FC<ModalInfoCardProps> = ({
  modalSize,
  onSizeChange,
  onOpenExampleModal,
  onOpenFormModal
}) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Página de Exemplo Modal
        </h2>
        <p className="text-slate-600 mb-4">
          Esta é uma página de exemplo que demonstra como criar novas páginas no dashboard.
          Você pode usar esta estrutura como base para outras funcionalidades.
        </p>
        
        <div className="space-y-3">
          <ModalActionButtons
            onOpenExampleModal={onOpenExampleModal}
            onOpenFormModal={onOpenFormModal}
          />
          
          <ModalSizeButtons
            modalSize={modalSize}
            onSizeChange={onSizeChange}
          />
        </div>
      </div>
    </Card>
  );
};



