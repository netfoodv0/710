import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Phone, 
  MapPin,
  MoreVertical,
  Filter
} from 'lucide-react';
import { MobileCard } from './MobileCard';
import { MobileButton } from './MobileButton';
import { usePedidos } from '../../hooks/usePedidos';

interface PedidoCardProps {
  pedido: any;
  onStatusChange: (id: string, status: string) => void;
}

function PedidoCard({ pedido, onStatusChange }: PedidoCardProps) {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Preparando':
        return 'bg-blue-100 text-blue-800';
      case 'Pronto':
        return 'bg-green-100 text-green-800';
      case 'Entregue':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente':
        return <Clock className="w-4 h-4" />;
      case 'Preparando':
        return <Clock className="w-4 h-4" />;
      case 'Pronto':
        return <CheckCircle className="w-4 h-4" />;
      case 'Entregue':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(pedido.id, newStatus);
    setShowActions(false);
  };

  return (
    <MobileCard className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">#{pedido.id}</h3>
          <p className="text-sm text-gray-600">{pedido.horario}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(pedido.status)}`}>
            {getStatusIcon(pedido.status)}
            {pedido.status}
          </span>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{pedido.cliente}</span>
        </div>
        {pedido.endereco && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{pedido.endereco}</span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Itens:</h4>
        <div className="space-y-1">
          {pedido.itens?.map((item: any, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.quantidade}x {item.nome}</span>
              <span className="text-gray-600">R$ {item.preco}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="font-semibold text-gray-900">Total:</span>
        <span className="font-bold text-lg text-gray-900">R$ {pedido.valor}</span>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            {pedido.status === 'Pendente' && (
              <>
                <MobileButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusChange('Preparando')}
                >
                  Iniciar Preparo
                </MobileButton>
                <MobileButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('Cancelado')}
                >
                  Cancelar
                </MobileButton>
              </>
            )}
            {pedido.status === 'Preparando' && (
              <MobileButton
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => handleStatusChange('Pronto')}
              >
                Marcar Pronto
              </MobileButton>
            )}
            {pedido.status === 'Pronto' && (
              <MobileButton
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => handleStatusChange('Entregue')}
              >
                Marcar Entregue
              </MobileButton>
            )}
          </div>
        </div>
      )}
    </MobileCard>
  );
}

export function MobilePedidos() {
  const { pedidos, isLoading, updatePedidoStatus } = usePedidos();
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const handleStatusChange = (id: string, status: string) => {
    updatePedidoStatus(id, status);
  };

  const filteredPedidos = filterStatus === 'todos' 
    ? pedidos 
    : pedidos?.filter((pedido: any) => pedido.status === filterStatus);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedidos</h1>
        <p className="text-gray-600">Gerencie os pedidos em tempo real</p>
      </div>

      {/* Filters */}
      <MobileCard>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">Filtrar por status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['todos', 'Pendente', 'Preparando', 'Pronto', 'Entregue', 'Cancelado'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'todos' ? 'Todos' : status}
            </button>
          ))}
        </div>
      </MobileCard>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredPedidos?.map((pedido: any) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onStatusChange={handleStatusChange}
          />
        ))}
        
        {filteredPedidos?.length === 0 && (
          <MobileCard>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600">Não há pedidos com o status selecionado</p>
            </div>
          </MobileCard>
        )}
      </div>
    </div>
  );
} 