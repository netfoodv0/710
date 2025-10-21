import React from 'react';
import { EstatisticasCustom } from '../../../components/EstatisticasCustom';
import { CouponIcon, BagIcon, UsersIcon, RevenueIcon } from '../../../components/ui';
import { CuponsStatsProps } from '../types';

export function CuponsStats({ 
  estatisticas, 
  carregamentoCompleto, 
  mostrarAnimacoes, 
  alturasAnimadas 
}: CuponsStatsProps) {
  return (
    <div className="cupons-stats-container">
      <EstatisticasCustom
        estatisticas={[
          {
            label: 'Total de Cupons',
            valor: estatisticas.totalCupons,
            icon: CouponIcon,
            iconColor: '#6b7280'
          },
          {
            label: 'Cupons Ativos',
            valor: estatisticas.cuponsAtivos,
            icon: BagIcon,
            iconColor: '#6b7280'
          },
          {
            label: 'Total de Usos',
            valor: estatisticas.totalUsos,
            icon: UsersIcon,
            iconColor: '#6b7280'
          },
          {
            label: 'Descontos Gerados',
            valor: `R$ ${estatisticas.valorTotalDescontos.toFixed(2)}`,
            icon: RevenueIcon,
            iconColor: '#6b7280'
          }
        ]}
      />
    </div>
  );
}


