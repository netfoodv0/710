import { useState, useEffect, useCallback } from 'react';
import { KPI, Pedido, DadosFormaPagamento, EstatisticasGerais } from '../types/dashboard.types';
import { dashboardService } from '../services/dashboardService';

export function useDashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [formasPagamento, setFormasPagamento] = useState<DadosFormaPagamento[]>([]);
  const [pedidosRecentes, setPedidosRecentes] = useState<Pedido[]>([]);
  const [dadosGraficoPizza, setDadosGraficoPizza] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasGerais | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarKPIs = useCallback(async () => {
    try {
      const dados = await dashboardService.obterKPIs();
      setKpis(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar KPIs');
      console.error(err);
    }
  }, []);

  const carregarFormasPagamento = useCallback(async () => {
    try {
      const dados = await dashboardService.obterFormasPagamento();
      setFormasPagamento(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar formas de pagamento');
      console.error(err);
    }
  }, []);

  const carregarPedidosRecentes = useCallback(async () => {
    try {
      const dados = await dashboardService.obterPedidosRecentes();
      setPedidosRecentes(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar pedidos recentes');
      console.error(err);
    }
  }, []);

  const carregarDadosGraficoPizza = useCallback(async () => {
    try {
      const dados = await dashboardService.obterDadosGraficoPizza();
      setDadosGraficoPizza(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do gráfico');
      console.error(err);
    }
  }, []);

  const carregarEstatisticas = useCallback(async () => {
    try {
      const dados = await dashboardService.obterEstatisticas();
      setEstatisticas(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar estatísticas');
      console.error(err);
    }
  }, []);

  const atualizarDashboard = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        carregarKPIs(),
        carregarFormasPagamento(),
        carregarPedidosRecentes(),
        carregarDadosGraficoPizza(),
        carregarEstatisticas()
      ]);
    } finally {
      setLoading(false);
    }
  }, [carregarKPIs, carregarFormasPagamento, carregarPedidosRecentes, carregarDadosGraficoPizza, carregarEstatisticas]);

  useEffect(() => {
    atualizarDashboard();
  }, [atualizarDashboard]);

  return {
    kpis,
    formasPagamento,
    pedidosRecentes,
    dadosGraficoPizza,
    estatisticas,
    loading,
    error,
    atualizarDashboard,
    carregarKPIs,
    carregarFormasPagamento,
    carregarPedidosRecentes,
    carregarDadosGraficoPizza,
    carregarEstatisticas
  };
} 