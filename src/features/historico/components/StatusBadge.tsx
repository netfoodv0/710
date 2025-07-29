import React from 'react';
import { CheckCircle, XCircle, Clock, Truck, AlertCircle } from 'lucide-react';
import { StatusPedido } from '../../types';

interface StatusBadgeProps {
  status: StatusPedido;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusPedido) => {
    switch (status) {
      case 'entregue':
        return {
          label: 'Entregue',
          icon: CheckCircle,
          textColor: 'text-green-600',
          iconColor: 'text-green-500'
        };
      case 'cancelado':
        return {
          label: 'Cancelado',
          icon: XCircle,
          textColor: 'text-red-600',
          iconColor: 'text-red-500'
        };
      case 'novo':
        return {
          label: 'Novo',
          icon: AlertCircle,
          textColor: 'text-orange-600',
          iconColor: 'text-orange-500'
        };
      case 'preparando':
        return {
          label: 'Preparando',
          icon: Clock,
          textColor: 'text-purple-600',
          iconColor: 'text-purple-500'
        };
      case 'saiu_entrega':
        return {
          label: 'Em Entrega',
          icon: Truck,
          textColor: 'text-blue-600',
          iconColor: 'text-blue-500'
        };
      default:
        return {
          label: 'Confirmado',
          icon: CheckCircle,
          textColor: 'text-gray-600',
          iconColor: 'text-gray-500'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 font-medium ${config.textColor} ${sizeClasses[size]}`}>
      <Icon className={`${config.iconColor} ${iconSizes[size]}`} />
      <span>{config.label}</span>
    </div>
  );
} 