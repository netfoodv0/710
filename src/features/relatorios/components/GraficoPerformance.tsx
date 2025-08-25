import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

interface GraficoPerformanceProps {
  period: PeriodType;
  className?: string;
}

export const GraficoPerformance: React.FC<GraficoPerformanceProps> = ({ 
  period,
  className = '' 
}) => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loadingPerformance, setLoadingPerformance] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingPerformance(true);
        const dadosPerformance = await firebaseDashboardService.calcularDadosPerformance(
          period === 'monthly' ? 'monthly' : 'weekly'
        );
        setPerformanceData(dadosPerformance);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoadingPerformance(false);
      }
    };

    carregarDados();
  }, [period]);

  // Configuração do gráfico de área
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

  if (loadingPerformance) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="w-full">
        <ReactApexChart
          options={areaOptions}
          series={areaSeries}
          type="area"
          height={250}
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
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <span className="text-xs text-gray-600 lowercase">
              {period === 'monthly' ? 'mês anterior' : 'semana anterior'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
