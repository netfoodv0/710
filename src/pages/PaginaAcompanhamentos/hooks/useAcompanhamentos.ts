import { useState, useCallback, useMemo } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { DataTableColumn } from '../../../components/ui';
import { UseAcompanhamentosReturn, ProdutoAcompanhamento } from '../types';

// Dados fictícios de acompanhamentos
const produtosAcompanhamentos: ProdutoAcompanhamento[] = [
  {
    id: 1,
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    quantidade: 45,
    quantidadeMinima: 10,
    precoCusto: 3.50,
    custoEstoque: 157.50,
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    status: 'em_estoque',
    medida: 'porção'
  },
  {
    id: 2,
    nome: 'Onion Rings',
    categoria: 'Acompanhamentos',
    quantidade: 8,
    quantidadeMinima: 15,
    precoCusto: 4.20,
    custoEstoque: 33.60,
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    status: 'baixo_estoque',
    medida: 'porção'
  },
  {
    id: 3,
    nome: 'Nuggets de Frango',
    categoria: 'Acompanhamentos',
    quantidade: 0,
    quantidadeMinima: 20,
    precoCusto: 5.80,
    custoEstoque: 0,
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    status: 'sem_estoque',
    medida: 'un'
  },
  {
    id: 4,
    nome: 'Molho Barbecue',
    categoria: 'Molhos',
    quantidade: 25,
    quantidadeMinima: 5,
    precoCusto: 2.30,
    custoEstoque: 57.50,
    semControleEstoque: false,
    fichaTecnica: 'Não',
    status: 'em_estoque',
    medida: 'un'
  },
  {
    id: 5,
    nome: 'Molho Ketchup',
    categoria: 'Molhos',
    quantidade: 12,
    quantidadeMinima: 8,
    precoCusto: 1.80,
    custoEstoque: 21.60,
    semControleEstoque: false,
    fichaTecnica: 'Não',
    status: 'em_estoque',
    medida: 'un'
  }
];

export function useAcompanhamentos(): UseAcompanhamentosReturn {
  const [produtos, setProdutos] = useState<ProdutoAcompanhamento[]>(produtosAcompanhamentos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoAcompanhamento | null>(null);

  const { showSuccess, showError } = useNotificationContext();

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
      sem_estoque: { label: 'Sem Estoque', color: 'bg-red-100 text-red-800' }
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
      label: 'Quantidade',
      sortable: true,
      render: (produto) => `${produto.quantidade} ${produto.medida}`
    },
    {
      key: 'quantidadeMinima',
      label: 'Mínimo',
      sortable: true,
      render: (produto) => `${produto.quantidadeMinima} ${produto.medida}`
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
      render: (produto) => getStatusBadge(produto.status)
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

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    // Simular recarregamento
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
