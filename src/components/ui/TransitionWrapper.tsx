import React from 'react';

interface TransitionWrapperProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}

export function TransitionWrapper({ children, show, className = '' }: TransitionWrapperProps) {
  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
}
