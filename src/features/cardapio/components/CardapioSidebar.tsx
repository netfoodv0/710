import React from 'react';
import { CardMenuCategorias } from '../../../components/cards/CardMenuCategorias';
import { useCardapioActions } from '../../../hooks/useCardapioActions';
import { useCardapioContext } from '../../../context/CardapioContext';

export function CardapioSidebar() {
  const { state, selecionarPrimeiraCategoria } = useCardapioContext();
  const { 
    handleCategoriaClick, 
    handleNovaCategoria, 
    handleEditarCategoria, 
    handleDuplicarCategoria, 
    handleExcluirCategoria,
    handleToggleStatusCategoria,
    handleReordenarCategorias,
    categoriasCompletas
  } = useCardapioActions();

  // Extrair nomes das categorias já ordenadas por posição (vem do Firebase ordenado)
  const categoriasOrdenadas = React.useMemo(() => {
    return categoriasCompletas
      .sort((a, b) => (a.posicao || 999) - (b.posicao || 999)) // ✅ CORREÇÃO: Ordenar por posição
      .map(c => c.nome)
      .filter(categoria => categoria && categoria.trim());
  }, [categoriasCompletas]);

  // Selecionar primeira categoria automaticamente
  React.useEffect(() => {
    if (categoriasCompletas.length > 0 && state.filtros.categoria === 'todos') {
      selecionarPrimeiraCategoria(categoriasCompletas);
    }
  }, [categoriasCompletas.length, state.filtros.categoria, selecionarPrimeiraCategoria]);



  return (
    <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
      <CardMenuCategorias
        categorias={categoriasOrdenadas}
        categoriaSelecionada={state.filtros.categoria}
        onCategoriaClick={handleCategoriaClick}
        onNovaCategoria={handleNovaCategoria}
        categoriasCompletas={categoriasCompletas}
        onEditCategoria={handleEditarCategoria}
        onDuplicateCategoria={handleDuplicarCategoria}
        onDeleteCategoria={handleExcluirCategoria}
        onReorderCategorias={handleReordenarCategorias}
        onToggleStatus={handleToggleStatusCategoria}
      />
    </div>
  );
}
