import React, { useMemo } from 'react';
import { useTableFilterOptimized } from '../../hooks';

interface ExampleData {
  id: number;
  name: string;
  category: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  value: number;
  createdAt: string;
  updatedAt: string;
}

const exampleData: ExampleData[] = [
  { id: 1, name: 'Item A', category: 'Categoria 1', status: 'Ativo', value: 100, createdAt: '2024-01-01', updatedAt: '2024-01-15' },
  { id: 2, name: 'Item B', category: 'Categoria 2', status: 'Inativo', value: 200, createdAt: '2024-01-02', updatedAt: '2024-01-10' },
  { id: 3, name: 'Item C', category: 'Categoria 1', status: 'Ativo', value: 150, createdAt: '2024-01-03', updatedAt: '2024-01-20' },
  { id: 4, name: 'Item D', category: 'Categoria 3', status: 'Pendente', value: 300, createdAt: '2024-01-04', updatedAt: '2024-01-12' },
  { id: 5, name: 'Item E', category: 'Categoria 2', status: 'Ativo', value: 250, createdAt: '2024-01-05', updatedAt: '2024-01-18' },
];

export const OptimizedTableExample: React.FC = () => {
  // Usar hook otimizado para filtros e paginação
  const {
    paginatedData,
    filterOptions,
    filters,
    searchTerm,
    filterStats,
    paginationInfo,
    updateFilter,
    setSearchTerm,
    clearFilters,
    goToPage,
    nextPage,
    prevPage
  } = useTableFilterOptimized({
    data: exampleData,
    filterFields: ['category', 'status'],
    searchFields: ['name'],
    initialFilters: {}
  });

  // Memoizar colunas para evitar recriação
  const columns = useMemo(() => [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'category', label: 'Categoria', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'value', label: 'Valor', sortable: true }
  ], []);

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={filters.category?.[0] || ''}
            onChange={(e) => updateFilter('category', e.target.value ? [e.target.value] : [])}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Todas</option>
            {filterOptions.category?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status?.[0] || ''}
            onChange={(e) => updateFilter('status', e.target.value ? [e.target.value] : [])}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Todos</option>
            {filterOptions.status?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Estatísticas */}
      <div className="text-sm text-gray-600">
        Mostrando {filterStats.filteredItems} de {filterStats.totalItems} itens
        {filterStats.activeFilters > 0 && ` (${filterStats.activeFilters} filtros ativos)`}
      </div>

      {/* Tabela */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                    item.status === 'Inativo' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {item.value.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {paginationInfo.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Página {paginationInfo.currentPage} de {paginationInfo.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={!paginationInfo.hasPrevPage}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              onClick={nextPage}
              disabled={!paginationInfo.hasNextPage}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
