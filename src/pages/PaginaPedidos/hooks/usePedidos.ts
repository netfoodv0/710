import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { useAuth } from '../../../hooks/useAuth';
import { pedidosService } from '../services';
import { PedidosData } from '../types';

export function usePedidos() {
  const [data, setData] = useState<PedidosData>({
    pedidos: [],
    loading: true,
    searchTerm: '',
    error: null
  });

  const { showError, showSuccess } = useNotificationContext();
  const { user, status, getLojaId } = useAuth();

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

  const configurarAtualizacaoTempoReal = useCallback(() => {
    try {
      console.log('🔐 Status de autenticação:', status);
      console.log('👤 Usuário:', user?.uid);
      
      const lojaId = getLojaId();
      console.log('🏪 Loja ID:', lojaId);
      
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      if (!lojaId) {
        console.error('❌ lojaId é null - não configurando listener');
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'ID da loja não disponível'
        }));
        return () => {};
      }
      
      const unsubscribe = pedidosService.obterPedidosTempoReal(lojaId, (pedidos) => {
        console.log('📦 Pedidos recebidos no callback:', pedidos.length);
        setData(prev => ({
          ...prev,
          pedidos,
          loading: false
        }));
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ Erro ao configurar listener:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao configurar atualização em tempo real'
      }));
      
      showError('Não foi possível configurar atualização em tempo real');
      return () => {};
    }
  }, [showError, getLojaId]);

  const refreshDados = useCallback(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  const handleAceitar = useCallback(async (id: string) => {
    try {
      await pedidosService.aceitarPedido(id);
      showSuccess('Pedido aceito com sucesso!');
      // Não precisa chamar refreshDados() - atualização em tempo real
    } catch (error) {
      showError('Erro ao aceitar pedido');
    }
  }, [showSuccess, showError]);

  const handleAvançar = useCallback(async (id: string) => {
    try {
      console.log('🚀 Avançando pedido:', id);
      await pedidosService.avancarPedido(id);
      console.log('✅ Pedido avançado com sucesso:', id);
      showSuccess('Pedido avançado com sucesso!');
      // Não precisa chamar refreshDados() - atualização em tempo real
    } catch (error) {
      console.error('❌ Erro ao avançar pedido:', error);
      showError('Erro ao avançar pedido');
    }
  }, [showSuccess, showError]);

  const handleFinalizar = useCallback(async (id: string) => {
    try {
      await pedidosService.finalizarPedido(id);
      showSuccess('Pedido finalizado com sucesso!');
      // Não precisa chamar refreshDados() - atualização em tempo real
    } catch (error) {
      showError('Erro ao finalizar pedido');
    }
  }, [showSuccess, showError]);

  const handleRecusar = useCallback(async (id: string) => {
    try {
      await pedidosService.recusarPedido(id);
      showSuccess('Pedido recusado com sucesso!');
      // Não precisa chamar refreshDados() - atualização em tempo real
    } catch (error) {
      showError('Erro ao recusar pedido');
    }
  }, [showSuccess, showError]);

  const handleSearchChange = useCallback((term: string) => {
    setData(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const handleClearSearch = useCallback(() => {
    setData(prev => ({ ...prev, searchTerm: '' }));
  }, []);

  const handleSearchSubmit = useCallback((term: string) => {
    setData(prev => ({ ...prev, searchTerm: term }));
  }, []);

  useEffect(() => {
    // Só configurar se usuário estiver autenticado
    if (status !== 'authenticated' || !user) {
      console.log('⏳ Aguardando autenticação...');
      return;
    }

    // Configurar atualização em tempo real
    const unsubscribe = configurarAtualizacaoTempoReal();
    
    // Limpar listener quando componente desmontar
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [status, user?.uid]); // Dependências mais específicas

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
    handleSearchSubmit
  };
}


