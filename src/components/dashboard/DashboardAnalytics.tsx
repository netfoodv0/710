import React from 'react';
import { FormasPedidas, ProdutosVendidos, PedidosAndamento } from '../analytics';
import { DashboardData } from '../../types/dashboard';

interface DashboardAnalyticsProps {
  data: DashboardData;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
      {/* Formas de Pedido */}
      <div className="dashboard-analytics-card pb-2">
        <div className="dashboard-analytics-header">
          <h2 className="text-base font-semibold text-gray-900">Formas de Pedido</h2>
          <div className="dashboard-status-indicator dashboard-status-green"></div>
        </div>
        <div className="dashboard-analytics-content">
          <FormasPedidas formas={data.formasPedidas} />
        </div>
        
        <div className="dashboard-info-box">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Economia com taxas</h3>
          <p className="text-xs text-green-700">
            Comece a vender e deixe de pagar 25% do seu faturamento em taxas à plataformas!
          </p>
        </div>
      </div>

      {/* Top Produtos */}
      <div className="dashboard-analytics-card">
        <div className="dashboard-analytics-header">
          <h2 className="text-base font-semibold text-gray-900">Top Produtos</h2>
          <div className="dashboard-status-indicator dashboard-status-purple"></div>
        </div>
        <div className="dashboard-analytics-content">
          <ProdutosVendidos produtos={data.produtosVendidos} />
        </div>
      </div>

      {/* Pedidos em Andamento */}
      <div className="dashboard-analytics-card">
        <div className="dashboard-analytics-header">
          <h2 className="text-base font-semibold text-gray-900">Pedidos em Andamento</h2>
          <div className="dashboard-status-indicator dashboard-status-red"></div>
        </div>
        <div className="dashboard-analytics-content">
          <PedidosAndamento 
            pedidosEmAndamento={data.estatisticas.pedidosPendentes}
            pedidos={data.pedidosEmAndamento}
          />
        </div>
      </div>
    </div>
  );
};
