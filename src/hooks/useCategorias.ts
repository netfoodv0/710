import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { firebaseCategoriaService } from '../services/firebaseCategoriaService';
import { Categoria, CriarCategoriaData, EditarCategoriaData, FiltrosCategoria } from '../types/global/categoria';
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
  recarregar: (forcarReload?: boolean) => Promise<void>;
  atualizarPosicoesCategorias: (categoriasOrdenadas: string[]) => Promise<void>;
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
    lojaId: 'desenvolvimento',
    posicao: 1
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
    lojaId: 'desenvolvimento',
    posicao: 2
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
    lojaId: 'desenvolvimento',
    posicao: 3
  }
];

export function useCategorias(lojaId: string, filtros?: FiltrosCategoria): UseCategoriasReturn {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const lastFetchRef = useRef<{ lojaId: string; filtros: string }>({ lojaId: '', filtros: '' });

  // ✅ CORREÇÃO: Sempre usar ordenação por nome para manter posição fixa
  const filtrosEstabilizados = useMemo(() => {
    if (!filtros) return {};
    return {
      ativo: filtros.ativo,
      nome: filtros.nome?.trim() || '',
      ordenacao: 'nome' // Forçar ordenação por nome sempre
    };
  }, [filtros?.ativo, filtros?.nome]);

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

  const recarregar = useCallback(async (forcarReload = false) => {
    if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
      setCategorias([]);
      setError(null);
      return;
    }

    const cacheKey = `${lojaId}-${JSON.stringify(filtrosEstabilizados)}`;
    
    // ✅ MODO DESENVOLVIMENTO: Se for desenvolvimento, usar categorias mock atualizáveis
    if (lojaId === 'desenvolvimento') {
      try {
        const categoriasLocalStorage = localStorage.getItem('categorias-desenvolvimento');
        if (categoriasLocalStorage) {
          const categoriasLocal = JSON.parse(categoriasLocalStorage);
          setCategorias(categoriasLocal);
          setError(null);
          return;
        }
      } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
      }
      
      setCategorias(categoriasDesenvolvimento);
      localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categoriasDesenvolvimento));
      setError(null);
      return;
    }
    
    // Verificar cache primeiro (apenas se não forçar reload)
    if (!forcarReload && !precisaRecarregar()) {
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
      
      // ✅ Migração automática: categorias sem posição (executa em background para não bloquear UI)
      setCategorias(categoriasData || []);
      
      if (categoriasData && categoriasData.length > 0) {
        const categoriasSemPosicao = categoriasData.filter(c => c.posicao === undefined || c.posicao === null);
        if (categoriasSemPosicao.length > 0) {
          // Executar migração em background sem bloquear a UI
          firebaseCategoriaService.migrarCategoriasParaPosicao(lojaId)
            .then(async () => {
              console.log('Migração concluída com sucesso');
              // Recarregar silenciosamente após migração
              try {
                const categoriasAtualizadas = await firebaseCategoriaService.buscarCategorias(lojaId, filtrosEstabilizados);
                setCategorias(categoriasAtualizadas || []);
              } catch (reloadError) {
                console.error('Erro ao recarregar após migração:', reloadError);
              }
            })
            .catch(migrationError => {
              console.error('Erro na migração (continuando normalmente):', migrationError);
            });
        }
      }
      
      // Atualizar cache
      categoriasCache.set(cacheKey, {
        data: categoriasData || [],
        timestamp: Date.now(),
        lojaId
      });
      
      lastFetchRef.current = { lojaId, filtros: JSON.stringify(filtrosEstabilizados) };
    } catch (err) {
      console.error('Erro ao buscar categorias do Firebase:', err);
      
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

  // ✅ CORREÇÃO: Carregar categorias apenas quando necessário, evitando re-renders
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
  }, [lojaId, filtrosEstabilizados, recarregar]);

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
      
      // ✅ ATUALIZAÇÃO OTIMISTA: Atualizar o estado local PRIMEIRO para feedback imediato, mantendo a ordem
      setCategorias(prevCategorias => {
        return prevCategorias.map(categoria => {
          if (categoria.id === id) {
            return {
              ...categoria,
              ...dados,
              dataAtualizacao: new Date()
            };
          }
          return categoria;
        });
      });
      
      // ✅ MODO DESENVOLVIMENTO: Atualizar localStorage
      if (lojaId === 'desenvolvimento') {
        const categoriasLocalStorage = localStorage.getItem('categorias-desenvolvimento');
        let categoriasLocal = categoriasLocalStorage 
          ? JSON.parse(categoriasLocalStorage) 
          : [...categoriasDesenvolvimento];
        
        const categoriaIndex = categoriasLocal.findIndex((cat: Categoria) => cat.id === id);
        if (categoriaIndex !== -1) {
          categoriasLocal[categoriaIndex] = {
            ...categoriasLocal[categoriaIndex],
            ...dados,
            dataAtualizacao: new Date()
          };
          
          localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categoriasLocal));
          return;
        } else {
          throw new Error('Categoria não encontrada');
        }
      }
      
      // ✅ MODO FIREBASE: Usar serviço Firebase
      await firebaseCategoriaService.atualizarCategoria(id, dados);
      
      // Limpar cache para forçar recarregamento futuro se necessário
      const keysToDelete = Array.from(categoriasCache.keys()).filter(key => key.startsWith(`${lojaId}-`));
      keysToDelete.forEach(key => categoriasCache.delete(key));
      
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
      
      // ✅ REVERTER ATUALIZAÇÃO OTIMISTA em caso de erro
      await recarregar(true);
      
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

  const atualizarPosicoesCategorias = useCallback(async (categoriasOrdenadas: string[]) => {
    try {
      if (!lojaId || lojaId.trim() === '' || lojaId === 'null') {
        throw new Error('Usuário não autenticado');
      }

      // ✅ ATUALIZAÇÃO OTIMISTA: Atualizar o estado local PRIMEIRO para feedback imediato
      setCategorias(prevCategorias => {
        return prevCategorias.map(categoria => {
          const novaPosicao = categoriasOrdenadas.indexOf(categoria.nome) + 1;
          if (novaPosicao > 0) {
            return { ...categoria, posicao: novaPosicao };
          }
          return categoria;
        }).sort((a, b) => (a.posicao || 999) - (b.posicao || 999));
      });

      // ✅ MODO DESENVOLVIMENTO: Atualizar localStorage
      if (lojaId === 'desenvolvimento') {
        const categoriasLocalStorage = localStorage.getItem('categorias-desenvolvimento');
        let categoriasLocal = categoriasLocalStorage 
          ? JSON.parse(categoriasLocalStorage) 
          : [...categoriasDesenvolvimento];
        
        // Atualizar posições baseado na nova ordem
        const categoriasAtualizadas = categoriasOrdenadas.map((nome, index) => {
          const categoria = categoriasLocal.find((c: Categoria) => c.nome === nome);
          if (categoria) {
            return { ...categoria, posicao: index + 1 };
          }
          return null;
        }).filter(Boolean);

        localStorage.setItem('categorias-desenvolvimento', JSON.stringify(categoriasAtualizadas));
        return;
      }

      // ✅ MODO FIREBASE: Usar serviço Firebase
      await firebaseCategoriaService.atualizarPosicoesCategorias(lojaId, categoriasOrdenadas);
      
      // Limpar cache para forçar recarregamento futuro se necessário
      const keysToDelete = Array.from(categoriasCache.keys()).filter(key => key.startsWith(`${lojaId}-`));
      keysToDelete.forEach(key => categoriasCache.delete(key));
      
      // ✅ REMOVIDO: Não recarregar completamente para evitar "pulo" visual
      // await recarregar(true);
      
    } catch (error) {
      console.error('Erro ao atualizar posições das categorias:', error);
      
      // ✅ REVERTER ATUALIZAÇÃO OTIMISTA em caso de erro
      await recarregar(true);
      
      throw error;
    }
  }, [lojaId, recarregar]);

  return {
    categorias,
    loading,
    error,
    criarCategoria,
    editarCategoria,
    excluirCategoria,
    duplicarCategoria,
    buscarCategoria,
    recarregar,
    atualizarPosicoesCategorias
  };
}
