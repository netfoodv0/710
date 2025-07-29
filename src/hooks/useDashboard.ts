import { useState, useEffect, useCallback } from 'react';
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

      // Simular carregamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ajustar dados baseado no período
      const kpisAjustados = kpisMock.map(kpi => {
        if (period === 'monthly') {
          // Para dados mensais, multiplicar por ~4.3 (média de semanas no mês)
          const multiplicador = 4.3;
          const valorNumerico = parseFloat(kpi.valor.replace(/[^\d,]/g, '').replace(',', '.'));
          const novoValor = valorNumerico * multiplicador;
          
          return {
            ...kpi,
            valor: kpi.valor.includes('R$') 
              ? `R$ ${novoValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              : novoValor.toLocaleString('pt-BR'),
            variacao: kpi.variacao * 1.2 // Ajustar variação para período mensal
          };
        }
        return kpi;
      });

      // Em um cenário real, aqui fariamos chamadas para a API com o período
      setData({
        kpis: kpisAjustados,
        formasPagamento: formasPagamentoMock,
        pedidosRecentes: pedidosRecentesMock,
        estatisticas: estatisticasGerais
      });
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