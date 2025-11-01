import React, { useMemo } from 'react';
import { useSidebarWidth } from '../../hooks/useSidebarWidth';

interface FixedPageHeaderProps {
  title: string;
  subtitle?: string;
  height?: number;
  className?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

/**
 * FixedPageHeader Component
 * 
 * Um cabeçalho fixo que aparece no topo das páginas, com largura dinâmica
 * baseada na largura do sidebar (que pode ser expandido ou recolhido).
 * 
 * @example
 * ```tsx
 * <FixedPageHeader 
 *   title="Dashboard"
 *   subtitle="Visão geral do sistema"
 *   rightContent={<Button>Novo</Button>}
 * />
 * ```
 */
export const FixedPageHeader = React.memo(function FixedPageHeader({
  title,
  subtitle,
  height = 50,
  className = '',
  leftContent,
  rightContent
}: FixedPageHeaderProps) {
  const sidebarWidth = useSidebarWidth();
  
  // Memoizar estilos inline para evitar recriação
  const headerStyle = useMemo(() => ({
    left: `${sidebarWidth}px`,
    height: `${height}px`
  }), [sidebarWidth, height]);
  
  // Memoizar o aria-label para evitar recriação
  const ariaLabel = useMemo(() => `Cabeçalho da página: ${title}`, [title]);

  return (
    <header 
      className={`fixed top-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center px-6 transition-all duration-300 ${className}`}
      style={headerStyle}
      role="banner"
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-between w-full">
        {/* Conteúdo da esquerda */}
        <div className="flex items-center gap-3">
          {leftContent || (
            <>
              <h1 className="text-sm text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <span className="text-sm text-gray-600">
                  {subtitle}
                </span>
              )}
            </>
          )}
        </div>

        {/* Conteúdo da direita */}
        {rightContent && (
          <div className="flex items-center gap-3">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
});
