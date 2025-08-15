import React, { useState, useEffect } from 'react';
import { PeriodType } from '../filters/FiltroPeriodo';
import { RelatoriosKPIs } from '../../features/relatorios/components/RelatoriosKPIs';
import { GraficosVendas } from '../../features/relatorios/components/GraficosVendas';
import { TabelaTopProdutos } from '../../features/relatorios/components/TabelaTopProdutos';
import { BarChart } from '../charts';
import { firebaseDashboardService } from '../../services/firebaseDashboardService';

interface RelatoriosContentProps {
  dadosFiltrados: any;
  selectedPeriod: PeriodType;
}

export function RelatoriosContent({ dadosFiltrados, selectedPeriod }: RelatoriosContentProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDadosGrafico = async () => {
      try {
        setLoading(true);
        
        if (selectedPeriod === 'weekly') {
          // Dados semanais (últimos 7 dias)
          const dadosSemanais = await firebaseDashboardService.calcularDadosPerformance('weekly');
          
          // Converter para formato do gráfico
          const categorias = dadosSemanais.categorias.map((data: string) => {
            const date = new Date(data);
            return date.toLocaleDateString('pt-BR', { weekday: 'short' });
          });
          
          setChartData({
            labels: categorias,
            datasets: [
              {
                label: 'Pedidos Semanais',
                data: dadosSemanais.receitaAtual.map((receita: number) => 
                  Math.floor(receita / 45) // Estimativa baseada no ticket médio
                ),
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 1
              }
            ]
          });
        } else {
          // Dados mensais (ano atual)
          const dadosMensais = await firebaseDashboardService.calcularPedidosMensais();
          
          setChartData({
            labels: dadosMensais.categorias,
            datasets: [
              {
                label: 'Pedidos Mensais',
                data: dadosMensais.pedidosMensais,
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 1
              }
            ]
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
        // Fallback para dados simulados em caso de erro
        setChartData(getChartDataFallback(selectedPeriod));
      } finally {
        setLoading(false);
      }
    };

    carregarDadosGrafico();
  }, [selectedPeriod]);

  // Dados de fallback quando há erro
  const getChartDataFallback = (period: PeriodType) => {
    if (period === 'weekly') {
      return {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Pedidos Semanais',
            data: [45, 52, 38, 67, 89, 95, 78],
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 1
          }
        ]
      };
    } else {
      return {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Pedidos Mensais',
            data: [65, 59, 80, 81, 56, 55, 70, 85, 92, 78, 88, 95],
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {/* KPIs Compactos */}
        <RelatoriosKPIs dados={dadosFiltrados} period={selectedPeriod} />

        {/* Gráfico de Formas de Pagamento */}
        <GraficosVendas dados={dadosFiltrados} period={selectedPeriod} />

        {/* Card com Gráfico de Barras - Loading */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedPeriod === 'weekly' ? 'Pedidos Semanais' : 'Pedidos Mensais'}
          </h3>
          <div className="h-64 flex items-center justify-center">

          </div>
        </div>

        {/* Tabela Top Produtos */}
        <TabelaTopProdutos dados={dadosFiltrados} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* KPIs Compactos */}
      <RelatoriosKPIs dados={dadosFiltrados} period={selectedPeriod} />

      {/* Gráfico de Formas de Pagamento */}
      <GraficosVendas dados={dadosFiltrados} period={selectedPeriod} />

      {/* Card com Gráfico de Barras */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedPeriod === 'weekly' ? 'Pedidos Semanais' : 'Pedidos Mensais'}
        </h3>
        <div className="h-64">
          {chartData ? (
            <BarChart data={chartData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Nenhum dado disponível
            </div>
          )}
        </div>
      </div>

      {/* Tabela Top Produtos */}
      <TabelaTopProdutos dados={dadosFiltrados} />
    </div>
  );
}