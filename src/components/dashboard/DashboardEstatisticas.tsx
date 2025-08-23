import React from 'react';
import { BagIcon, RevenueIcon, UsersIcon, TicketIcon, RevenueGeneratedIcon, Calendar7DaysIcon } from '../ui';
import { DashboardEstatisticas } from '../../types/dashboard';

interface DashboardEstatisticasCardProps {
  estatisticas: DashboardEstatisticas;
}

export const DashboardEstatisticasCard: React.FC<DashboardEstatisticasCardProps> = ({ estatisticas }) => {
  const formatarMoeda = (valor: number): string => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  const estatisticasCards = [
    {
      label: 'Total de Pedidos',
      valor: estatisticas.totalPedidos,
      icon: BagIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Faturamento Total',
      valor: formatarMoeda(estatisticas.faturamentoTotal),
      icon: RevenueIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Clientes Ativos',
      valor: estatisticas.totalClientes,
      icon: UsersIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Ticket Médio',
      valor: formatarMoeda(estatisticas.ticketMedio),
      icon: TicketIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Pedidos - 7 dias',
      valor: estatisticas.pedidos7Dias,
      icon: Calendar7DaysIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Receita - 7 dias',
      valor: formatarMoeda(estatisticas.receita7Dias),
      icon: RevenueGeneratedIcon,
      iconColor: '#6b7280'
    }
  ];

  return (
    <div className="dashboard-card p-4 flex-shrink-0">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {estatisticasCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{card.label}</p>
                  <p className="text-lg font-bold text-gray-900">{card.valor}</p>
                </div>
                <div className="dashboard-icon-container">
                  <IconComponent size={24} color={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
