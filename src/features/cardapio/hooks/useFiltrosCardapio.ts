import { useState, useCallback, useMemo, useEffect } from 'react';
import { Produto } from '../types/global/produtos';

export interface FiltrosCardapioState {
  categoria: string;
  status: string;
  disponibilidade: string;
}

export function useFiltrosCardapio(produtos: Produto[]) {
  const [filtros, setFiltros] = useState<FiltrosCardapioState>({
    categoria: 'todos',
    status: 'todos',
    disponibilidade: 'todos'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // ✅ MELHORIA: Debounce na busca para melhor performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleFiltrosChange = useCallback((novosFiltros: FiltrosCardapioState) => {
    setFiltros(novosFiltros);
  }, []);

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

      // ✅ MELHORIA: Usar termo de busca com debounce
      if (debouncedSearchTerm) {
        const termo = debouncedSearchTerm.toLowerCase();
        return (
          produto.nome.toLowerCase().includes(termo) ||
          produto.descricao?.toLowerCase().includes(termo) ||
          produto.categoria.toLowerCase().includes(termo)
        );
      }

      return true;
    });
  }, [produtos, filtros, debouncedSearchTerm]);

  const estatisticasFiltros = useMemo(() => {
    const total = produtosFiltrados.length;
    const ativos = produtosFiltrados.filter(p => p.status === 'ativo').length;
    const inativos = produtosFiltrados.filter(p => p.status === 'inativo').length;
    const emFalta = produtosFiltrados.filter(p => p.status === 'em_falta').length;
    const valorTotal = produtosFiltrados.reduce((sum, p) => sum + p.preco, 0);
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

  return {
    filtros,
    searchTerm,
    produtosFiltrados,
    estatisticasFiltros,
    handleFiltrosChange,
    setSearchTerm
  };
} 