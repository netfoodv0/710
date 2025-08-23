import React from 'react';
import { DashboardEstatisticasCard } from './DashboardEstatisticas';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardData } from '../../types/dashboard';
import { PeriodType } from '../filters/FiltroPeriodo';

interface DashboardLayoutProps {
  data: DashboardData;
  selectedPeriod: PeriodType;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ data, selectedPeriod }) => {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Estatísticas do Dashboard */}
      <DashboardEstatisticasCard estatisticas={data.estatisticas} />

      {/* Seção de Análise de Performance */}
      <DashboardAnalytics data={data} />
    </div>
  );
};
