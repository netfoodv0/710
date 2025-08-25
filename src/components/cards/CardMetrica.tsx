import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CardMetricaProps } from '../../types';
import { OrderIcon } from '../ui';

const iconMap: Record<string, React.ComponentType<any>> = {
  DollarSign: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>,
  TrendingUp: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  ShoppingBag: () => <OrderIcon size={24} color="#6b7280" />,
  Users: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>,
  Calendar: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Clock: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Truck: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM21 13V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6m18 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m18 0h-2M3 13h2m13-8h2a2 2 0 012 2v2M6 5H4a2 2 0 00-2 2v2" /></svg>,
  Star: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
};

const colorMap: Record<string, string> = {
  green: 'bg-green-50 text-green-600 border-green-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  red: 'bg-red-50 text-red-600 border-red-200',
};

export const CardMetrica: React.FC<CardMetricaProps> = ({ 
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
      <div className={`bg-white border rounded-lg p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div className={`bg-white border rounded-lg p-4 ${className} ${onClick || href ? 'cursor-pointer' : ''} card-padding-16 border-dashboard`}>
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