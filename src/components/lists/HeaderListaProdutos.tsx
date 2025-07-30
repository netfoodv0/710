import React from 'react';
import { Plus } from 'lucide-react';

interface ListaProdutosHeaderProps {
  onCreate: () => void;
}

export function ListaProdutosHeader({ onCreate }: ListaProdutosHeaderProps) {
  return (
    <div className="bg-white rounded border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Produtos</h2>
        <button
          onClick={onCreate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Novo Produto
        </button>
      </div>
    </div>
  );
} 