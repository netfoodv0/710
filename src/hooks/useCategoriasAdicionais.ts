import { useState, useCallback } from 'react';
import { CategoriaAdicional, DisponibilidadeCategoria } from '../types';
import { categoriasAdicionaisMock } from '../data/cardapioMock';
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
  const [categorias, setCategorias] = useState<CategoriaAdicional[]>(categoriasAdicionaisMock);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useNotifications();

  const criarCategoria = useCallback(async (categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const novaCategoria: CategoriaAdicional = {
        ...categoria,
        id: `add-${Date.now()}`,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };

      setCategorias(prev => [...prev, novaCategoria]);
      showSuccess('Categoria de adicional criada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar categoria de adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao criar categoria de adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const editarCategoria = useCallback(async (id: string, categoria: Partial<CategoriaAdicional>) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.map(cat => 
        cat.id === id 
          ? { ...cat, ...categoria, dataAtualizacao: new Date() }
          : cat
      ));
      showSuccess('Categoria de adicional atualizada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar categoria de adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao editar categoria de adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const excluirCategoria = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      setCategorias(prev => prev.filter(cat => cat.id !== id));
      showSuccess('Categoria de adicional excluída com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir categoria de adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao excluir categoria de adicional:', err);
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

      const categoriaDuplicada: CategoriaAdicional = {
        ...categoriaOriginal,
        id: `add-${Date.now()}`,
        nome: `${categoriaOriginal.nome} (Cópia)`,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };

      setCategorias(prev => [...prev, categoriaDuplicada]);
      showSuccess('Categoria de adicional duplicada com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao duplicar categoria de adicional';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Erro ao duplicar categoria de adicional:', err);
    } finally {
      setLoading(false);
    }
  }, [categorias, showSuccess, showError]);

  const atualizarStatus = useCallback(async (id: string, status: CategoriaAdicional['status']) => {
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