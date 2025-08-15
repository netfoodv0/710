import React from 'react';
import clsx from 'clsx';
import { CardProps } from '../types';
import { GripVertical } from 'lucide-react';

export function Card({ title, children, className, actions, noPadding = false }: CardProps) {
  return (
    <div className={clsx('card', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between p-0 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={noPadding ? 'p-0' : 'p-0'}>
        {children}
      </div>
    </div>
  );
}

// Variações específicas do Card
export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  className 
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}) {
  const trendColors = {
    up: 'text-purple-600',
    down: 'text-gray-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className={clsx('p-0', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={clsx('flex items-center gap-1 mt-2', trendColors[trend])}>
              <span className="text-sm font-medium">{trendValue}</span>
              <span className="text-xs">vs. período anterior</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function QuickActionCard({ 
  title, 
  description, 
  icon, 
  onClick, 
  className 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Card className={clsx('cursor-pointer hover:shadow-md transition-shadow', className)}>
      <button 
        onClick={onClick}
        className="w-full p-0 text-left"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </button>
    </Card>
  );
}

// Novo componente ProductCard com altura fixa de 98px
export function ProductCard({ 
  nome, 
  preco, 
  imagem, 
  status, 
  onToggleStatus, 
  onEditar, 
  onExcluir,
  dragHandleProps,
  className 
}: {
  nome: string;
  preco: number;
  imagem?: string;
  status: 'ativo' | 'inativo' | 'em_falta';
  onToggleStatus: (status: 'ativo' | 'inativo' | 'em_falta') => void;
  onEditar: () => void;
  onExcluir: () => void;
  dragHandleProps?: {
    attributes: any;
    listeners: any;
  };
  className?: string;
}) {
  // Mapear status para boolean ativo
  const ativo = status === 'ativo';
  
  const handleToggleStatus = () => {
    const novoStatus = ativo ? 'inativo' : 'ativo';
    onToggleStatus(novoStatus);
  };

  return (
    <Card className={clsx('h-[98px] p-3', className)}>
      <div className="flex items-center gap-3 h-full">
        {/* Toggle de Status e Ícone de Arrastar - Mesma linha */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Ícone de arrastar */}
          {dragHandleProps && (
            <div 
              {...dragHandleProps.attributes} 
              {...dragHandleProps.listeners}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          
          {/* Toggle de Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStatus}
              className={clsx(
                'relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                ativo ? 'bg-red-500' : 'bg-gray-300'
              )}
              title={ativo ? 'Desativar produto' : 'Ativar produto'}
            >
              <span
                className={clsx(
                  'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
                  ativo ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
            <span className="text-xs text-gray-600 font-medium">
              {ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* Foto do produto 70x70 - Mais compacta */}
        <div className="flex-shrink-0">
          <div className="w-[70px] h-[70px] bg-gray-100 rounded-lg overflow-hidden">
            {imagem ? (
              <img 
                src={imagem} 
                alt={nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Informações do produto - Centralizadas verticalmente */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-medium text-gray-900 truncate text-sm mb-1">{nome}</h3>
          <p className="text-sm text-gray-600 font-semibold">R$ {preco.toFixed(2)}</p>
          {status === 'em_falta' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
              Em falta
            </span>
          )}
        </div>

        {/* Ações - Centralizadas verticalmente */}
        <div className="flex flex-col items-center justify-center gap-1 flex-shrink-0">
          {/* Ícone editar */}
          <button
            onClick={onEditar}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Editar produto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Ícone excluir */}
          <button
            onClick={onExcluir}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Excluir produto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}