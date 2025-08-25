import React from 'react';
import clsx from 'clsx';
import { FormSwitch } from './forms/FormSwitch';
import { EditIcon, TrashIcon, DragIcon } from './ui';

export function Card({ 
  children, 
  className = '',
  header,
  footer,
  onClick,
  href
}: CardProps) {
  const handleClick = () => {
    if (onClick) onClick();
    if (href) window.open(href, '_blank');
  };

  const cardContent = (
    <div className={clsx('custom-card', className)}>
      {header && (
        <div className="flex items-center justify-between p-0 border-b border-dashboard">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t border-dashboard">
          {footer}
        </div>
      )}
    </div>
  );

  if (onClick || href) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {cardContent}
      </div>
    );
  }

  return cardContent;
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
    <Card className={clsx('cursor-pointer', className)}>
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
    <div className={clsx('bg-white border rounded-lg h-98 p-3 border-dashboard', className)}>
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
              <DragIcon size={24} color="#9ca3af" />
            </div>
          )}
          
          {/* Toggle de Status */}
          <div className="flex items-center gap-2">
            <FormSwitch
              name="status"
              label=""
              checked={ativo}
              onChange={(checked) => {
                handleToggleStatus();
              }}
              className="mb-0"
            />
            {/* ✅ CORREÇÃO: Texto estável que não muda durante toggle */}
            <span className="text-xs text-gray-600 font-medium w-12 text-center">
              {ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* ✅ CORREÇÃO: Foto do produto com layout estável */}
        <div className="flex-shrink-0 w-[70px] h-[70px]">
          <div className="w-full h-full bg-gray-100 rounded-sm overflow-hidden">
            {imagem ? (
              <img 
                src={imagem} 
                alt={nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Sem foto</span>
              </div>
            )}
          </div>
        </div>

        {/* ✅ CORREÇÃO: Informações do produto com layout estável */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
            {nome}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(preco)}
          </p>
        </div>

        {/* ✅ CORREÇÃO: Botões de ação com layout estável */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onEditar}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
            title="Editar produto"
          >
            <EditIcon size={20} />
          </button>
          <button
            onClick={onExcluir}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            title="Excluir produto"
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}