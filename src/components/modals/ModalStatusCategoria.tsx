import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Categoria, CategoriaAdicional } from '../../types';

interface ModalCategoriaStatusProps {
  formData: {
    status: Categoria['status'] | CategoriaAdicional['status'];
  };
  setFormData: (data: any) => void;
  isEditing: boolean;
}

export function ModalCategoriaStatus({ formData, setFormData, isEditing }: ModalCategoriaStatusProps) {
  const getStatusIcon = (status: Categoria['status']) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'inativo':
        return <XCircle size={16} className="text-gray-400" />;
      case 'em_falta':
        return <AlertCircle size={16} className="text-orange-500" />;
      default:
        return null;
    }
  };

  if (!isEditing) return null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Status
      </label>
      <div className="grid grid-cols-3 gap-3">
        {(['ativo', 'inativo', 'em_falta'] as const).map((status) => (
          <label key={status} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="status"
              value={status}
              checked={formData.status === status}
              onChange={() => setFormData(prev => ({ ...prev, status }))}
              className="mr-2"
            />
            <div className="flex items-center">
              {getStatusIcon(status)}
              <span className="text-sm capitalize ml-2">
                {status === 'em_falta' ? 'Em Falta' : status}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
} 