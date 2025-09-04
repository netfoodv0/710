import React from 'react';
import { BagIcon, RevenueIcon, UsersIcon, TicketIcon, RevenueGeneratedIcon, Calendar7DaysIcon } from '../../../components/ui';
import { DashboardEstatisticas as DashboardEstatisticasType } from '../types/dashboard.types';
import { useDataFormatter } from '../hooks';
import { useDashboardTranslation } from '../hooks';
import { EstatisticasCustom } from './EstatisticasCustom';

interface DashboardEstatisticasCardProps {
  estatisticas: DashboardEstatisticasType;
  loading?: boolean;
}

export const DashboardEstatisticasCard: React.FC<DashboardEstatisticasCardProps> = ({ estatisticas, loading = false }) => {
  const { formatCurrency } = useDataFormatter();
  const { dashboard } = useDashboardTranslation();

  const estatisticasCards = [
    {
      label: dashboard.totalDePedidos,
      valor: estatisticas.totalPedidos,
      icon: BagIcon,
      iconColor: '#6b7280'
    },
    {
      label: dashboard.faturamentoTotal,
      valor: formatCurrency(estatisticas.faturamentoTotal),
      icon: RevenueIcon,
      iconColor: '#6b7280'
    },
    {
      label: dashboard.clientesAtivos,
      valor: estatisticas.totalClientes,
      icon: UsersIcon,
      iconColor: '#6b7280'
    },
    {
      label: dashboard.ticketMedio,
      valor: formatCurrency(estatisticas.ticketMedio),
      icon: TicketIcon,
      iconColor: '#6b7280'
    },
    {
      label: dashboard.pedidos7Dias,
      valor: estatisticas.pedidos7Dias,
      icon: Calendar7DaysIcon,
      iconColor: '#6b7280'
    },
    {
      label: dashboard.receita7Dias,
      valor: formatCurrency(estatisticas.receita7Dias),
      icon: RevenueGeneratedIcon,
      iconColor: '#6b7280'
    }
  ];

  return (
    <EstatisticasCustom
      estatisticas={estatisticasCards}
      loading={loading}
    />
  );
};
