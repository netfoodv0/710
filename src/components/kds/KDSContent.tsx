import React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { KDSGrid } from './KDSGrid';
import { PedidoComColuna } from '../../data/mockPedidos';

interface KDSContentProps {
  maxColumns: number;
  pedidos: PedidoComColuna[];
  onDragEnd: (event: DragEndEvent) => void;
}

export function KDSContent({ maxColumns, pedidos, onDragEnd }: KDSContentProps) {
  return (
    <div className="flex-1 px-6 pt-6 overflow-y-auto overflow-x-hidden">
      <KDSGrid 
        maxColumns={maxColumns}
        pedidos={pedidos}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}
