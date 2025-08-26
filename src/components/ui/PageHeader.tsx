import React, { useRef } from 'react';
import { ActionButton } from './ActionButton';

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
  const headerRef = useRef<HTMLHeadingElement>(null);

  return (
    <header 
      className={`${sticky ? 'sticky top-0 z-20' : ''} bg-white/10 backdrop-blur-xl border-b border-white/30 h-[73.03px] flex items-center dashboard-page-header ${className}`}
      role="banner"
      aria-label={`Cabeçalho da página: ${title}`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Seção esquerda - Título, descrição e conteúdo personalizado */}
        <div className="flex items-center min-w-0 flex-1">
          {leftContent ? (
            leftContent
          ) : (
            <div className="space-y-1 min-w-0">
              <h1 
                className="text-base sm:text-lg font-bold text-gray-800 leading-tight drop-shadow-sm dashboard-focus-visible"
                aria-level={1}
                tabIndex={-1}
                ref={headerRef}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed truncate drop-shadow-sm hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Seção direita - Botão de ação e conteúdo personalizado */}
        <div className="flex items-center flex-shrink-0 ml-2 sm:ml-4 gap-2 sm:gap-3">
          {rightContent}
          
          {actionButton && (
            <ActionButton
              label={actionButton.label}
              onClick={actionButton.onClick}
              loading={actionButton.loading}
              disabled={actionButton.disabled}
              variant={actionButton.variant}
              size={actionButton.size}
            />
          )}
        </div>
      </div>
    </header>
  );
}
