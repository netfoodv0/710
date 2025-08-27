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
    <div className={`border p-2 sm:p-3 w-full ${className}`} style={{ borderColor: '#cfd1d3', background: 'linear-gradient(to bottom, #ffffff, #f5eff2)', borderRadius: '16px' }}>
      <div className="mb-1 sm:mb-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Tipos de Pedidos</h3>
      </div>
      
      {/* Gráfico - Apenas o gráfico, sem estatísticas detalhadas */}
      <div className="w-full h-auto min-h-[200px] sm:min-h-[250px]">
        <GraficoTiposPedidos />
      </div>
    </div>
  );
};
