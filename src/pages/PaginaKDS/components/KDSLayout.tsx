import React from 'react';
import { KDSContent } from './KDSContent';
import { KDSContentProps } from '../types';

interface KDSLayoutProps extends KDSContentProps {
  loading?: boolean;
}

export function KDSLayout({ maxColumns, pedidos, onDragEnd, loading = false }: KDSLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Conteúdo principal do KDS */}
      <KDSContent 
        maxColumns={maxColumns}
        pedidos={pedidos}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}
