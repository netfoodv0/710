import { useState, useCallback, useEffect } from 'react';
import { Categoria } from '../types';
import { firebaseCardapioService, FiltrosCategoria } from '../services/firebaseCardapioService';
import { useNotifications } from './useNotifications';
import { useAuth } from './useAuth';

export interface UseCategoriasFirebaseReturn {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  criarCategoria: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarCategoria: (id: string, categoria: Partial<Categoria>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  buscarCategoria: (id: string) => Promise<Categoria | null>;
  filtrarCategorias: (filtros: FiltrosCategoria) => Promise<Categoria[]>;
  recarregarCategorias: () => Promise<void>;
}

export const useCategoriasFirebase = (): UseCategoriasFirebaseReturn => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { showSuccess, showError } = useNotifications();
  const { user, status } = useAuth();

  // ✅ CORREÇÃO: Declarar recarregarCategorias antes do useEffect
  const recarregarCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categoriasData = await firebaseCardapioService.buscarCategorias();
      setCategorias(categoriasData);
    } catch (err) {
      const errorMessage = 'Erro ao carregar categorias';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao carregar categorias:', err);
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Carregar categorias iniciais apenas se o usuário estiver autenticado
  useEffect(() => {
    if (status === 'authenticated' && user) {
      recarregarCategorias();
    }
  }, [recarregarCategorias, status, user]);

  const criarCategoria = useCallback(async (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.criarCategoria(categoria);
      await recarregarCategorias();
      showSuccess('Categoria criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao criar categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<Categoria>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.editarCategoria(id, categoria);
      await recarregarCategorias();
      showSuccess('Categoria atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao editar categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.excluirCategoria(id);
      await recarregarCategorias();
      showSuccess('Categoria excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao excluir categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const buscarCategoria = useCallback(async (id: string): Promise<Categoria | null> => {
    try {
      const categorias = await firebaseCardapioService.buscarCategorias();
      return categorias.find(cat => cat.id === id) || null;
    } catch (err) {
      console.error('Erro ao buscar categoria:', err);
      return null;
    }
  }, []);

  const filtrarCategorias = useCallback(async (filtros: FiltrosCategoria): Promise<Categoria[]> => {
    try {
      return await firebaseCardapioService.buscarCategorias(filtros);
    } catch (err) {
      console.error('Erro ao filtrar categorias:', err);
      return [];
    }
  }, []);

  return {
    categorias,
    loading,
    error,
    criarCategoria,
    editarCategoria,
    excluirCategoria,
    buscarCategoria,
    filtrarCategorias,
    recarregarCategorias
  };
}; 