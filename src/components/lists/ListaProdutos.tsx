import React from 'react';
import { Produto, ListaProdutosProps } from '../../types/produtos';
import { ModalProduto } from '../modals/ModalCriarEditarProduto';
import { usePagination } from '../../hooks/usePagination';
import { useListaProdutos } from '../../hooks/useListaProdutos';
import { LoadMoreButton } from '../LoadMoreButton';
import { ListaProdutosHeader } from './HeaderListaProdutos';
import { ListaProdutosEmpty } from './ListaProdutosVazia';
import { ListaProdutosTable } from './TabelaProdutos';

export const ListaProdutos: React.FC<ListaProdutosProps> = ({
  produtos,
  categorias,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus
}) => {
  // Paginação
  const {
    currentItems: produtosPaginados,
    hasMore,
    loadMore,
    totalItems,
  } = usePagination(produtos, { itemsPerPage: 10 });

  // Hook personalizado para gerenciar estado
  const {
    modalOpen,
    produtoSelecionado,
    handleCreate,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  } = useListaProdutos({ onDelete, onDuplicate, onToggleStatus });

  return (
    <div className="space-y-4">
      <ListaProdutosHeader onCreate={handleCreate} />

      {/* Lista de Produtos - Ajustado sem rodapé fixo */}
      <div className="bg-white rounded border relative">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2 text-xs">Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <ListaProdutosEmpty onCreate={handleCreate} />
        ) : (
          <>
            <ListaProdutosTable
              produtos={produtosPaginados}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
            
            {/* Botão Carregar Mais */}
            {produtos.length > 10 && (
              <LoadMoreButton
                onLoadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
                totalItems={totalItems}
                currentItems={produtosPaginados.length}
                itemsPerPage={10}
              />
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <ModalProduto
        isOpen={modalOpen}
        onClose={handleCloseModal}
        produto={produtoSelecionado}
        onSave={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        loading={loading}
      />
    </div>
  );
}; 