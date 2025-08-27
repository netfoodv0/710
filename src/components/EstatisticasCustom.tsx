import React from 'react';

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

// Componente para renderizar item individual
const EstatisticaCard: React.FC<{ 
  label: string; 
  valor: string | number; 
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
}> = ({ label, valor, icon: IconComponent, iconColor }) => {
  return (
    <div className="dashboard-stat-card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none' }}>
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
            <div key={i} className="dashboard-stat-card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none' }}>
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
          <EstatisticaCard
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

export default EstatisticasCustom;
