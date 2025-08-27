import React from 'react';
import { DadosRelatorios } from '../types/relatorios.types';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { FormSection } from '../../../components/forms/FormSection';
import { KPICard } from '../../../components/ui';
import { NewCustomerIcon, DiscountIcon } from '../../../components/ui';

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

  const getKpiColor = (tipo: string) => {
    switch (tipo) {
      case 'vendas':
        return 'bg-purple-100';
      case 'pedidos':
        return 'bg-gray-100';
      case 'clientes':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  const kpis = [
    {
      titulo: 'Receita Total',
      valor: loading ? '---' : formatCurrency(dados.kpis.receitaTotal),
      variacao: loading ? 0 : dados.kpis.receitaVariacao,
      icone: null,
      cor: 'bg-green-100',
      descricao: ''
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
      {/* Container pai com fundo branco e bordas */}
      <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border w-full" style={{ borderColor: '#cfd1d3', height: '106px' }}>
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-xs font-medium text-gray-600">{kpi.titulo}</p>
                  <p className="text-lg font-bold text-gray-900">{kpi.valor}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {kpi.titulo === 'Receita Total' && (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  )}
                  {kpi.titulo === 'Total de Pedidos' && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                  {kpi.titulo === 'Produtos Ativos' && (
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                  {kpi.titulo === 'Clientes Ativos' && (
                    <NewCustomerIcon size={20} color="#8B5CF6" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};
