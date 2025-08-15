import React from 'react';
import clsx from 'clsx';
import { CardProps } from '../types';

export function Card({ title, children, className, actions, noPadding = false }: CardProps) {
  return (
    <div className={clsx('card', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between p-0 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={noPadding ? 'p-0' : 'p-0'}>
        {children}
      </div>
    </div>
  );
}

// Variações específicas do Card
export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  className 
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}) {
  const trendColors = {
    up: 'text-purple-600',
    down: 'text-gray-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className={clsx('p-0', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={clsx('flex items-center gap-1 mt-2', trendColors[trend])}>
              <span className="text-sm font-medium">{trendValue}</span>
              <span className="text-xs">vs. período anterior</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function QuickActionCard({ 
  title, 
  description, 
  icon, 
  onClick, 
  className 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Card className={clsx('cursor-pointer hover:shadow-md transition-shadow', className)}>
      <button 
        onClick={onClick}
        className="w-full p-0 text-left"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </button>
    </Card>
  );
}