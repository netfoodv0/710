import { useState, useEffect, useCallback, useMemo } from 'react';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { historicoPedidosService } from '../../../pages/PaginaHistoricoPedidos/services/historicoPedidosService';
import { FirebaseClientesService } from '../../../services/firebaseClientesService';
import { useAuth } from '../../../hooks/useAuth';
import { 
  DashboardData,
  PeriodType,
  DashboardEstatisticas
} from '../types/dashboard.types';
import { getMockFormas, getMockProdutos } from '../../../services/mockDataService';
import { 
  calcularProdutosMaisVendidos,
  calcularFormasPedidoReais,
  calcularEstatisticasReais
} from '../utils/dashboard-calculations';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

// Estado inicial padrão
const DEFAULT_ESTATISTICAS: DashboardEstatisticas = {
  totalPedidos: 0,
  faturamentoTotal: 0,
  totalClientes: 0,
  ticketMedio: 0,
  pedidos7Dias: 0,
  receita7Dias: 0,
  pedidosPendentes: 0
};


interface UseDashboardReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useDashboard = (period: PeriodType = 'weekly'): UseDashboardReturn => {
  const { getLojaId, isAuthenticated } = useAuth();
  
  // Estado inicial com useMemo para evitar recriação desnecessária
  const initialData = useMemo((): DashboardData => ({
    estatisticas: DEFAULT_ESTATISTICAS,
    formasPedidas: getMockFormas() as any,
    produtosVendidos: getMockProdutos() as any,
    pedidosEmAndamento: []
  }), []);
  
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se o usuário está autenticado antes de buscar dados
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      // Configurar lojaId no serviço de histórico
      const lojaId = getLojaId();
      if (!lojaId) {
        setError('ID da loja não encontrado');
        return;
      }
      
      historicoPedidosService.setLojaId(lojaId);

      // Converter período para formato do Firebase
      const firebasePeriod = period === 'daily' ? 'daily' : period === 'monthly' ? 'monthly' : 'weekly';

      // Instanciar serviço de clientes
      const clientesService = new FirebaseClientesService();
      
      // Buscar dados reais do Firebase, histórico de pedidos e clientes únicos em paralelo
      const [dadosReais, pedidosHistorico, clientesUnicos] = await Promise.all([
        firebaseDashboardService.buscarDadosDashboard(firebasePeriod),
        historicoPedidosService.obterHistoricoPedidos(),
        clientesService.buscarClientesUnicos().catch(() => []) // Fallback em caso de erro
      ]);
      
      // Calcular estatísticas reais baseadas no histórico de pedidos
      const estatisticasCalculadas = calcularEstatisticasReais(pedidosHistorico, clientesUnicos.length);
      
      // Calcular formas de pedido reais
      const formasPedidoReais = calcularFormasPedidoReais(pedidosHistorico);
      
      // Calcular produtos mais vendidos reais
      const produtosMaisVendidos = calcularProdutosMaisVendidos(pedidosHistorico);
      
      // Adicionar pedidos pendentes dos dados do Firebase
      const estatisticasComDadosReais: DashboardEstatisticas = {
        ...estatisticasCalculadas,
        pedidosPendentes: dadosReais.estatisticas?.pedidosPendentes || 0
      };
      
      // Criar dados completos do dashboard
      const dadosCompletos: DashboardData = {
        estatisticas: estatisticasComDadosReais,
        formasPedidas: formasPedidoReais as any,
        produtosVendidos: produtosMaisVendidos as any,
        pedidosEmAndamento: []
      };
      
      // Delay mínimo para evitar piscadas e garantir carregamento suave
      const startTime = Date.now();
      setData(dadosCompletos);
      
      // Garantir que o loading seja exibido por pelo menos o tempo mínimo
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < DASHBOARD_CONSTANTS.LOADING_MIN_DELAY_MS) {
        await new Promise(resolve => setTimeout(resolve, DASHBOARD_CONSTANTS.LOADING_MIN_DELAY_MS - elapsedTime));
      }
      
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error('Erro ao carregar dashboard:', err);
      
      // Em caso de erro, usar dados padrão
      setData({
        estatisticas: DEFAULT_ESTATISTICAS,
        formasPedidas: calcularFormasPedidoReais([]) as any,
        produtosVendidos: calcularProdutosMaisVendidos([]) as any,
        pedidosEmAndamento: []
      });
    } finally {
      setLoading(false);
    }
  }, [period, isAuthenticated]);

  const refreshData = useCallback(async () => {
    await carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (isAuthenticated) {
      carregarDados();
    }
  }, [carregarDados, isAuthenticated]);

  return {
    data,
    loading,
    error,
    refreshData
  };
};

