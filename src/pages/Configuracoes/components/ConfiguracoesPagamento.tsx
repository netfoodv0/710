import React from 'react';
import { FormSection, FormSwitch } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracoesPagamentoProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesPagamento({ form }: ConfiguracoesPagamentoProps) {
  const { config, toggleSwitch } = form;

  return (
    <FormSection
      title="Configurações de Pagamento"
      description="Configure as formas de pagamento aceitas"
    >
      <div className="space-y-4">
        <FormSwitch
          label="Dinheiro"
          name="pagamentoDinheiro"
          checked={config?.pagamentoDinheiro || false}
          onChange={(checked) => toggleSwitch('pagamentoDinheiro', checked)}
        />

        <FormSwitch
          label="Cartão de Crédito"
          name="pagamentoCredito"
          checked={config?.pagamentoCredito || false}
          onChange={(checked) => toggleSwitch('pagamentoCredito', checked)}
        />

        <FormSwitch
          label="Cartão de Débito"
          name="pagamentoDebito"
          checked={config?.pagamentoDebito || false}
          onChange={(checked) => toggleSwitch('pagamentoDebito', checked)}
        />

        <FormSwitch
          label="PIX"
          name="pagamentoPix"
          checked={config?.pagamentoPix || false}
          onChange={(checked) => toggleSwitch('pagamentoPix', checked)}
        />

        <FormSwitch
          label="Vale Refeição"
          name="pagamentoValeRefeicao"
          checked={config?.pagamentoValeRefeicao || false}
          onChange={(checked) => toggleSwitch('pagamentoValeRefeicao', checked)}
        />
      </div>
    </FormSection>
  );
}
