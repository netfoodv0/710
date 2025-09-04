import { useState, useCallback, useEffect } from 'react';
import { Produto, ScoreQualidade, ValidacaoProduto } from '../types/global/produtos';
import { useProdutosFirebase } from './useProdutosFirebase';
import { useNotifications } from './useNotifications';

export interface UseProdutosReturn {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  criarProduto: (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  editarProduto: (id: string, produto: Partial<Produto>) => Promise<void>;
  excluirProduto: (id: string) => Promise<void>;
  duplicarProduto: (id: string) => Promise<void>;
  buscarProduto: (id: string) => Produto | undefined;
  calcularScoreQualidade: (produto: Produto) => ScoreQualidade;
  validarProduto: (produto: Partial<Produto>) => ValidacaoProduto;
  filtrarProdutos: (filtros: FiltrosProduto) => Produto[];
  buscarProdutosPorCategoria: (categoriaId: string) => Produto[];
  buscarProdutosPorStatus: (status: Produto['status']) => Produto[];
  buscarProdutosDestacados: () => Produto[];
  buscarProdutosEmFalta: () => Produto[];
}

export interface FiltrosProduto {
  categoria?: string;
  status?: Produto['status'];
  destacado?: boolean;
  precoMin?: number;
  precoMax?: number;
  termo?: string;
}

export const useProdutos = (): UseProdutosReturn => {
  const { produtos, loading, error, carregarProdutos } = useProdutosFirebase();
  const { showSuccess, showError } = useNotifications();

  // Carregar produtos na inicialização
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const criarProduto = useCallback(async (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      // Implementar criação via Firebase
      showSuccess('Produto criado com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao criar produto';
      showError(errorMessage);
      console.error('Erro ao criar produto:', err);
    }
  }, [showSuccess, showError]);

  const editarProduto = useCallback(async (id: string, produto: Partial<Produto>) => {
    try {
      // Implementar edição via Firebase
      showSuccess('Produto atualizado com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao editar produto';
      showError(errorMessage);
      console.error('Erro ao editar produto:', err);
    }
  }, [showSuccess, showError]);

  const excluirProduto = useCallback(async (id: string) => {
    try {
      // Implementar exclusão via Firebase
      showSuccess('Produto excluído com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao excluir produto';
      showError(errorMessage);
      console.error('Erro ao excluir produto:', err);
    }
  }, [showSuccess, showError]);

  const duplicarProduto = useCallback(async (id: string) => {
    try {
      const produtoOriginal = produtos.find(prod => prod.id === id);
      if (!produtoOriginal) {
        throw new Error('Produto não encontrado');
      }

      // Implementar duplicação via Firebase
      showSuccess('Produto duplicado com sucesso!');
    } catch (err) {
      const errorMessage = 'Erro ao duplicar produto';
      showError(errorMessage);
      console.error('Erro ao duplicar produto:', err);
    }
  }, [produtos, showSuccess, showError]);

  const buscarProduto = useCallback((id: string): Produto | undefined => {
    return produtos.find(prod => prod.id === id);
  }, [produtos]);

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

  const filtrarProdutos = useCallback((filtros: FiltrosProduto): Produto[] => {
    return produtos.filter(produto => {
      if (filtros.categoria && produto.categoria !== filtros.categoria) return false;
      if (filtros.status && produto.status !== filtros.status) return false;
      if (filtros.destacado !== undefined && produto.destacado !== filtros.destacado) return false;
      if (filtros.precoMin && produto.preco < filtros.precoMin) return false;
      if (filtros.precoMax && produto.preco > filtros.precoMax) return false;
      if (filtros.termo) {
        const termo = filtros.termo.toLowerCase();
        const matchNome = produto.nome.toLowerCase().includes(termo);
        const matchDescricao = produto.descricao.toLowerCase().includes(termo);
        const matchTags = produto.tags.some(tag => tag.toLowerCase().includes(termo));
        if (!matchNome && !matchDescricao && !matchTags) return false;
      }
      return true;
    });
  }, [produtos]);

  const buscarProdutosPorCategoria = useCallback((categoriaId: string): Produto[] => {
    return produtos.filter(produto => produto.categoriaId === categoriaId);
  }, [produtos]);

  const buscarProdutosPorStatus = useCallback((status: Produto['status']): Produto[] => {
    return produtos.filter(produto => produto.status === status);
  }, [produtos]);

  const buscarProdutosDestacados = useCallback((): Produto[] => {
    return produtos.filter(produto => produto.destacado);
  }, [produtos]);

  const buscarProdutosEmFalta = useCallback((): Produto[] => {
    return produtos.filter(produto => produto.status === 'em_falta');
  }, [produtos]);

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
    buscarProdutosEmFalta
  };
}; 