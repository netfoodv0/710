import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Activity, TrendingUp, Clock, Star, Target, BarChart3 } from 'lucide-react';
import { DadosRelatorios } from '../types/relatorios.types';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

interface GraficosPerformanceProps {
  dados: DadosRelatorios | null;
  period: PeriodType;
}

export const GraficosPerformance: React.FC<GraficosPerformanceProps> = ({ dados, period }) => {
  const [graficoAtivo, setGraficoAtivo] = useState<'comparativo' | 'crescimento' | 'horarios'>('comparativo');

  // Configurações base para os gráficos (useMemo para evitar warnings)
  const baseOptions: ApexOptions = useMemo(() => ({
    chart: {
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 3
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px'
      }
    }
  }), []);

  // Dados para gráfico comparativo (área)
  const dadosComparativos = useMemo(() => {
    if (!dados) return { series: [], options: baseOptions };

    const series = [
      {
        name: 'Receita Atual',
        data: dados.metricasComparativas.receitaAtual
      },
      {
        name: 'Receita Anterior',
        data: dados.metricasComparativas.receitaAnterior
      }
    ];

    const options: ApexOptions = {
      ...baseOptions,
      chart: {
        ...baseOptions.chart,
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: dados.metricasComparativas.categorias,
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          },
          formatter: (value) => {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0
            }).format(value);
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: false
      }
    };

    return { series, options };
  }, [dados, baseOptions]);

  // Dados para gráfico de crescimento (linha)
  const dadosCrescimento = useMemo(() => {
    if (!dados) return { series: [], options: baseOptions };

    const series = [
      {
        name: 'Crescimento (%)',
        data: dados.dadosCrescimento.map(item => item.crescimentoPercentual)
      }
    ];

    const options: ApexOptions = {
      ...baseOptions,
      chart: {
        ...baseOptions.chart,
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: dados.dadosCrescimento.map(item => item.periodo),
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          },
          formatter: (value) => {
            const num = Array.isArray(value) ? value[0] : value;
            return typeof num === 'number' ? `${num.toFixed(1)}%` : `${num}%`;
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      markers: {
        size: 6,
        colors: ['#3B82F6'],
        strokeColors: '#fff',
        strokeWidth: 2
      },
      dataLabels: {
        enabled: true,
        formatter: (value) => {
          const num = Array.isArray(value) ? value[0] : value;
          return typeof num === 'number' ? `${num.toFixed(1)}%` : `${num}%`;
        },
        style: {
          fontSize: '10px',
          colors: ['#374151']
        }
      }
    };

    return { series, options };
  }, [dados, baseOptions]);

  // Dados para gráfico de horários de pico (coluna)
  const dadosHorarios = useMemo(() => {
    if (!dados) return { series: [], options: baseOptions };

    const series = [
      {
        name: 'Pedidos',
        data: dados.horariosPico.map(item => item.pedidos)
      },
      {
        name: 'Receita (R$)',
        data: dados.horariosPico.map(item => item.receita)
      }
    ];

    const options: ApexOptions = {
      ...baseOptions,
      chart: {
        ...baseOptions.chart,
        type: 'bar', // Corrigido para tipo suportado
        height: 350
      },
      xaxis: {
        categories: dados.horariosPico.map(item => item.hora),
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Pedidos',
            style: {
              color: '#6B7280'
            }
          },
          labels: {
            style: {
              colors: '#6B7280'
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Receita (R$)',
            style: {
              color: '#6B7280'
            }
          },
          labels: {
            style: {
              colors: '#6B7280'
            },
            formatter: (value) => {
              return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0
              }).format(value);
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%'
        }
      },
      dataLabels: {
        enabled: false
      }
    };

    return { series, options };
  }, [dados, baseOptions]);

  if (!dados) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Análise de Performance</h2>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const graficos = {
    comparativo: {
      titulo: 'Comparação de Receita',
      subtitulo: 'Período atual vs anterior',
      icone: <TrendingUp className="w-4 h-4" />,
      dados: dadosComparativos
    },
    crescimento: {
      titulo: 'Taxa de Crescimento',
      subtitulo: 'Evolução percentual por período',
      icone: <Target className="w-4 h-4" />,
      dados: dadosCrescimento
    },
    horarios: {
      titulo: 'Horários de Pico',
      subtitulo: 'Distribuição de pedidos por horário',
      icone: <Clock className="w-4 h-4" />,
      dados: dadosHorarios
    }
  };

  const graficoSelecionado = graficos[graficoAtivo];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Análise de Performance</h2>
        </div>
        
        {/* Seletor de Gráfico */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.entries(graficos).map(([key, grafico]) => (
            <button
              key={key}
              onClick={() => setGraficoAtivo(key as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                graficoAtivo === key
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {grafico.icone}
              <span className="hidden sm:inline">{grafico.titulo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico Principal */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{graficoSelecionado.titulo}</h3>
          <p className="text-sm text-gray-600">{graficoSelecionado.subtitulo}</p>
        </div>
        
        <ReactApexChart
          options={graficoSelecionado.dados.options}
          series={graficoSelecionado.dados.series}
          type={graficoSelecionado.dados.options.chart?.type as any}
          height={350}
        />
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Crescimento Médio</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            +{dados.dadosCrescimento.reduce((acc, item) => acc + item.crescimentoPercentual, 0) / dados.dadosCrescimento.length || 0}%
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Pico de Vendas</span>
          </div>
          <div className="text-xl font-bold text-blue-600">
            {dados.horariosPico.reduce((max, item) => item.pedidos > max.pedidos ? item : max, dados.horariosPico[0])?.hora || '--:--'}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Satisfação</span>
          </div>
          <div className="text-xl font-bold text-yellow-600">
            {dados.satisfacaoCliente[0]?.avaliacaoMedia.toFixed(1) || '0.0'}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Eficiência</span>
          </div>
          <div className="text-xl font-bold text-purple-600">
            {((dados.kpis.receitaTotal / dados.kpis.pedidosTotal) / dados.kpis.ticketMedio * 100).toFixed(0) || '0'}%
          </div>
        </div>
      </div>
    </div>
  );
};