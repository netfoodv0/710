import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardapioContext } from '../context/CardapioContext';
import { useProdutosFirebase } from './useProdutosFirebase';
import { useCategorias } from './useCategorias';
import { useAuth } from './useAuth';
import { useNotificationContext } from '../context/notificationContextUtils';
import { useAnalyticsContext } from '../context/analyticsContextUtils';
import { useAnalyticsService } from '../utils/analytics';
import { Categoria, CriarCategoriaData } from '../types/categoria';
import { Produto } from '../types/produtos';

export function useCardapioActions() {
  const navigate = useNavigate();
  const { 
    openModalCategoria, 
    closeModalCategoria, 
    openModalProduto,
    closeModalProduto,
    updateFiltros, 
    updateSearchTerm,
    setLoadingProdutos,
    setLoadingCategorias,
    setErrorProdutos
  } = useCardapioContext();

  const { showSuccess, showError } = useNotificationContext();
  const { analytics } = useAnalyticsContext();
  const analyticsService = useAnalyticsService(analytics);

  // Hooks de dados
  const {
    produtos,
    loading: loadingProdutos,
    error: errorProdutos,
    criarProduto,
    editarProduto,
    excluirProduto,
    duplicarProduto,
    atualizarPosicoesProdutos,
    estatisticas
  } = useProdutosFirebase();

  // Hook de categorias Firebase
  const { getLojaId, user, isAuthenticated } = useAuth();
  const lojaId = getLojaId();
  
  const {
    categorias: categoriasCompletas,
    loading: loadingCategorias,
    criarCategoria: criarCategoriaFirebase,
    editarCategoria: editarCategoriaFirebase,
    excluirCategoria: excluirCategoriaFirebase,
    duplicarCategoria: duplicarCategoriaFirebase,
    recarregar: recarregarCategorias,
    atualizarPosicoesCategorias
  } = useCategorias(lojaId || '', {});



  // Sincronizar estados de loading
  useEffect(() => {
    setLoadingProdutos(loadingProdutos);
  }, [loadingProdutos, setLoadingProdutos]);

  useEffect(() => {
    setLoadingCategorias(loadingCategorias);
  }, [loadingCategorias, setLoadingCategorias]);

  useEffect(() => {
    setErrorProdutos(errorProdutos);
  }, [errorProdutos, setErrorProdutos]);

  // Ações de produtos
  const handleToggleStatus = useCallback(async (id: string, status: 'ativo' | 'inativo' | 'em_falta') => {
    try {
      await editarProduto(id, { status });
      showSuccess('Status do produto atualizado com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logProdutoEvent('toggle_status', id);
    } catch (error) {
      showError('Erro ao atualizar status do produto');
    }
  }, [editarProduto, showSuccess, showError, analyticsService]);

  const handleCriarProduto = useCallback(async (produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      await criarProduto(produto);
      showSuccess('Produto criado com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logProdutoEvent('produto_criado', produto.nome);
    } catch (error) {
      showError('Erro ao criar produto');
    }
  }, [criarProduto, showSuccess, showError, analyticsService]);

  const handleAbrirModalProduto = useCallback(() => {
    // Navegar para a página de cadastro de produto
    navigate('/cardapio/novo-produto');
    
    // Log do evento de analytics
    analyticsService.logCardapioEvent('novo_produto_clicado');
  }, [navigate, analyticsService]);

  const handleEditarProduto = useCallback((produto: Produto) => {
    // Navegar para a página de edição do produto
    navigate(`/cardapio/editar-produto/${produto.id}`);
    
    // Log do evento de analytics
    analyticsService.logCardapioEvent('produto_editado_clicado', { id: produto.id });
  }, [navigate, analyticsService]);

  const handleExcluirProduto = useCallback(async (id: string) => {
    try {
      await excluirProduto(id);
      showSuccess('Produto excluído com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logProdutoEvent('produto_excluido', id);
    } catch (error) {
      showError('Erro ao excluir produto');
    }
  }, [excluirProduto, showSuccess, showError, analyticsService]);

  const handleDuplicarProduto = useCallback(async (id: string) => {
    try {
      await duplicarProduto(id);
      showSuccess('Produto duplicado com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logProdutoEvent('produto_duplicado', id);
    } catch (error) {
      showError('Erro ao duplicar produto');
    }
  }, [duplicarProduto, showSuccess, showError, analyticsService]);

  // Ações de categorias
  const handleNovaCategoria = useCallback(() => {
    openModalCategoria();
    
    // Log do evento de analytics
    analyticsService.logCardapioEvent('nova_categoria_clicada');
  }, [openModalCategoria, analyticsService]);

  const handleEditarCategoria = useCallback((categoria: Categoria) => {
    openModalCategoria(categoria);
    
    // Log do evento de analytics
    analyticsService.logCardapioEvent('categoria_editada', { id: categoria.id });
  }, [openModalCategoria, analyticsService]);

  const handleSalvarCategoria = useCallback(async (dados: CriarCategoriaData) => {
    try {
      await criarCategoriaFirebase(dados);
      showSuccess('Categoria criada com sucesso!');
      closeModalCategoria();
      
      // Log do evento de analytics
      analyticsService.logCardapioEvent('categoria_criada', { nome: dados.nome });
    } catch (error) {
      showError('Erro ao criar categoria');
    }
  }, [criarCategoriaFirebase, showSuccess, closeModalCategoria, analyticsService]);

  const handleSalvarEdicaoCategoria = useCallback(async (id: string, dados: Partial<CriarCategoriaData>) => {
    try {
      await editarCategoriaFirebase(id, dados);
      showSuccess('Categoria atualizada com sucesso!');
      closeModalCategoria();
      
      // Log do evento de analytics
      analyticsService.logCardapioEvent('categoria_editada', { id });
    } catch (error) {
      showError('Erro ao atualizar categoria');
    }
  }, [editarCategoriaFirebase, showSuccess, closeModalCategoria, analyticsService]);

  const handleDuplicarCategoria = useCallback(async (categoria: Categoria) => {
    try {
      await duplicarCategoriaFirebase(categoria.id, `${categoria.nome} (Cópia)`);
      showSuccess('Categoria duplicada com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logCardapioEvent('categoria_duplicada', { nome: categoria.nome });
    } catch (error) {
      showError('Erro ao duplicar categoria');
    }
  }, [duplicarCategoriaFirebase, showSuccess, showError, analyticsService]);

  const handleExcluirCategoria = useCallback(async (categoria: Categoria) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoria.nome}"?`)) {
      try {
        await excluirCategoriaFirebase(categoria.id);
        showSuccess('Categoria excluída com sucesso!');
        
        // Log do evento de analytics
        analyticsService.logCardapioEvent('categoria_excluida', { nome: categoria.nome });
      } catch (error) {
        showError('Erro ao excluir categoria');
      }
    }
  }, [excluirCategoriaFirebase, showSuccess, showError, analyticsService]);

  // ✅ FUNCIONALIDADE: Toggle de status da categoria no Firebase
  const handleToggleStatusCategoria = useCallback(async (categoria: Categoria) => {
    try {
      const novoStatus = categoria.status === 'ativo' ? 'inativo' : 'ativo';
      
      // Mostrar feedback imediato
      showSuccess(`Alterando status da categoria "${categoria.nome}"...`);
      
      // Atualizar o status no Firebase
      await editarCategoriaFirebase(categoria.id, { status: novoStatus });
      
      // ✅ CORREÇÃO: Forçar recarregamento imediato das categorias
      await new Promise(resolve => setTimeout(resolve, 300)); // Aguardar propagação no Firebase
      await recarregarCategorias(true); // Forçar reload ignorando cache
      
      // Feedback final de sucesso
      showSuccess(`Categoria "${categoria.nome}" ${novoStatus === 'ativo' ? 'ativada' : 'desativada'} com sucesso!`);
      
    } catch (error) {
      console.error('❌ ERRO COMPLETO ao alterar status da categoria:', {
        categoria: categoria.nome,
        error: error,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      showError(`Erro ao alterar status da categoria "${categoria.nome}". Tente novamente.`);
    }
  }, [editarCategoriaFirebase, recarregarCategorias, showSuccess, showError]);

  // Ações de filtros
  const handleFiltrosChange = useCallback((novosFiltros: any) => {
    updateFiltros(novosFiltros);
    
    // Log apenas filtros que mudaram
    Object.entries(novosFiltros).forEach(([key, value]) => {
      analyticsService.logFiltroEvent(key, String(value));
    });
  }, [updateFiltros, analyticsService]);

  const handleSearchChange = useCallback((term: string) => {
    updateSearchTerm(term);
    
    if (term.length > 2) {
      analyticsService.logBuscaEvent(term, produtos.length);
    }
  }, [updateSearchTerm, produtos.length, analyticsService]);

  const handleCategoriaClick = useCallback((categoria: string) => {
    const novosFiltros = {
      categoria: categoria === 'todos' ? 'todos' : categoria
    };
    handleFiltrosChange(novosFiltros);
    
    // Log do evento de analytics
    analyticsService.logCardapioEvent('categoria_selecionada', { categoria });
  }, [handleFiltrosChange, analyticsService]);

  const handleReordenarCategorias = useCallback(async (categoriasOrdenadas: string[]) => {
    try {
      await atualizarPosicoesCategorias(categoriasOrdenadas);
      showSuccess('Ordem das categorias atualizada com sucesso!');
      
      // Log do evento de analytics
      analyticsService.logCardapioEvent('categorias_reordenadas');
    } catch (error) {
      console.error('Erro ao reordenar categorias:', error);
      showError('Erro ao atualizar ordem das categorias. Tente novamente.');
    }
  }, [atualizarPosicoesCategorias, showSuccess, showError, analyticsService]);

  const handleReordenarProdutos = useCallback(async (produtosOrdenados: string[]) => {
    try {
      await atualizarPosicoesProdutos(produtosOrdenados);
      showSuccess('Ordem dos produtos atualizada com sucesso!');
      analyticsService.logCardapioEvent('produtos_reordenados');
    } catch (error) {
      console.error('Erro ao reordenar produtos:', error);
      showError('Erro ao atualizar ordem dos produtos. Tente novamente.');
    }
  }, [atualizarPosicoesProdutos, showSuccess, showError, analyticsService]);

  // Ações de exportação
  const handleExportExcel = useCallback(async () => {
    showSuccess('Exportação Excel em desenvolvimento');
  }, [showSuccess]);

  const handleExportPDF = useCallback(async () => {
    showSuccess('Exportação PDF em desenvolvimento');
  }, [showSuccess]);

  return {
    // Estados
    produtos,
    categoriasCompletas,
    estatisticas,
    
    // Ações de produtos
    handleToggleStatus,
    handleCriarProduto,
    handleAbrirModalProduto,
    handleEditarProduto,
    handleExcluirProduto,
    handleDuplicarProduto,
    
    // Ações de categorias
    handleNovaCategoria,
    handleEditarCategoria,
    handleSalvarCategoria,
    handleSalvarEdicaoCategoria,
    handleDuplicarCategoria,
    handleExcluirCategoria,
    handleToggleStatusCategoria,
    handleReordenarCategorias,
    handleReordenarProdutos,
    
    // Ações de filtros
    handleFiltrosChange,
    handleSearchChange,
    handleCategoriaClick,
    
    // Ações de exportação
    handleExportExcel,
    handleExportPDF
  };
}
