import React from 'react';
import { ModalProdutoProps } from '../../types/produtos';
import { FormularioProduto } from '../forms/FormularioProduto';
import { useCategoriasFirebase } from '../../hooks/useCategoriasFirebase';
import { useCategoriasAdicionaisFirebase } from '../../hooks/useCategoriasAdicionaisFirebase';
import { useModalProduto } from '../../hooks/useModalProduto';
import { ModalProdutoHeader } from './ModalHeaderProduto';
import { ModalProdutoTabs } from './ModalTabsProduto';
import { ModalProdutoPreview } from './ModalPreviewProduto';
import { ModalProdutoScore } from './ModalScoreProduto';
import { ModalProdutoActions } from './ModalAcoesProduto';

export const ModalProduto: React.FC<ModalProdutoProps> = ({
  isOpen,
  onClose,
  produto,
  onSave,
  onEdit,
  onDelete,
  onDuplicate,
  loading = false
}) => {
  const { categorias } = useCategoriasFirebase();
  const { categorias: categoriasAdicionais } = useCategoriasAdicionaisFirebase();

  const {
    activeTab,
    setActiveTab,
    formRef,
    isEditing,
    handleSubmit,
    handleDelete,
    handleDuplicate,
    handleFormSubmit
  } = useModalProduto({
    isOpen,
    produto,
    onClose,
    onSave,
    onEdit,
    onDelete,
    onDuplicate
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
        <ModalProdutoHeader
          isEditing={isEditing}
          produto={produto}
          onClose={onClose}
        />

        <ModalProdutoTabs
          isEditing={isEditing}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content - Melhorado para Mobile */}
        <div className="p-4 md:p-6">
          {activeTab === 'formulario' && (
            <FormularioProduto
              produto={produto}
              categorias={categorias}
              categoriasAdicionais={categoriasAdicionais}
              onSubmit={handleSubmit}
              onCancel={onClose}
              loading={loading}
              formRef={formRef}
            />
          )}

          {activeTab === 'preview' && produto && (
            <ModalProdutoPreview produto={produto} />
          )}

          {activeTab === 'score' && produto && (
            <ModalProdutoScore scoreQualidade={null} />
          )}
        </div>

        <ModalProdutoActions
          isEditing={isEditing}
          activeTab={activeTab}
          loading={loading}
          onClose={onClose}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}; 