import React from 'react';
import { Pedido } from '../../types';

interface FiltrosStatusProps {
  pedidos: Pedido[];
  statusSelecionado: string;
  onStatusChange: (status: string) => void;
}

export function FiltrosStatus({ pedidos, statusSelecionado, onStatusChange }: FiltrosStatusProps) {
  // Verificação de segurança para evitar erro quando pedidos é undefined
  if (!pedidos || !Array.isArray(pedidos)) {
    return (
      <div className="flex flex-wrap gap-2">
        <div className="text-gray-500">Carregando filtros...</div>
      </div>
    );
  }

  const statusCounts = {
    todos: pedidos.length,
    novo: pedidos.filter(p => p.status === 'novo').length,
    confirmado: pedidos.filter(p => p.status === 'confirmado').length,
    preparando: pedidos.filter(p => p.status === 'preparando').length,
    saiu_entrega: pedidos.filter(p => p.status === 'saiu_entrega').length,
    entregue: pedidos.filter(p => p.status === 'entregue').length,
    cancelado: pedidos.filter(p => p.status === 'cancelado').length
  };

  const statusOptions = [
    { key: 'todos', label: 'Todos', count: statusCounts.todos },
    { key: 'novo', label: 'Novos', count: statusCounts.novo },
    { key: 'confirmado', label: 'Confirmados', count: statusCounts.confirmado },
    { key: 'preparando', label: 'Preparando', count: statusCounts.preparando },
    { key: 'saiu_entrega', label: 'Saiu p/ Entrega', count: statusCounts.saiu_entrega },
    { key: 'entregue', label: 'Entregues', count: statusCounts.entregue },
    { key: 'cancelado', label: 'Cancelados', count: statusCounts.cancelado }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((status) => (
        <button
          key={status.key}
          onClick={() => onStatusChange(status.key)}
          className={`btn text-sm ${
            statusSelecionado === status.key
              ? 'btn-primary'
              : 'btn-secondary'
          }`}
        >
          {status.label} ({status.count})
        </button>
      ))}
    </div>
  );
}