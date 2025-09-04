import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';

export const ProductSearch: React.FC = () => {
  const { searchTerm, updateSearchTerm, clearFilters } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = () => {
    updateSearchTerm(localSearchTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    updateSearchTerm('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2 relative">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Buscar produtos..."
          className="w-48 pl-8 pr-8 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        {localSearchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>
      
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`p-1.5 rounded-lg transition-colors ${
          showFilters ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Filter size={14} />
      </button>
      
      <button
        onClick={handleSearch}
        className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
      >
        Buscar
      </button>

      {/* Filtros Avançados */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-3 z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Filtros Avançados</h4>
            <button
              onClick={clearFilters}
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Limpar Filtros
            </button>
          </div>

          <div className="text-xs text-gray-600">
            Filtros avançados serão implementados em breve...
          </div>
        </div>
      )}
    </div>
  );
};
