import { useState, useCallback, useEffect } from 'react';
import { Produto, ScoreQualidade, ValidacaoProduto } from '../types/produtos';
import { firebaseCardapioService, FiltrosProduto } from '../services/firebaseCardapioService';
import { useNotifications } from './useNotifications';

export interface UseProdutosFirebaseReturn {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  criarProduto: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarProduto: (id: string, produto: Partial<Produto>) => Promise<void>;
  excluirProduto: (id: string) => Promise<void>;
  duplicarProduto: (id: string) => Promise<void>;
  buscarProduto: (id: string) => Promise<Produto | null>;
  calcularScoreQualidade: (produto: Produto) => ScoreQualidade;
  validarProduto: (produto: Partial<Produto>) => ValidacaoProduto;
  filtrarProdutos: (filtros: FiltrosProduto) => Promise<Produto[]>;
  buscarProdutosPorCategoria: (categoriaId: string) => Promise<Produto[]>;
  buscarProdutosPorStatus: (status: Produto['status']) => Promise<Produto[]>;
  buscarProdutosDestacados: () => Promise<Produto[]>;
  buscarProdutosEmFalta: () => Promise<Produto[]>;
  recarregarProdutos: () => Promise<void>;
  estatisticas: {
    totalProdutos: number;
    produtosAtivos: number;
    produtosDestacados: number;
    produtosEmFalta: number;
    categoriasAtivas: number;
    receitaTotal: number;
  } | null;
}

