import { useState, useCallback, useEffect } from 'react';
import { CategoriaAdicional } from '../types';
import { firebaseCardapioService } from '../services/firebaseCardapioService';
import { useNotifications } from './useNotifications';
import { useAuth } from './useAuth';

export interface UseCategoriasAdicionaisFirebaseReturn {
  categorias: CategoriaAdicional[];
  loading: boolean;
  error: string | null;
  criarCategoria: (categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarCategoria: (id: string, categoria: Partial<CategoriaAdicional>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  buscarCategoria: (id: string) => Promise<CategoriaAdicional | null>;
  recarregarCategorias: () => Promise<void>;
}

export const useCategoriasAdicionaisFirebase = (): UseCategoriasAdicionaisFirebaseReturn => {
  const [categorias, setCategorias] = useState<CategoriaAdicional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { showSuccess, showError } = useNotifications();
  const { user, status } = useAuth();

  // ✅ CORREÇÃO: Declarar recarregarCategorias antes do useEffect
  const recarregarCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categoriasData = await firebaseCardapioService.buscarCategoriasAdicionais();
      setCategorias(categoriasData);
    } catch (err) {
      const errorMessage = 'Erro ao carregar categorias adicionais';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao carregar categorias adicionais:', err);
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

  const criarCategoria = useCallback(async (categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.criarCategoriaAdicional(categoria);
      await recarregarCategorias();
      showSuccess('Categoria adicional criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao criar categoria adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<CategoriaAdicional>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.editarCategoriaAdicional(id, categoria);
      await recarregarCategorias();
      showSuccess('Categoria adicional atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao editar categoria adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.excluirCategoriaAdicional(id);
      await recarregarCategorias();
      showSuccess('Categoria adicional excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao excluir categoria adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarCategorias, showSuccess, showError]);

  const buscarCategoria = useCallback(async (id: string): Promise<CategoriaAdicional | null> => {
    try {
      const categorias = await firebaseCardapioService.buscarCategoriasAdicionais();
      return categorias.find(cat => cat.id === id) || null;
    } catch (err) {
      console.error('Erro ao buscar categoria adicional:', err);
      return null;
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
    recarregarCategorias
  };
}; 