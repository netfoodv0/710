import React from 'react';
import { ListaProdutos } from '../../../components/lists/ListaProdutos';
import { useCardapioActions } from '../../../hooks/useCardapioActions';
import { useCardapioFiltros } from '../../../hooks/useCardapioFiltros';
import { useCardapioContext } from '../../../context/CardapioContext';

export function CardapioMain() {
  const { state } = useCardapioContext();
  const { 
    handleAbrirModalProduto, 
    handleEditarProduto, 
    handleExcluirProduto, 
    handleDuplicarProduto, 
    handleToggleStatus,
    produtos,
    categoriasCompletas
  } = useCardapioActions();
  const { 
    produtosFiltrados, 
    categoriasUnicas 
  } = useCardapioFiltros(produtos, categoriasCompletas);

  // Handler para mostrar toast de categoria necessária
  const handleShowCategoryToast = React.useCallback(() => {
    // Usar o contexto de notificações se necessário
    console.warn('Crie uma categoria primeiro antes de adicionar produtos');
  }, []);

  return (
    <div className="flex-1 space-y-4">
      {/* Lista de Produtos */}
      <div className="bg-white border border-slate-200 rounded-lg">
        <div className="p-4">
          <ListaProdutos
            produtos={produtosFiltrados}
            categorias={categoriasUnicas}
            loading={state.loadingProdutos}
            onCreate={handleAbrirModalProduto}
            onEdit={handleEditarProduto}
            onDelete={handleExcluirProduto}
            onDuplicate={handleDuplicarProduto}
            onToggleStatus={handleToggleStatus}
            categoriaSelecionada={state.filtros.categoria}
            onShowCategoryToast={handleShowCategoryToast}
          />
        </div>
      </div>
    </div>
  );
}
