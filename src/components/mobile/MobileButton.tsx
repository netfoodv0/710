import React from 'react';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';

interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
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
  type = 'button',
  icon
}: MobileButtonProps) {
  // Mapeamento de variantes para classes CSS
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-purple-600 text-white hover:bg-purple-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50';
      case 'ghost':
        return 'text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-purple-600 text-white hover:bg-purple-700';
    }
  };

  // Mapeamento de tamanhos
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        // Estilos base
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
        // Tamanho
        getSizeClasses(size),
        // Variante
        getVariantClasses(variant),
        // Full width
        fullWidth && 'w-full',
        // Disabled state
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </button>
  );
} 