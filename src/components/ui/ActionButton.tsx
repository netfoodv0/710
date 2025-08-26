import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export function ActionButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  icon
}: ActionButtonProps) {
  const getButtonStyles = (variant: string = 'primary', size: string = 'md') => {
    const baseStyles = "inline-flex items-center justify-center gap-3 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-0";
    
    const variantStyles = {
      primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success: "bg-[#19a84e] text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };
    
    const sizeStyles = {
      sm: "px-4 h-8 text-xs rounded",
      md: "px-6 h-10 text-sm rounded",
      lg: "px-8 h-12 text-base rounded"
    };
    
    return `${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]} ${className}`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={getButtonStyles(variant, size)}
      aria-label={loading ? `${label} em andamento...` : label}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : icon ? (
        icon
      ) : null}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">
        {label.length > 8 ? label.split(' ')[0] : label}
      </span>
    </button>
  );
}
