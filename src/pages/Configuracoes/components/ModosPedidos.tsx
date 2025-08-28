import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { FormSection, FormSwitch } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ModosPedidosProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ModosPedidos({ form }: ModosPedidosProps) {
  const { config, toggleSwitch } = form;

  return (
    <FormSection
      title="Modos de Pedidos"
      description="Escolha os modos de pedidos disponíveis para a sua loja."
      icon={<ShoppingCart size={30} />}
    >
      <div className="space-y-4">
        <FormSwitch
          label="Aceitar pedidos para delivery"
          name="aceitarPedidosDelivery"
          checked={config?.aceitarPedidosDelivery || false}
          onChange={(checked) => toggleSwitch('aceitarPedidosDelivery', checked)}
        />

        <FormSwitch
          label="Aceitar pedidos para retirada"
          name="aceitarPedidosRetirada"
          checked={config?.aceitarPedidosRetirada || false}
          onChange={(checked) => toggleSwitch('aceitarPedidosRetirada', checked)}
        />

        <FormSwitch
          label="Aceitar pedidos no balcão (consumo no local)"
          name="aceitarPedidosBalcao"
          checked={config?.aceitarPedidosBalcao || false}
          onChange={(checked) => toggleSwitch('aceitarPedidosBalcao', checked)}
        />
      </div>
    </FormSection>
  );
}
