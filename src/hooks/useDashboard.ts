import { useState, useEffect, useCallback } from 'react';
import { firebaseDashboardService } from '../services/firebaseDashboardService';
import { 
  KPI, 
  DadosFormaPagamento, 
  Pedido,
  EstatisticasGerais,
  DashboardData
} from '../types';
import { PeriodType } from '../components/PeriodFilter';
import { getMockFormas, getMockProdutos, getMockPedidos } from '../services/mockDataService';

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
      avaliacaoMedia: 0,
      pedidosPendentes: 0
    },
    formasPedidas: getMockFormas(),
    produtosVendidos: getMockProdutos(),
    pedidosEmAndamento: getMockPedidos()
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
      
      // Adicionar dados mock para os novos componentes quando não houver dados reais
      const dadosCompletos: DashboardData = {
        ...dadosReais,
        formasPedidas: dadosReais.formasPedidas?.length > 0 ? dadosReais.formasPedidas : getMockFormas(),
        produtosVendidos: dadosReais.produtosVendidos?.length > 0 ? dadosReais.produtosVendidos : getMockProdutos(),
        pedidosEmAndamento: dadosReais.pedidosEmAndamento?.length > 0 ? dadosReais.pedidosEmAndamento : getMockPedidos()
      };
      
      // Delay mínimo para evitar piscadas e garantir carregamento suave
      const minDelay = 600; // 600ms para ser consistente com o skeleton
      const startTime = Date.now();
      
      setData(dadosCompletos);
      
      // Garantir que o loading seja exibido por pelo menos 600ms
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
      }
      
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dashboard:', err);
      
      // Em caso de erro, usar dados mock
      setData(prevData => ({
        ...prevData,
        formasPedidas: getMockFormas(),
        produtosVendidos: getMockProdutos(),
        pedidosEmAndamento: getMockPedidos()
      }));
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