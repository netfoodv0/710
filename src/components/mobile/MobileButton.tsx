import React from 'react';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function MobileButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  type = 'button'
}: MobileButtonProps) {
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-300'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        disabledClasses,
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
} 