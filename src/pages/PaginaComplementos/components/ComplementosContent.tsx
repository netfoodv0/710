import React from 'react';
import { ComplementosStats } from './ComplementosStats';
import { ComplementosList } from './ComplementosList';
import { ComplementosFilters } from './ComplementosFilters';

export function ComplementosContent() {
  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <ComplementosStats />
      
      {/* Filtros */}
      <ComplementosFilters />
      
      {/* Lista de Complementos */}
      <ComplementosList />
    </div>
  );
}
















