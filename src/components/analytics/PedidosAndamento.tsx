import React from 'react';
import { useDashboardTranslation } from '../../hooks/useTranslation';
import { useDataFormatter } from '../../hooks/useDataFormatter';
import { useErrorHandler } from '../../services/errorService';
import { getDataWithFallback } from '../../services/mockDataService';
import { PedidoEmAndamento } from '../../types/dashboard';
import { ContainerCustom } from '../ui';

interface PedidosAndamentoProps {
  pedidosEmAndamento?: number;
  pedidos?: PedidoEmAndamento[];
  loading?: boolean;
}

// Componente para renderizar item individual
const PedidoItem: React.FC<{ pedido: PedidoEmAndamento }> = ({ pedido }) => {
  const { getInitials, getAvatarColor, formatCurrency } = useDataFormatter();
  const { dashboard } = useDashboardTranslation();

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded-lg dashboard-card-border">
      <div className="flex items-center space-x-3">
        <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(pedido.cliente)}`}>
          {getInitials(pedido.cliente)}
        </div>
        <div>
          <p className="font-medium text-gray-700 text-xs">{pedido.cliente}</p>
          <p className="text-xs text-gray-500">{pedido.status}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold text-gray-900">
          {formatCurrency(pedido.total)}
        </span>
        <p className="text-xs text-gray-500">{dashboard.total}</p>
      </div>
    </div>
  );
};

export const PedidosAndamento: React.FC<PedidosAndamentoProps> = React.memo(({ 
  pedidosEmAndamento = 0, 
  pedidos = [],
  loading = false
}) => {
  const { dashboard } = useDashboardTranslation();
  const { logError } = useErrorHandler();
  
  // Obter dados com fallback usando o serviço centralizado
  const pedidosExibir = getDataWithFallback(pedidos, 'pedidos');
  
  // Log de erro se não houver dados
  React.useEffect(() => {
    if (pedidos.length === 0 && !loading) {
      logError(
        new Error('No orders data available'),
        { component: 'PedidosAndamento', action: 'data-fallback' },
        'low'
      );
    }
  }, [pedidos.length, loading, logError]);

  if (loading) {
    return (
      <ContainerCustom className="flex flex-col max-h-[500px]" aria-labelledby="pedidos-andamento-title">
        <div className="dashboard-analytics-header">
          <div className="h-5 bg-gray-200 rounded w-36"></div>
          <div className="w-2 h-2 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="dashboard-analytics-content">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-2 flex-shrink-0">
          <div className="w-full h-10 bg-gray-200 rounded-[100px]"></div>
        </div>
      </ContainerCustom>
    );
  }

  return (
    <ContainerCustom className="flex flex-col max-h-[500px]" aria-labelledby="pedidos-andamento-title">
      <div className="dashboard-analytics-header">
        <h2 id="pedidos-andamento-title" className="text-base font-semibold text-gray-900">
          {dashboard.pedidosEmAndamento}
        </h2>
      </div>
      
      <div className="dashboard-analytics-content">
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
            {pedidosExibir.map((pedido) => (
              <PedidoItem key={pedido.id} pedido={pedido} />
            ))}
          </div>
          
          <div className="mt-auto pt-2 flex-shrink-0">
            <a 
              href="/pedidos" 
              className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors dashboard-focus-visible"
              aria-label={dashboard.acessarPainel}
              role="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="m670-140 160-100-160-100v200ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T920-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/>
              </svg>
              <span>{dashboard.acessarPainel}</span>
            </a>
          </div>
        </div>
      </div>
    </ContainerCustom>
  );
});

PedidosAndamento.displayName = 'PedidosAndamento';
