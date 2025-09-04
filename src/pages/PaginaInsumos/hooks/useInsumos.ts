import { useState, useCallback, useMemo } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { DataTableColumn } from '../../../components/ui';
import { UseInsumosReturn, Insumo } from '../types';

// Dados fictícios de insumos
const insumosData: Insumo[] = [
  {
    id: 1,
    nome: 'Farinha de Trigo',
    categoria: 'Farinhas',
    quantidade: 45,
    quantidadeMinima: 10,
    precoCusto: 12.50,
    custoEstoque: 562.50,
    precoUnitario: 28.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 2,
    nome: 'Carne Moída',
    categoria: 'Carnes',
    quantidade: 8,
    quantidadeMinima: 15,
    precoCusto: 8.20,
    custoEstoque: 65.60,
    precoUnitario: 18.90,
    status: 'baixo_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 3,
    nome: 'Queijo Mussarela',
    categoria: 'Laticínios',
    quantidade: 0,
    quantidadeMinima: 20,
    precoCusto: 2.50,
    custoEstoque: 0,
    precoUnitario: 5.90,
    status: 'sem_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'kg'
  },
  {
    id: 4,
    nome: 'Tomate',
    categoria: 'Vegetais',
    quantidade: 25,
    quantidadeMinima: 5,
    precoCusto: 3.80,
    custoEstoque: 95.00,
    precoUnitario: 8.50,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 5,
    nome: 'Azeite de Oliva',
    categoria: 'Temperos',
    quantidade: 12,
    quantidadeMinima: 8,
    precoCusto: 6.20,
    custoEstoque: 74.40,
    precoUnitario: 14.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'L'
  }
];

export function useInsumos(): UseInsumosReturn {
  const [insumos, setInsumos] = useState<Insumo[]>(insumosData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [insumoSelecionado, setInsumoSelecionado] = useState<Insumo | null>(null);

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
  const columns: DataTableColumn<Insumo>[] = useMemo(() => [
    {
      key: 'nome',
      label: 'Insumo',
      sortable: true,
      render: (insumo) => insumo.nome
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      render: (insumo) => insumo.categoria
    },
    {
      key: 'quantidade',
      label: 'Quantidade',
      sortable: true,
      render: (insumo) => `${insumo.quantidade} ${insumo.medida}`
    },
    {
      key: 'quantidadeMinima',
      label: 'Mínimo',
      sortable: true,
      render: (insumo) => `${insumo.quantidadeMinima} ${insumo.medida}`
    },
    {
      key: 'precoCusto',
      label: 'Preço Custo',
      sortable: true,
      render: (insumo) => formatCurrency(insumo.precoCusto)
    },
    {
      key: 'custoEstoque',
      label: 'Custo Estoque',
      sortable: true,
      render: (insumo) => formatCurrency(insumo.custoEstoque)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (insumo) => getStatusBadge(insumo.status)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: () => 'Editar'
    }
  ], []);

  // Handlers para modais
  const handleOpenModal = useCallback((insumo: Insumo) => {
    setInsumoSelecionado(insumo);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setInsumoSelecionado(null);
  }, []);

  const handleOpenModalDetalhes = useCallback((insumo: Insumo) => {
    setInsumoSelecionado(insumo);
    setIsModalDetalhesOpen(true);
  }, []);

  const handleCloseModalDetalhes = useCallback(() => {
    setIsModalDetalhesOpen(false);
    setInsumoSelecionado(null);
  }, []);

  const handleAlterarEstoque = useCallback((insumo: Insumo) => {
    handleCloseModalDetalhes();
    handleOpenModal(insumo);
  }, [handleCloseModalDetalhes, handleOpenModal]);

  const handleSave = useCallback((insumo: Insumo) => {
    setInsumos(prev => prev.map(i => i.id === insumo.id ? insumo : i));
    handleCloseModal();
    showSuccess('Insumo atualizado com sucesso!');
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
    insumos,
    columns,
    loading,
    error,
    isModalOpen,
    isModalDetalhesOpen,
    insumoSelecionado,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalDetalhes,
    handleCloseModalDetalhes,
    handleAlterarEstoque,
    handleSave,
    handleRetry
  };
}
