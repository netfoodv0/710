import React from 'react';
import { StatusPedido } from './pedidos';

// Tipos para componentes UI
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface StatusBadgeProps {
  status: StatusPedido | 'ativo' | 'inativo' | 'em_falta' | string;
  size?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  noPadding?: boolean;
} 