import React from 'react';
import { cn } from '../../utils';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive';
  padding?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function MobileCard({ 
  children, 
  className, 
  onClick, 
  variant = 'default',
  padding = 'md',
  loading = false
}: MobileCardProps) {
  const baseClasses = 'rounded-sm transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border',
    elevated: 'bg-white shadow-lg border',
    outlined: 'bg-white border-2',
    interactive: 'bg-white shadow-sm border hover:shadow-md active:shadow-lg'
  };
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const interactiveClasses = onClick 
    ? 'active:scale-[0.98] hover:shadow-md cursor-pointer touch-manipulation' 
    : '';

  if (loading) {
    return (
      <div className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        'animate-pulse'
      )} style={{ borderColor: '#cfd1d3' }}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        interactiveClasses,
        className
      )}
      style={{ borderColor: '#cfd1d3' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 