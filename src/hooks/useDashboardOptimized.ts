import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  kpisMock, 
  formasPagamentoMock, 
  pedidosRecentesMock,
  estatisticasGerais 
} from '../data/dashboardMock';
import { 
  KPI, 
  DadosFormaPagamento, 
  Pedido,
  EstatisticasGerais 
} from '../types';
import { PeriodType } from '../components/PeriodFilter';

interface DashboardData {
  kpis: KPI[];
  formasPagamento: DadosFormaPagamento[];
  pedidosRecentes: Pedido[];
  estatisticas: EstatisticasGerais;
}

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
      avaliacaoMedia: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Memoizar dados ajustados por período
  const getAdjustedData = useCallback((baseData: DashboardData, currentPeriod: PeriodType): DashboardData => {
    if (currentPeriod === 'monthly') {
      const kpisAjustados = baseData.kpis.map(kpi => {
        const multiplicador = 4.3;
        const valorNumerico = parseFloat(kpi.valor.replace(/[^\d,]/g, '').replace(',', '.'));
        const novoValor = valorNumerico * multiplicador;
        
        return {
          ...kpi,
          valor: kpi.valor.includes('R$') 
            ? `R$ ${novoValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            : novoValor.toLocaleString('pt-BR'),
          variacao: kpi.variacao * 1.2
        };
      });

      return {
        ...baseData,
        kpis: kpisAjustados
      };
    }

    return baseData;
  }, []);

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

      // Simular carregamento assíncrono
      await new Promise(resolve => setTimeout(resolve, isRefresh ? 500 : 1000));

      const baseData = {
        kpis: kpisMock,
        formasPagamento: formasPagamentoMock,
        pedidosRecentes: pedidosRecentesMock,
        estatisticas: estatisticasGerais
      };

      const adjustedData = getAdjustedData(baseData, period);
      
      // Salvar no cache
      dataCache.set(period, adjustedData);
      
      setData(adjustedData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [period, getAdjustedData]);

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