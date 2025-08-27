import React from 'react';
import { Plus, Package } from 'lucide-react';

interface ListaProdutosEmptyProps {
  onCreate: () => void;
}

export function ListaProdutosEmpty({ onCreate }: ListaProdutosEmptyProps) {
  return (
    <div className="p-8 text-center">
      <Package size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Nenhum produto encontrado
      </h3>
      <p className="text-gray-500 text-xs">
        Crie uma categoria primeiro e depois adicione seus produtos.
      </p>
    </div>
  );
} 
