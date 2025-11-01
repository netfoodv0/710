import React from 'react';
import { StatCard } from './ui';

interface EstatisticaItem {
  label: string;
  valor: string | number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
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
    if (count <= 2) return 'md:grid-cols-2';
    if (count <= 4) return 'md:grid-cols-4';
    if (count <= 6) return 'md:grid-cols-6';
    return 'md:grid-cols-6';
  };

  if (loading) {
    return (
      <section className={`dashboard-card dashboard-section-spacing flex-shrink-0 ${className}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(255, 255, 255, 1)', borderRadius: '16px' }}>
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
        <div className={`grid grid-cols-1 ${getGridCols(4)} gap-4`}>
          {[1, 2, 3, 4].map((i) => (
            <StatCard
              key={i}
              label=""
              value=""
              style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none' }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`dashboard-card dashboard-section-spacing flex-shrink-0 ${className}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(255, 255, 255, 1)', borderRadius: '16px' }}>
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
      <div className={`grid grid-cols-1 ${getGridCols(estatisticas.length)} gap-4`}>
        {estatisticas.map((card, index) => (
          <StatCard
            key={index}
            label={card.label}
            value={card.valor}
            icon={card.icon}
            iconColor={card.iconColor}
            style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none' }}
          />
        ))}
      </div>
    </section>
  );
};

export default EstatisticasCustom;
