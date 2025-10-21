import React from 'react';

export function CuponsLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando relatório de cupons...</p>
      </div>
    </div>
  );
}


