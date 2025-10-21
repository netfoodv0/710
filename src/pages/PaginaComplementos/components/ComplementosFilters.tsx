import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ComplementoFilters, CategoriaComplemento } from '../types';

interface ComplementosFiltersProps {
  filtros?: ComplementoFilters;
  categorias?: CategoriaComplemento[];
  onFiltrosChange?: (filtros: ComplementoFilters) => void;
}

export function ComplementosFilters({ 
  filtros = {}, 
  categorias = [], 
  onFiltrosChange 
}: ComplementosFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange?.({
      ...filtros,
      busca: e.target.value
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange?.({
      ...filtros,
      categoria: e.target.value || undefined
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange?.({
      ...filtros,
      status: e.target.value as 'ativo' | 'inativo' || undefined
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange?.({
      ...filtros,
      tipo: e.target.value as 'obrigatorio' | 'opcional' || undefined
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar complementos..."
            value={filtros.busca || ''}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Categoria */}
        <select
          value={filtros.categoria || ''}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Todas as Categorias</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filtros.status || ''}
          onChange={handleStatusChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        {/* Tipo */}
        <select
          value={filtros.tipo || ''}
          onChange={handleTypeChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Todos os Tipos</option>
          <option value="obrigatorio">Obrigatório</option>
          <option value="opcional">Opcional</option>
        </select>
      </div>
    </div>
  );
}









