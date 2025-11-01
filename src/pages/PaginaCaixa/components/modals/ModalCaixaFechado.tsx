import React from 'react';
import { ModalGlobal } from '../../../../components/modals/ModalGlobal';
import { Button } from '../../../../components/ui/Button';

interface ModalCaixaFechadoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ModalCaixaFechado({ isOpen, onClose, onConfirm }: ModalCaixaFechadoProps) {
  const handleAbrirCaixa = () => {
    onConfirm();
  };

  const footer = (
    <div className="flex gap-3 justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
      >
        Cancelar
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleAbrirCaixa}
      >
        Abrir Caixa
      </Button>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={onClose}
      title="Caixa Fechado"
      size="sm"
      footer={footer}
    >
      <div className="text-center py-6">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma sessão de caixa encontrada
        </h3>
        
        <p className="text-gray-600 mb-6">
          Deseja abrir uma nova sessão de caixa para começar as operações?
        </p>
      </div>
    </ModalGlobal>
  );
}

























