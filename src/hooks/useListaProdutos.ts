import { useState } from 'react';
import { Produto } from '../types/produtos';

interface UseListaProdutosProps {
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: 'ativo' | 'inativo' | 'em_falta') => Promise<void>;
}

export function useListaProdutos({ onDelete, onDuplicate, onToggleStatus }: UseListaProdutosProps) {
  // Removido modalOpen e produtoSelecionado pois não são mais necessários para criação
  // Mantido apenas para edição se necessário no futuro

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
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  };
} 