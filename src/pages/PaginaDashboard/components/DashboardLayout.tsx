import React from 'react';
import { DashboardEstatisticasCard } from './DashboardEstatisticas';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardData, PeriodType } from '../types/dashboard.types';

interface DashboardLayoutProps {
  data: DashboardData;
  selectedPeriod: PeriodType;
  loading?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ data, selectedPeriod, loading = false }) => {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Estatísticas do Dashboard */}
      <DashboardEstatisticasCard 
        estatisticas={data.estatisticas}
        loading={loading}
      />

      {/* Seção de Análise de Performance */}
      <DashboardAnalytics 
        data={data} 
        loading={loading}
      />
    </div>
  );
};

