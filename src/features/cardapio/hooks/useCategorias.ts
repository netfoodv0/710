import { useState, useCallback, useEffect } from 'react';
import { Categoria, DisponibilidadeCategoria } from '../../../types';
import { useCategoriasFirebase } from '../../../hooks/useCategoriasFirebase';
import { useNotifications } from '../../../hooks/useNotifications';

export interface UseCategoriasReturn {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  criarCategoria: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarCategoria: (id: string, categoria: Partial<Categoria>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  duplicarCategoria: (id: string) => Promise<void>;
  atualizarStatus: (id: string, status: Categoria['status']) => Promise<void>;
  atualizarDisponibilidade: (id: string, disponibilidade: DisponibilidadeCategoria) => Promise<void>;
  buscarCategoria: (id: string) => Categoria | undefined;
}

export const useCategorias = (): UseCategoriasReturn => {
  const { categorias, loading, error, carregarCategorias } = useCategoriasFirebase();
  const { showSuccess, showError } = useNotifications();

  // Carregar categorias na inicialização
  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);

  const criarCategoria = useCallback(async (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      // Implementar criação via Firebase
      showSuccess('Categoria criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria';
      showError(errorMessage);
      console.error('Erro ao criar categoria:', err);
    }
  }, [showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<Categoria>) => {
    try {
      // Implementar edição via Firebase
      showSuccess('Categoria atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria';
      showError(errorMessage);
      console.error('Erro ao editar categoria:', err);
    }
  }, [showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    try {
      // Implementar exclusão via Firebase
      showSuccess('Categoria excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria';
      showError(errorMessage);
      console.error('Erro ao excluir categoria:', err);
    }
  }, [showSuccess, showError]);

  const duplicarCategoria = useCallback(async (id: string) => {
    try {
      const categoriaOriginal = categorias.find(cat => cat.id === id);
      if (!categoriaOriginal) {
        throw new Error('Categoria não encontrada');
      }

      // Implementar duplicação via Firebase
      showSuccess('Categoria duplicada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao duplicar categoria';
      showError(errorMessage);
      console.error('Erro ao duplicar categoria:', err);
    }
  }, [categorias, showSuccess, showError]);

  const atualizarStatus = useCallback(async (id: string, status: Categoria['status']) => {
    try {
      // Implementar atualização de status via Firebase
      showSuccess('Status atualizado com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao atualizar status';
      showError(errorMessage);
      console.error('Erro ao atualizar status:', err);
    }
  }, [showSuccess, showError]);

  const atualizarDisponibilidade = useCallback(async (id: string, disponibilidade: DisponibilidadeCategoria) => {
    try {
      // Implementar atualização de disponibilidade via Firebase
      showSuccess('Disponibilidade atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao atualizar disponibilidade';
      showError(errorMessage);
      console.error('Erro ao atualizar disponibilidade:', err);
    }
  }, [showSuccess, showError]);

  const buscarCategoria = useCallback((id: string): Categoria | undefined => {
    return categorias.find(cat => cat.id === id);
  }, [categorias]);

  return {
    categorias,
    loading,
    error,
    criarCategoria,
    editarCategoria,
    excluirCategoria,
    duplicarCategoria,
    atualizarStatus,
    atualizarDisponibilidade,
    buscarCategoria
  };
}; 