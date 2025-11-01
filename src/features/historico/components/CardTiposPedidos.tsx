import React from 'react';
import { GraficoTiposPedidos } from './GraficoTiposPedidos';

interface CardTiposPedidosProps {
  className?: string;
}

export const CardTiposPedidos: React.FC<CardTiposPedidosProps> = ({ className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <GraficoTiposPedidos />
    </div>
  );
};
