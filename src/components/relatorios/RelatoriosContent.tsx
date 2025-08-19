import React, { useState, useEffect } from 'react';
import { PeriodType } from '../filters/FiltroPeriodo';

import { GraficosVendas } from '../../features/relatorios/components/GraficosVendas';
import { EstatisticasHistoricoContainer } from '../';
import { CardTiposPedidos } from '../../features/historico/components/CardTiposPedidos';
import { GraficoFormasPagamento } from '../../features/relatorios/components/GraficoFormasPagamento';
import { GraficoPerformance } from '../../features/relatorios/components/GraficoPerformance';
import { GraficoFrequenciaPedidos } from '../../features/relatorios/components/GraficoFrequenciaPedidos';

import { BarChart } from '../charts';
import { firebaseDashboardService } from '../../services/firebaseDashboardService';
import { firebaseClientesService, EstatisticasClientes } from '../../services/firebaseClientesService';
import { DistribuicaoClientesCategoria, CategoriaCliente } from './DistribuicaoClientesCategoria';

interface RelatoriosContentProps {
  dadosFiltrados: any;
  selectedPeriod: PeriodType;
}

export function RelatoriosContent({ dadosFiltrados, selectedPeriod }: RelatoriosContentProps) {
  const [chartData, setChartData] = useState<any>(null);

  // Debug: verificar dados recebidos (apenas quando mudar)
  useEffect(() => {
    console.log('🔍 RelatoriosContent: dadosFiltrados recebidos:', dadosFiltrados);
    console.log('🔍 RelatoriosContent: selectedPeriod:', selectedPeriod);
  }, [dadosFiltrados, selectedPeriod]);

  // Estado para as categorias de clientes
  const [categorias, setCategorias] = useState<CategoriaCliente[]>(() => {
    // Sempre começar com as alturas corretas (não zeradas)
    return [
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
        altura: 50, // Altura mínima para quantidade 0
        cor: 'rgba(168, 85, 247, 0.7)'
      },
      {
        nome: 'Super Clientes',
        quantidade: 0,
        altura: 50, // Altura mínima para quantidade 0
        cor: 'rgba(192, 132, 252, 0.6)'
      }
    ];
  });

  // Estado para estatísticas reais dos clientes
  const [estatisticasClientes, setEstatisticasClientes] = useState<EstatisticasClientes | null>(null);

  // Estado para controlar o efeito de água balançando
  const [mostrarAnimacoes, setMostrarAnimacoes] = useState(false);
  const [carregamentoCompleto, setCarregamentoCompleto] = useState(false);
  const [erroClientes, setErroClientes] = useState<string | null>(null);
  const [tentativas, setTentativas] = useState(0);
  const maxTentativas = 3;

  // Função para calcular alturas baseado nas quantidades de clientes
  const calcularAlturasPorQuantidade = (quantidades: number[]) => {
    const alturaMaxima = 260; // Altura máxima para o card
    const limitesMinimos = [50, 50, 50, 50]; // Altura mínima para cada categoria
    
    return quantidades.map((quantidade, index) => {
      if (quantidade === 0) {
        return limitesMinimos[index];
      }
      
      // Calcular altura proporcional baseada na quantidade
      // Usar uma escala mais realista para as quantidades
      const maxQuantidade = Math.max(...quantidades); // Usar a maior quantidade como referência
      const proporcao = quantidade / maxQuantidade;
      const rangeDisponivel = alturaMaxima - limitesMinimos[index];
      const alturaCalculada = limitesMinimos[index] + (rangeDisponivel * proporcao);
      
      return Math.round(alturaCalculada);
    });
  };

  // Função para atualizar categorias com novas quantidades e alturas
  const atualizarCategorias = (novasQuantidades: number[]) => {
    const novasAlturas = calcularAlturasPorQuantidade(novasQuantidades);
    
    const novasCategorias = categorias.map((cat, index) => ({
      ...cat,
      quantidade: novasQuantidades[index],
      altura: novasAlturas[index]
    }));
    
    setCategorias(novasCategorias);
  };

  // Função para recarregar dados (retry mechanism)
  const recarregarDados = () => {
    setTentativas(0);
    setErroClientes(null);
    setCarregamentoCompleto(false);
    // Não desabilitar animações aqui para evitar travamento
    
    // Recarregar após um pequeno delay
    setTimeout(() => {
      carregarEstatisticasClientes();
    }, 1000);
  };

  // Carregar estatísticas reais dos clientes do Firebase
  const carregarEstatisticasClientes = async () => {
    setErroClientes(null);
    
    try {
              const estatisticas = await firebaseClientesService.calcularEstatisticas();
      
      setEstatisticasClientes(estatisticas);
      
      // Manter Curiosos e Novatos como dados fictícios
      // Apenas Fiéis e Super Clientes vêm do Firebase
      const novasQuantidades = [
        18, // Curiosos: sempre 18 (fictício)
        8, // Novatos: sempre 8 (fictício)
        estatisticas.fieis || 0, // Fiéis: dados reais do Firebase
        estatisticas.super_clientes || 0 // Super Clientes: dados reais do Firebase
      ];
      
      // Atualizar diretamente para as alturas reais (sem zerar)
      
      // Atualizar diretamente para as alturas reais (sem zerar)
      atualizarCategorias(novasQuantidades);
      
      // Marcar carregamento como completo
      setCarregamentoCompleto(true);
      
      // Ativar animações imediatamente após carregar os dados
      setMostrarAnimacoes(true);
      
    } catch (error) {
      console.error(`❌ Tentativa ${tentativas + 1}/${maxTentativas}: Erro ao carregar estatísticas dos clientes:`, error);
      
      if (tentativas < maxTentativas - 1) {
        // Tentar novamente
        setTentativas(prev => prev + 1);
        
        setTimeout(() => {
          carregarEstatisticasClientes();
        }, 2000);
        return;
      }
      
      // Em caso de erro, usar valores padrão mas marcar como carregado
      const quantidadesPadrao = [18, 8, 0, 0];
      
      // Atualizar diretamente para as alturas padrão (sem zerar)
      atualizarCategorias(quantidadesPadrao);
      
      // Marcar carregamento como completo mesmo com erro
      setCarregamentoCompleto(true);
      
      // Ativar animações imediatamente mesmo com erro
      setMostrarAnimacoes(true);
    }
  };

  useEffect(() => {
    // Adicionar um pequeno delay para garantir que o Firebase esteja inicializado
    const timer = setTimeout(() => {
      carregarEstatisticasClientes();
    }, 1000); // Aumentado para 1 segundo

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const carregarDadosGrafico = async () => {
      try {
        if (selectedPeriod === 'weekly') {
          // Dados semanais (últimos 7 dias)
          const dadosSemanais = await firebaseDashboardService.calcularDadosPerformance('weekly');
          
          // Converter para formato do gráfico mais indicativo
          const categorias = dadosSemanais.categorias.map((data: string) => {
            const date = new Date(data);
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const diaSemana = date.toLocaleDateString('pt-BR', { weekday: 'short' });
            return `${diaSemana} ${dia}/${mes}`;
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


      {/* Estatísticas Detalhadas */}
      <EstatisticasHistoricoContainer 
        estatisticas={dadosFiltrados?.estatisticas || null}
        dadosRelatorios={dadosFiltrados}
      />

      {/* Primeira linha: 3 gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Tipos de Pedidos */}
          <div>
            <CardTiposPedidos />
          </div>
          
          {/* Formas de Pagamento */}
          <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-900">Formas de Pagamento</h3>
            </div>
            <GraficoFormasPagamento period={selectedPeriod} />
          </div>
          
          {/* Frequência de Pedidos */}
          <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-900">Frequência de Pedidos</h3>
            </div>
            <GraficoFrequenciaPedidos />
          </div>
        </div>
        
        {/* Segunda linha: Performance Semanal em largura total */}
        <div className="bg-white border rounded-lg p-4 mt-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="mb-2">
            <h3 className="text-xs font-semibold text-gray-900">
              {selectedPeriod === 'monthly' ? 'Performance Mensal' : 'Performance Semanal'}
            </h3>
          </div>
          <GraficoPerformance period={selectedPeriod} />
        </div>
      

      {/* Card com Gráfico de Barras */}
      <div className="bg-white border rounded-lg p-6" style={{ borderColor: 'rgb(207 209 211)' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedPeriod === 'weekly' ? 'Pedidos Semanais' : 'Pedidos Diários do Mês'}
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

      {/* Margem inferior da página */}
      <div className="h-25"></div>

    </div>
  );
}