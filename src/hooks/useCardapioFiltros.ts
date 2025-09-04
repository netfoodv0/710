import React, { useMemo, useCallback } from 'react';
import { useCardapioContext } from '../context/CardapioContext';
import { Produto } from '../types/global/produtos';
import { Categoria } from '../types/global/categoria';

export function useCardapioFiltros(
  produtos: Produto[], 
  categoriasCompletas: Categoria[]
) {
  const { state } = useCardapioContext();
  const { filtros, searchTerm } = state;

  // Extrair nomes das categorias para filtros
  const categoriasUnicas = useMemo(() => {
    return categoriasCompletas
      .map(c => c.nome)
      .filter(categoria => categoria && categoria.trim());
  }, [categoriasCompletas]);

  // Aplicar filtros aos produtos
  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto => {
      // Filtro por categoria
      if (filtros.categoria !== 'todos' && produto.categoria !== filtros.categoria) {
        return false;
      }

      // Filtro por status
      if (filtros.status !== 'todos' && produto.status !== filtros.status) {
        return false;
      }

      // Filtro por disponibilidade
      if (filtros.disponibilidade !== 'todos') {
        const disponivel = produto.status === 'ativo';
        if (filtros.disponibilidade === 'disponivel' && !disponivel) {
          return false;
        }
        if (filtros.disponibilidade === 'indisponivel' && disponivel) {
          return false;
        }
      }

      // Filtro por busca
      if (searchTerm) {
        const termo = searchTerm.toLowerCase();
        return (
          produto.nome.toLowerCase().includes(termo) ||
          produto.descricao?.toLowerCase().includes(termo) ||
          produto.categoria?.toLowerCase().includes(termo)
        );
      }

      return true;
    });
  }, [produtos, filtros, searchTerm]);

  // Estatísticas dos filtros aplicados
  const estatisticasFiltros = useMemo(() => {
    const total = produtosFiltrados.length;
    const ativos = produtosFiltrados.filter(p => p.status === 'ativo').length;
    const inativos = produtosFiltrados.filter(p => p.status === 'inativo').length;
    const emFalta = produtosFiltrados.filter(p => p.status === 'em_falta').length;
    const valorTotal = produtosFiltrados.reduce((sum, p) => sum + (p.preco || 0), 0);
    const precoMedio = total > 0 ? valorTotal / total : 0;

    return {
      total,
      ativos,
      inativos,
      emFalta,
      valorTotal,
      precoMedio
    };
  }, [produtosFiltrados]);

  // Verificar se há produtos em cada categoria
  const categoriasComProdutos = useMemo(() => {
    return categoriasUnicas.map(categoria => ({
      nome: categoria,
      quantidade: produtos.filter(p => p.categoria === categoria).length
    }));
  }, [categoriasUnicas, produtos]);

  // Categoria selecionada atual
  const categoriaSelecionada = useMemo(() => {
    return filtros.categoria === 'todos' ? 'todos' : filtros.categoria;
  }, [filtros.categoria]);

  // Verificar se a categoria selecionada tem produtos
  const categoriaTemProdutos = useMemo(() => {
    if (categoriaSelecionada === 'todos') return true;
    return produtos.some(p => p.categoria === categoriaSelecionada);
  }, [categoriaSelecionada, produtos]);

  // Função para verificar se um produto está visível com os filtros atuais
  const isProdutoVisivel = useCallback((produto: Produto) => {
    // Filtro por categoria
    if (filtros.categoria !== 'todos' && produto.categoria !== filtros.categoria) {
      return false;
    }

    // Filtro por status
    if (filtros.status !== 'todos' && produto.status !== filtros.status) {
      return false;
    }

    // Filtro por disponibilidade
    if (filtros.disponibilidade !== 'todos') {
      const disponivel = produto.status === 'ativo';
      if (filtros.disponibilidade === 'disponivel' && !disponivel) {
        return false;
      }
      if (filtros.disponibilidade === 'indisponivel' && disponivel) {
        return false;
      }
    }

    // Filtro por busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      return (
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao?.toLowerCase().includes(termo) ||
        produto.categoria?.toLowerCase().includes(termo)
      );
    }

    return true;
  }, [filtros, searchTerm]);

  return {
    // Estados dos filtros
    filtros,
    searchTerm,
    categoriaSelecionada,
    
    // Dados filtrados
    produtosFiltrados,
    categoriasUnicas,
    categoriasComProdutos,
    
    // Estatísticas
    estatisticasFiltros,
    
    // Utilitários
    categoriaTemProdutos,
    isProdutoVisivel,
    
    // Contadores
    totalProdutos: produtos.length,
    totalProdutosFiltrados: produtosFiltrados.length,
    totalCategorias: categoriasUnicas.length
  };
}
