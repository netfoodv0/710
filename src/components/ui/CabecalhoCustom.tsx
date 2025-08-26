import React from 'react';
import { Plus, Search, X } from 'lucide-react';
import { PageHeader, ActionButton } from './index';

interface CabecalhoCustomProps {
  // Propriedades básicas
  title: string;
  subtitle?: string;
  
  // Configurações da barra de pesquisa
  showSearch?: boolean;
  searchTerm?: string;
  searchPlaceholder?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  
  // Configurações do botão de ação principal
  showActionButton?: boolean;
  actionButtonLabel?: string;
  actionButtonVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  actionButtonSize?: 'sm' | 'md' | 'lg';
  actionButtonIcon?: React.ReactNode;
  onActionButtonClick?: () => void | Promise<void>;
  actionButtonLoading?: boolean;
  actionButtonDisabled?: boolean;
  
  // Conteúdo personalizado
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  
  // Configurações adicionais
  sticky?: boolean;
  className?: string;
}

export function CabecalhoCustom({
  title,
  subtitle,
  showSearch = false,
  searchTerm = '',
  searchPlaceholder = 'Buscar...',
  onSearchChange,
  onClearSearch,
  onSearchSubmit,
  showActionButton = false,
  actionButtonLabel = 'Ação',
  actionButtonVariant = 'primary',
  actionButtonSize = 'md',
  actionButtonIcon = <Plus className="w-4 h-4" />,
  onActionButtonClick,
  actionButtonLoading = false,
  actionButtonDisabled = false,
  leftContent,
  rightContent,
  sticky = true,
  className = ''
}: CabecalhoCustomProps) {
  
  // Renderiza o conteúdo da esquerda (título + barra de pesquisa ou conteúdo personalizado)
  const renderLeftContent = () => {
    if (leftContent) {
      return leftContent;
    }

    if (showSearch) {
      return (
        <div className="flex items-center gap-4">
          <div className="space-y-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-800 leading-tight drop-shadow-sm">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed truncate drop-shadow-sm hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Barra de pesquisa */}
          <form onSubmit={onSearchSubmit} className="search-bar-container">
            <div className="relative">
              <Search className="search-icon w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={onSearchChange}
                className="search-input pl-10 pr-10 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {searchTerm && onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Limpar pesquisa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      );
    }

    // Conteúdo padrão (apenas título e subtítulo)
    return (
      <div className="space-y-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-800 leading-tight drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed truncate drop-shadow-sm hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>
    );
  };

  // Renderiza o conteúdo da direita (botão de ação + conteúdo personalizado)
  const renderRightContent = () => {
    return (
      <div className="flex items-center gap-4">
        {showActionButton && onActionButtonClick && (
          <ActionButton
            label={actionButtonLabel}
            onClick={onActionButtonClick}
            loading={actionButtonLoading}
            disabled={actionButtonDisabled}
            variant={actionButtonVariant}
            size={actionButtonSize}
            icon={actionButtonIcon}
          />
        )}
        {rightContent}
      </div>
    );
  };

  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      leftContent={renderLeftContent()}
      rightContent={renderRightContent()}
      sticky={sticky}
      className={className}
    />
  );
}
