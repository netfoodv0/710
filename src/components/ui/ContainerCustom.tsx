import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerCustomProps {
  children: React.ReactNode;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundOpacity?: 60 | 70 | 80 | 90 | 100;
}

export function ContainerCustom({
  children,
  className,
  rounded = '2xl',
  padding = 'md',
  backgroundOpacity = 60
}: ContainerCustomProps) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const backgroundClass = `bg-white/${backgroundOpacity}`;

  return (
    <div
      className={cn(
        backgroundClass,
        'border-2',
        roundedClasses[rounded],
        paddingClasses[padding],
        className
      )}
      style={{ borderColor: 'white' }}
    >
      {children}
    </div>
  );
}
