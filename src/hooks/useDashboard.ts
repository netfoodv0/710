import { useState, useEffect, useCallback } from 'react';
import { firebaseDashboardService } from '../services/firebaseDashboardService';
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

interface UseDashboardReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useDashboard = (period: PeriodType = 'weekly'): UseDashboardReturn => {
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

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Converter PeriodType para o formato esperado pelo serviço
      const periodo = period === 'daily' ? 'daily' : period === 'monthly' ? 'monthly' : 'weekly';
      
      // Buscar dados reais do Firebase
      const dadosReais = await firebaseDashboardService.buscarDadosDashboard(periodo);
      
      setData(dadosReais);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  const refreshData = useCallback(async () => {
    await carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    data,
    loading,
    error,
    refreshData
  };
}; 