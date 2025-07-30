import React from 'react';
import { Categoria, CategoriaAdicional } from '../../types';
import { ListaCategoriasRow } from './LinhaCategoria';

interface ListaCategoriasTableProps {
  categorias: (Categoria | CategoriaAdicional)[];
  tipo: 'produtos' | 'adicionais';
  onEdit: (categoria: Categoria | CategoriaAdicional) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (categoria: Categoria | CategoriaAdicional) => void;
  onDelete: (id: string) => void;
}

export function ListaCategoriasTable({ 
  categorias, 
  tipo, 
  onEdit, 
  onDuplicate, 
  onToggleStatus, 
  onDelete 
}: ListaCategoriasTableProps) {
  return (
    <div className="overflow-x-auto overflow-y-visible relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Disponibilidade
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
          {categorias.map((categoria) => (
            <ListaCategoriasRow
              key={categoria.id}
              categoria={categoria}
              tipo={tipo}
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