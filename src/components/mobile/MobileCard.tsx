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
  const baseClasses = 'rounded-2xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-200',
    outlined: 'bg-white border-2 border-gray-200',
    interactive: 'bg-white shadow-sm border border-gray-200 hover:shadow-md active:shadow-lg'
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
      )}>
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
      onClick={onClick}
    >
      {children}
    </div>
  );
} 