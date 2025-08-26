import React from 'react';
import { GraficoTiposPedidos } from './GraficoTiposPedidos';

interface CardTiposPedidosProps {
  className?: string;
}

export const CardTiposPedidos: React.FC<CardTiposPedidosProps> = ({ className = '' }) => {
  // Dados mockados para demonstração
  const dadosTiposPedidos = [
    { nome: 'Delivery', quantidade: 45, percentual: 45.0, cor: '#10B981' },
    { nome: 'Retirada', quantidade: 35, percentual: 35.0, cor: '#3B82F6' },
    { nome: 'Balcão', quantidade: 20, percentual: 20.0, cor: '#8B5CF6' }
  ];

  return (
    <div className={`bg-white border rounded-lg p-3 sm:p-4 w-full ${className}`} style={{ borderColor: '#cfd1d3' }}>
      <div className="mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Tipos de Pedidos</h3>
      </div>
      
      {/* Gráfico - Apenas o gráfico, sem estatísticas detalhadas */}
      <div className="w-full h-auto min-h-[200px] sm:min-h-[250px]">
        <GraficoTiposPedidos />
      </div>
    </div>
  );
};
