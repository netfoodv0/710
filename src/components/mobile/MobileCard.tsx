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
  const baseClasses = 'rounded-sm';
  
  const variantClasses = {
    default: 'bg-white border',
    elevated: 'bg-white border',
    outlined: 'bg-white border-2',
    interactive: 'bg-white border'
  };
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const interactiveClasses = onClick 
    ? 'cursor-pointer touch-manipulation' 
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
