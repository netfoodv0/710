import { useState, useEffect, useCallback } from 'react';
import { Pedido, StatusPedido, filtrosHistoricoSchema, pedidoSchema } from '../types';
import { historicoPedidoService, FiltrosHistorico, EstatisticasHistorico } from '../services/historicoPedidoService';

interface LoadingStates {
  data: boolean;
  estatisticas: boolean;
  exportacao: boolean;
}

export function useHistoricoPedidos() {
  const [pedidosHistorico, setPedidosHistorico] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<LoadingStates>({
    data: false,
    estatisticas: false,
    exportacao: false
  });
  const [error, setError] = useState<string | null>(null);
  const [estatisticas, setEstatisticas] = useState<EstatisticasHistorico | null>(null);

  // Carregar histórico de pedidos com validação
  const carregarHistorico = useCallback(async (filtros?: FiltrosHistorico) => {
    setLoading(prev => ({ ...prev, data: true }));
    setError(null);
    
    try {
      // Validar filtros se fornecidos
      if (filtros) {
        const validatedFiltros = filtrosHistoricoSchema.parse(filtros);
        const pedidos = await historicoPedidoService.obterHistoricoComFiltros(validatedFiltros);
        
        // Validar cada pedido
        const pedidosValidados = pedidos.map(pedido => {
          try {
            return pedidoSchema.parse(pedido);
          } catch (validationError) {
            console.warn('Pedido com dados inválidos:', pedido, validationError);
            return pedido; // Retorna o pedido original se falhar na validação
          }
        });
        
        setPedidosHistorico(pedidosValidados);
      } else {
        const pedidos = await historicoPedidoService.obterHistoricoComFiltros({});
        setPedidosHistorico(pedidos);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar histórico de pedidos';
      setError(errorMessage);
      console.error('Erro ao carregar histórico:', err);
    } finally {
      setLoading(prev => ({ ...prev, data: false }));
    }
  }, []);

  // Carregar estatísticas com loading separado
  const carregarEstatisticas = useCallback(async (filtros?: FiltrosHistorico) => {
    setLoading(prev => ({ ...prev, estatisticas: true }));
    
    try {
      const stats = await historicoPedidoService.obterEstatisticas(filtros);
      setEstatisticas(stats);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
      // Não definir erro global para estatísticas
    } finally {
      setLoading(prev => ({ ...prev, estatisticas: false }));
    }
  }, []);

  // Buscar pedidos por período
  const buscarPorPeriodo = useCallback(async (dataInicio: Date, dataFim: Date) => {
    setLoading(prev => ({ ...prev, data: true }));
    setError(null);
    
    try {
      const pedidos = await historicoPedidoService.obterPedidosPorPeriodo(dataInicio, dataFim);
      setPedidosHistorico(pedidos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar pedidos por período';
      setError(errorMessage);
      console.error('Erro ao buscar por período:', err);
    } finally {
      setLoading(prev => ({ ...prev, data: false }));
    }
  }, []);

  // Buscar pedidos por cliente
  const buscarPorCliente = useCallback(async (nomeCliente: string) => {
    setLoading(prev => ({ ...prev, data: true }));
    setError(null);
    
    try {
      const pedidos = await historicoPedidoService.obterPedidosPorCliente(nomeCliente);
      setPedidosHistorico(pedidos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar pedidos por cliente';
      setError(errorMessage);
      console.error('Erro ao buscar por cliente:', err);
    } finally {
      setLoading(prev => ({ ...prev, data: false }));
    }
  }, []);

  // Exportar histórico com loading específico
  const exportarHistorico = useCallback(async (filtros: FiltrosHistorico) => {
    setLoading(prev => ({ ...prev, exportacao: true }));
    
    try {
      const csvContent = await historicoPedidoService.exportarHistoricoCSV(filtros);
      
      // Download do arquivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `historico_pedidos_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Limpar URL
    } catch (err) {
      console.error('Erro ao exportar histórico:', err);
      throw new Error('Erro ao exportar histórico');
    } finally {
      setLoading(prev => ({ ...prev, exportacao: false }));
    }
  }, []);

  // Limpar erro
  const limparErro = useCallback(() => {
    setError(null);
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    carregarHistorico();
    carregarEstatisticas();
  }, [carregarHistorico, carregarEstatisticas]);

  return {
    pedidosHistorico,
    loading,
    error,
    estatisticas,
    carregarHistorico,
    carregarEstatisticas,
    buscarPorPeriodo,
    buscarPorCliente,
    exportarHistorico,
    limparErro
  };
} 