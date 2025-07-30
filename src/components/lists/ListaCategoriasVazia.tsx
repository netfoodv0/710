import React from 'react';
import { Package, Plus } from 'lucide-react';

interface ListaCategoriasEmptyProps {
  onCreate: () => void;
}

export function ListaCategoriasEmpty({ onCreate }: ListaCategoriasEmptyProps) {
  return (
    <div className="p-8 text-center">
      <Package size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Nenhuma categoria encontrada
      </h3>
      <p className="text-gray-500 mb-6 text-xs">
        Comece criando sua primeira categoria para aparecer aqui.
      </p>
      <button
        onClick={onCreate}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
      >
        <Plus size={14} className="mr-2" />
        Criar Primeira Categoria
      </button>
    </div>
  );
} 