import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface KPICardProps {
  titulo: string;
  valor: string;
  variacao: number;
  icone?: React.ReactNode;
  cor?: string;
  loading?: boolean;
  descricao?: string;
  period?: 'weekly' | 'monthly' | 'daily';
  showTooltip?: boolean;
  tooltipContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  titulo, 
  valor, 
  variacao, 
  icone, 
  cor = 'bg-blue-100', 
  loading = false, 
  descricao, 
  period,
  showTooltip = true,
  tooltipContent,
  className = '',
  onClick,
  href
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const isPositive = variacao >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgTrendColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  const periodoAnterior = period === 'weekly' ? 'semana anterior' : period === 'monthly' ? 'mês anterior' : 'dia anterior';
  
  // Conteúdo padrão do tooltip
  const defaultTooltipContent = (
    <div className="text-center">
      <div className="font-medium mb-1 text-purple-800">Comparação com {periodoAnterior}</div>
      <div className="text-xs text-purple-700">
        {isPositive ? 'Aumentou' : 'Diminuiu'} {Math.abs(variacao).toFixed(1)}%
      </div>
    </div>
  );

  const tooltipToShow = tooltipContent || defaultTooltipContent;

  if (loading) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
            {icone && <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>}
          </div>
          <div className="mt-2">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${className} ${onClick || href ? 'cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{titulo}</p>
          <p className="text-2xl font-bold text-gray-900">{valor}</p>
        </div>
        {icone && (
          <div className={`w-8 h-8 ${cor} rounded-lg flex items-center justify-center`}>
            {icone}
          </div>
        )}
      </div>
      {descricao && (
        <div className="mt-2 flex items-center text-xs">
          <span className={`px-2 py-1 rounded text-xs font-medium ${bgTrendColor} ${trendColor}`}>
            <TrendIcon className="w-3 h-3 inline mr-1" />
            {descricao}
          </span>
        </div>
      )}
    </div>
  );

  const handleClick = () => {
    if (onClick) onClick();
    if (href) window.open(href, '_blank');
  };

  const cardWithInteraction = onClick || href ? (
    <div onClick={handleClick}>
      {cardContent}
    </div>
  ) : cardContent;

  return (
    <div className="relative">
      <div 
        onMouseEnter={() => showTooltip && setTooltipVisible(true)}
        onMouseLeave={() => showTooltip && setTooltipVisible(false)}
      >
        {cardWithInteraction}
      </div>

      {/* Tooltip */}
      {showTooltip && tooltipVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-purple-200 rounded-lg shadow-lg whitespace-nowrap">
          {tooltipToShow}
          {/* Seta do tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-200"></div>
        </div>
      )}
    </div>
  );
};
