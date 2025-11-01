import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  iconColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StatCard({
  label,
  value,
  icon: IconComponent,
  iconColor = '#6b7280',
  className = '',
  style
}: StatCardProps) {
  return (
    <div 
      className={`dashboard-stat-card ${className}`} 
      style={{ borderRadius: '4px', ...style }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="dashboard-text-xs text-xs sm:text-sm font-medium text-gray-600 truncate">{label}</p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">{value}</p>
        </div>
        {IconComponent && (
          <div className="dashboard-icon-container flex-shrink-0 ml-2">
            <IconComponent size={20} color={iconColor} />
          </div>
        )}
      </div>
    </div>
  );
}

