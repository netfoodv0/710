import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { PeriodType } from '../filters/FiltroPeriodo';
import { firebaseDashboardService } from '../../services/firebaseDashboardService';

interface GraficoAreaProps {
  title?: string;
  className?: string;
  period?: PeriodType;
}

export const GraficoArea: React.FC<GraficoAreaProps> = ({
  title = "Comparação de Receita",
  className = '',
  period = 'weekly'
}) => {
  const [data, setData] = useState<{
    receitaAtual: number[];
    receitaAnterior: number[];
    categorias: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Título dinâmico baseado no período
  const tituloDinamico = period === 'monthly' ? 'Performance Mensal' : 'Performance Semanal';

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const dadosPerformance = await firebaseDashboardService.calcularDadosPerformance(
          period === 'monthly' ? 'monthly' : 'weekly'
        );
        
        setData(dadosPerformance);
      } catch (err) {
        console.error('Erro ao carregar dados de performance:', err);
        setError('Erro ao carregar dados de performance');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [period]);

  if (loading) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{tituloDinamico}</h3>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">


          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{tituloDinamico}</h3>
        <div className="flex items-center justify-center h-48 text-red-600">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{tituloDinamico}</h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  const options: ApexOptions = {
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
    colors: ['#10B981', '#3B82F6'],
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
      categories: data.categorias,
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
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: '#374151'
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    }
  };

  const series = [
    {
      name: period === 'monthly' ? 'Mês Atual' : 'Semana Atual',
      data: data.receitaAtual
    },
    {
      name: period === 'monthly' ? 'Mês Anterior' : 'Semana Anterior',
      data: data.receitaAnterior
    }
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{tituloDinamico}</h3>
      
      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={250}
        />
      </div>
    </div>
  );
};