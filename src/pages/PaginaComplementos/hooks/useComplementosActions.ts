import { useCallback } from 'react';
import { auth } from '../../../lib/firebase';
import { ComplementosService } from '../services';
import { ComplementoFormData, UseComplementosActionsReturn } from '../types';

export function useComplementosActions(): UseComplementosActionsReturn {
  const createComplemento = useCallback(async (data: ComplementoFormData) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      await ComplementosService.criarComplemento(user.uid, data);
    } catch (error) {
      console.error('Erro ao criar complemento:', error);
      throw error;
    }
  }, []);

  const updateComplemento = useCallback(async (id: string, data: ComplementoFormData) => {
    try {
      await ComplementosService.atualizarComplemento(id, data);
    } catch (error) {
      console.error('Erro ao atualizar complemento:', error);
      throw error;
    }
  }, []);

  const deleteComplemento = useCallback(async (id: string) => {
    try {
      await ComplementosService.excluirComplemento(id);
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
      throw error;
    }
  }, []);

  const toggleStatus = useCallback(async (id: string) => {
    try {
      await ComplementosService.alternarStatusComplemento(id);
    } catch (error) {
      console.error('Erro ao alternar status do complemento:', error);
      throw error;
    }
  }, []);

  const duplicateComplemento = useCallback(async (id: string) => {
    try {
      await ComplementosService.duplicarComplemento(id);
    } catch (error) {
      console.error('Erro ao duplicar complemento:', error);
      throw error;
    }
  }, []);

  const reorderComplementos = useCallback(async (complementos: any[]) => {
    try {
      // Implementar reordenação se necessário
      console.log('Reordenação de complementos:', complementos);
    } catch (error) {
      console.error('Erro ao reordenar complementos:', error);
      throw error;
    }
  }, []);

  return {
    createComplemento,
    updateComplemento,
    deleteComplemento,
    toggleStatus,
    duplicateComplemento,
    reorderComplementos
  };
}









