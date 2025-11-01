import React from 'react';
import { ComplementosHeader } from './ComplementosHeader';
import { ComplementosContent } from './ComplementosContent';
import { ComplementosModals } from './ComplementosModals';

export function ComplementosLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <ComplementosHeader />
      
      {/* Conteúdo Principal */}
      <div className="pt-6 px-6">
        <ComplementosContent />
      </div>
      
      {/* Modais */}
      <ComplementosModals />
    </div>
  );
}
















