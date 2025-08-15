import React from 'react';
import { RelatorioHeader } from '../../../features/relatorios/components/RelatorioHeader';

interface CadastroProdutoHeaderProps {
  isEditMode: boolean;
  status: 'ativo' | 'inativo' | 'em_falta';
  onStatusChange: (status: 'ativo' | 'inativo' | 'em_falta') => void;
  onCancel: () => void;
  onSave: () => void;
  isSubmitting: boolean;
}

export const CadastroProdutoHeader: React.FC<CadastroProdutoHeaderProps> = ({
  isEditMode,
  status,
  onStatusChange,
  onCancel,
  onSave,
  isSubmitting
}) => {
  return (
    <RelatorioHeader
      title={isEditMode ? "Editar Produto" : "Novo Produto"}
      subtitle={isEditMode ? "Edite as informações do produto" : "Crie um novo produto para seu cardápio"}
      showBackButton={true}
      onBack={onCancel}
      showStatusSelect={true}
      selectedStatus={status}
      onStatusChange={onStatusChange}
      loading={isSubmitting}
      showActionButtons={true}
      onCancel={onCancel}
      onSave={onSave}
      isSubmitting={isSubmitting}
    />
  );
};
