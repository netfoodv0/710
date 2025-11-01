import React from 'react';
import { StatCard } from '../../../components/ui';

interface EstatisticaItem {
  label: string;
  valor: string | number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  trendData?: number[];
}

interface EstatisticasCustomProps {
  estatisticas: EstatisticaItem[];
  loading?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const EstatisticasCustom: React.FC<EstatisticasCustomProps> = ({ 
  estatisticas, 
  loading = false, 
  className = '',
  title,
  subtitle
}) => {
  // Determinar o número de colunas baseado no número de estatísticas
  const getGridCols = (count: number) => {
    if (count <= 2) return 'sm:grid-cols-2';
    if (count <= 4) return 'sm:grid-cols-2 lg:grid-cols-4';
    if (count <= 6) return 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
    return 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
  };

  if (loading) {
    return (
      <section className={`flex-shrink-0 ${className}`}>
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${getGridCols(4)} gap-3 sm:gap-4`}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="dashboard-stat-card" style={{ borderRadius: '4px' }}>
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
    <section className={`flex-shrink-0 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 ${getGridCols(estatisticas.length)} gap-3 sm:gap-4`}>
        {estatisticas.map((card, index) => (
          <StatCard
            key={index}
            label={card.label}
            value={card.valor}
            icon={card.icon}
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </section>
  );
};

export default EstatisticasCustom;
