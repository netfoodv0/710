import React from 'react';
import clsx from 'clsx';
import { 
  Clock, 
  CheckCircle, 
  ChefHat, 
  Truck, 
  Package, 
  XCircle
} from 'lucide-react';
import { StatusBadgeProps, StatusPedido } from '../types';

const statusConfig: Record<StatusPedido, {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = {
  novo: {
    label: 'Novo',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100 border-purple-200',
    icon: Clock
  },
  confirmado: {
    label: 'Confirmado',
    color: 'text-gray-800',
    bgColor: 'bg-gray-100 border-gray-200',
    icon: CheckCircle
  },
  preparando: {
    label: 'Preparando',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100 border-purple-200',
    icon: ChefHat
  },
  saiu_entrega: {
    label: 'Saiu p/ Entrega',
    color: 'text-purple-800',
    bgColor: 'bg-purple-100 border-purple-200',
    icon: Truck
  },
  entregue: {
    label: 'Entregue',
    color: 'text-gray-800',
    bgColor: 'bg-gray-100 border-gray-200',
    icon: CheckCircle
  },
  cancelado: {
    label: 'Cancelado',
    color: 'text-gray-800',
    bgColor: 'bg-gray-100 border-gray-200',
    icon: XCircle
  }
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-6 h-6',
    lg: 'w-6 h-6'
  };

  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 font-medium rounded-full border',
      config.color,
      config.bgColor,
      sizeClasses[size]
    )}>
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

// Componente para mostrar progresso do pedido
export function StatusProgress({ currentStatus }: { currentStatus: StatusPedido }) {
  const steps: StatusPedido[] = [
    'novo',
    'confirmado', 
    'preparando',
    'saiu_entrega',
    'entregue'
  ];

  const currentIndex = steps.indexOf(currentStatus);
  const isCanceled = currentStatus === 'cancelado';

  if (isCanceled) {
    return (
      <div className="flex items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <XCircle className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-800">Pedido Cancelado</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Progresso do Pedido</span>
        <span>{Math.round(((currentIndex + 1) / steps.length) * 100)}%</span>
      </div>
      
      <div className="flex items-center">
        {steps.map((step, index) => {
          const config = statusConfig[step];
          const Icon = config.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors',
                  isCompleted 
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : isCurrent
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={clsx(
                  'text-xs mt-1 text-center max-w-[60px]',
                  isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                )}>
                  {config.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={clsx(
                  'flex-1 h-0.5 mx-2 transition-colors',
                  index < currentIndex ? 'bg-purple-500' : 'bg-gray-200'
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Botões de ação para mudança de status
export function StatusActions({ 
  currentStatus, 
  onStatusChange 
}: { 
  currentStatus: StatusPedido;
  onStatusChange: (newStatus: StatusPedido) => void;
}) {
  const getNextStatus = (status: StatusPedido): StatusPedido | null => {
    const transitions: Record<StatusPedido, StatusPedido | null> = {
      novo: 'confirmado',
      confirmado: 'preparando',
      preparando: 'saiu_entrega',
      saiu_entrega: 'entregue',
      entregue: null,
      cancelado: null
    };
    return transitions[status];
  };

  const nextStatus = getNextStatus(currentStatus);
  const canCancel = !['entregue', 'cancelado'].includes(currentStatus);

  if (currentStatus === 'entregue' || currentStatus === 'cancelado') {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {nextStatus && (
        <button
          onClick={() => onStatusChange(nextStatus)}
          className="btn btn-primary"
        >
          {statusConfig[nextStatus].label}
        </button>
      )}
      
      {canCancel && (
        <button
          onClick={() => onStatusChange('cancelado')}
          className="btn btn-secondary"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
