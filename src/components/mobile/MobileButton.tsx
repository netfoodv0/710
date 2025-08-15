import React from 'react';
import { Button as HeroButton } from '@heroui/react';
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
  // Mapeamento de variantes para cores do HeroUI
  const getColor = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'success':
        return 'success';
      case 'danger':
        return 'danger';
      case 'outline':
        return 'default';
      case 'ghost':
        return 'default';
      default:
        return 'primary';
    }
  };

  // Mapeamento de tamanhos
  const getSize = (size: string) => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'lg';
      default:
        return 'md';
    }
  };

  // Determina se é outline ou ghost
  const getVariant = (variant: string) => {
    switch (variant) {
      case 'outline':
        return 'bordered';
      case 'ghost':
        return 'light';
      default:
        return 'solid';
    }
  };

  return (
    <HeroButton
      color={getColor(variant)}
      size={getSize(size)}
      variant={getVariant(variant)}
      isLoading={loading}
      isDisabled={disabled}
      fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      startContent={!loading && icon ? icon : undefined}
      className={cn(
        // Animações suaves para mobile
        'transition-all duration-200 ease-out',
        // Efeitos hover aprimorados
        'hover:scale-105 hover:shadow-lg',
        // Efeitos de foco
        'focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50',
        // Efeitos de pressionar (touch-friendly)
        'active:scale-[0.98]',
        // Bordas arredondadas para mobile
        'rounded-2xl',
        // Animações de loading
        loading && 'animate-pulse',
        className
      )}
    >
      {children}
    </HeroButton>
  );
} 