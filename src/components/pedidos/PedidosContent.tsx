import React from 'react';
import { PedidosColumns } from './PedidosColumns';
import { PedidosLoading } from './';
import { Pedido } from '../../types/global/pedidos';

interface PedidosContentProps {
  pedidos: Pedido[];
  loading: boolean;
  onAceitar: (pedidoId: string) => void;
  onAvançar: (pedidoId: string) => void;
  onFinalizar: (pedidoId: string) => void;
  onRecusar: (pedidoId: string) => void;
}

export const PedidosContent: React.FC<PedidosContentProps> = ({
  pedidos,
  loading,
  onAceitar,
  onAvançar,
  onFinalizar,
  onRecusar
}) => {
  if (loading) {
    return <PedidosLoading isVisible={true} type="skeleton" />;
  }

  return (
    <PedidosColumns
      pedidos={pedidos}
      onAceitar={onAceitar}
      onAvançar={onAvançar}
      onFinalizar={onFinalizar}
      onRecusar={onRecusar}
    />
  );
};
