import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../lib/firebase';
import { useProdutoService } from '../../../hooks/useProdutoService';
import { useCategoriaService } from '../../../hooks/useCategoriaService';
import { ComplementosService } from '../../../pages/PaginaComplementos/services/complementosService';
import { ProdutoModal } from '../../../types/cardapio/produtoModal';
import { CategoriaModal } from '../../../types/cardapio/categoriaModal';
import { Complemento } from '../../../types/cardapio/complemento';
import { getProdutosExemplo, getCategoriasExemplo } from '../../../data/mockCardapio';

interface UseCardapioDataReturn {
  produtos: ProdutoModal[];
  categorias: CategoriaModal[];
  complementos: Complemento[];
  loading: boolean;
  error: string | null;
  recarregarProdutos: () => Promise<void>;
  recarregarCategorias: () => Promise<void>;
  recarregarComplementos: () => Promise<void>;
  recarregarTodos: () => Promise<void>;
}

/**
 * Hook customizado para gerenciar os dados do cardápio
 * Centraliza a lógica de carregamento de produtos, categorias e complementos
 */
export function useCardapioData(): UseCardapioDataReturn {
  const { buscarProdutos } = useProdutoService();
  const { buscarCategorias } = useCategoriaService();
  
  const [produtos, setProdutos] = useState<ProdutoModal[]>([]);
  const [categorias, setCategorias] = useState<CategoriaModal[]>([]);
  const [complementos, setComplementos] = useState<Complemento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega produtos do Firebase ou usa dados de exemplo
   */
  const recarregarProdutos = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user?.uid) {
        console.warn('Usuário não autenticado');
        return;
      }

      const produtosCarregados = await buscarProdutos(user.uid);
      
      // Se não há produtos cadastrados, usar dados de exemplo
      if (produtosCarregados.length === 0) {
        setProdutos(getProdutosExemplo(user.uid));
      } else {
        setProdutos(produtosCarregados);
      }
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos');
      throw err;
    }
  }, [buscarProdutos]);

  /**
   * Carrega categorias do Firebase ou usa dados de exemplo
   */
  const recarregarCategorias = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user?.uid) {
        console.warn('Usuário não autenticado');
        return;
      }

      const categoriasCarregadas = await buscarCategorias(user.uid);
      
      // Se não há categorias cadastradas, usar dados de exemplo
      if (categoriasCarregadas.length === 0) {
        setCategorias(getCategoriasExemplo(user.uid));
      } else {
        setCategorias(categoriasCarregadas);
      }
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError('Erro ao carregar categorias');
      throw err;
    }
  }, [buscarCategorias]);

  /**
   * Carrega complementos do Firebase
   */
  const recarregarComplementos = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user?.uid) {
        console.warn('Usuário não autenticado para carregar complementos');
        return;
      }

      const complementosCarregados = await ComplementosService.buscarComplementos(user.uid);
      setComplementos(complementosCarregados);
    } catch (err) {
      console.error('Erro ao carregar complementos:', err);
      setError('Erro ao carregar complementos');
      setComplementos([]);
    }
  }, []);

  /**
   * Carrega todos os dados (produtos, categorias e complementos)
   */
  const recarregarTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        recarregarProdutos(),
        recarregarCategorias(),
        recarregarComplementos()
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados do cardápio:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarProdutos, recarregarCategorias, recarregarComplementos]);

  // Carregar dados ao montar o componente
  useEffect(() => {
    recarregarTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem do componente

  return {
    produtos,
    categorias,
    complementos,
    loading,
    error,
    recarregarProdutos,
    recarregarCategorias,
    recarregarComplementos,
    recarregarTodos
  };
}

