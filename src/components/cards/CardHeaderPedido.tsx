import React from 'react';
import { Edit, Printer, MessageCircle, Eye } from 'lucide-react';
import { Pedido } from '../../../types';
import { StatusBadge } from '../../StatusBadge';

interface CardPedidoHeaderProps {
  pedido: Pedido;
  onEditarPedido?: (pedido: Pedido) => void;
  onImprimirPedido?: (pedido: Pedido) => void;
}

export function CardPedidoHeader({ 
  pedido, 
  onEditarPedido,
  onImprimirPedido 
}: CardPedidoHeaderProps) {
  const handleEditar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditarPedido) {
      onEditarPedido(pedido);
    }
  };

  const handleImprimir = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onImprimirPedido) {
      onImprimirPedido(pedido);
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pedido.cliente?.telefone) {
      const numeroLimpo = pedido.cliente.telefone.replace(/\D/g, '');
      const link = `https://wa.me/55${numeroLimpo}`;
      window.open(link, '_blank');
    }
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">
          {pedido.numero}
        </span>
        <StatusBadge status={pedido.status} />
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={handleEditar}
          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          title="Editar pedido"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={handleImprimir}
          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
          title="Imprimir pedido"
        >
          <Printer className="w-4 h-4" />
        </button>
        {pedido.cliente?.telefone && (
          <button 
            onClick={handleWhatsApp}
            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            title="Chamar no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        )}
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 