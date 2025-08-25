import { useMemo, useCallback, useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface UseFilterOptimizedProps<T> {
  data: T[];
  filterFields: (keyof T)[];
  searchFields?: (keyof T)[];
  initialFilters?: Record<string, string[]>;
}

// Tipo mais específico para filtros
export type FilterValue = string | number | boolean;
export type FilterRecord = Record<string, FilterValue[]>;

export const useFilterOptimized = <T extends Record<string, string | number | boolean>>({
  data,
  filterFields,
  searchFields = [],
  initialFilters = {}
}: UseFilterOptimizedProps<T>) => {
  const [filters, setFilters] = useState<FilterRecord>(initialFilters as FilterRecord);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoizar opções de filtro para evitar recálculo
  const filterOptions = useMemo(() => {
    const options: Record<string, FilterOption[]> = {};
    
    filterFields.forEach(field => {
      const uniqueValues = [...new Set(data.map(item => item[field]))];
      options[field] = uniqueValues.map(value => ({
        value: String(value),
        label: String(value)
      }));
    });
    
    return options;
  }, [data, filterFields]);

  // Memoizar dados filtrados para evitar recálculo desnecessário
  const filteredData = useMemo(() => {
    let result = [...data];

    // Aplicar filtros
    Object.entries(filters).forEach(([field, values]) => {
      if (values.length > 0) {
        result = result.filter(item => 
          values.includes(String(item[field]))
        );
      }
    });

    // Aplicar busca
    if (searchTerm && searchFields.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => 
          String(item[field]).toLowerCase().includes(searchLower)
        )
      );
    }

    return result;
  }, [data, filters, searchTerm, searchFields]);

  // Memoizar função de atualização de filtros
  const updateFilter = useCallback((field: string, values: FilterValue[]) => {
    setFilters(prev => ({
      ...prev,
      [field]: values
    }));
  }, []);

  // Memoizar função de limpeza de filtros
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  // Memoizar estatísticas dos filtros
  const filterStats = useMemo(() => ({
    totalItems: data.length,
    filteredItems: filteredData.length,
    activeFilters: Object.values(filters).flat().length,
    searchActive: searchTerm.length > 0
  }), [data.length, filteredData.length, filters, searchTerm]);

  return {
    filteredData,
    filterOptions,
    filters,
    searchTerm,
    filterStats,
    updateFilter,
    setSearchTerm,
    clearFilters
  };
};

// Hook específico para tabelas com paginação
export const useTableFilterOptimized = <T extends Record<string, string | number | boolean>>(
  props: UseFilterOptimizedProps<T>
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const {
    filteredData,
    filterOptions,
    filters,
    searchTerm,
    filterStats,
    updateFilter,
    setSearchTerm,
    clearFilters
  } = useFilterOptimized(props);

  // Memoizar dados paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  // Memoizar informações de paginação
  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      currentPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
      startIndex: (currentPage - 1) * itemsPerPage + 1,
      endIndex: Math.min(currentPage * itemsPerPage, filteredData.length),
      totalItems: filteredData.length
    };
  }, [filteredData.length, currentPage, itemsPerPage]);

  // Funções de paginação memoizadas
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationInfo.totalPages)));
  }, [paginationInfo.totalPages]);

  const nextPage = useCallback(() => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationInfo.hasNextPage]);

  const prevPage = useCallback(() => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationInfo.hasPrevPage]);

  // Resetar página quando filtros mudarem
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    // Dados e filtros
    filteredData,
    paginatedData,
    filterOptions,
    filters,
    searchTerm,
    filterStats,
    
    // Paginação
    paginationInfo,
    itemsPerPage,
    
    // Funções
    updateFilter,
    setSearchTerm,
    clearFilters,
    setItemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    resetPagination
  };
};
