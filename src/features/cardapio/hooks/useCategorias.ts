import { useState, useCallback } from 'react';
import { Categoria, DisponibilidadeCategoria } from '../types';
import { categoriasMock } from '../data/cardapioMock';
import { useNotifications } from './useNotifications';

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
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasMock);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useNotifications();

  const criarCategoria = useCallback(async (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const novaCategoria: Categoria = {
        ...categoria,
        id: `cat-${Date.now()}`,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };

      setCategorias(prev => [...prev, novaCategoria]);
      showSuccess('Categoria criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao criar categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<Categoria>) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.map(cat => 
        cat.id === id 
          ? { ...cat, ...categoria, dataAtualizacao: new Date() }
          : cat
      ));
      showSuccess('Categoria atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao editar categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.filter(cat => cat.id !== id));
      showSuccess('Categoria excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao excluir categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const duplicarCategoria = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const categoriaOriginal = categorias.find(cat => cat.id === id);
      if (!categoriaOriginal) {
        throw new Error('Categoria não encontrada');
      }

      const categoriaDuplicada: Categoria = {
        ...categoriaOriginal,
        id: `cat-${Date.now()}`,
        nome: `${categoriaOriginal.nome} (Cópia)`,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };

      setCategorias(prev => [...prev, categoriaDuplicada]);
      showSuccess('Categoria duplicada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao duplicar categoria';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao duplicar categoria:', err);
    } finally {
      setLoading(false);
    }
  }, [categorias, showSuccess, showError]);

  const atualizarStatus = useCallback(async (id: string, status: Categoria['status']) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.map(cat => 
        cat.id === id 
          ? { ...cat, status, dataAtualizacao: new Date() }
          : cat
      ));
      showSuccess('Status atualizado com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao atualizar status';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao atualizar status:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const atualizarDisponibilidade = useCallback(async (id: string, disponibilidade: DisponibilidadeCategoria) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.map(cat => 
        cat.id === id 
          ? { ...cat, disponibilidade, dataAtualizacao: new Date() }
          : cat
      ));
      showSuccess('Disponibilidade atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao atualizar disponibilidade';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao atualizar disponibilidade:', err);
    } finally {
      setLoading(false);
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