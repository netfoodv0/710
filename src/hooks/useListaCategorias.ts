import { useState } from 'react';
import { Categoria, CategoriaAdicional } from '../types';

interface UseListaCategoriasProps {
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => Promise<void>;
}

export function useListaCategorias({ onDelete, onDuplicate, onUpdateStatus }: UseListaCategoriasProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | CategoriaAdicional | undefined>();

  const handleCreate = () => {
    setCategoriaSelecionada(undefined);
    setModalOpen(true);
  };

  const handleEdit = (categoria: Categoria | CategoriaAdicional) => {
    setCategoriaSelecionada(categoria);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCategoriaSelecionada(undefined);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await onDelete(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await onDuplicate(id);
  };

  const handleToggleStatus = async (categoria: Categoria | CategoriaAdicional) => {
    const novoStatus = categoria.status === 'ativo' ? 'inativo' : 'ativo';
    await onUpdateStatus(categoria.id, novoStatus);
  };

  return {
    modalOpen,
    categoriaSelecionada,
    handleCreate,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  };
} 