import React from 'react';
import { Produto, ListaProdutosProps } from '../../types/produtos';
import { ModalProduto } from '../modals/ModalCriarEditarProduto';
import { useListaProdutos } from '../../hooks/useListaProdutos';
import { ListaProdutosHeader } from './HeaderListaProdutos';
import { ProductCard } from '../Card';
import { DndContext, DragEndEvent, closestCenter, MeasuringStrategy } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const ListaProdutos: React.FC<ListaProdutosProps> = ({
  produtos,
  categorias,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  categoriaSelecionada,
  onShowCategoryToast,
  onReorderProdutos
}) => {
  // Hook personalizado para gerenciar estado (apenas para exclusão, duplicação, etc.)
  const {
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  } = useListaProdutos({ onDelete, onDuplicate, onToggleStatus });

  // Estado local para controlar a ordem dos produtos
  const [produtosOrdenados, setProdutosOrdenados] = React.useState<Produto[]>(produtos);

  // Atualizar produtos ordenados quando produtos mudarem
  React.useEffect(() => {
    setProdutosOrdenados(produtos);
  }, [produtos]);

  // Usar diretamente a função onCreate passada como prop
  const handleCreate = () => {
    onCreate();
  };

  // Componente SortableItem para cada produto
  function SortableProduto({ produto }: { produto: Produto }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ 
      id: produto.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: isDragging ? 'none' : transition,
      zIndex: isDragging ? 9999 : 'auto',
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`sortable-produto ${isDragging ? 'dragging' : ''}`}
      >
        {/* ProductCard com ícone de arrastar integrado */}
        <ProductCard
          nome={produto.nome}
          preco={produto.preco}
          imagem={produto.imagem}
          status={produto.status}
          onToggleStatus={(status) => onToggleStatus(produto.id, status)}
          onEditar={() => onEdit(produto)}
          onExcluir={() => handleDelete(produto.id)}
          dragHandleProps={{ attributes, listeners }}
        />
      </div>
    );
  }

  // Handler para o fim do drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && over) {
      const oldIndex = produtosOrdenados.findIndex(produto => produto.id === active.id);
      const newIndex = produtosOrdenados.findIndex(produto => produto.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        // Criar nova lista com produtos reordenados
        const newProdutos = [...produtosOrdenados];
        const [removed] = newProdutos.splice(oldIndex, 1);
        newProdutos.splice(newIndex, 0, removed);
        
        // Atualizar o estado local com a nova ordem
        setProdutosOrdenados(newProdutos);
        
        // TODO: Implementar função para salvar nova ordem no backend
        // onReorderProdutos?.(newProdutos);
        
        // ✅ NOVO: Salvar nova ordem no Firebase
        if (onReorderProdutos) {
          const nomesOrdenados = newProdutos.map(produto => produto.nome);
          onReorderProdutos(nomesOrdenados);
        }
      }
    }
  };

  // Se não há produtos, mostrar mensagem (sem verificar loading)
  if (produtosOrdenados.length === 0) {
    return (
      <div className="space-y-4">
        <ListaProdutosHeader 
          onCreate={handleCreate} 
          categoriaSelecionada={categoriaSelecionada}
          categorias={categorias}
          onShowCategoryToast={onShowCategoryToast}
        />
        
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {categoriaSelecionada 
                ? `Nenhum produto na categoria "${categoriaSelecionada}"`
                : 'Comece criando seu primeiro produto.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ListaProdutosHeader 
        onCreate={handleCreate} 
        categoriaSelecionada={categoriaSelecionada}
        categorias={categorias}
        onShowCategoryToast={onShowCategoryToast}
      />

      {/* Loading state - REMOVIDO COMPLETAMENTE */}
      {/* {loading && !loadingEdicao && (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg h-[98px] p-4 animate-pulse">
              <div className="flex items-center gap-4 h-full">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Produtos com DnD em lista vertical - Sempre mostrar quando há produtos */}
      {produtosOrdenados.length > 0 && (
        <DndContext 
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always
            }
          }}
          modifiers={[]}
        >
                                  <SortableContext
              items={produtosOrdenados.map(produto => produto.id)}
              strategy={verticalListSortingStrategy}
              modifiers={[]}
            >
              <div className="grid grid-cols-1 gap-4">
                {produtosOrdenados.map((produto) => (
                  <SortableProduto key={produto.id} produto={produto} />
                ))}
              </div>
            </SortableContext>
        </DndContext>
      )}
    </div>
  );
}; 