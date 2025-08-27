import React from 'react';
import { StatsCard } from '../Card';
import { KPI } from '../../types';
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
  Users
} from 'lucide-react';

interface KPISectionProps {
  kpis: KPI[];
}

const iconMap = {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
  Users
};

export function KPISection({ kpis }: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const IconComponent = iconMap[kpi.icone as keyof typeof iconMap];
        
        // Determina a tendência baseada na variação
        const trend = kpi.variacao > 0 ? 'up' : kpi.variacao < 0 ? 'down' : 'neutral';
        const trendValue = `${kpi.variacao > 0 ? '+' : ''}${kpi.variacao.toFixed(1)}%`;
        
        return (
          <StatsCard
            key={index}
            title={kpi.titulo}
            value={kpi.valor}
            trend={trend}
            trendValue={trendValue}
            icon={IconComponent ? <IconComponent className="w-5 h-5" /> : null}
          />
        );
      })}
    </div>
  );
}
