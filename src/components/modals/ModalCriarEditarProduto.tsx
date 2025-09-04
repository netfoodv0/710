import React from 'react';
import { ModalProdutoProps } from '../../types/global/produtos';
import { FormularioProduto } from '../forms/FormularioProduto';

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
  loading = false,
  categorias: categoriasProps,
  isPageMode = false
}) => {
  // Use categorias from props or empty array
  const categorias = categoriasProps || [];
  const categoriasAdicionais = [];

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

  // Page mode - render without modal overlay and animations
  if (isPageMode) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
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
    );
  }

  // Modal mode - render without animations
  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div
            className="fixed top-0 right-0 h-full w-[600px] bg-white border border-gray-200 shadow-2xl z-50 flex flex-col"
            style={{ backgroundColor: 'white !important' }}
          >
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

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
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
        </>
      )}
    </>
  );
};
