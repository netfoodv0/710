import React from 'react';
import { BagIcon, RevenueIcon, UsersIcon, TicketIcon, RevenueGeneratedIcon, Calendar7DaysIcon } from '../ui';
import { DashboardEstatisticas as DashboardEstatisticasType } from '../../types/dashboard';
import { useDataFormatter } from '../../hooks/useDataFormatter';
import { useDashboardTranslation } from '../../hooks/useTranslation';

interface DashboardEstatisticasCardProps {
  estatisticas: DashboardEstatisticasType;
  loading?: boolean;
}

// Componente para renderizar item individual
const EstatisticaItem: React.FC<{ 
  label: string; 
  valor: string | number; 
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
}> = ({ label, valor, icon: IconComponent, iconColor }) => {
  return (
    <div className="dashboard-stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="dashboard-text-xs font-medium text-gray-600">{label}</p>
          <p className="text-lg font-bold text-gray-900">{valor}</p>
        </div>
        <div className="dashboard-icon-container">
          <IconComponent size={24} color={iconColor} />
        </div>
      </div>
    </div>
  );
};

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

  if (loading) {
    return (
      <section className="dashboard-card dashboard-section-spacing flex-shrink-0" aria-labelledby="estatisticas-title">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="dashboard-stat-card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-card dashboard-section-spacing flex-shrink-0" aria-labelledby="estatisticas-title">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {estatisticasCards.map((card, index) => (
          <EstatisticaItem
            key={index}
            label={card.label}
            valor={card.valor}
            icon={card.icon}
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </section>
  );
};
