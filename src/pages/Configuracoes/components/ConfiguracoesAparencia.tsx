import React from 'react';
import { FormSection, FormSelect, FormSwitch } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracoesAparenciaProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesAparencia({ form }: ConfiguracoesAparenciaProps) {
  const { config, toggleSwitch, updateStringField } = form;

  return (
    <FormSection
      title="Configurações de Aparência"
      description="Personalize a aparência do seu sistema"
    >
      <div className="space-y-4">
        <FormSelect
          label="Tema"
          name="tema"
          value={config?.tema || 'claro'}
          onChange={(value) => updateStringField('tema', value)}
          options={[
            { value: 'claro', label: 'Tema Claro' },
            { value: 'escuro', label: 'Tema Escuro' },
            { value: 'auto', label: 'Automático' }
          ]}
        />

        <FormSelect
          label="Cor Principal"
          name="corPrincipal"
          value={config?.corPrincipal || 'azul'}
          onChange={(value) => updateStringField('corPrincipal', value)}
          options={[
            { value: 'azul', label: 'Azul' },
            { value: 'verde', label: 'Verde' },
            { value: 'roxo', label: 'Roxo' },
            { value: 'vermelho', label: 'Vermelho' },
            { value: 'laranja', label: 'Laranja' }
          ]}
        />

        <FormSwitch
          label="Modo Compacto"
          name="modoCompacto"
          checked={config?.modoCompacto || false}
          onChange={(checked) => toggleSwitch('modoCompacto', checked)}
        />

        <FormSwitch
          label="Animações"
          name="animacoes"
          checked={config?.animacoes || true}
          onChange={(checked) => toggleSwitch('animacoes', checked)}
        />
      </div>
    </FormSection>
  );
}
