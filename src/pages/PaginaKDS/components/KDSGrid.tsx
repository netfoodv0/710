import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DroppableColumn } from '../../../components/columns/DroppableColumn';
import { CardKDS } from '../../../components/cards/CardKDS';
import { KDSGridProps } from '../types';

export function KDSGrid({ maxColumns, pedidos, onDragEnd }: KDSGridProps) {
  return (
    <DndContext 
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="grid gap-4 lg:gap-6 mx-auto" style={{ 
        gridTemplateColumns: `repeat(${maxColumns}, 240px)`,
        justifyContent: 'center',
        maxWidth: 'fit-content'
      }}>
        {Array.from({ length: maxColumns }, (_, index) => {
          const colunaId = `coluna-${index + 1}`;
          const pedidosNaColuna = pedidos.filter(p => p.coluna === colunaId);
          
          return (
            <DroppableColumn key={colunaId} id={colunaId} className="p-2">
              <SortableContext 
                items={pedidosNaColuna.map(p => `pedido-${p.id}`)}
                strategy={verticalListSortingStrategy}
              >
                {pedidosNaColuna.map((pedido, pedidoIndex) => (
                  <div key={pedido.id} className="mb-4" style={{ order: pedidoIndex }}>
                    <CardKDS 
                      pedido={pedido} 
                      variant="compact" 
                    />
                  </div>
                ))}
              </SortableContext>
            </DroppableColumn>
          );
        })}
      </div>
    </DndContext>
  );
}
