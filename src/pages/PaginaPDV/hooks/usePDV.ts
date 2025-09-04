import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { pdvService } from '../services';
import { PDVData } from '../types';

export function usePDV() {
  const [data, setData] = useState<PDVData>({
    produtos: [],
    categorias: [],
    pedidoAtual: null,
    clientes: [],
    loading: true,
    error: null
  });

  const { showError, showSuccess } = useNotificationContext();

  const carregarProdutos = useCallback(async () => {
    try {
      const produtos = await pdvService.obterProdutos();
      setData(prev => ({ ...prev, produtos }));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      showError('Erro ao carregar produtos do PDV');
    }
  }, [showError]);

  const carregarCategorias = useCallback(async () => {
    try {
      const categorias = await pdvService.obterCategorias();
      setData(prev => ({ ...prev, categorias }));
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      showError('Erro ao carregar categorias do PDV');
    }
  }, [showError]);

  const carregarClientes = useCallback(async () => {
    try {
      const clientes = await pdvService.obterClientes();
      setData(prev => ({ ...prev, clientes }));
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      showError('Erro ao carregar clientes do PDV');
    }
  }, [showError]);

  const refreshDados = useCallback(() => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    carregarProdutos();
    carregarCategorias();
    carregarClientes();
  }, [carregarProdutos, carregarCategorias, carregarClientes]);

  const handleRetry = useCallback(() => {
    refreshDados();
  }, [refreshDados]);

  const adicionarProduto = useCallback(async (produto: any) => {
    try {
      await pdvService.adicionarProdutoAoPedido(produto);
      showSuccess('Produto adicionado ao pedido!');
    } catch (error) {
      showError('Erro ao adicionar produto ao pedido');
    }
  }, [showSuccess, showError]);

  const removerProduto = useCallback(async (produtoId: string) => {
    try {
      await pdvService.removerProdutoDoPedido(produtoId);
      showSuccess('Produto removido do pedido!');
    } catch (error) {
      showError('Erro ao remover produto do pedido');
    }
  }, [showSuccess, showError]);

  const finalizarPedido = useCallback(async () => {
    try {
      await pdvService.finalizarPedido(data.pedidoAtual);
      showSuccess('Pedido finalizado com sucesso!');
      setData(prev => ({ ...prev, pedidoAtual: null }));
    } catch (error) {
      showError('Erro ao finalizar pedido');
    }
  }, [data.pedidoAtual, showSuccess, showError]);

  const cancelarPedido = useCallback(async () => {
    try {
      if (data.pedidoAtual?.id) {
        await pdvService.cancelarPedido(data.pedidoAtual.id);
        showSuccess('Pedido cancelado com sucesso!');
        setData(prev => ({ ...prev, pedidoAtual: null }));
      }
    } catch (error) {
      showError('Erro ao cancelar pedido');
    }
  }, [data.pedidoAtual, showSuccess, showError]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        await Promise.all([
          carregarProdutos(),
          carregarCategorias(),
          carregarClientes()
        ]);
        
        setData(prev => ({ ...prev, loading: false }));
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Erro ao carregar dados do PDV'
        }));
      }
    };

    carregarDados();
  }, [carregarProdutos, carregarCategorias, carregarClientes]);

  return {
    data,
    carregarProdutos,
    carregarCategorias,
    carregarClientes,
    refreshDados,
    handleRetry,
    adicionarProduto,
    removerProduto,
    finalizarPedido,
    cancelarPedido
  };
}
