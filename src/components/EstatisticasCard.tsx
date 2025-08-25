import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface EstatisticasCardProps {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
  variacao?: number;
  cor?: string;
  descricao?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const EstatisticasCard: React.FC<EstatisticasCardProps> = ({ 
  titulo, 
  valor, 
  variacao, 
  icone, 
  cor = 'bg-blue-100',
  descricao,
  onClick,
  href,
  className = ''
}) => {
  const isPositive = variacao >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgTrendColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  if (!titulo || valor === undefined) {
    return (
      <div className={`bg-white border rounded-lg p-4 relative ${className} border-dashboard card-height-71`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div className={`bg-white border rounded-lg p-4 relative ${className} border-dashboard card-height-71`}>
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

  return cardWithInteraction;
};
