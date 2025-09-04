import React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { KDSGrid } from './KDSGrid';
import { KDSContentProps } from '../types';

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
