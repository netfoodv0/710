import React from 'react';
import { useDashboardTranslation, usePedidosEmAndamento } from '../../pages/PaginaDashboard/hooks';
import { useDataFormatter } from '../../pages/PaginaDashboard/hooks';
import { useErrorHandler } from '../../services/errorService';
import { PedidoEmAndamento } from '../../pages/PaginaDashboard/types';
import { ContainerCustom, AccessIcon } from '../ui';

interface PedidosAndamentoProps {
  pedidosEmAndamento?: number;
}

// Componente para renderizar item individual
const PedidoItem: React.FC<{ pedido: PedidoEmAndamento }> = ({ pedido }) => {
  const { getInitials, getAvatarColor, formatCurrency } = useDataFormatter();
  const { dashboard } = useDashboardTranslation();

  return (
    <div className="flex items-center justify-between p-2 bg-white dashboard-card-border" style={{ borderRadius: '4px' }}>
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
  pedidosEmAndamento = 0
}) => {
  const { dashboard } = useDashboardTranslation();
  const { logError } = useErrorHandler();
  
  // Usar hook do Firebase para carregar pedidos em andamento
  const { 
    pedidos: pedidosFirebase, 
    loading: loadingFirebase, 
    error: errorFirebase 
  } = usePedidosEmAndamento();
  
  // Usar apenas dados do Firebase
  const pedidosExibir = pedidosFirebase;
  const isLoading = loadingFirebase;
  
  // Log de erro se não houver dados
  React.useEffect(() => {
    if (pedidosExibir.length === 0 && !isLoading) {
      logError(
        new Error('No orders data available'),
        { component: 'PedidosAndamento', action: 'data-fallback' },
        'low'
      );
    }
  }, [pedidosExibir.length, isLoading, logError]);
  
  // Log de erro do Firebase se houver
  React.useEffect(() => {
    if (errorFirebase) {
      logError(
        new Error(errorFirebase),
        { component: 'PedidosAndamento', action: 'firebase-error' },
        'medium'
      );
    }
  }, [errorFirebase, logError]);

  if (isLoading) {
    return (
      <div className="flex flex-col max-h-[500px]" aria-labelledby="pedidos-andamento-title">
        <div className="mb-4">
          <div className="h-5 bg-gray-200 rounded w-36"></div>
        </div>
        <div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-2 flex-shrink-0">
          <div className="w-full h-10 bg-gray-200 rounded-[100px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[500px]" aria-labelledby="pedidos-andamento-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="pedidos-andamento-title" className="text-base font-semibold text-gray-900">
          {dashboard.pedidosEmAndamento}
        </h2>
        <a 
          href="/pedidos" 
          className="inline-flex items-center justify-center px-3 py-2 h-8 bg-[#f5f5f5] text-gray-800 text-sm font-medium rounded-[100px] hover:bg-[#e5e5e5] transition-colors dashboard-focus-visible border border-gray-300"
          aria-label={dashboard.acessarPainel}
          role="button"
        >
          <AccessIcon size={24} color="#6b7280" />
        </a>
      </div>
      
      <div>
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
            {pedidosExibir.map((pedido) => (
              <PedidoItem key={pedido.id} pedido={pedido} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

PedidosAndamento.displayName = 'PedidosAndamento';
