import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { PeriodType } from '../filters/FiltroPeriodo';

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
  // Dados da semana atual
  const receitaSemanalAtual = [1150.30, 1280.45, 1420.80, 1350.20, 1680.90, 1890.45, 1750.10];
  const receitaSemanalAnterior = [980.50, 1120.30, 1250.80, 1180.40, 1450.20, 1620.80, 1480.50];

  // Dados do mês atual (4 semanas)
  const receitaMensalAtual = [
    1150.30, 1280.45, 1420.80, 1350.20, 1680.90, 1890.45, 1750.10, // Semana 1
    1250.40, 1380.55, 1520.90, 1450.30, 1780.95, 1990.55, 1850.20, // Semana 2
    1350.50, 1480.65, 1620.95, 1550.40, 1880.98, 2090.65, 1950.30, // Semana 3
    1450.60, 1580.75, 1720.98, 1650.50, 1980.99, 2190.75, 2050.40  // Semana 4
  ];

  // Dados do mês anterior (4 semanas)
  const receitaMensalAnterior = [
    980.50, 1120.30, 1250.80, 1180.40, 1450.20, 1620.80, 1480.50, // Semana 1
    1080.60, 1220.40, 1350.85, 1280.50, 1550.25, 1720.85, 1580.55, // Semana 2
    1180.70, 1320.50, 1450.90, 1380.60, 1650.30, 1820.90, 1680.60, // Semana 3
    1280.80, 1420.60, 1550.95, 1480.70, 1750.35, 1920.95, 1780.65  // Semana 4
  ];

  // Selecionar dados baseado no período
  const receitaAtual = period === 'monthly' ? receitaMensalAtual : receitaSemanalAtual;
  const receitaAnterior = period === 'monthly' ? receitaMensalAnterior : receitaSemanalAnterior;

  // Gerar categorias baseado no período
  const generateCategories = () => {
    if (period === 'monthly') {
      // 28 dias para o mês (4 semanas)
      const categories = [];
      const startDate = new Date('2024-01-01');
      
      for (let i = 0; i < 28; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        categories.push(date.toISOString());
      }
      
      return categories;
    } else {
      // 7 dias para a semana
      return [
        '2024-01-08T00:00:00.000Z', // Segunda
        '2024-01-09T00:00:00.000Z', // Terça
        '2024-01-10T00:00:00.000Z', // Quarta
        '2024-01-11T00:00:00.000Z', // Quinta
        '2024-01-12T00:00:00.000Z', // Sexta
        '2024-01-13T00:00:00.000Z', // Sábado
        '2024-01-14T00:00:00.000Z'  // Domingo
      ];
    }
  };

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
      categories: generateCategories(),
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
      data: receitaAtual
    },
    {
      name: period === 'monthly' ? 'Mês Anterior' : 'Semana Anterior',
      data: receitaAnterior
    }
  ];

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
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