export const useProdutosFirebase = (): UseProdutosFirebaseReturn => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estatisticas, setEstatisticas] = useState<UseProdutosFirebaseReturn['estatisticas']>(null);
  
  const { addNotification } = useNotifications();

  // ✅ CORREÇÃO: Declarar recarregarProdutos antes do useEffect
  const recarregarProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [produtosData, estatisticasData] = await Promise.all([
        firebaseCardapioService.buscarProdutos(),
        firebaseCardapioService.buscarEstatisticasCardapio()
      ]);
      
      setProdutos(produtosData);
      setEstatisticas(estatisticasData);
    } catch (err) {
      const errorMessage = 'Erro ao carregar produtos';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  // Carregar produtos iniciais
  useEffect(() => {
    recarregarProdutos();
  }, [recarregarProdutos]);

  const criarProduto = useCallback(async (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.criarProduto(produto);
      await recarregarProdutos(); // Recarregar para pegar o novo produto
      addNotification({ message: 'Produto criado com sucesso!', type: 'success' });
    } catch (err) {
      const errorMessage = 'Erro ao criar produto';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      console.error('Erro ao criar produto:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarProdutos, addNotification]);

  const editarProduto = useCallback(async (id: string, produto: Partial<Produto>) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.editarProduto(id, produto);
      await recarregarProdutos(); // Recarregar para pegar as mudanças
      addNotification({ message: 'Produto atualizado com sucesso!', type: 'success' });
    } catch (err) {
      const errorMessage = 'Erro ao editar produto';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      console.error('Erro ao editar produto:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarProdutos, addNotification]);

  const excluirProduto = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.excluirProduto(id);
      await recarregarProdutos(); // Recarregar para remover o produto
      addNotification({ message: 'Produto excluído com sucesso!', type: 'success' });
    } catch (err) {
      const errorMessage = 'Erro ao excluir produto';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      console.error('Erro ao excluir produto:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarProdutos, addNotification]);

  const duplicarProduto = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseCardapioService.duplicarProduto(id);
      await recarregarProdutos(); // Recarregar para pegar o produto duplicado
      addNotification({ message: 'Produto duplicado com sucesso!', type: 'success' });
    } catch (err) {
      const errorMessage = 'Erro ao duplicar produto';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      console.error('Erro ao duplicar produto:', err);
    } finally {
      setLoading(false);
    }
  }, [recarregarProdutos, addNotification]);

  const buscarProduto = useCallback(async (id: string): Promise<Produto | null> => {
    try {
      return await firebaseCardapioService.buscarProduto(id);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      return null;
    }
  }, []);

  const calcularScoreQualidade = useCallback((produto: Produto): ScoreQualidade => {
    let scoreTotal = 0;
    const sugestoes: string[] = [];

    // Score de informações (0-25 pontos)
    let scoreInformacoes = 0;
    if (produto.nome && produto.nome.length > 0) scoreInformacoes += 5;
    if (produto.descricao && produto.descricao.length > 50) scoreInformacoes += 10;
    if (produto.categoria) scoreInformacoes += 5;
    if (produto.preco > 0) scoreInformacoes += 5;
    
    if (scoreInformacoes < 20) sugestoes.push('Melhore as informações básicas do produto');

    // Score de mídia (0-25 pontos)
    let scoreMidia = 0;
    if (produto.imagem) scoreMidia += 15;
    if (produto.galeriaFotos && produto.galeriaFotos.length > 0) scoreMidia += 10;
    
    if (scoreMidia < 15) sugestoes.push('Adicione fotos ao produto');

    // Score de classificações (0-25 pontos)
    let scoreClassificacoes = 0;
    if (produto.classificacoes) {
      const classificacoes = Object.values(produto.classificacoes).filter(Boolean);
      scoreClassificacoes = Math.min(25, classificacoes.length * 5);
    }
    
    if (scoreClassificacoes < 10) sugestoes.push('Adicione classificações ao produto');

    // Score de disponibilidade (0-25 pontos)
    let scoreDisponibilidade = 0;
    if (produto.disponibilidade && produto.disponibilidade.ativo) {
      scoreDisponibilidade += 15;
      const diasAtivos = produto.disponibilidade.diasSemana.filter(dia => dia.ativo);
      scoreDisponibilidade += Math.min(10, diasAtivos.length * 2);
    }
    
    if (scoreDisponibilidade < 15) sugestoes.push('Configure a disponibilidade do produto');

    scoreTotal = scoreInformacoes + scoreMidia + scoreClassificacoes + scoreDisponibilidade;

    return {
      total: scoreTotal,
      categorias: {
        informacoes: scoreInformacoes,
        midia: scoreMidia,
        classificacoes: scoreClassificacoes,
        disponibilidade: scoreDisponibilidade
      },
      sugestoes
    };
  }, []);

  const validarProduto = useCallback((produto: Partial<Produto>): ValidacaoProduto => {
    const camposObrigatorios: string[] = [];
    const sugestoes = {
      adicionarFoto: false,
      melhorarDescricao: false,
      adicionarClassificacoes: false
    };

    // Validação de campos obrigatórios
    if (!produto.nome || produto.nome.trim().length === 0) {
      camposObrigatorios.push('nome');
    }

    if (!produto.descricao || produto.descricao.trim().length === 0) {
      camposObrigatorios.push('descricao');
    }

    if (!produto.preco || produto.preco <= 0) {
      camposObrigatorios.push('preco');
    }

    if (!produto.categoria) {
      camposObrigatorios.push('categoria');
    }

    // Sugestões de melhoria
    if (!produto.imagem) {
      sugestoes.adicionarFoto = true;
    }

    if (!produto.descricao || produto.descricao.length < 50) {
      sugestoes.melhorarDescricao = true;
    }

    if (!produto.classificacoes) {
      sugestoes.adicionarClassificacoes = true;
    }

    return {
      camposObrigatorios,
      precoMinimo: 0.01,
      tamanhoImagem: { width: 800, height: 600 },
      tamanhoMaximoArquivo: 5 * 1024 * 1024, // 5MB
      sugestoes
    };
  }, []);

  const filtrarProdutos = useCallback(async (filtros: FiltrosProduto): Promise<Produto[]> => {
    try {
      return await firebaseCardapioService.buscarProdutos(filtros);
    } catch (err) {
      console.error('Erro ao filtrar produtos:', err);
      return [];
    }
  }, []);

  const buscarProdutosPorCategoria = useCallback(async (categoriaId: string): Promise<Produto[]> => {
    try {
      return await firebaseCardapioService.buscarProdutos({ categoriaId });
    } catch (err) {
      console.error('Erro ao buscar produtos por categoria:', err);
      return [];
    }
  }, []);

  const buscarProdutosPorStatus = useCallback(async (status: Produto['status']): Promise<Produto[]> => {
    try {
      return await firebaseCardapioService.buscarProdutos({ status });
    } catch (err) {
      console.error('Erro ao buscar produtos por status:', err);
      return [];
    }
  }, []);

  const buscarProdutosDestacados = useCallback(async (): Promise<Produto[]> => {
    try {
      return await firebaseCardapioService.buscarProdutos({ destacado: true });
    } catch (err) {
      console.error('Erro ao buscar produtos destacados:', err);
      return [];
    }
  }, []);

  const buscarProdutosEmFalta = useCallback(async (): Promise<Produto[]> => {
    try {
      return await firebaseCardapioService.buscarProdutos({ status: 'em_falta' });
    } catch (err) {
      console.error('Erro ao buscar produtos em falta:', err);
      return [];
    }
  }, []);

  return {
    produtos,
    loading,
    error,
    criarProduto,
    editarProduto,
    excluirProduto,
    duplicarProduto,
    buscarProduto,
    calcularScoreQualidade,
    validarProduto,
    filtrarProdutos,
    buscarProdutosPorCategoria,
    buscarProdutosPorStatus,
    buscarProdutosDestacados,
    buscarProdutosEmFalta,
    recarregarProdutos,
    estatisticas
  };
}; 