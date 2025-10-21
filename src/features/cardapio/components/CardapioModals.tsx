import React from 'react';
import { ModalNovaCategoria } from './ModalNovaCategoria';
import { ModalEditarCategoria } from './ModalEditarCategoria';
import { ModalNovoProduto } from './ModalNovoProduto';
import { ModalNovaCategoriaComplemento } from './ModalNovaCategoriaComplemento';
import { ModalNovoComplemento } from './ModalNovoComplemento';
import { useCardapioModals } from '../../../context/CardapioModalsContext';

export function CardapioModals() {
  const { 
    isModalNovaCategoriaOpen, 
    closeModalNovaCategoria, 
    isModalEditarCategoriaOpen,
    closeModalEditarCategoria,
    categoriaParaEditar,
    isModalNovoProdutoOpen,
    closeModalNovoProduto,
    produtoParaEditar,
    categoriaProdutoPreSelecionada,
    isModalNovaCategoriaComplementoOpen,
    closeModalNovaCategoriaComplemento,
    isModalNovoComplementoOpen,
    closeModalNovoComplemento,
    complementoParaEditar,
    categoriaPreSelecionada,
    triggerCategoriaCriada,
    triggerCategoriaComplementoCriada,
    triggerComplementoCriado
  } = useCardapioModals();

  const handleConfirmNovaCategoria = (categoriaId: string) => {
    // Disparar callback para recarregar categorias
    triggerCategoriaCriada();
  };

  const handleConfirmEditarCategoria = () => {
    // Disparar callback para recarregar categorias
    triggerCategoriaCriada();
  };

  const handleConfirmNovoProduto = () => {
    // TODO: Disparar callback para recarregar produtos
  };

  const handleConfirmNovaCategoriaComplemento = (categoriaId: string) => {
    // Disparar callback para recarregar categorias de complementos
    triggerCategoriaComplementoCriada();
  };

  const handleConfirmNovoComplemento = () => {
    // Disparar callback para recarregar complementos
    triggerComplementoCriado();
  };

  return (
    <>
      <ModalNovaCategoria
        isOpen={isModalNovaCategoriaOpen}
        onClose={closeModalNovaCategoria}
        onConfirm={handleConfirmNovaCategoria}
      />
      <ModalEditarCategoria
        isOpen={isModalEditarCategoriaOpen}
        onClose={closeModalEditarCategoria}
        categoria={categoriaParaEditar}
        onConfirm={handleConfirmEditarCategoria}
      />
      <ModalNovoProduto
        isOpen={isModalNovoProdutoOpen}
        onClose={closeModalNovoProduto}
        onConfirm={handleConfirmNovoProduto}
        produtoParaEditar={produtoParaEditar}
        categoriaPreSelecionada={categoriaProdutoPreSelecionada}
      />
      <ModalNovaCategoriaComplemento
        isOpen={isModalNovaCategoriaComplementoOpen}
        onClose={closeModalNovaCategoriaComplemento}
        onConfirm={handleConfirmNovaCategoriaComplemento}
      />
      <ModalNovoComplemento
        isOpen={isModalNovoComplementoOpen}
        onClose={closeModalNovoComplemento}
        onConfirm={handleConfirmNovoComplemento}
        complementoParaEditar={complementoParaEditar}
        categoriaPreSelecionada={categoriaPreSelecionada}
      />
    </>
  );
}
