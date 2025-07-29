import React, { useCallback, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FiltrosCardapioState } from '../../hooks/useFiltrosCardapio';

interface FiltrosCardapioProps {
  filtros: FiltrosCardapioState;
  onFiltrosChange: (filtros: FiltrosCardapioState) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categorias: string[];
}

export const FiltrosCardapio = React.memo(function FiltrosCardapio({ 
  filtros, 
  onFiltrosChange, 
  searchTerm, 
  onSearchChange,
  categorias
}: FiltrosCardapioProps) {
  
  const handleFiltroChange = useCallback((campo: string, valor: string) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    });
  }, [filtros, onFiltrosChange]);

  const limparFiltros = useCallback(() => {
    onFiltrosChange({
      categoria: 'todos',
      status: 'todos',
      disponibilidade: 'todos'
    });
    onSearchChange('');
  }, [onFiltrosChange, onSearchChange]);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.categoria !== 'todos' ||
           filtros.status !== 'todos' ||
           filtros.disponibilidade !== 'todos' ||
           searchTerm !== '';
  }, [filtros, searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  return (
    <div className="bg-white border border-slate-200 rounded p-4">
      <div className="space-y-4">
        {/* Cabeçalho dos filtros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Filtros</h3>
          </div>
          
          {temFiltrosAtivos && (
            <button
              onClick={limparFiltros}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-3 h-3" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Filtros em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Filtro por Categoria */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={filtros.categoria}
              onChange={(e) => handleFiltroChange('categoria', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="todos">Todas as Categorias</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filtros.status}
              onChange={(e) => handleFiltroChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="em_falta">Em Falta</option>
            </select>
          </div>

          {/* Filtro por Disponibilidade */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Disponibilidade
            </label>
            <select
              value={filtros.disponibilidade}
              onChange={(e) => handleFiltroChange('disponibilidade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="disponivel">Disponível</option>
              <option value="indisponivel">Indisponível</option>
            </select>
          </div>
        </div>

        {/* Barra de pesquisa principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição, categoria..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-8 pr-4 h-9 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        {/* Indicador de filtros ativos */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filtros.categoria !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Categoria: {filtros.categoria}
              </span>
            )}
            {filtros.status !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Status: {filtros.status === 'ativo' ? 'Ativo' : filtros.status === 'inativo' ? 'Inativo' : 'Em Falta'}
              </span>
            )}

            {filtros.disponibilidade !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Disponibilidade: {filtros.disponibilidade === 'disponivel' ? 'Disponível' : 'Indisponível'}
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Busca: {searchTerm}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}); 