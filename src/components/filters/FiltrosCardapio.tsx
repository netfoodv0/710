import React, { useCallback, useMemo } from 'react';
import { Search, Filter, X, Tag, CheckCircle } from 'lucide-react';
import { ClockIcon } from '../ui';
import { FiltrosCardapioState } from '../../hooks/useFiltrosCardapio';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';

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

  // Opções para os dropdowns
  const categoriaOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todas as Categorias' },
    ...categorias.map(categoria => ({ value: categoria, label: categoria }))
  ];

  const statusOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos os Status' },
    { value: 'ativo', label: 'Ativo', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { value: 'inativo', label: 'Inativo', icon: <ClockIcon size={24} color="#6b7280" /> },
    { value: 'em_falta', label: 'Em Falta', icon: <ClockIcon size={24} color="#f97316" /> }
  ];

  const disponibilidadeOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'disponivel', label: 'Disponível', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { value: 'indisponivel', label: 'Indisponível', icon: <ClockIcon size={24} color="#ef4444" /> }
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4">
      <div className="space-y-4">
        {/* Cabeçalho dos filtros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Filtros do Cardápio</h3>
          </div>
        </div>

        {/* Filtros em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Filtro por Categoria */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <CustomDropdown
              options={categoriaOptions}
              selectedValue={filtros.categoria}
              onValueChange={(value) => handleFiltroChange('categoria', value)}
              triggerIcon={<Tag className="w-4 h-4 text-gray-500" />}
              size="sm"
            />
          </div>

          {/* Filtro por Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <CustomDropdown
              options={statusOptions}
              selectedValue={filtros.status}
              onValueChange={(value) => handleFiltroChange('status', value)}
              size="sm"
            />
          </div>

          {/* Filtro por Disponibilidade */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Disponibilidade
            </label>
            <CustomDropdown
              options={disponibilidadeOptions}
              selectedValue={filtros.disponibilidade}
              onValueChange={(value) => handleFiltroChange('disponibilidade', value)}
              size="sm"
            />
          </div>
        </div>

        {/* Barra de pesquisa principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição, categoria..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 h-9 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Indicador de filtros ativos */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filtros.categoria !== 'todos' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Categoria: {filtros.categoria}
                <button
                  onClick={() => handleFiltroChange('categoria', 'todos')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </span>
            )}
            {filtros.status !== 'todos' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Status: {filtros.status === 'ativo' ? 'Ativo' : filtros.status === 'inativo' ? 'Inativo' : 'Em Falta'}
                <button
                  onClick={() => handleFiltroChange('status', 'todos')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </span>
            )}

            {filtros.disponibilidade !== 'todos' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Disponibilidade: {filtros.disponibilidade === 'disponivel' ? 'Disponível' : 'Indisponível'}
                <button
                  onClick={() => handleFiltroChange('disponibilidade', 'todos')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Busca: {searchTerm}
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}); 
