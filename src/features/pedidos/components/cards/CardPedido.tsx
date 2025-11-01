import React from 'react';
import { 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Eye, 
  Printer, 
  MessageCircle,
  CreditCard,
  Calendar
} from 'lucide-react';
import { EditIcon } from '../../../../components/ui';
import { Pedido } from '../../../types';
import { AcoesStatusPedido } from '../../../../components/cards/AcoesStatusPedido';
import { formatarEndereco } from '../../../../utils/pedidoUtils';

interface CardPedidoProps {
  pedido: Pedido;
  onPedidoClick?: (pedido: Pedido) => void;
  onEditarPedido?: (pedido: Pedido) => void;
  onImprimirPedido?: (pedido: Pedido) => void;
  onAceitarPedido?: (pedido: Pedido) => void;
  onAvançarPedido?: (pedido: Pedido) => void;
  onFinalizarPedido?: (pedido: Pedido) => void;
  onCancelarPedido?: (pedido: Pedido) => void;
  variant?: 'default' | 'compact';
  loading?: boolean;
}

export function CardPedido({ 
  pedido, 
  onPedidoClick, 
  onEditarPedido,
  onImprimirPedido,
  onAceitarPedido,
  onAvançarPedido,
  onFinalizarPedido,
  onCancelarPedido,
  variant = 'default',
  loading = false
}: CardPedidoProps) {
  const handleClick = () => {
    if (onPedidoClick) {
      onPedidoClick(pedido);
    }
  };

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


  const handleAceitar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAceitarPedido) {
      onAceitarPedido(pedido);
    }
  };

  const handleAvançar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAvançarPedido) {
      onAvançarPedido(pedido);
    }
  };

  const handleFinalizar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFinalizarPedido) {
      onFinalizarPedido(pedido);
    }
  };

  const handleCancelar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancelarPedido) {
      onCancelarPedido(pedido);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'confirmado':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'preparando':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'entregue':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelado':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'novo':
        return 'Novo';
      case 'confirmado':
        return 'Confirmado';
      case 'preparando':
        return 'Preparando';
      case 'saiu_entrega':
        return 'Saiu p/ Entrega';
      case 'entregue':
        return 'Entregue';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarHora = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  if (variant === 'compact') {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">
            {pedido.numero}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(pedido.status)}`}>
            {getStatusText(pedido.status)}
          </span>
        </div>
        
        <div className="flex items-center gap-1 mb-1">
          <User className="w-3 h-3 text-gray-400" />
          <span className="text-sm text-gray-900">{pedido.cliente?.nome || 'Cliente não informado'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            {formatarMoeda(pedido.total)}
          </span>
          <span className="text-xs text-gray-500">
            {formatarHora(pedido.dataHora)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
      onClick={handleClick}
    >
      {/* Cabeçalho do card */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {pedido.numero}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(pedido.status)}`}>
            {getStatusText(pedido.status)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleEditar}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Editar pedido"
          >
            <EditIcon size={16} color="#6b7280" />
          </button>
          <button 
            onClick={handleImprimir}
            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            title="Imprimir pedido"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Informações do cliente */}
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

      {/* Informações do pedido */}
      <div className="mb-3 space-y-2">
        {/* Forma de pagamento */}
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-600">
            {pedido.formaPagamento}
          </span>
        </div>
      </div>

      {/* Itens do pedido */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Itens do Pedido
          </span>
          <span className="text-xs text-gray-500">
            {pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}
          </span>
        </div>
        <div className="space-y-1">
          {pedido.itens.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {item.quantidade}x {item.nome}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatarMoeda(item.preco)}
              </span>
            </div>
          ))}
          {pedido.itens.length > 3 && (
            <div className="text-xs text-gray-500">
              +{pedido.itens.length - 3} itens adicionais
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-100 pt-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total:</span>
          <span className="text-lg font-bold text-gray-900">
            {formatarMoeda(pedido.total)}
          </span>
        </div>
      </div>

      {/* Tempo estimado */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Tempo estimado:</span>
          <span className="text-sm font-medium text-gray-900">
            {pedido.tempoEstimado}
          </span>
        </div>
      </div>

      {/* Horário do pedido */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            Pedido realizado às {formatarHora(pedido.dataHora)}
          </span>
        </div>
      </div>

      {/* Botões de ação do status */}
      <AcoesStatusPedido
        status={pedido.status}
        onAceitar={handleAceitar}
        onAvançar={handleAvançar}
        onFinalizar={handleFinalizar}
        onCancelar={handleCancelar}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
} 
