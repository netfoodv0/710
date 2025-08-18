import React from 'react';
import { TrashIcon, SaveIcon } from '../ui';
import { Button } from '../ui/Button';
import { CupomFormData } from '../../types/cupons';

interface ModalCupomActionsProps {
  isEditing: boolean;
  loading: boolean;
  formData: CupomFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
}

export function ModalCupomActions({
  isEditing,
  loading,
  formData,
  onClose,
  onSubmit,
  onDelete
}: ModalCupomActionsProps) {
  return (
    <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
      <div>
        {isEditing && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <TrashIcon size={24} color="#dc2626" />
            Excluir
          </Button>
        )}
      </div>
      
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <SaveIcon size={24} color="#ffffff" />
          {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Criar Cupom')}
        </Button>
      </div>
    </div>
  );
}