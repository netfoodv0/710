import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
  };
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actionButton,
  leftContent,
  rightContent,
  sticky = true,
  className = ''
}: PageHeaderProps) {
  const getButtonStyles = (variant: string = 'primary', size: string = 'md') => {
    const baseStyles = "inline-flex items-center gap-3 font-semibold rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success: "bg-[#19a84e] text-white hover:bg-green-700 focus:ring-green-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };
    
    const sizeStyles = {
      sm: "px-4 h-8 text-xs",
      md: "px-6 h-10 text-sm",
      lg: "px-8 h-12 text-base"
    };
    
    return `${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]}`;
  };

  return (
    <header 
      className={`${sticky ? 'sticky top-0 z-20' : ''} bg-white/10 backdrop-blur-xl border-b border-white/30 h-[73.03px] flex items-center ${className}`}
      role="banner"
      aria-label={`Cabeçalho da página: ${title}`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Seção esquerda - Título, descrição e conteúdo personalizado */}
        <div className="flex items-center min-w-0 flex-1">
          {leftContent ? (
            leftContent
          ) : (
                         <div className="space-y-1 min-w-0">
               <h1 className="text-lg font-bold text-gray-800 leading-tight drop-shadow-sm">{title}</h1>
               {subtitle && (
                 <p className="text-sm text-gray-700 leading-relaxed truncate drop-shadow-sm">{subtitle}</p>
               )}
             </div>
          )}
        </div>
        
        {/* Seção direita - Botão de ação e conteúdo personalizado */}
        <div className="flex items-center flex-shrink-0 ml-4 gap-3">
          {rightContent}
          
          {actionButton && (
            <button
              onClick={actionButton.onClick}
              disabled={actionButton.disabled || actionButton.loading}
              className={getButtonStyles(actionButton.variant, actionButton.size)}
              aria-label={actionButton.loading ? `${actionButton.label} em andamento...` : actionButton.label}
            >
              {actionButton.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : null}
              <span className="hidden sm:inline">{actionButton.label}</span>
              <span className="sm:hidden">
                {actionButton.label.length > 10 ? actionButton.label.split(' ')[0] : actionButton.label}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
