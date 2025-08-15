import React from 'react';
import { CardMenuCategorias } from '../../../components/cards/CardMenuCategorias';
import { useCardapioActions } from '../../../hooks/useCardapioActions';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCategoriasOrdenadas } from '../../../hooks/useCategoriasOrdenadas';
import { useAuth } from '../../../hooks/useAuth';

export function CardapioSidebar() {
  const { state } = useCardapioContext();
  const { 
    handleCategoriaClick, 
    handleNovaCategoria, 
    handleEditarCategoria, 
    handleDuplicarCategoria, 
    handleExcluirCategoria,
    categoriasCompletas
  } = useCardapioActions();
  const { getLojaId } = useAuth();
  const lojaId = getLojaId();

  // Extrair nomes das categorias para o hook de ordenação
  const categoriasNomes = React.useMemo(() => {
    return categoriasCompletas
      .map(c => c.nome)
      .filter(categoria => categoria && categoria.trim());
  }, [categoriasCompletas]);

  // Hook para gerenciar ordem das categorias
  const { categoriasOrdenadas, reordenarCategorias } = useCategoriasOrdenadas({
    categorias: categoriasNomes,
    storageKey: `categorias-ordenadas-${lojaId || 'default'}`
  });

  // Função para reordenar categorias
  const handleReorderCategorias = React.useCallback((novasCategorias: string[]) => {
    reordenarCategorias(novasCategorias);
    console.log('Categorias reordenadas:', novasCategorias);
  }, [reordenarCategorias]);



  return (
    <div className="w-full lg:w-[360px] flex-shrink-0 space-y-4">
      <CardMenuCategorias
        categorias={categoriasOrdenadas}
        categoriaSelecionada={state.filtros.categoria}
        onCategoriaClick={handleCategoriaClick}
        onNovaCategoria={handleNovaCategoria}
        categoriasCompletas={categoriasCompletas}
        onEditCategoria={handleEditarCategoria}
        onDuplicateCategoria={handleDuplicarCategoria}
        onDeleteCategoria={handleExcluirCategoria}
        onReorderCategorias={handleReorderCategorias}
      />
    </div>
  );
}
