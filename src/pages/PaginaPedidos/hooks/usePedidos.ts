import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { pedidosService } from '../services';
import { PedidosData } from '../types';

export function usePedidos() {
  const [data, setData] = useState<PedidosData>({
    pedidos: [],
    loading: true,
    searchTerm: '',
    isCreating: false,
    error: null
  });

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();

  const carregarPedidos = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const pedidos = await pedidosService.obterPedidos();

      setData(prev => ({
        ...prev,
        pedidos,
        loading: false
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar pedidos'
      }));
      
      showError('Não foi possível carregar os pedidos');
    }
  }, [showError]);

  const refreshDados = useCallback(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  const handleAceitar = useCallback(async (id: string) => {
    try {
      await pedidosService.aceitarPedido(id);
      showSuccess('Pedido aceito com sucesso!');
      refreshDados();
    } catch (error) {
      showError('Erro ao aceitar pedido');
    }
  }, [showSuccess, showError, refreshDados]);

  const handleAvançar = useCallback(async (id: string) => {
    try {
      await pedidosService.avancarPedido(id);
      showSuccess('Pedido avançado com sucesso!');
      refreshDados();
    } catch (error) {
      showError('Erro ao avançar pedido');
    }
  }, [showSuccess, showError, refreshDados]);

  const handleFinalizar = useCallback(async (id: string) => {
    try {
      await pedidosService.finalizarPedido(id);
      showSuccess('Pedido finalizado com sucesso!');
      refreshDados();
    } catch (error) {
      showError('Erro ao finalizar pedido');
    }
  }, [showSuccess, showError, refreshDados]);

  const handleRecusar = useCallback(async (id: string) => {
    try {
      await pedidosService.recusarPedido(id);
      showSuccess('Pedido recusado com sucesso!');
      refreshDados();
    } catch (error) {
      showError('Erro ao recusar pedido');
    }
  }, [showSuccess, showError, refreshDados]);

  const handleSearchChange = useCallback((term: string) => {
    setData(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const handleClearSearch = useCallback(() => {
    setData(prev => ({ ...prev, searchTerm: '' }));
  }, []);

  const handleSearchSubmit = useCallback((term: string) => {
    setData(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const handleCriarPedidoFicticio = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, isCreating: true }));
      
      await pedidosService.criarPedidoFicticio();
      showSuccess('Pedido fictício criado com sucesso!');
      refreshDados();
    } catch (error) {
      showError('Erro ao criar pedido fictício');
    } finally {
      setData(prev => ({ ...prev, isCreating: false }));
    }
  }, [showSuccess, showError, refreshDados]);

  const handleOpenPDV = useCallback(() => {
    navigate('/pdv');
  }, [navigate]);

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  return {
    data,
    carregarPedidos,
    refreshDados,
    handleAceitar,
    handleAvançar,
    handleFinalizar,
    handleRecusar,
    handleSearchChange,
    handleClearSearch,
    handleSearchSubmit,
    handleCriarPedidoFicticio,
    handleOpenPDV
  };
}
