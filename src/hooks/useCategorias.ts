import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { firebaseCategoriaService } from '../services/firebaseCategoriaService';
import { Categoria, CriarCategoriaData, EditarCategoriaData, FiltrosCategoria } from '../types/categoria';
import { useAuth } from './useAuth';

// Cache global para categorias
const categoriasCache = new Map<string, { data: Categoria[]; timestamp: number; lojaId: string }>();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutos

export interface UseCategoriasReturn {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  criarCategoria: (dados: CriarCategoriaData) => Promise<void>;
  editarCategoria: (id: string, dados: Partial<CriarCategoriaData>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  duplicarCategoria: (id: string, novoNome?: string) => Promise<void>;
  buscarCategoria: (id: string) => Categoria | undefined;
  recarregar: () => Promise<void>;
}

// Categorias mockadas para desenvolvimento (fora do componente para evitar re-renders)
const categoriasDesenvolvimento: Categoria[] = [
  {
    id: 'dev-1',
    nome: 'Hambúrgueres',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  },
  {
    id: 'dev-2',
    nome: 'Bebidas',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  },
  {
    id: 'dev-3',
    nome: 'Sobremesas',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: [],
    dataCriacao: new Date('2024-01-01'),
    dataAtualizacao: new Date('2024-01-01'),
    lojaId: 'desenvolvimento'
  }
];

export function useCategorias(lojaId: string, filtros?: FiltrosCategoria): UseCategoriasReturn {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const lastFetchRef = useRef<{ lojaId: string; filtros: string }>({ lojaId: '', filtros: '' });

  // Memoizar filtros para evitar recarregamentos desnecessários
  const filtrosEstabilizados = useMemo(() => {
    if (!filtros) return {};
    return {
      ativo: filtros.ativo,
      nome: filtros.nome?.trim() || '',
      ordenacao: filtros.ordenacao || 'nome'
    };
  }, [filtros?.ativo, filtros?.nome, filtros?.ordenacao]);

  // Verificar se precisa recarregar dados
  const precisaRecarregar = useCallback(() => {
    const cacheKey = `${lojaId}-${JSON.stringify(filtrosEstabilizados)}`;
    const cached = categoriasCache.get(cacheKey);
    
    if (!cached) return true;
    
    const now = Date.now();
    if (now - cached.timestamp > CACHE_TTL) return true;
    
    if (cached.lojaId !== lojaId) return true;
    
    return false;
  }, [lojaId, filtrosEstabilizados]);

  const recarregar = useCallback(async () => {
    if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
      setCategorias([]);
      setError(null);
      return;
    }

    const cacheKey = `${lojaId}-${JSON.stringify(filtrosEstabilizados)}`;
    
    // Verificar cache primeiro
    if (!precisaRecarregar()) {
      const cached = categoriasCache.get(cacheKey);
      if (cached) {
        setCategorias(cached.data);
        setError(null);
        return;
      }
    }

    setLoading(true);
    setError(null);
    
    try {
      const categoriasData = await firebaseCategoriaService.buscarCategorias(lojaId, filtrosEstabilizados);
      
      // Atualizar cache
      categoriasCache.set(cacheKey, {
        data: categoriasData || [],
        timestamp: Date.now(),
        lojaId
      });
      
      setCategorias(categoriasData || []);
      lastFetchRef.current = { lojaId, filtros: JSON.stringify(filtrosEstabilizados) };
    } catch (err) {
      console.error('Erro ao buscar categorias, usando modo desenvolvimento:', err);
      
      // Em caso de erro, usar cache se disponível
      const cached = categoriasCache.get(cacheKey);
      if (cached) {
        setCategorias(cached.data);
        setError(null);
      } else {
        setCategorias([]);
        setError('Erro ao carregar categorias');
      }
    } finally {
      setLoading(false);
    }
  }, [lojaId, filtrosEstabilizados, precisaRecarregar]);

  // Carregar categorias apenas quando necessário
  useEffect(() => {
    const cacheKey = `${lojaId}-${JSON.stringify(filtrosEstabilizados)}`;
    const currentFetch = { lojaId, filtros: JSON.stringify(filtrosEstabilizados) };
    
    // Evitar recarregamento se já temos os dados corretos
    if (lastFetchRef.current.lojaId === currentFetch.lojaId && 
        lastFetchRef.current.filtros === currentFetch.filtros &&
        categorias.length > 0) {
      return;
    }
    
    recarregar();
  }, [lojaId, filtrosEstabilizados, recarregar, categorias.length]);

  const criarCategoria = useCallback(async (dados: CriarCategoriaData) => {
    try {
      if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
        throw new Error('Usuário não autenticado');
      }
      
      await firebaseCategoriaService.criarCategoria(lojaId, dados);
      await recarregar(); // Recarregar lista
    } catch (error) {
      throw error;
    }
  }, [lojaId, recarregar]);

  const editarCategoria = useCallback(async (id: string, dados: Partial<CriarCategoriaData>) => {
    try {
      if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
        throw new Error('Usuário não autenticado');
      }
      
      await firebaseCategoriaService.atualizarCategoria(id, dados);
      await recarregar(); // Recarregar lista
    } catch (error) {
      throw error;
    }
  }, [lojaId, recarregar]);

  const excluirCategoria = useCallback(async (id: string) => {
    try {
      if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
        throw new Error('Usuário não autenticado');
      }
      
      await firebaseCategoriaService.excluirCategoria(id);
      await recarregar(); // Recarregar lista
    } catch (error) {
      throw error;
    }
  }, [lojaId, recarregar]);

  const duplicarCategoria = useCallback(async (id: string, novoNome?: string) => {
    try {
      if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
        throw new Error('Usuário não autenticado');
      }
      
      await firebaseCategoriaService.duplicarCategoria(id, novoNome);
      await recarregar(); // Recarregar lista
    } catch (error) {
      throw error;
    }
  }, [lojaId, recarregar]);

  const buscarCategoria = useCallback((id: string): Categoria | undefined => {
    return categorias.find(categoria => categoria.id === id);
  }, [categorias]);

  return {
    categorias,
    loading,
    error,
    criarCategoria,
    editarCategoria,
    excluirCategoria,
    duplicarCategoria,
    buscarCategoria,
    recarregar
  };
}
