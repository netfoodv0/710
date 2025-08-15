import React from 'react';
import { DadosRelatorios } from '../types/relatorios.types';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { FormSection } from '../../../components/forms/FormSection';
import { KPICard } from '../../../components/ui';

interface RelatoriosKPIsProps {
  dados: DadosRelatorios | null;
  period: PeriodType;
}

export const RelatoriosKPIs: React.FC<RelatoriosKPIsProps> = ({ dados, period }) => {
  const loading = !dados;
  
  const formatCurrency = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const kpis = [
    {
      titulo: 'Receita Total',
      valor: loading ? '---' : formatCurrency(dados.kpis.receitaTotal),
      variacao: loading ? 0 : dados.kpis.receitaVariacao,
      icone: null,
      cor: 'bg-green-100',
      descricao: loading ? '' : dados.kpis.receitaVariacao >= 0 ? 
        `+${formatCurrency(dados.kpis.receitaTotal - (dados.kpis.receitaTotal / (1 + dados.kpis.receitaVariacao / 100)))}` : 
        `${formatCurrency((dados.kpis.receitaTotal / (1 + dados.kpis.receitaVariacao / 100)) - dados.kpis.receitaTotal)}`
    },
    {
      titulo: 'Total de Pedidos',
      valor: loading ? '---' : formatNumber(dados.kpis.pedidosTotal),
      variacao: loading ? 0 : dados.kpis.pedidosVariacao,
      icone: null,
      cor: 'bg-blue-100',
      descricao: loading ? '' : dados.kpis.pedidosVariacao >= 0 ? 
        `+${Math.round(dados.kpis.pedidosTotal - (dados.kpis.pedidosTotal / (1 + dados.kpis.pedidosVariacao / 100)))} pedidos` : 
        `${Math.round((dados.kpis.pedidosTotal / (1 + dados.kpis.pedidosVariacao / 100)) - dados.kpis.pedidosTotal)} pedidos`
    },
    {
      titulo: 'Produtos Ativos',
      valor: loading ? '---' : formatNumber(dados.kpis.produtosMaisVendidos),
      variacao: loading ? 0 : 5.2, // Variação simulada
      icone: null,
      cor: 'bg-indigo-100',
      descricao: loading ? '' : '5.2% vs período anterior'
    },
    {
      titulo: 'Clientes Ativos',
      valor: loading ? '---' : formatNumber(dados.kpis.clientesAtivos),
      variacao: loading ? 0 : dados.kpis.clientesAtivosVariacao,
      icone: null,
      cor: 'bg-blue-100',
      descricao: loading ? '' : dados.kpis.clientesAtivosVariacao >= 0 ? 
        `+${Math.round(dados.kpis.clientesAtivos - (dados.kpis.clientesAtivos / (1 + dados.kpis.clientesAtivosVariacao / 100)))} clientes` : 
        `${Math.round((dados.kpis.clientesAtivos / (1 + dados.kpis.clientesAtivosVariacao / 100)) - dados.kpis.clientesAtivos)} clientes`
    }
  ];

  return (
    <div className="mt-4" style={{ marginTop: '16px' }}>
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            titulo={kpi.titulo}
            valor={kpi.valor}
            variacao={kpi.variacao}
            icone={kpi.icone}
            cor={kpi.cor}
            loading={loading}
            descricao={kpi.descricao}
            period={period}
          />
        ))}
      </div>

      {!loading && (
        <div className="mt-4 text-xs text-gray-500 text-right">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      )}
    </div>
  );
};