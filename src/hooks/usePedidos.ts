import { useState, useEffect, useCallback } from 'react';
import { Pedido, StatusPedido } from '../types';
import { firebasePedidoService } from '../features/pedidos/services/firebasePedidoService';

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os pedidos
  const carregarPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const todosPedidos = await firebasePedidoService.obterTodosPedidos();
      setPedidos(todosPedidos);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar novo pedido
  const adicionarPedido = useCallback(async (pedido: Omit<Pedido, 'id'>) => {
    try {
      const novoPedido = await firebasePedidoService.adicionarPedido(pedido);
      setError(null);
      return novoPedido;
    } catch (err) {
      setError('Erro ao adicionar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Aceitar pedido
  const aceitarPedido = useCallback(async (pedidoId: string) => {
    try {
      const pedidoAtualizado = await firebasePedidoService.aceitarPedido(pedidoId);
      setError(null);
      return pedidoAtualizado;
    } catch (err) {
      setError('Erro ao aceitar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Recusar pedido
  const recusarPedido = useCallback(async (pedidoId: string, motivo?: string) => {
    try {
      const pedidoAtualizado = await firebasePedidoService.recusarPedido(pedidoId, motivo);
      setError(null);
      return pedidoAtualizado;
    } catch (err) {
      setError('Erro ao recusar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Avançar pedido para preparo
  const avancarParaPreparo = useCallback(async (pedidoId: string) => {
    try {
      const pedidoAtualizado = await firebasePedidoService.avancarParaPreparo(pedidoId);
      setError(null);
      return pedidoAtualizado;
    } catch (err) {
      setError('Erro ao avançar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Avançar pedido para entrega
  const avancarParaEntrega = useCallback(async (pedidoId: string) => {
    try {
      const pedidoAtualizado = await firebasePedidoService.avancarParaEntrega(pedidoId);
      setError(null);
      return pedidoAtualizado;
    } catch (err) {
      setError('Erro ao avançar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Finalizar pedido
  const finalizarPedido = useCallback(async (pedidoId: string) => {
    try {
      const pedidoAtualizado = await firebasePedidoService.finalizarPedido(pedidoId);
      setError(null);
      return pedidoAtualizado;
    } catch (err) {
      setError('Erro ao finalizar pedido');
      console.error(err);
      return null;
    }
  }, []);

  // Obter pedidos por status
  const obterPedidosPorStatus = useCallback(async (status: StatusPedido) => {
    try {
      return await firebasePedidoService.obterPedidosPorStatus(status);
    } catch (err) {
      console.error('Erro ao obter pedidos por status:', err);
      return [];
    }
  }, []);

  // Obter estatísticas
  const obterEstatisticas = useCallback(async () => {
    try {
      return await firebasePedidoService.obterEstatisticas();
    } catch (err) {
      console.error('Erro ao obter estatísticas:', err);
      return { total: 0, porStatus: { novo: 0, confirmado: 0, preparando: 0, saiu_entrega: 0, entregue: 0, cancelado: 0 } };
    }
  }, []);

  // Obter histórico de pedido
  const obterHistoricoPedido = useCallback(async (pedidoId: string) => {
    try {
      return await firebasePedidoService.obterHistoricoPedido(pedidoId);
    } catch (err) {
      console.error('Erro ao obter histórico:', err);
      return [];
    }
  }, []);

  // Carregar dados iniciais e configurar listener
  useEffect(() => {
    // Carregar dados iniciais
    carregarPedidos();

    // Configurar listener em tempo real
    const unsubscribe = firebasePedidoService.onPedidosChange((novosPedidos) => {
      setPedidos(novosPedidos);
      setError(null);
    });

    return () => unsubscribe();
  }, [carregarPedidos]);

  return {
    pedidos,
    loading,
    error,
    carregarPedidos,
    adicionarPedido,
    aceitarPedido,
    recusarPedido,
    avancarParaPreparo,
    avancarParaEntrega,
    finalizarPedido,
    obterPedidosPorStatus,
    obterEstatisticas,
    obterHistoricoPedido
  };
} 