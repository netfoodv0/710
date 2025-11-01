import React, { useMemo } from 'react';
import { PeriodType } from '../filters/FiltroPeriodo';

import { EstatisticasCustom } from '../../pages/PaginaDashboard/components/EstatisticasCustom';
import { BagIcon, RevenueIcon, UsersIcon, TicketIcon } from '../ui';
import { PieChartCustom } from '../charts/PieChartCustom';
import { LineColumnChartCustom } from '../charts/LineColumnChartCustom';

import { DadosFiltrados } from '../../types/global/relatorios';

interface RelatoriosContentProps {
  dadosFiltrados: DadosFiltrados | null;
  selectedPeriod: PeriodType;
}

export function RelatoriosContent({ dadosFiltrados, selectedPeriod }: RelatoriosContentProps) {
  // Dados das estatísticas gerais
  const estatisticasGeraisData = useMemo(() => ({
    totalPedidos: 0,
    faturamentoTotal: 0,
    clientesAtivos: 0,
    ticketMedio: 0
  }), []);

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

      {/* Gráficos de Pizza lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className="bg-white p-3 sm:p-4" style={{ border: '1px solid #cfd1d3', borderRadius: '4px' }}>
          <h3 className="text-[14px] text-gray-900 mb-4">Website Traffic Sources</h3>
          <PieChartCustom />
        </div>

        {/* Gráfico de Pizza 2 */}
        <div className="bg-white p-3 sm:p-4" style={{ border: '1px solid #cfd1d3', borderRadius: '4px' }}>
          <h3 className="text-[14px] text-gray-900 mb-4">Website Traffic Sources</h3>
          <PieChartCustom />
        </div>
      </div>

      {/* Gráfico de Linha e Coluna */}
      <div className="bg-white" style={{ border: '1px solid #cfd1d3', borderRadius: '4px', padding: '0px' }}>
        <LineColumnChartCustom />
      </div>

    </div>
  );
}
