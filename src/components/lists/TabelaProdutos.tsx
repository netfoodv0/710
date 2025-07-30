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
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criado em
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
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