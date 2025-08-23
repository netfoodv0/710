import React from 'react';
import { FormSection, FormSwitch, InputPersonalizadoPreco, InputPersonalizadoQuantidade } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracoesEntregaProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesEntrega({ form }: ConfiguracoesEntregaProps) {
  const { config, toggleSwitch, updateStringField } = form;

  return (
    <FormSection
      title="Configurações de Entrega"
      description="Configure as opções de entrega"
    >
      <div className="space-y-4">
        {/* Switches de Entrega */}
        <div className="space-y-3">
          <FormSwitch
            label="Entrega em Domicílio"
            name="entregaDomicilio"
            checked={config?.entregaDomicilio || false}
            onChange={(checked) => toggleSwitch('entregaDomicilio', checked)}
          />

          <FormSwitch
            label="Retirada no Local"
            name="retiradaLocal"
            checked={config?.retiradaLocal || false}
            onChange={(checked) => toggleSwitch('retiradaLocal', checked)}
          />

          <FormSwitch
            label="Entrega por Delivery"
            name="entregaDelivery"
            checked={config?.entregaDelivery || false}
            onChange={(checked) => toggleSwitch('entregaDelivery', checked)}
          />
        </div>

        {/* Campos de Valores */}
        {config?.entregaDomicilio && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputPersonalizadoPreco
              label="Taxa de Entrega"
              name="taxaEntrega"
              value={config?.taxaEntrega || ''}
              onChange={(value) => updateStringField('taxaEntrega', value)}
              placeholder="0,00"
            />

            <InputPersonalizadoPreco
              label="Pedido Mínimo"
              name="pedidoMinimo"
              value={config?.pedidoMinimo || ''}
              onChange={(value) => updateStringField('pedidoMinimo', value)}
              placeholder="0,00"
            />

            <InputPersonalizadoQuantidade
              label="Raio de Entrega (km)"
              name="raioEntrega"
              value={config?.raioEntrega || ''}
              onChange={(value) => updateStringField('raioEntrega', value)}
              placeholder="5"
              min={1}
              max={50}
            />
          </div>
        )}
      </div>
    </FormSection>
  );
}