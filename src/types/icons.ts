import React from 'react';
import { 
  Truck, 
  Utensils, 
  ShoppingBag, 
  TrendingUp, 
  FileText, 
  ClipboardList, 
  Users, 
  DollarSign, 
  Ticket, 
  Calendar, 
  RefreshCw 
} from 'lucide-react';

// Mapeamento de tipos de ícones para o dashboard
export type DashboardIconType = 
  | 'truck' 
  | 'utensils' 
  | 'shopping-bag'
  | 'trending-up'
  | 'report'
  | 'orders'
  | 'users'
  | 'revenue'
  | 'ticket'
  | 'calendar'
  | 'bag'
  | 'refresh';

// Mapeamento de ícones para componentes Lucide
export const IconMap = {
  'truck': Truck,
  'utensils': Utensils,
  'shopping-bag': ShoppingBag,
  'trending-up': TrendingUp,
  'report': FileText,
  'orders': ClipboardList,
  'users': Users,
  'revenue': DollarSign,
  'ticket': Ticket,
  'calendar': Calendar,
  'bag': ShoppingBag,
  'refresh': RefreshCw
} as const;

// Função para obter ícone por tipo
export const getIcon = (type: DashboardIconType) => {
  return IconMap[type];
};

// Função para renderizar ícone com props
export const renderIcon = (
  type: DashboardIconType, 
  iconProps: { size?: number; color?: string; className?: string } = {}
): React.ReactElement => {
  const IconComponent = getIcon(type);
  const iconSize = iconProps.size || 24;
  const iconColor = iconProps.color || 'currentColor';
  const iconClassName = iconProps.className || '';
  
  return React.createElement(IconComponent, {
    size: iconSize,
    color: iconColor,
    className: iconClassName
  });
};

// Tipos específicos para diferentes contextos
export type FormaPedidaIconType = 'truck' | 'utensils' | 'shopping-bag';
export type ProdutoIconType = 'trending-up';
export type PedidoIconType = 'orders';
export type EstatisticaIconType = 'users' | 'revenue' | 'ticket' | 'calendar' | 'bag';

// Hook para uso de ícones
export const useIcons = () => {
  return {
    getIcon,
    renderIcon,
    IconMap
  };
};
