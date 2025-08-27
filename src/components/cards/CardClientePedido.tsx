import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';
import { Pedido } from '../../../types';
import { formatarEndereco } from '../../utils/pedidoUtils';

interface CardPedidoClienteProps {
  pedido: Pedido;
}

export function CardPedidoCliente({ pedido }: CardPedidoClienteProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <User className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-900">
          {pedido.cliente?.nome || 'Cliente não informado'}
        </span>
      </div>
      {pedido.cliente?.telefone && (
        <div className="flex items-center gap-2 mb-1">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {pedido.cliente.telefone}
          </span>
        </div>
      )}
      {pedido.cliente?.endereco && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {formatarEndereco(pedido.cliente.endereco)}
          </span>
        </div>
      )}
    </div>
  );
} 
