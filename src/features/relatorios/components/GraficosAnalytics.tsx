import React, { useState, useMemo } from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartLegend,
  ChartTooltip,
  ChartArea
} from '@progress/kendo-react-charts';
import { BarChart3, Users, MapPin, Smartphone, TrendingUp } from 'lucide-react';
import { DadosRelatorios } from '../types/relatorios.types';

interface GraficosAnalyticsProps {
  dados: DadosRelatorios | null;
}

export const GraficosAnalytics: React.FC<GraficosAnalyticsProps> = ({ dados }) => {
  const [graficoAtivo, setGraficoAtivo] = useState<'satisfacao' | 'canais' | 'regioes' | 'dispositivos'>('satisfacao');

  // Dados para gráfico de satisfação do cliente
  const dadosSatisfacao = useMemo(() => {
    if (!dados) return [];
    return dados.satisfacaoCliente.map(item => ({
      periodo: item.periodo,
      avaliacaoMedia: item.avaliacaoMedia,
      totalAvaliacoes: item.totalAvaliacoes
      // nps removido pois não existe na interface SatisfacaoCliente
    }));
  }, [dados]);

  // Dados simulados para canais de venda
  const dadosCanais = useMemo(() => {
    if (!dados) return [];
    return [
      { canal: 'App Mobile', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.65), receita: dados.kpis.receitaTotal * 0.68 },
      { canal: 'Website', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.25), receita: dados.kpis.receitaTotal * 0.22 },
      { canal: 'Telefone', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.08), receita: dados.kpis.receitaTotal * 0.07 },
      { canal: 'Balcão', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.02), receita: dados.kpis.receitaTotal * 0.03 }
    ];
  }, [dados]);

  // Dados simulados para regiões
  const dadosRegioes = useMemo(() => {
    if (!dados) return [];
    return [
      { regiao: 'Centro', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.35), tempoMedio: 28 },
      { regiao: 'Norte', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.25), tempoMedio: 32 },
      { regiao: 'Sul', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.20), tempoMedio: 25 },
      { regiao: 'Leste', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.12), tempoMedio: 35 },
      { regiao: 'Oeste', pedidos: Math.floor(dados.kpis.pedidosTotal * 0.08), tempoMedio: 30 }
    ];
  }, [dados]);

  // Dados simulados para dispositivos
  const dadosDispositivos = useMemo(() => {
    if (!dados) return [];
    return [
      { dispositivo: 'Android', porcentagem: 45, cor: '#34D399' },
      { dispositivo: 'iOS', porcentagem: 35, cor: '#3B82F6' },
      { dispositivo: 'Desktop', porcentagem: 15, cor: '#F59E0B' },
      { dispositivo: 'Tablet', porcentagem: 5, cor: '#EF4444' }
    ];
  }, [dados]);

  if (!dados) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Analytics Avançados</h2>
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
    satisfacao: {
      titulo: 'Satisfação do Cliente',
      subtitulo: 'Avaliações e NPS por período',
      icone: <TrendingUp className="w-4 h-4" />
    },
    canais: {
      titulo: 'Canais de Venda',
      subtitulo: 'Distribuição por canal',
      icone: <Smartphone className="w-4 h-4" />
    },
    regioes: {
      titulo: 'Performance por Região',
      subtitulo: 'Pedidos e tempo de entrega',
      icone: <MapPin className="w-4 h-4" />
    },
    dispositivos: {
      titulo: 'Dispositivos',
      subtitulo: 'Distribuição por tipo de dispositivo',
      icone: <Users className="w-4 h-4" />
    }
  };

  const renderGraficoSatisfacao = () => (
    <Chart style={{ height: '350px' }}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="line"
          data={dadosSatisfacao}
          field="avaliacaoMedia"
          categoryField="periodo"
          name="Avaliação Média"
          color="#3B82F6"
          markers={{ visible: true, size: 8 }}
        />
        <ChartSeriesItem
          type="column"
          data={dadosSatisfacao}
          field="nps"
          categoryField="periodo"
          name="NPS"
          color="#10B981"
          axis="nps"
        />
      </ChartSeries>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem name="rating" title={{ text: 'Avaliação (1-5)' }} />
        <ChartValueAxisItem name="nps" title={{ text: 'NPS (%)' }} />
      </ChartValueAxis>
      <ChartLegend position="top" />
      <ChartTooltip />
    </Chart>
  );

  const renderGraficoCanais = () => (
    <Chart style={{ height: '350px' }}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="column"
          data={dadosCanais}
          field="pedidos"
          categoryField="canal"
          name="Pedidos"
          color="#3B82F6"
        />
        <ChartSeriesItem
          type="line"
          data={dadosCanais}
          field="receita"
          categoryField="canal"
          name="Receita (R$)"
          color="#10B981"
          axis="receita"
          markers={{ visible: true, size: 6 }}
        />
      </ChartSeries>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem name="pedidos" title={{ text: 'Pedidos' }} />
        <ChartValueAxisItem name="receita" title={{ text: 'Receita (R$)' }} />
      </ChartValueAxis>
      <ChartLegend position="top" />
      <ChartTooltip />
    </Chart>
  );

  const renderGraficoRegioes = () => (
    <Chart style={{ height: '350px' }}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="column"
          data={dadosRegioes}
          field="pedidos"
          categoryField="regiao"
          name="Pedidos"
          color="#3B82F6"
        />
        <ChartSeriesItem
          type="line"
          data={dadosRegioes}
          field="tempoMedio"
          categoryField="regiao"
          name="Tempo Médio (min)"
          color="#F59E0B"
          axis="tempo"
          markers={{ visible: true, size: 6 }}
        />
      </ChartSeries>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem name="pedidos" title={{ text: 'Pedidos' }} />
        <ChartValueAxisItem name="tempo" title={{ text: 'Tempo (min)' }} />
      </ChartValueAxis>
      <ChartLegend position="top" />
      <ChartTooltip />
    </Chart>
  );

  const renderGraficoDispositivos = () => (
    <Chart style={{ height: '350px' }}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          data={dadosDispositivos}
          field="porcentagem"
          categoryField="dispositivo"
          colorField="cor"
        />
      </ChartSeries>
      <ChartLegend position="bottom" />
      <ChartTooltip />
    </Chart>
  );

  const renderGrafico = () => {
    switch (graficoAtivo) {
      case 'satisfacao':
        return renderGraficoSatisfacao();
      case 'canais':
        return renderGraficoCanais();
      case 'regioes':
        return renderGraficoRegioes();
      case 'dispositivos':
        return renderGraficoDispositivos();
      default:
        return renderGraficoSatisfacao();
    }
  };

  const graficoSelecionado = graficos[graficoAtivo];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Analytics Avançados</h2>
        </div>
        
        {/* Seletor de Gráfico */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.entries(graficos).map(([key, grafico]) => (
            <button
              key={key}
              onClick={() => setGraficoAtivo(key as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                graficoAtivo === key
                  ? 'bg-white text-blue-600 shadow-sm'
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
        
        {renderGrafico()}
      </div>

      {/* Cards de Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Melhor Canal</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            {dadosCanais.reduce((max, item) => item.receita > max.receita ? item : max, dadosCanais[0])?.canal || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(dadosCanais.reduce((max, item) => item.receita > max.receita ? item : max, dadosCanais[0])?.receita || 0)}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Região Mais Rápida</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            {dadosRegioes.reduce((min, item) => item.tempoMedio < min.tempoMedio ? item : min, dadosRegioes[0])?.regiao || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {dadosRegioes.reduce((min, item) => item.tempoMedio < min.tempoMedio ? item : min, dadosRegioes[0])?.tempoMedio || 0} min
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Dispositivo Principal</span>
          </div>
          <div className="text-lg font-bold text-purple-600">
            {dadosDispositivos.reduce((max, item) => item.porcentagem > max.porcentagem ? item : max, dadosDispositivos[0])?.dispositivo || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">
            {dadosDispositivos.reduce((max, item) => item.porcentagem > max.porcentagem ? item : max, dadosDispositivos[0])?.porcentagem || 0}%
          </div>
        </div>
      </div>
    </div>
  );
};