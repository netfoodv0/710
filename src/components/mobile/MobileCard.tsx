import React from 'react';
import { cn } from '../../utils';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export function MobileCard({ 
  children, 
  className, 
  onClick, 
  variant = 'default',
  padding = 'md'
}: MobileCardProps) {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-200',
    outlined: 'bg-white border-2 border-gray-200'
  };
  
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const interactiveClasses = onClick 
    ? 'active:scale-95 hover:shadow-md cursor-pointer' 
    : '';

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