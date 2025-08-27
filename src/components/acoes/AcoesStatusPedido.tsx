import React from 'react';
import { Check, X, Clock, Truck } from 'lucide-react';

interface StatusActionsProps {
  status: string;
  onStatusChange: (novoStatus: string) => void;
}

export function StatusActions({ status, onStatusChange }: StatusActionsProps) {
  const getAvailableActions = (currentStatus: string) => {
    switch (currentStatus) {
      case 'novo':
        return [
          { label: 'Confirmar', status: 'confirmado', icon: Check, color: 'text-green-600' },
          { label: 'Cancelar', status: 'cancelado', icon: X, color: 'text-red-600' }
        ];
      case 'confirmado':
        return [
          { label: 'Preparar', status: 'preparando', icon: Clock, color: 'text-orange-600' },
          { label: 'Cancelar', status: 'cancelado', icon: X, color: 'text-red-600' }
        ];
      case 'preparando':
        return [
          { label: 'Enviar', status: 'saiu_entrega', icon: Truck, color: 'text-blue-600' }
        ];
      case 'saiu_entrega':
        return [
          { label: 'Entregar', status: 'entregue', icon: Check, color: 'text-green-600' }
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions(status);

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <button
            key={action.status}
            onClick={() => onStatusChange(action.status)}
            className={`p-1 rounded hover:bg-gray-100 ${action.color}`}
            title={action.label}
          >
            <IconComponent className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
