import React from 'react';
import { Package, Plus as PlusIcon, Clock } from 'lucide-react';
import { Categoria, CategoriaAdicional } from '../../types';

interface ListaCategoriasStatsProps {
  categorias: (Categoria | CategoriaAdicional)[];
}

export function ListaCategoriasStats({ categorias }: ListaCategoriasStatsProps) {
  const ativas = categorias.filter(c => c.status === 'ativo').length;
  const total = categorias.length;
  const emFalta = categorias.filter(c => c.status === 'em_falta').length;
  const inativas = categorias.filter(c => c.status === 'inativo').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded border">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded">
            <Package size={16} className="text-green-600" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-gray-600">Ativas</p>
            <p className="text-lg font-semibold text-gray-900">{ativas}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded">
            <PlusIcon size={16} className="text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-gray-600">Total</p>
            <p className="text-lg font-semibold text-gray-900">{total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded">
            <Clock size={16} className="text-red-600" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-gray-600">Em Falta</p>
            <p className="text-lg font-semibold text-gray-900">{emFalta}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded">
            <Package size={16} className="text-gray-600" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-gray-600">Inativas</p>
            <p className="text-lg font-semibold text-gray-900">{inativas}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 