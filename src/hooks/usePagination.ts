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
  loadPage: (page: number, pageSize?: number) => void;
}

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { itemsPerPage = 8, initialPage = 1 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const hasMore = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

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

  const loadPage = useCallback((page: number, pageSize?: number) => {
    const targetPage = page >= 1 ? page : 1;
    const maxPage = pageSize ? Math.ceil(totalItems / pageSize) : totalPages;
    
    if (targetPage <= maxPage) {
      setCurrentPage(targetPage);
    }
  }, [totalPages, totalItems]);

  return {
    currentItems,
    hasMore,
    currentPage,
    totalPages,
    totalItems,
    loadMore,
    resetPagination,
    goToPage,
    loadPage
  };
} 