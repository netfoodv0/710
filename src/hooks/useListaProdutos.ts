import { useState } from 'react';
import { Produto } from '../types/produtos';

interface UseListaProdutosProps {
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: 'ativo' | 'inativo' | 'em_falta') => Promise<void>;
}

export function useListaProdutos({ onDelete, onDuplicate, onToggleStatus }: UseListaProdutosProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>();

  const handleCreate = () => {
    setProdutoSelecionado(undefined);
    setModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(undefined);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await onDelete(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await onDuplicate(id);
  };

  const handleToggleStatus = async (produto: Produto) => {
    const novoStatus = produto.status === 'ativo' ? 'inativo' : 'ativo';
    await onToggleStatus(produto.id, novoStatus);
  };

  return {
    modalOpen,
    produtoSelecionado,
    handleCreate,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  };
} 