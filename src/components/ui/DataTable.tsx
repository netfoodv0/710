import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { EditIcon } from './EditIcon';
import { TrashIcon } from './TrashIcon';
import { ViewIcon } from './ViewIcon';
import { CustomDropdown, type DropdownOption } from './CustomDropdown';

export interface DataTableColumn<T> {
  key: keyof T | 'actions';
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  filters?: {
    categories?: { value: string; label: string }[];
    statuses?: { value: string; label: string }[];
    showDateRange?: boolean;
  };
  actions?: {
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
    customActions?: { label: string; onClick: (item: T) => void; icon?: React.ReactNode }[];
  };
  pagination?: {
    itemsPerPageOptions?: number[];
    defaultItemsPerPage?: number;
  };
  defaultSort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  onAdd?: () => void;
  addButtonText?: string;
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Buscar...",
  searchFields = [],
  filters = {},
  actions = {},
  pagination = {},
  defaultSort,
  onAdd,
  addButtonText = "Adicionar",
  className = ""
}: DataTableProps<T>) {
  const [filterValue, setFilterValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [sortField, setSortField] = useState<keyof T | 'actions'>(defaultSort?.field || 'id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSort?.direction || 'asc');
  const [dateInicio, setDateInicio] = useState('');
  const [dateFim, setDateFim] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pagination.defaultItemsPerPage || 8);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPageOptions = pagination.itemsPerPageOptions || [5, 8, 10, 15, 20];

  // Filtrar dados
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Filtro de busca
    if (filterValue) {
      const searchLower = filterValue.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        })
      );
    }

    // Filtro de categoria
    if (selectedCategory !== 'todas') {
      filtered = filtered.filter((item: any) => item.categoria === selectedCategory);
    }

    // Filtro de status
    if (selectedStatus !== 'todos') {
      filtered = filtered.filter((item: any) => item.status === selectedStatus);
    }

    // Filtro de data
    if (dateInicio && dateFim) {
      filtered = filtered.filter((item: any) => {
        const itemDate = new Date(item.dataHora || item.data || item.createdAt);
        const inicio = new Date(dateInicio);
        const fim = new Date(dateFim);
        return itemDate >= inicio && itemDate <= fim;
      });
    }

    return filtered;
  }, [data, filterValue, searchFields, selectedCategory, selectedStatus, dateInicio, dateFim]);

  // Ordenar dados
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortField === 'actions') return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Dados da página atual
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Resetar para primeira página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [filterValue, selectedCategory, selectedStatus, dateInicio, dateFim]);

  // Funções de paginação
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Função para gerar números de página
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(4, maxVisiblePages - 1); i++) {
          pages.push(i);
        }
        if (maxVisiblePages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        if (maxVisiblePages > 3) {
          pages.push('...');
        }
        for (let i = Math.max(totalPages - maxVisiblePages + 2, totalPages - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (maxVisiblePages > 4) {
          pages.push('...');
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (maxVisiblePages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  // Hook para detectar mudanças de tamanho de tela
  useEffect(() => {
    const handleResize = () => {
      // Forçar re-render quando a tela mudar de tamanho
      // Usar callback para evitar dependência circular
      setCurrentPage(prev => prev);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSort = (field: keyof T | 'actions') => {
    if (field === 'actions') return;
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderCell = (item: T, column: DataTableColumn<T>) => {
    if (column.key === 'actions') {
      return (
        <div className="flex items-center gap-2">
          {actions.onView && (
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors" 
              title="Visualizar"
              onClick={() => actions.onView!(item)}
            >
              <ViewIcon size={18} color="#6b7280" />
            </button>
          )}
          {actions.onEdit && (
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors" 
              title="Editar"
              onClick={() => actions.onEdit!(item)}
            >
              <EditIcon size={18} color="#6b7280" />
            </button>
          )}
          {actions.customActions?.map((action, index) => (
            <button
              key={`${item.id}-action-${index}`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title={action.label}
              onClick={() => action.onClick(item)}
            >
              {action.icon || <EditIcon size={18} color="#6b7280" />}
            </button>
          ))}
          {actions.onDelete && (
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors" 
              title="Excluir"
              onClick={() => actions.onDelete!(item)}
            >
              <TrashIcon size={18} color="#6b7280" />
            </button>
          )}
        </div>
      );
    }

    if (column.render) {
      return column.render(item);
    }

    const value = item[column.key];
    if (value === undefined || value === null) return '-';
    
    return String(value);
  };

  return (
    <div className={className}>
      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-6" style={{ border: '1px solid hsl(210deg 4.35% 81.96%)' }}>
        {/* Header dos filtros com toggle para mobile */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        {/* Filtros - sempre visíveis em desktop, condicionais em mobile */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col gap-4">
            {/* Busca - sempre visível */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8217d5] focus:border-[#8217d5] outline-none"
                />
              </div>
            </div>

            {/* Filtros em linha para desktop, coluna para mobile */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Date Range Picker */}
              {filters.showDateRange && (
                <div className="w-full lg:w-80">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <input
                      type="date"
                      value={dateInicio}
                      onChange={(e) => setDateInicio(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#8217d5] focus:border-[#8217d5] outline-none bg-white"
                    />
                    <span className="text-gray-400 text-sm">até</span>
                    <input
                      type="date"
                      value={dateFim}
                      onChange={(e) => setDateFim(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#8217d5] focus:border-[#8217d5] outline-none bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Filtro de Categoria */}
              {filters.categories && (
                <div className="w-full lg:w-40">
                  <CustomDropdown
                    options={[
                      { value: 'todas', label: 'Todas as Categorias' },
                      ...filters.categories
                    ]}
                    selectedValue={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                    placeholder="Selecione categoria"
                    className="w-full"
                  />
                </div>
              )}

              {/* Filtro de Status */}
              {filters.statuses && (
                <div className="w-full lg:w-40">
                  <CustomDropdown
                    options={[
                      { value: 'todos', label: 'Todos os Status' },
                      ...filters.statuses
                    ]}
                    selectedValue={selectedStatus}
                    onValueChange={(value) => setSelectedStatus(value)}
                    placeholder="Selecione status"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1px solid hsl(210deg 4.35% 81.96%)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b" style={{ borderColor: 'hsl(210deg 4.35% 81.96%)' }}>
              <tr>
                {columns.map((column) => (
                  <th 
                    key={String(column.key)}
                    className={`px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="hidden sm:inline">{column.label}</span>
                      <span className="sm:hidden">
                        {column.key === 'numero' ? '#' : 
                         column.key === 'cliente' ? 'Cliente' :
                         column.key === 'formaPagamento' ? 'Pag.' :
                         column.key === 'status' ? 'Status' :
                         column.key === 'dataHora' ? 'Data' :
                         column.key === 'total' ? 'Total' :
                         column.key === 'actions' ? 'Ações' : column.label}
                      </span>
                      {column.sortable && sortField === column.key && (
                        <span className="text-[#8217d5]">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y" style={{ borderColor: 'hsl(210deg 4.35% 81.96%)' }}>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-500">
                    Nenhum item encontrado
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors" style={{ 
                    borderBottom: index < currentData.length - 1 ? '1px solid hsl(210deg 4.35% 81.96%)' : 'none' 
                  }}>
                    {columns.map((column) => (
                      <td key={String(column.key)} className="px-2 sm:px-4 py-3 whitespace-nowrap text-small">
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Rodapé da tabela */}
        <div className="bg-gray-50 px-4 py-4 border-t" style={{ borderColor: 'hsl(210deg 4.35% 81.96%)' }}>
          <div className="flex flex-col gap-4">
            {/* Informações e itens por página */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-small text-gray-700">
                  Mostrando <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)}</span> a{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> de{' '}
                  <span className="font-medium">{sortedData.length}</span> itens
                </div>
                
                {/* Dropdown para itens por página */}
                <div className="flex items-center gap-2">
                  <span className="text-small text-gray-500">Mostrar:</span>
                  <CustomDropdown
                    options={itemsPerPageOptions.map(option => ({ 
                      value: option.toString(), 
                      label: `${option} por página` 
                    }))}
                    selectedValue={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(parseInt(value));
                      setCurrentPage(1);
                    }}
                    placeholder="Itens por página"
                    className="w-32"
                    size="sm"
                    dropUp={true}
                  />
                </div>
              </div>
              
              {/* Controles de paginação */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-small"
                  title="Primeira página"
                >
                  «
                </button>
                
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-small"
                  title="Página anterior"
                >
                  ‹
                </button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={`page-${page}-${index}`}
                      onClick={() => typeof page === 'number' ? goToPage(page) : null}
                      disabled={page === '...'}
                      className={`px-2 sm:px-3 py-1 rounded-md text-small font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-[#8217d5] text-white'
                          : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-small"
                  title="Próxima página"
                >
                  ›
                </button>
                
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-small"
                  title="Última página"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
