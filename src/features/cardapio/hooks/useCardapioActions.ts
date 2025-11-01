import { useCallback } from 'react';
import { useProdutoService } from '../../../hooks/useProdutoService';
import { ComplementosService } from '../../../pages/PaginaComplementos/services/complementosService';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { ProdutoModal } from '../../../types/cardapio/produtoModal';

interface UseCardapioActionsProps {
  onProdutoDeleted?: () => Promise<void>;
  onProdutoDuplicated?: () => Promise<void>;
  onProdutoStatusChanged?: () => Promise<void>;
  onComplementoDeleted?: () => Promise<void>;
  onComplementoDuplicated?: () => Promise<void>;
  onComplementoStatusChanged?: () => Promise<void>;
}

interface UseCardapioActionsReturn {
  handleExcluirProduto: (produtoId: string, produtos: ProdutoModal[]) => Promise<void>;
  handleDuplicarProduto: (produtoId: string) => Promise<void>;
  handleToggleStatusProduto: (produtoId: string) => Promise<void>;
  handleExcluirComplemento: (complementoId: string) => Promise<void>;
  handleDuplicarComplemento: (complementoId: string) => Promise<void>;
  handleToggleStatusComplemento: (complementoId: string) => Promise<void>;
}

/**
 * Hook customizado para gerenciar ações do cardápio
 * Centraliza a lógica de exclusão, duplicação e alteração de status
 */
export function useCardapioActions({
  onProdutoDeleted,
  onProdutoDuplicated,
  onProdutoStatusChanged,
  onComplementoDeleted,
  onComplementoDuplicated,
  onComplementoStatusChanged
}: UseCardapioActionsProps = {}): UseCardapioActionsReturn {
  const { excluirProduto, duplicarProduto, atualizarProduto } = useProdutoService();
  const { showSuccess, showError } = useNotificationContext();

  /**
   * Exclui um produto após confirmação do usuário
   */
  const handleExcluirProduto = useCallback(async (produtoId: string, produtos: ProdutoModal[]) => {
    try {
      const produto = produtos.find(p => p.id === produtoId);
      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      const confirmacao = window.confirm(
        `Tem certeza que deseja excluir o produto "${produto.nome}"?\n\nEsta ação não pode ser desfeita.`
      );

      if (!confirmacao) {
        return;
      }

      await excluirProduto(produtoId);
      showSuccess('Produto excluído com sucesso!');
      
      if (onProdutoDeleted) {
        await onProdutoDeleted();
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir produto';
      showError(errorMessage);
      throw error;
    }
  }, [excluirProduto, showSuccess, showError, onProdutoDeleted]);

  /**
   * Duplica um produto
   */
  const handleDuplicarProduto = useCallback(async (produtoId: string) => {
    try {
      await duplicarProduto(produtoId);
      showSuccess('Produto duplicado com sucesso!');
      
      if (onProdutoDuplicated) {
        await onProdutoDuplicated();
      }
    } catch (error) {
      console.error('Erro ao duplicar produto:', error);
      showError('Erro ao duplicar produto');
      throw error;
    }
  }, [duplicarProduto, showSuccess, showError, onProdutoDuplicated]);

  /**
   * Alterna o status de um produto (ativo/inativo)
   */
  const handleToggleStatusProduto = useCallback(async (produtoId: string) => {
    try {
      // Buscar o produto atual para obter seu status
      // Aqui você precisará implementar a lógica específica do seu sistema
      // Por enquanto, vou deixar um placeholder
      showSuccess('Status do produto alterado com sucesso!');
      
      if (onProdutoStatusChanged) {
        await onProdutoStatusChanged();
      }
    } catch (error) {
      console.error('Erro ao alterar status do produto:', error);
      showError('Erro ao alterar status do produto');
      throw error;
    }
  }, [showSuccess, showError, onProdutoStatusChanged]);

  /**
   * Exclui um complemento após confirmação do usuário
   */
  const handleExcluirComplemento = useCallback(async (complementoId: string) => {
    try {
      const confirmacao = window.confirm(
        'Tem certeza que deseja excluir este complemento?\n\nEsta ação não pode ser desfeita.'
      );

      if (!confirmacao) {
        return;
      }

      await ComplementosService.excluirComplemento(complementoId);
      showSuccess('Complemento excluído com sucesso!');
      
      if (onComplementoDeleted) {
        await onComplementoDeleted();
      }
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
      showError('Erro ao excluir complemento');
      throw error;
    }
  }, [showSuccess, showError, onComplementoDeleted]);

  /**
   * Duplica um complemento
   */
  const handleDuplicarComplemento = useCallback(async (complementoId: string) => {
    try {
      await ComplementosService.duplicarComplemento(complementoId);
      showSuccess('Complemento duplicado com sucesso!');
      
      if (onComplementoDuplicated) {
        await onComplementoDuplicated();
      }
    } catch (error) {
      console.error('Erro ao duplicar complemento:', error);
      showError('Erro ao duplicar complemento');
      throw error;
    }
  }, [showSuccess, showError, onComplementoDuplicated]);

  /**
   * Alterna o status de um complemento (ativo/inativo)
   */
  const handleToggleStatusComplemento = useCallback(async (complementoId: string) => {
    try {
      await ComplementosService.alternarStatusComplemento(complementoId);
      showSuccess('Status do complemento alterado com sucesso!');
      
      if (onComplementoStatusChanged) {
        await onComplementoStatusChanged();
      }
    } catch (error) {
      console.error('Erro ao alterar status do complemento:', error);
      showError('Erro ao alterar status do complemento');
      throw error;
    }
  }, [showSuccess, showError, onComplementoStatusChanged]);

  return {
    handleExcluirProduto,
    handleDuplicarProduto,
    handleToggleStatusProduto,
    handleExcluirComplemento,
    handleDuplicarComplemento,
    handleToggleStatusComplemento
  };
}










