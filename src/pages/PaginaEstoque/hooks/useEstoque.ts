import { useState, useCallback, useMemo } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { DataTableColumn } from '../../../components/ui';
import { UseEstoqueReturn, ProdutoEstoque } from '../types';

// Dados fictícios de produtos em estoque
const produtosEstoque: ProdutoEstoque[] = [
  {
    id: 1,
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    quantidade: 45,
    quantidadeMinima: 10,
    precoCusto: 12.50,
    custoEstoque: 562.50,
    precoUnitario: 28.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  },
  {
    id: 2,
    nome: 'Hambúrguer Clássico',
    categoria: 'Lanches',
    quantidade: 8,
    quantidadeMinima: 15,
    precoCusto: 8.20,
    custoEstoque: 65.60,
    precoUnitario: 18.90,
    status: 'baixo_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  },
  {
    id: 3,
    nome: 'Coca-Cola 350ml',
    categoria: 'Bebidas',
    quantidade: 0,
    quantidadeMinima: 20,
    precoCusto: 2.50,
    custoEstoque: 0,
    precoUnitario: 5.90,
    status: 'sem_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'un'
  },
  {
    id: 4,
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    quantidade: 25,
    quantidadeMinima: 5,
    precoCusto: 3.80,
    custoEstoque: 95.00,
    precoUnitario: 8.50,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'porção'
  },
  {
    id: 5,
    nome: 'Salada Caesar',
    categoria: 'Saladas',
    quantidade: 12,
    quantidadeMinima: 8,
    precoCusto: 6.20,
    custoEstoque: 74.40,
    precoUnitario: 14.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  }
];

export function useEstoque(): UseEstoqueReturn {
  const [produtos, setProdutos] = useState<ProdutoEstoque[]>(produtosEstoque);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEstoque | null>(null);

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
  const columns: DataTableColumn<ProdutoEstoque>[] = useMemo(() => [
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
  const handleOpenModal = useCallback((produto: ProdutoEstoque) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  }, []);

  const handleOpenModalDetalhes = useCallback((produto: ProdutoEstoque) => {
    setProdutoSelecionado(produto);
    setIsModalDetalhesOpen(true);
  }, []);

  const handleCloseModalDetalhes = useCallback(() => {
    setIsModalDetalhesOpen(false);
    setProdutoSelecionado(null);
  }, []);

  const handleAlterarEstoque = useCallback((produto: ProdutoEstoque) => {
    handleCloseModalDetalhes();
    handleOpenModal(produto);
  }, [handleCloseModalDetalhes, handleOpenModal]);

  const handleSave = useCallback((produto: ProdutoEstoque) => {
    setProdutos(prev => prev.map(p => p.id === produto.id ? produto : p));
    handleCloseModal();
    showSuccess('Produto atualizado com sucesso!');
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
