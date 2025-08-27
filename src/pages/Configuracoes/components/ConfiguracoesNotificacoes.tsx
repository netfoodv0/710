import React from 'react';
import { FormSection, FormSwitch } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracoesNotificacoesProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesNotificacoes({ form }: ConfiguracoesNotificacoesProps) {
  const { config, toggleSwitch } = form;

  return (
    <FormSection
      title="Configurações de Notificações"
      description="Gerencie as notificações do sistema"
    >
      <div className="space-y-4">
        <FormSwitch
          label="Notificações por Email"
          name="notificacoesEmail"
          checked={config?.notificacoesEmail || false}
          onChange={(checked) => toggleSwitch('notificacoesEmail', checked)}
        />

        <FormSwitch
          label="Notificações por SMS"
          name="notificacoesSMS"
          checked={config?.notificacoesSMS || false}
          onChange={(checked) => toggleSwitch('notificacoesSMS', checked)}
        />

        <FormSwitch
          label="Notificações Push"
          name="notificacoesPush"
          checked={config?.notificacoesPush || false}
          onChange={(checked) => toggleSwitch('notificacoesPush', checked)}
        />

        <FormSwitch
          label="Alertas de Estoque Baixo"
          name="alertasEstoque"
          checked={config?.alertasEstoque || false}
          onChange={(checked) => toggleSwitch('alertasEstoque', checked)}
        />
      </div>
    </FormSection>
  );
}
