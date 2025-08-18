import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Pedido } from '../../types';

interface PedidosRecentesProps {
  pedidos: Pedido[];
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'novo':
      return 'bg-blue-100 text-blue-800';
    case 'preparando':
      return 'bg-yellow-100 text-yellow-800';
    case 'pronto':
      return 'bg-green-100 text-green-800';
    case 'entregue':
      return 'bg-gray-100 text-gray-800';
    case 'cancelado':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'novo':
      return 'Novo';
    case 'preparando':
      return 'Preparando';
    case 'pronto':
      return 'Pronto';
    case 'entregue':
      return 'Entregue';
    case 'cancelado':
      return 'Cancelado';
    default:
      return status;
  }
};

export const PedidosRecentes: React.FC<PedidosRecentesProps> = ({
  pedidos,
  className = ''
}) => {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className={`bg-white border rounded-lg p-4 ${className}`} style={{ borderColor: '#cfd1d3' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos Recentes</h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Nenhum pedido recente
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-4 ${className}`} style={{ borderColor: '#cfd1d3' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos Recentes</h3>
      
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex flex-col justify-between" style={{ borderColor: '#cfd1d3', height: '99px' }}>
            {/* Cabeçalho com número, status e valor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 text-sm">{pedido.numero}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                  {getStatusText(pedido.status)}
                </span>
              </div>
              <span className="text-base font-bold text-gray-900">
                {pedido.total.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </span>
            </div>
            
            {/* Informações do cliente distribuídas horizontalmente */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{pedido.cliente}</span>
              <span className="text-sm text-gray-500">{pedido.horario}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};