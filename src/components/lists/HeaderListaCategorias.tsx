import React from 'react';
import { Plus } from 'lucide-react';

interface ListaCategoriasHeaderProps {
  title: string;
  onCreate: () => void;
}

export function ListaCategoriasHeader({ title, onCreate }: ListaCategoriasHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1 text-xs">
          Gerencie todas as categorias do seu cardápio
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
      >
        <Plus size={14} className="mr-2" />
        Nova Categoria
      </button>
    </div>
  );
} 