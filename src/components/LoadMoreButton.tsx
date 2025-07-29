import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  totalItems: number;
  currentItems: number;
  itemsPerPage?: number;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasMore,
  loading = false,
  totalItems,
  currentItems,
  itemsPerPage = 10
}) => {
  if (!hasMore) {
    return null;
  }

  const remainingItems = totalItems - currentItems;
  const nextBatchSize = Math.min(itemsPerPage, remainingItems);

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Carregando...
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Carregar mais {nextBatchSize} {nextBatchSize === 1 ? 'item' : 'itens'}
          </>
        )}
      </button>
    </div>
  );
}; 