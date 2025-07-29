import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loadMore: () => void;
  resetPagination: () => void;
  goToPage: (page: number) => void;
}

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { itemsPerPage = 10, initialPage = 1 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const hasMore = useMemo(() => {
    return currentPage * itemsPerPage < totalItems;
  }, [currentPage, itemsPerPage, totalItems]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return {
    currentItems,
    hasMore,
    currentPage,
    totalPages,
    totalItems,
    loadMore,
    resetPagination,
    goToPage
  };
} 