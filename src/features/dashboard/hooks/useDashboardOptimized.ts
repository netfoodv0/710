import { useState, useEffect, useCallback, useMemo } from 'react';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { 
  KPI, 
  DadosFormaPagamento, 
  Pedido,
  EstatisticasGerais,
  DashboardData
} from '../../../types';
import { PeriodType } from '../../../components/PeriodFilter';

interface UseDashboardOptimizedReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  isRefreshing: boolean;
  lastUpdated: Date | null;
}

// Cache para dados por período
const dataCache = new Map<PeriodType, DashboardData>();

export const useDashboardOptimized = (period: PeriodType = 'weekly'): UseDashboardOptimizedReturn => {
  const [data, setData] = useState<DashboardData>({
    kpis: [],
    formasPagamento: [],
    pedidosRecentes: [],
    estatisticas: {
      faturamentoTotal: 0,
      ticketMedio: 0,
      totalPedidos: 0,
      totalClientes: 0,
      receita7Dias: 0,
      pedidos7Dias: 0,
      tempoMedioEntrega: 0,
      avaliacaoMedia: 0,
      pedidosPendentes: 0
    },
    formasPedidas: [],
    produtosVendidos: [],
    pedidosEmAndamento: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const carregarDados = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Verificar cache primeiro
      if (!isRefresh && dataCache.has(period)) {
        const cachedData = dataCache.get(period)!;
        setData(cachedData);
        setLastUpdated(new Date());
        return;
      }

      // Converter PeriodType para o formato esperado pelo serviço
      const periodo = period === 'daily' ? 'daily' : period === 'monthly' ? 'monthly' : 'weekly';
      
      // Buscar dados reais do Firebase
      const dadosReais = await firebaseDashboardService.buscarDadosDashboard(periodo);
      
      // Salvar no cache
      dataCache.set(period, dadosReais);
      
      setData(dadosReais);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [period]);

  const refreshData = useCallback(async () => {
    // Limpar cache para forçar recarregamento
    dataCache.delete(period);
    await carregarDados(true);
  }, [period, carregarDados]);

  // Memoizar dados para evitar re-renders desnecessários
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    data: memoizedData,
    loading,
    error,
    refreshData,
    isRefreshing,
    lastUpdated
  };
}; 