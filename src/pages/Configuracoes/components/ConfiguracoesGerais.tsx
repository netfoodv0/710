import React from 'react';
import { FormSection, InputPersonalizado, FormTextarea } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracoesGeraisProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesGerais({ form }: ConfiguracoesGeraisProps) {
  const { config, updateStringField } = form;

  return (
    <FormSection
      title="Configurações Gerais"
      description="Informações básicas do seu restaurante"
    >
      <div className="space-y-4">
        <InputPersonalizado
          label="Nome do Restaurante"
          name="nomeRestaurante"
          value={config?.nomeRestaurante || ''}
          onChange={(value) => updateStringField('nomeRestaurante', value)}
          placeholder="Nome do seu restaurante"
          required
        />

        <FormTextarea
          label="Descrição"
          name="descricao"
          value={config?.descricao || ''}
          onChange={(value) => updateStringField('descricao', value)}
          placeholder="Descreva seu restaurante..."
          rows={3}
        />

        <InputPersonalizado
          label="CNPJ"
          name="cnpj"
          value={config?.cnpj || ''}
          onChange={(value) => updateStringField('cnpj', value)}
          placeholder="00.000.000/0000-00"
        />

        <InputPersonalizado
          label="Telefone"
          name="telefone"
          value={config?.telefone || ''}
          onChange={(value) => updateStringField('telefone', value)}
          placeholder="(11) 99999-9999"
        />

        <InputPersonalizado
          label="Link personalizado do seu cardápio"
          name="linkPersonalizado"
          value={config?.linkPersonalizado || ''}
          onChange={(value) => updateStringField('linkPersonalizado', value)}
          placeholder="Ex: sistema-voult-marechal-castelo-branco"
        />

        {config?.linkPersonalizado && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Este será o link do seu cardápio: 
              <span className="font-medium text-gray-800 ml-1">
                menu.brendi.com.br/{config.linkPersonalizado}
              </span>
            </p>
          </div>
        )}
      </div>
    </FormSection>
  );
}
