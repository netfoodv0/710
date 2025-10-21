import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { DataTableColumn } from '../../../components/ui';
import { UseAcompanhamentosReturn, ProdutoAcompanhamento } from '../types';
import { AcompanhamentosService } from '../services/acompanhamentosService';
import { useAuth } from '../../../hooks';


export function useAcompanhamentos(): UseAcompanhamentosReturn {
  const [produtos, setProdutos] = useState<ProdutoAcompanhamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoAcompanhamento | null>(null);

  const { showSuccess, showError } = useNotificationContext();
  const { loja } = useAuth();

  // Carregar dados do Firebase
  useEffect(() => {
    const carregarAcompanhamentos = async () => {
      if (!loja?.id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const acompanhamentos = await AcompanhamentosService.buscarAcompanhamentos(loja.id);
        setProdutos(acompanhamentos);
      } catch (err) {
        console.error('Erro ao carregar acompanhamentos:', err);
        setError('Erro ao carregar acompanhamentos');
        showError('Erro ao carregar acompanhamentos');
      } finally {
        setLoading(false);
      }
    };

    carregarAcompanhamentos();
  }, [loja?.id, showError]);

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter badge de status
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      em_estoque: { label: 'Em Estoque', color: 'bg-green-100 text-green-800' },
      baixo_estoque: { label: 'Baixo Estoque', color: 'bg-yellow-100 text-yellow-800' },
      sem_estoque: { label: 'Sem Estoque', color: 'bg-red-100 text-red-800' },
      sem_controle: { label: 'Sem Controle', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.em_estoque;
    return config.label;
  };

  // Definir colunas da tabela
  const columns: DataTableColumn<ProdutoAcompanhamento>[] = useMemo(() => [
    {
      key: 'nome',
      label: 'Produto',
      sortable: true,
      render: (produto) => produto.nome
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      render: (produto) => produto.categoria
    },
    {
      key: 'quantidade',
      label: 'Estoque Atual',
      sortable: true,
      render: (produto) => {
        // Se não há controle de estoque, exibir "Sem Controle"
        if (produto.semControleEstoque) {
          return 'Sem Controle';
        }
        
        return `${produto.quantidade} ${produto.medida}`;
      }
    },
    {
      key: 'quantidadeMinima',
      label: 'Estoque Mínimo',
      sortable: true,
      render: (produto) => {
        // Se não há controle de estoque, exibir "Sem Controle"
        if (produto.semControleEstoque) {
          return 'Sem Controle';
        }
        
        return `${produto.quantidadeMinima} ${produto.medida}`;
      }
    },
    {
      key: 'precoCusto',
      label: 'Preço Custo',
      sortable: true,
      render: (produto) => formatCurrency(produto.precoCusto)
    },
    {
      key: 'custoEstoque',
      label: 'Custo Estoque',
      sortable: true,
      render: (produto) => formatCurrency(produto.custoEstoque)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => {
        // Se não há controle de estoque, exibir "Sem Controle"
        if (produto.semControleEstoque) {
          return 'Sem Controle';
        }
        
        return getStatusBadge(produto.status);
      }
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: () => 'Editar'
    }
  ], []);

  // Handlers para modais
  const handleOpenModal = useCallback((produto: ProdutoAcompanhamento) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  }, []);

  const handleOpenModalDetalhes = useCallback((produto: ProdutoAcompanhamento) => {
    setProdutoSelecionado(produto);
    setIsModalDetalhesOpen(true);
  }, []);

  const handleCloseModalDetalhes = useCallback(() => {
    setIsModalDetalhesOpen(false);
    setProdutoSelecionado(null);
  }, []);

  const handleAlterarEstoque = useCallback((produto: ProdutoAcompanhamento) => {
    handleCloseModalDetalhes();
    handleOpenModal(produto);
  }, [handleCloseModalDetalhes, handleOpenModal]);

  const handleSave = useCallback((produto: ProdutoAcompanhamento) => {
    setProdutos(prev => prev.map(p => p.id === produto.id ? produto : p));
    handleCloseModal();
    showSuccess('Acompanhamento atualizado com sucesso!');
  }, [handleCloseModal, showSuccess]);

  const handleRetry = useCallback(async () => {
    if (!loja?.id) return;
    
    setError(null);
    setLoading(true);
    
    try {
      const acompanhamentos = await AcompanhamentosService.buscarAcompanhamentos(loja.id);
      setProdutos(acompanhamentos);
      showSuccess('Dados recarregados com sucesso');
    } catch (err) {
      console.error('Erro ao recarregar acompanhamentos:', err);
      setError('Erro ao recarregar acompanhamentos');
      showError('Erro ao recarregar acompanhamentos');
    } finally {
      setLoading(false);
    }
  }, [loja?.id, showSuccess, showError]);

  return {
    produtos,
    columns,
    loading,
    error,
    isModalOpen,
    isModalDetalhesOpen,
    produtoSelecionado,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalDetalhes,
    handleCloseModalDetalhes,
    handleAlterarEstoque,
    handleSave,
    handleRetry
  };
}


