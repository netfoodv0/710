import { useCallback } from 'react';

interface UseListaProdutosProps {
  onDelete?: (id: string) => Promise<void> | void;
  onDuplicate?: (id: string) => Promise<void> | void;
  onToggleStatus?: (id: string) => Promise<void> | void;
}

export function useListaProdutos({ onDelete, onDuplicate, onToggleStatus }: UseListaProdutosProps = {}) {
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      if (onDelete) {
        await onDelete(id);
      }
    }
  }, [onDelete]);

  const handleDuplicate = useCallback(async (id: string) => {
    if (onDuplicate) {
      await onDuplicate(id);
    }
  }, [onDuplicate]);

  const handleToggleStatus = useCallback(async (id: string) => {
    if (onToggleStatus) {
      await onToggleStatus(id);
    }
  }, [onToggleStatus]);

  return {
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  };
} 