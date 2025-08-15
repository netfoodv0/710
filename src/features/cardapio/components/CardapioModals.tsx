import React from 'react';
import { ModalCategoria } from '../../../components/modals/ModalCategoria';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCardapioActions } from '../../../hooks/useCardapioActions';

export function CardapioModals() {
  const { state, closeModalCategoria } = useCardapioContext();
  const { 
    handleSalvarCategoria, 
    handleSalvarEdicaoCategoria
  } = useCardapioActions();

  return (
    <>
      {/* Modal de Categoria */}
      <ModalCategoria
        isOpen={state.modalCategoriaOpen}
        onClose={closeModalCategoria}
        categoria={state.categoriaSelecionadaEdicao}
        onSave={handleSalvarCategoria}
        onEdit={handleSalvarEdicaoCategoria}
        loading={state.loadingCategorias}
      />
    </>
  );
}
