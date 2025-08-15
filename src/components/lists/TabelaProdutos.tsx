import React from 'react';
import { Produto } from '../../types/produtos';
import { ListaProdutosRow } from './LinhaProduto';

interface ListaProdutosTableProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (produto: Produto) => void;
  onDelete: (id: string) => void;
}

export function ListaProdutosTable({
  produtos,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete
}: ListaProdutosTableProps) {
  return (
    <div className="overflow-x-auto overflow-y-visible relative">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {produtos.map((produto) => (
            <ListaProdutosRow
              key={produto.id}
              produto={produto}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
} 