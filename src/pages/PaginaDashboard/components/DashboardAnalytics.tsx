import React from 'react';
import { FormasPedidas, ProdutosVendidos, PedidosAndamento } from '../../../components/analytics';
import { DashboardData } from '../types/dashboard.types';

interface DashboardAnalyticsProps {
  data: DashboardData;
  loading?: boolean;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ data, loading = false }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 dashboard-grid-mobile">
      {/* Formas de Pedido */}
      <FormasPedidas 
        formas={data.formasPedidas} 
        loading={loading}
      />

      {/* Top Produtos */}
      <ProdutosVendidos 
        produtos={data.produtosVendidos} 
        loading={loading}
      />

      {/* Pedidos em Andamento */}
      <PedidosAndamento 
        pedidosEmAndamento={data.estatisticas.pedidosPendentes}
        pedidos={data.pedidosEmAndamento}
        loading={loading}
      />
    </div>
  );
};

