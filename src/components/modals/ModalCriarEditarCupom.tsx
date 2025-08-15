import React from 'react';
import { Cupom } from '../../types/cupons';
import { useModalCupom } from '../../hooks/useModalCupom';
import { ModalCupomHeader } from './ModalHeaderCupom';
import { ModalCupomForm } from './ModalFormularioCupom';
import { ModalCupomActions } from './ModalAcoesCupom';

interface ModalCupomProps {
  isOpen: boolean;
  onClose: () => void;
  cupom?: Cupom;
  onSave: (cupom: Omit<Cupom, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, cupom: Partial<Cupom>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  loading?: boolean;
}

export const ModalCupom: React.FC<ModalCupomProps> = ({
  isOpen,
  onClose,
  cupom,
  onSave,
  onEdit,
  onDelete,
  loading = false
}) => {
  const {
    formData,
    setFormData,
    validacao,
    setValidacao,
    isEditing,
    handleSubmit,
    handleDelete
  } = useModalCupom({
    cupom,
    isOpen,
    onSave,
    onEdit,
    onDelete,
    onClose
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalCupomHeader isEditing={isEditing} onClose={onClose} />

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <ModalCupomForm
              formData={formData}
              setFormData={setFormData}
              validacao={validacao}
              setValidacao={setValidacao}
              isEditing={isEditing}
            />
          </form>
        </div>

        <ModalCupomActions
          isEditing={isEditing}
          loading={loading}
          formData={formData}
          onClose={onClose}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};