import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { historicoPedidosService } from '../services';
import { HistoricoPedidosData, Pedido } from '../types';
import { useAuth } from '../../../hooks/useAuth';

export function useHistoricoPedidos() {
  const [data, setData] = useState<HistoricoPedidosData>({
    pedidosHistorico: [],
    loading: true,
    error: null
  });

  const { showError, showSuccess } = useNotificationContext();
  const { getLojaId } = useAuth();

  const carregarHistorico = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      // Configurar lojaId no serviço
      const lojaId = getLojaId();
      historicoPedidosService.setLojaId(lojaId);
      
      const pedidos = await historicoPedidosService.obterHistoricoPedidos();

      setData({
        pedidosHistorico: pedidos,
        loading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar histórico de pedidos'
      }));
      
      showError('Não foi possível carregar o histórico de pedidos');
    }
  }, [showError]);

  const carregarEstatisticas = useCallback(async () => {
    try {
      // Configurar lojaId no serviço
      const lojaId = getLojaId();
      historicoPedidosService.setLojaId(lojaId);
      
      const estatisticas = await historicoPedidosService.obterEstatisticasHistorico();
      console.log('Estatísticas carregadas:', estatisticas);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }, []);

  const refreshDados = useCallback(() => {
    carregarHistorico();
    carregarEstatisticas();
  }, []);

  const handleViewPedido = useCallback((pedido: Pedido) => {
    console.log('Visualizar pedido:', pedido);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await historicoPedidosService.exportarHistorico();
      showSuccess('Histórico exportado com sucesso!');
    } catch (error) {
      showError('Erro ao exportar histórico');
    }
  }, [showSuccess, showError]);

  const handleRetry = useCallback(() => {
    refreshDados();
  }, [refreshDados]);

  useEffect(() => {
    carregarHistorico();
    carregarEstatisticas();
  }, []); // Executar apenas uma vez na montagem

  return {
    data,
    carregarHistorico,
    carregarEstatisticas,
    refreshDados,
    handleViewPedido,
    handleExport,
    handleRetry
  };
}
