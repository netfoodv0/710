import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { DataTableColumn } from '../../../components/ui';
import { UseEstoqueReturn, ProdutoEstoque } from '../types';
import { useProdutoService } from '../../../hooks/useProdutoService';
import { useCategoriaService } from '../../../hooks/useCategoriaService';
import { auth } from '../../../lib/firebase';

export function useEstoque(): UseEstoqueReturn {
  const [produtos, setProdutos] = useState<ProdutoEstoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEstoque | null>(null);

  const { showSuccess, showError } = useNotificationContext();
  const { buscarProdutos, atualizarProduto } = useProdutoService();
  const { buscarCategorias } = useCategoriaService();

  // Função para carregar produtos do banco de dados
  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const user = auth.currentUser;
      if (!user || !user.uid) {
        throw new Error('Usuário não autenticado');
      }

      // Carregar produtos e categorias em paralelo
      const [produtosCardapio, categorias] = await Promise.all([
        buscarProdutos(user.uid),
        buscarCategorias(user.uid)
      ]);

      // Converter produtos do cardápio para o formato de estoque
      const produtosEstoque: ProdutoEstoque[] = produtosCardapio.map(produto => {

        // Determinar status com base no controle de estoque
        let status: 'em_estoque' | 'baixo_estoque' | 'sem_estoque' | 'sem_controle' = 'em_estoque';
        
        // Se controleEstoque for false, significa que não há controle de estoque
        if (!produto.controleEstoque) {
          status = 'sem_controle';
        } else if (produto.estoqueAtual === 0) {
          status = 'sem_estoque';
        } else if (produto.estoqueMinimo && produto.estoqueAtual <= produto.estoqueMinimo) {
          status = 'baixo_estoque';
        } else {
          status = 'em_estoque';
        }


        return {
          id: produto.id, // Manter como string para evitar NaN
          nome: produto.nome,
          categoria: produto.categoria,
          quantidade: produto.estoqueAtual, // Estoque Atual
          quantidadeMinima: produto.estoqueMinimo || 0, // Estoque Mínimo real
          precoCusto: produto.precoCusto,
          custoEstoque: produto.precoCusto * produto.estoqueAtual,
          precoUnitario: produto.precoVenda,
          status,
          semControleEstoque: !produto.controleEstoque, // Se controleEstoque for false, não tem controle
          fichaTecnica: 'Sim', // Valor padrão
          medida: produto.unidadeMedida === 'unidade' ? 'un' : produto.unidadeMedida.substring(0, 2)
        };
      });

      setProdutos(produtosEstoque);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  }, [buscarProdutos, buscarCategorias]);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

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

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    const statusConfig = {
      em_estoque: 'bg-green-100 text-green-800',
      baixo_estoque: 'bg-yellow-100 text-yellow-800',
      sem_estoque: 'bg-red-100 text-red-800',
      sem_controle: 'bg-gray-100 text-gray-800'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.em_estoque;
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

  const handleSave = useCallback(async (produto: ProdutoEstoque) => {
    try {
      // Converter produto de estoque para formato do cardápio
      const dadosAtualizacao = {
        nome: produto.nome,
        categoria: produto.categoria,
        precoVenda: produto.precoUnitario,
        precoCusto: produto.precoCusto,
        estoqueAtual: produto.quantidade,
        estoqueMinimo: produto.quantidadeMinima,
        controleEstoque: !produto.semControleEstoque,
        status: produto.status === 'sem_controle' ? 'ativo' : 'ativo',
        codigoBarras: null,
        codigoSku: null,
        unidadeMedida: produto.medida === 'un' ? 'unidade' : produto.medida,
        imagem: null,
        horariosDisponibilidade: []
      };

      // Atualizar no Firebase
      await atualizarProduto(produto.id, dadosAtualizacao);
      
      // Atualizar estado local
      setProdutos(prev => prev.map(p => p.id === produto.id ? produto : p));
      handleCloseModal();
      showSuccess('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      showError('Erro ao atualizar produto');
    }
  }, [handleCloseModal, showSuccess, showError, atualizarProduto]);

  const handleRetry = useCallback(() => {
    carregarProdutos();
  }, [carregarProdutos]);

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


