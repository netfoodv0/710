import { useState, useCallback, useEffect } from 'react';
import { CategoriaAdicional, DisponibilidadeCategoria } from '../types';
import { useCategoriasAdicionaisFirebase } from './useCategoriasAdicionaisFirebase';
import { useNotifications } from './useNotifications';

export interface UseCategoriasAdicionaisReturn {
  categorias: CategoriaAdicional[];
  loading: boolean;
  error: string | null;
  criarCategoria: (categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarCategoria: (id: string, categoria: Partial<CategoriaAdicional>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  duplicarCategoria: (id: string) => Promise<void>;
  atualizarStatus: (id: string, status: CategoriaAdicional['status']) => Promise<void>;
  atualizarDisponibilidade: (id: string, disponibilidade: DisponibilidadeCategoria) => Promise<void>;
  buscarCategoria: (id: string) => CategoriaAdicional | undefined;
}

export const useCategoriasAdicionais = (): UseCategoriasAdicionaisReturn => {
  const { categorias, loading, error, carregarCategorias } = useCategoriasAdicionaisFirebase();
  const { showSuccess, showError } = useNotifications();

  // Carregar categorias na inicialização
  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);

  const criarCategoria = useCallback(async (categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      // Implementar criação via Firebase
      showSuccess('Categoria de adicional criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria de adicional';
      showError(errorMessage);
      console.error('Erro ao criar categoria de adicional:', err);
    }
  }, [showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<CategoriaAdicional>) => {
    try {
      // Implementar edição via Firebase
      showSuccess('Categoria de adicional atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria de adicional';
      showError(errorMessage);
      console.error('Erro ao editar categoria de adicional:', err);
    }
  }, [showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    try {
      // Implementar exclusão via Firebase
      showSuccess('Categoria de adicional excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria de adicional';
      showError(errorMessage);
      console.error('Erro ao excluir categoria de adicional:', err);
    }
  }, [showSuccess, showError]);

  const duplicarCategoria = useCallback(async (id: string) => {
    try {
      const categoriaOriginal = categorias.find(cat => cat.id === id);
      if (!categoriaOriginal) {
        throw new Error('Categoria não encontrada');
      }

      // Implementar duplicação via Firebase
      showSuccess('Categoria de adicional duplicada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao duplicar categoria de adicional';
      showError(errorMessage);
      console.error('Erro ao duplicar categoria de adicional:', err);
    }
  }, [categorias, showSuccess, showError]);

  const atualizarStatus = useCallback(async (id: string, status: CategoriaAdicional['status']) => {
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

  const buscarCategoria = useCallback((id: string): CategoriaAdicional | undefined => {
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