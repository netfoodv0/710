import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { TrendingUp, BarChart3, PieChart, DollarSign, ShoppingCart } from 'lucide-react';
import { DadosRelatorios } from '../types/relatorios.types';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { GraficoFormasPagamento } from './GraficoFormasPagamento';
import { FormSection } from '../../../components/forms/FormSection';

interface GraficosVendasProps {
  dados: DadosRelatorios | null;
  period: PeriodType;
}

export const GraficosVendas: React.FC<GraficosVendasProps> = ({ dados, period }) => {
  const [performanceData, setPerformanceData] = useState<{
    receitaAtual: number[];
    receitaAnterior: number[];
    categorias: string[];
  } | null>(null);
  const [loadingPerformance, setLoadingPerformance] = useState(true);
  const [formasPagamento, setFormasPagamento] = useState<any[]>([]);
  const [loadingFormas, setLoadingFormas] = useState(true);
  const [totalTransacoes, setTotalTransacoes] = useState(0);
  const [receitaTotal, setReceitaTotal] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingPerformance(true);
        setLoadingFormas(true);
        
        // Carregar dados de performance
        const dadosPerformance = await firebaseDashboardService.calcularDadosPerformance(
          period === 'monthly' ? 'monthly' : 'weekly'
        );
        setPerformanceData(dadosPerformance);
        
        // Carregar dados de formas de pagamento
        const dadosFormas = await firebaseDashboardService.calcularFormasPagamento();
        setFormasPagamento(dadosFormas);
        
        // Calcular totais
        const totalTrans = dadosFormas.reduce((acc, forma) => acc + forma.quantidade, 0);
        const totalRec = dadosFormas.reduce((acc, forma) => acc + forma.value, 0);
        setTotalTransacoes(totalTrans);
        setReceitaTotal(totalRec);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoadingPerformance(false);
        setLoadingFormas(false);
      }
    };

    carregarDados();
  }, [period]);

  if (!dados) {
    return (
      <FormSection
        title="Análise de Vendas"
        description="Dados de performance e formas de pagamento"
      >
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </FormSection>
    );
  }

  // Configuração do gráfico de área do dashboard
  const areaOptions: ApexOptions = {
    chart: {
      height: 250,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#9333EA', '#3B82F6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      type: 'datetime',
      categories: performanceData?.categorias || [],
      labels: {
        format: period === 'monthly' ? 'dd/MM' : 'dd/MM',
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`,
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy'
      },
      y: {
        formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      }
    },
          legend: {
        show: false
      },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    }
  };

  const areaSeries = [
    {
      name: period === 'monthly' ? 'Mês Atual' : 'Semana Atual',
      data: performanceData?.receitaAtual || []
    },
    {
      name: period === 'monthly' ? 'Mês Anterior' : 'Semana Anterior',
      data: performanceData?.receitaAnterior || []
    }
  ];

  return (
    <FormSection
      title="Análise de Vendas"
      description="Dados de performance e formas de pagamento"
    >
      {/* Cards de Resumo com Borda Cinza */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {loadingFormas ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : (
          formasPagamento.map((forma, index) => {
            const porcentagem = receitaTotal > 0 ? ((forma.value / receitaTotal) * 100).toFixed(1) : '0.0';
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-1">{porcentagem}%</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{forma.name}</div>
                <div className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(forma.value)}
                </div>
              </div>
            );
          })
        )}
      </div>



      {/* Gráficos lado a lado: Formas de Pagamento e Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Formas de Pagamento */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Formas de Pagamento</h3>
        </div>
          <GraficoFormasPagamento period={period} />
        </div>
        
        {/* Gráfico de Performance Semanal */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {period === 'monthly' ? 'Performance Mensal' : 'Performance Semanal'}
          </h3>
        </div>
          
          {loadingPerformance ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
    
                
              </div>
            </div>
          ) : (
            <div className="w-full">
              <ReactApexChart
                options={areaOptions}
                series={areaSeries}
                type="area"
                height={300}
              />
              
              {/* Legenda personalizada */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-xs text-purple-600 lowercase">
                    {period === 'monthly' ? 'mês atual' : 'semana atual'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-xs text-blue-600 lowercase">
                    {period === 'monthly' ? 'mês anterior' : 'semana anterior'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
};