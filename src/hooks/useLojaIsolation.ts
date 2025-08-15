import { useCallback } from 'react';
import { useLoja } from '../context/lojaContext';
import { lojaIsolation } from '../lib/lojaIsolation';

/**
 * Hook para facilitar o uso do isolamento de loja nos componentes
 */
export const useLojaIsolation = () => {
  const { loja, lojaId, isLoading, error } = useLoja();

  /**
   * Executa uma operação com isolamento de leitura
   */
  const withReadIsolation = useCallback(async <T>(
    operation: () => Promise<T>,
    errorMessage?: string
  ): Promise<T> => {
    if (!lojaId) {
      throw new Error('Usuário não autenticado');
    }

    if (error) {
      throw new Error(error);
    }

    return lojaIsolation.withReadIsolation(operation, errorMessage);
  }, [lojaId, error]);

  /**
   * Executa uma operação com isolamento de escrita
   */
  const withWriteIsolation = useCallback(async <T>(
    operation: () => Promise<T>,
    errorMessage?: string
  ): Promise<T> => {
    if (!lojaId) {
      throw new Error('Usuário não autenticado');
    }

    if (error) {
      throw new Error(error);
    }

    return lojaIsolation.withWriteIsolation(operation, errorMessage);
  }, [lojaId, error]);

  /**
   * Verifica se o usuário tem permissão para acessar dados
   */
  const canAccess = useCallback((documentLojaId: string): boolean => {
    return lojaId === documentLojaId;
  }, [lojaId]);

  /**
   * Obtém o ID da loja atual
   */
  const getCurrentLojaId = useCallback((): string => {
    if (!lojaId) {
      throw new Error('Usuário não autenticado');
    }
    return lojaId;
  }, [lojaId]);

  return {
    loja,
    lojaId,
    isLoading,
    error,
    withReadIsolation,
    withWriteIsolation,
    canAccess,
    getCurrentLojaId
  };
}; 