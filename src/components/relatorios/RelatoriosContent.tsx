import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PeriodType } from '../filters/FiltroPeriodo';

import { CardTiposPedidos } from '../../features/historico/components/CardTiposPedidos';
import { GraficoFormasPagamento } from '../../features/relatorios/components/GraficoFormasPagamento';
import { GraficoPerformance } from '../../features/relatorios/components/GraficoPerformance';
import { GraficoFrequenciaPedidos } from '../../features/relatorios/components/GraficoFrequenciaPedidos';
import { ChartAreaInteractive } from '../../features/relatorios/components/AreaChart';
import { ChartBarLabel } from '../../features/relatorios/components/BarChart';

import { BarChart as BarChartComponent } from '../charts/BarChart';
import { firebaseDashboardService } from '../../services/firebaseDashboardService';

import { useEstatisticas } from '../../context/estatisticasContext';
import { useEstatisticasPadrao } from '../../components/shared';
import { EstatisticasCustom } from '../EstatisticasCustom';
import { BagIcon, RevenueIcon, UsersIcon, TicketIcon } from '../ui';

import { DadosFiltrados, DadosRelatorioGeral } from '../../types/relatorios';

interface RelatoriosContentProps {
  dadosFiltrados: DadosFiltrados | null;
  selectedPeriod: PeriodType;
}

