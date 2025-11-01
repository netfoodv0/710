import React, { useMemo } from 'react';
import { EstatisticasCustom } from '../../../pages/PaginaDashboard/components/EstatisticasCustom';
import { CouponIcon, BagIcon, UsersIcon, RevenueIcon } from '../../../components/ui';
import { CuponsStatsProps } from '../types';
import { useTrendData } from '../../../hooks/useTrendData';

export function CuponsStats({ 
  estatisticas, 
  carregamentoCompleto, 
  mostrarAnimacoes, 
  alturasAnimadas 
}: CuponsStatsProps) {
  // Gerar dados de tendência usando hook reutilizável
  const trendDataTotal = useTrendData(estatisticas.totalCupons, 0);
  const trendDataAtivos = useTrendData(estatisticas.cuponsAtivos, 1);
  const trendDataUsos = useTrendData(estatisticas.totalUsos, 2);
  const trendDataDescontos = useTrendData(estatisticas.valorTotalDescontos, 3);

  const estatisticasCards = useMemo(() => [
    {
      label: 'Total de Cupons',
      valor: estatisticas.totalCupons,
      icon: CouponIcon,
      iconColor: '#6b7280',
      trendData: trendDataTotal
    },
    {
      label: 'Cupons Ativos',
      valor: estatisticas.cuponsAtivos,
      icon: BagIcon,
      iconColor: '#6b7280',
      trendData: trendDataAtivos
    },
    {
      label: 'Total de Usos',
      valor: estatisticas.totalUsos,
      icon: UsersIcon,
      iconColor: '#6b7280',
      trendData: trendDataUsos
    },
    {
      label: 'Descontos Gerados',
      valor: `R$ ${estatisticas.valorTotalDescontos.toFixed(2)}`,
      icon: RevenueIcon,
      iconColor: '#6b7280',
      trendData: trendDataDescontos
    }
  ], [estatisticas, trendDataTotal, trendDataAtivos, trendDataUsos, trendDataDescontos]);

  return (
    <div className="cupons-stats-container">
      <EstatisticasCustom estatisticas={estatisticasCards} />
    </div>
  );
}


