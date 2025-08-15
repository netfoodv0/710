import React from 'react';
import { Pagination } from 'antd';
import './LoadMoreButton.css';

interface LoadMoreButtonProps {
  onLoadMore: (page: number, pageSize: number) => void;
  hasMore: boolean;
  loading?: boolean;
  totalItems: number;
  currentItems: number;
  itemsPerPage?: number;
  currentPage?: number;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasMore,
  loading = false,
  totalItems,
  currentItems,
  itemsPerPage = 8,
  currentPage = 1
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Só exibe a paginação se houver mais de uma página
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number, pageSize: number) => {
    onLoadMore(page, pageSize);
  };

  return (
    <div className="flex justify-center py-6">
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={(total, range) => 
          `${range[0]}-${range[1]} de ${total} itens`
        }
        disabled={loading}
        className="ant-pagination-custom"
      />
    </div>
  );
}; 