export function RelatoriosContent({ dadosFiltrados, selectedPeriod }: RelatoriosContentProps) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }>;
  } | null>(null);
  
  // Estado para categorias de clientes
  const [categorias, setCategorias] = useState([
    {
      nome: 'Curiosos',
      quantidade: 18,
      altura: 260,
      cor: 'rgba(124, 58, 237, 0.9)'
    },
    {
      nome: 'Novatos',
      quantidade: 8,
      altura: 210,
      cor: 'rgba(139, 92, 246, 0.8)'
    },
    {
      nome: 'Fiéis',
      quantidade: 0,
      altura: 50,
      cor: 'rgba(168, 85, 247, 0.7)'
    },
    {
      nome: 'Super Clientes',
      quantidade: 0,
      altura: 50,
      cor: 'rgba(192, 132, 252, 0.6)'
    }
  ]);
  
  const { estatisticasGerais } = useEstatisticas();
  const { estatisticasGerais: estatisticasPadrao } = useEstatisticasPadrao();

  // Dados das estatísticas gerais
  const estatisticasGeraisData = useMemo(() => ({
    totalPedidos: 1247,
    faturamentoTotal: 45678.90,
    clientesAtivos: 342,
    ticketMedio: 36.63
  }), []);

  // Componente de estatísticas gerais similar ao EstatisticasProdutos
  const EstatisticasGerais = () => {
    const estatisticasItems = [
      {
        label: 'Total de Pedidos',
        value: estatisticasGeraisData.totalPedidos,
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        )
      },
      {
        label: 'Faturamento Total',
        value: `R$ ${estatisticasGeraisData.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        )
      },
      {
        label: 'Clientes Ativos',
        value: estatisticasGeraisData.clientesAtivos,
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        )
      },
      {
        label: 'Ticket Médio',
        value: `R$ ${estatisticasGeraisData.ticketMedio.toFixed(2)}`,
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      }
    ];

    return (
      <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #cfd1d3' }}>
        <div className="flex flex-wrap gap-6">
          {estatisticasItems.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-white rounded-lg p-4 relative"
              style={{ border: '1px solid #cfd1d3', height: '71px' }}
            >
              <div className="text-left h-full flex flex-col justify-between">
                <p className="text-xs font-normal text-gray-600">{item.label}</p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
              
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <div className="p-2 bg-gray-100 rounded-full">
                  <div className="w-6 h-6 text-gray-600">
                    {item.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };




    // Estado para controlar o efeito de água balançando
  const [mostrarAnimacoes, setMostrarAnimacoes] = useState(false);
  const [carregamentoCompleto, setCarregamentoCompleto] = useState(false);
  const [erroClientes, setErroClientes] = useState<string | null>(null);
  const [tentativas, setTentativas] = useState(0);
  const maxTentativas = 3;

  // Função para calcular alturas baseado nas quantidades de clientes
  const calcularAlturasPorQuantidade = useCallback((quantidades: number[]) => {
    const alturaMaxima = 260;
    const limitesMinimos = [50, 50, 50, 50];
    
    return quantidades.map((quantidade, index) => {
      if (quantidade === 0) {
        return limitesMinimos[index];
      }
      
      const maxQuantidade = Math.max(...quantidades);
      const proporcao = quantidade / maxQuantidade;
      const rangeDisponivel = alturaMaxima - limitesMinimos[index];
      const alturaCalculada = limitesMinimos[index] + (rangeDisponivel * proporcao);
      
      return Math.round(alturaCalculada);
    });
  }, []);

  // Função para atualizar categorias com novas quantidades e alturas
  const atualizarCategorias = useCallback((novasQuantidades: number[]) => {
    const novasAlturas = calcularAlturasPorQuantidade(novasQuantidades);
    
    const novasCategorias = categorias.map((cat, index) => ({
      ...cat,
      quantidade: novasQuantidades[index],
      altura: novasAlturas[index]
    }));
    
    setCategorias(novasCategorias);
  }, [categorias, calcularAlturasPorQuantidade]);

  // Função para recarregar dados (retry mechanism)
  const recarregarDados = useCallback(() => {
    setTentativas(0);
    setErroClientes(null);
    setCarregamentoCompleto(false);
  }, []);

  // Função carregarEstatisticasClientes removida



  useEffect(() => {
    const carregarDadosGrafico = async () => {
      try {
        if (selectedPeriod === 'weekly') {
          // Dados semanais (últimos 7 dias)
          const dadosSemanais = await firebaseDashboardService.calcularDadosPerformance('weekly');
          
          // Converter para formato do gráfico mais indicativo
          const labelsSemanais = dadosSemanais.categorias.map((data: string) => {
            const date = new Date(data);
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const diaSemana = date.toLocaleDateString('pt-BR', { weekday: 'short' });
            return `${diaSemana} ${dia}/${mes}`;
          });
          
          setChartData({
            labels: labelsSemanais,
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
          // Dados reais dos pedidos diários do mês atual
          const dadosDiarios = await firebaseDashboardService.calcularPedidosDiariosDoMes();
          
          setChartData({
            labels: dadosDiarios.labelsDias,
            datasets: [
              {
                label: 'Pedidos Diários do Mês',
                data: dadosDiarios.pedidosPorDia,
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
      }
    };

    carregarDadosGrafico();
  }, [selectedPeriod]);

  // Dados de fallback quando há erro
  const getChartDataFallback = (period: PeriodType) => {
    if (period === 'weekly') {
      // Gerar labels para os últimos 7 dias
      const hoje = new Date();
      const labelsSemana = [];
      
      for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - i);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
        labelsSemana.push(`${diaSemana} ${dia}/${mes}`);
      }
      
      return {
        labels: labelsSemana,
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
      // Fallback: dados zerados para todos os dias do mês atual
      const hoje = new Date();
      const diasDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
      const labelsDias = [];
      const dadosDias = [];
      
      for (let dia = 1; dia <= diasDoMes; dia++) {
        // Criar label mais indicativo (dd/mm)
        const diaFormatado = dia.toString().padStart(2, '0');
        const mesFormatado = (hoje.getMonth() + 1).toString().padStart(2, '0');
        labelsDias.push(`${diaFormatado}/${mesFormatado}`);
        // Dados zerados quando não há dados reais
        dadosDias.push(0);
      }
      
      return {
        labels: labelsDias,
        datasets: [
          {
            label: 'Pedidos Diários do Mês',
            data: dadosDias,
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: 'rgba(147, 51, 234, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  };

  return (
    <div className="space-y-6 mt-4">

      {/* Container de Estatísticas Gerais */}
              <EstatisticasCustom
          estatisticas={[
            {
              label: 'Total de Pedidos',
              valor: estatisticasGeraisData.totalPedidos,
              icon: BagIcon,
              iconColor: '#6b7280'
            },
            {
              label: 'Faturamento Total',
              valor: `R$ ${estatisticasGeraisData.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              icon: RevenueIcon,
              iconColor: '#6b7280'
            },
            {
              label: 'Clientes Ativos',
              valor: estatisticasGeraisData.clientesAtivos,
              icon: UsersIcon,
              iconColor: '#6b7280'
            },
            {
              label: 'Ticket Médio',
              valor: `R$ ${estatisticasGeraisData.ticketMedio.toFixed(2)}`,
              icon: TicketIcon,
              iconColor: '#6b7280'
            }
          ]}
        />

      {/* Container com BarChart */}
      <div className="rounded w-full">
        <ChartBarLabel />
      </div>

      {/* Container com AreaChart - 360px de altura */}
      <div className="rounded w-full h-90">
        <div className="h-full">
          <ChartAreaInteractive />
        </div>
      </div>

      {/* Espaçamento entre gráficos */}
      <div className="h-0"></div>

      {/* Primeira linha: 3 gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Tipos de Pedidos */}
          <div>
            <CardTiposPedidos />
          </div>
          
          {/* Formas de Pagamento */}
          <div className="border p-3" style={{ borderColor: '#cfd1d3', background: 'linear-gradient(to bottom, #ffffff, #f5eff2)', borderRadius: '16px' }}>
            <div className="mb-1">
              <h3 className="text-xs font-semibold text-gray-900">Formas de Pagamento</h3>
            </div>
            <GraficoFormasPagamento period={selectedPeriod} />
          </div>
          
          {/* Frequência de Pedidos */}
          <div className="border p-3" style={{ borderColor: '#cfd1d3', background: 'linear-gradient(to bottom, #ffffff, #f5eff2)', borderRadius: '16px' }}>
            <div className="mb-1">
              <h3 className="text-xs font-semibold text-gray-900">Frequência de Pedidos</h3>
            </div>
            <GraficoFrequenciaPedidos />
          </div>
        </div>
        
        {/* Segunda linha: Performance Semanal em largura total */}
        <div className="bg-white border rounded-lg p-4 mt-4 hidden" style={{ borderColor: '#cfd1d3' }}>
          <div className="mb-2">
            <h3 className="text-xs font-semibold text-gray-900">
              {selectedPeriod === 'monthly' ? 'Performance Mensal' : 'Performance Semanal'}
            </h3>
          </div>
          <GraficoPerformance period={selectedPeriod} />
        </div>
      

      {/* Card com Gráfico de Barras */}
      <div className="bg-white border rounded-lg p-6 hidden" style={{ borderColor: 'rgb(207 209 211)' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedPeriod === 'weekly' ? 'Pedidos Semanais' : 'Pedidos Diários do Mês'}
        </h3>
        <div className="h-64">
          {chartData ? (
            <BarChartComponent data={chartData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Nenhum dado disponível
            </div>
          )}
        </div>
      </div>

      {/* Margem inferior da página */}
      <div className="h-25"></div>

    </div>
  );
}
