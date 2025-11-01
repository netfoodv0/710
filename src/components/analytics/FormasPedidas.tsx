import React from 'react';
import { useDashboardTranslation } from '../../pages/PaginaDashboard/hooks';
import { useErrorHandler } from '../../services/errorService';
import { getDataWithFallback } from '../../services/mockDataService';
import { FormaPedida } from '../../pages/PaginaDashboard/types';

interface FormasPedidasProps {
  formas: FormaPedida[];
  loading?: boolean;
}

// Componente para renderizar item individual
const FormaPedidaItem: React.FC<{ forma: FormaPedida }> = ({ forma }) => {
  const { dashboard } = useDashboardTranslation();

  // Função simples para renderizar ícone baseado no tipo
  const renderIcon = (iconType: string) => {
    const iconMap: Record<string, string> = {
      'delivery': '🚚',
      'pickup': '📦',
      'dine_in': '🍽️',
      'whatsapp': '📱',
      'telefone': '📞',
      'presencial': '🏪',
      'online': '💻',
      'app': '📲'
    };
    
    return iconMap[iconType] || '📋';
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white dashboard-card-border" style={{ borderRadius: '4px' }}>
      <div className="flex items-center space-x-3">
        <div className="w-[40px] h-[40px] bg-gray-100 rounded-full flex items-center justify-center">
          <div className="text-gray-600 text-lg">
            {renderIcon(forma.icone)}
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-700 text-xs">{forma.nome}</p>
          <p className="text-xs text-gray-500">{dashboard.formaPedido}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold text-gray-900">{forma.valor}</span>
        <p className="text-xs text-gray-500">{dashboard.pedidos}</p>
      </div>
    </div>
  );
};

export const FormasPedidas: React.FC<FormasPedidasProps> = React.memo(({ formas, loading = false }) => {
  const { dashboard } = useDashboardTranslation();
  const { logError } = useErrorHandler();
  
  // Obter dados com fallback usando o serviço centralizado
  const formasExibir = getDataWithFallback(formas, 'formas');
  
  // Log de erro se não houver dados
  React.useEffect(() => {
    if (formas.length === 0 && !loading) {
      logError(
        new Error('No order types data available'),
        { component: 'FormasPedidas', action: 'data-fallback' },
        'low'
      );
    }
  }, [formas.length, loading, logError]);

  if (loading) {
    return (
      <div className="pb-2">
        <div className="mb-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[500px] pb-2" aria-labelledby="formas-pedido-title">
      <div className="mb-6">
        <h2 id="formas-pedido-title" className="text-base font-semibold text-gray-900">
          {dashboard.formasDePedido}
        </h2>
      </div>
      
      <div className="h-full flex flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
          {formasExibir.map((forma, index) => (
            <FormaPedidaItem key={index} forma={forma} />
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-green-800 mb-2">{dashboard.economiaComTaxas}</h3>
        <p className="text-xs text-green-700">
          {dashboard.economiaComTaxasDescricao}
        </p>
      </div>
    </div>
  );
});

FormasPedidas.displayName = 'FormasPedidas';
