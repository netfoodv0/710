import React from 'react';
import { Produto, FormularioProdutoProps } from '../../types/produtos';
import { useFormularioProduto } from '../../hooks/useFormularioProduto';
import { FormularioProdutoTabs } from './FormularioProdutoTabs';
import { FormularioProdutoBasico } from './FormularioProdutoBasico';
import { FormularioProdutoMidia } from './FormularioProdutoMidia';
import { FormularioProdutoOutrasAbas } from './FormularioProdutoOutrasAbas';
import { ComplementosProduto } from '../produtos-especificos/ComplementosProduto';

export const FormularioProduto: React.FC<FormularioProdutoProps> = ({
  produto,
  categorias,
  categoriasAdicionais,
  onSubmit,
  onCancel,
  loading = false,
  modo = 'avancado',
  formRef
}) => {
  const {
    activeTab,
    setActiveTab,
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    formatarPreco,
    parsearPreco,
    handleImageUpload,
    handleImageRemove
  } = useFormularioProduto({ produto, onSubmit });

  return (
    <div className="space-y-6">
      <FormularioProdutoTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <form ref={formRef || undefined} onSubmit={handleSubmit} className="space-y-6">
        {/* Aba: Informações Básicas */}
        {activeTab === 'basico' && (
          <FormularioProdutoBasico
            formData={formData}
            errors={errors}
            categorias={categorias}
            onInputChange={handleInputChange}
            formatarPreco={formatarPreco}
            parsearPreco={parsearPreco}
          />
        )}

        {/* Aba: Mídia */}
        {activeTab === 'midia' && (
          <FormularioProdutoMidia
            formData={formData}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            loading={loading}
          />
        )}

        {/* Aba: Complementos */}
        {activeTab === 'complementos' && (
          <div className="space-y-6">
            <ComplementosProduto
              complementos={formData.complementos || []}
              categoriasAdicionais={categoriasAdicionais}
              onChange={(complementos) => handleInputChange('complementos', complementos)}
            />
          </div>
        )}

        {/* Outras Abas */}
        {(activeTab === 'classificacoes' || activeTab === 'disponibilidade' || activeTab === 'descontos') && (
          <FormularioProdutoOutrasAbas
            activeTab={activeTab}
            formData={formData}
            onInputChange={handleInputChange}
          />
        )}
      </form>
    </div>
  );
}; 