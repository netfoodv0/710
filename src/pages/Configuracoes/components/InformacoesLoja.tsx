import React from 'react';
import { FormSection, FormSingleImageUpload } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface InformacoesLojaProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function InformacoesLoja({ form }: InformacoesLojaProps) {
  const { config, updateStringField } = form;

  return (
    <FormSection
      title="Informações da Loja"
      description="Preencha os detalhes da sua loja."
    >
      <div className="space-y-4">
        <FormSingleImageUpload
          label="Foto da Loja"
          value={config?.fotoLoja || ''}
          onChange={(value) => updateStringField('fotoLoja', value)}
          placeholder="Selecione uma foto"
        />

        <FormSingleImageUpload
          label="Banner da Loja"
          value={config?.bannerLoja || ''}
          onChange={(value) => updateStringField('bannerLoja', value)}
          placeholder="Selecione um banner"
          dimensions="800x256"
        />
      </div>
    </FormSection>
  );
}
