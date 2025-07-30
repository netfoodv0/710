import React from 'react';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria } from '../types';
import { useModalCategoria } from '../../features/cardapio/hooks/useModalCategoria';
import { ModalCategoriaHeader } from './ModalHeaderCategoria';
import { ModalCategoriaForm } from './ModalFormularioCategoria';
import { ModalCategoriaStatus } from './ModalStatusCategoria';
import { ModalCategoriaDisponibilidade } from './ModalDisponibilidadeCategoria';
import { ModalCategoriaActions } from './ModalAcoesCategoria';

interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria | CategoriaAdicional;
  onSave: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
  onUpdateStatus?: (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => Promise<void>;
  onUpdateDisponibilidade?: (id: string, disponibilidade: DisponibilidadeCategoria) => Promise<void>;
  loading?: boolean;
  tipo?: 'produtos' | 'adicionais';
}

export const ModalCategoria: React.FC<ModalCategoriaProps> = ({
  isOpen,
  onClose,
  categoria,
  onSave,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdateStatus,
  onUpdateDisponibilidade,
  loading = false,
  tipo = 'produtos'
}) => {
  const {
    formData,
    setFormData,
    disponibilidade,
    setDisponibilidade,
    showDisponibilidade,
    setShowDisponibilidade,
    isEditing,
    handleSubmit,
    handleDelete,
    handleDuplicate,
    handleSaveDisponibilidade
  } = useModalCategoria({
    categoria,
    isOpen,
    tipo,
    onSave,
    onEdit,
    onDelete,
    onDuplicate,
    onUpdateStatus,
    onUpdateDisponibilidade,
    onClose
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalCategoriaHeader isEditing={isEditing} onClose={onClose} />

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <ModalCategoriaForm
              formData={formData}
              setFormData={setFormData}
              tipo={tipo}
              isEditing={isEditing}
            />

            <ModalCategoriaStatus
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
            />

            <ModalCategoriaDisponibilidade
              disponibilidade={disponibilidade}
              setDisponibilidade={setDisponibilidade}
              showDisponibilidade={showDisponibilidade}
              setShowDisponibilidade={setShowDisponibilidade}
              onSaveDisponibilidade={handleSaveDisponibilidade}
              isEditing={isEditing}
            />
          </form>
        </div>

        <ModalCategoriaActions
          isEditing={isEditing}
          loading={loading}
          formData={formData}
          onClose={onClose}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      </div>
    </div>
  );
}; 