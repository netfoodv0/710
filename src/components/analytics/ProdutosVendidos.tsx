import React from 'react';
import { useDashboardTranslation } from '../../pages/PaginaDashboard/hooks';
import { useDataFormatter } from '../../pages/PaginaDashboard/hooks';
import { useErrorHandler } from '../../services/errorService';
import { getDataWithFallback } from '../../services/mockDataService';
import { ProdutoVendido } from '../../pages/PaginaDashboard/types';
import { AccessIcon } from '../ui';

interface ProdutosVendidosProps {
  produtos: ProdutoVendido[];
  loading?: boolean;
}

// Componente para renderizar item individual
const ProdutoItem: React.FC<{ produto: any }> = ({ produto }) => {
  const { formatCurrency } = useDataFormatter();
  const { dashboard } = useDashboardTranslation();

  // Usar imagem do produto se disponível, senão usar placeholder
  const imagemProduto = produto.imagem || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkMzNS41ODE3IDMyIDMyIDM1LjU4MTcgMzIgNDBTMzUuNTgxNyA0OCA0MCA0OFM0OCA0NC40MTgzIDQ4IDQwUzQ0LjQxODMgMzIgNDAgMzJaTTQwIDQ0QzM3Ljc5MDkgNDQgMzYgNDIuMjA5MSAzNiA0MFMzNy43OTA5IDM2IDQwIDM2UzQ0IDM3Ljc5MDkgNDQgNDBTNDIuMjA5MSA0NCA0MCA0NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 bg-white dashboard-card-border h-[62px]" style={{ borderRadius: '4px' }}>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={imagemProduto} 
          alt={`Imagem do produto ${produto.nome}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback para placeholder SVG
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkMzNS41ODE3IDMyIDMyIDM1LjU4MTcgMzIgNDBTMzUuNTgxNyA0OCA0MCA0OFM0OCA0NC40MTgzIDQ4IDQwUzQ0LjQxODMgMzIgNDAgMzJaTTQwIDQ0QzM3Ljc5MDkgNDQgMzYgNDIuMjA5MSAzNiA0MFMzNy43OTA5IDM2IDQwIDM2UzQ0IDM3Ljc5MDkgNDQgNDBTNDIuMjA5MSA0NCA0MCA0NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
          }}
        />
      </div>
      <div className="grid grid-rows-2 gap-1">
        <p className="font-medium text-gray-700 text-sm">{produto.nome}</p>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-xs text-gray-500">{produto.quantidade} {dashboard.vendas}</span>
          <span className="text-xs font-semibold text-gray-900">{formatCurrency(produto.valorTotal || produto.receita || 0)}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    </div>
  );
};

export const ProdutosVendidos: React.FC<ProdutosVendidosProps> = React.memo(({ produtos, loading = false }) => {
  const { dashboard } = useDashboardTranslation();
  const { logError } = useErrorHandler();
  
  // Obter dados com fallback usando o serviço centralizado
  const produtosExibir = getDataWithFallback(produtos, 'produtos');
  
  // Log de erro se não houver dados
  React.useEffect(() => {
    if (produtos.length === 0 && !loading) {
      logError(
        new Error('No products data available'),
        { component: 'ProdutosVendidos', action: 'data-fallback' },
        'low'
      );
    }
  }, [produtos.length, loading, logError]);

  if (loading) {
    return (
      <div aria-labelledby="top-produtos-title">
        <div className="mb-4">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
        <div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-10 bg-gray-200 rounded-[100px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[500px]" aria-labelledby="top-produtos-title">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="top-produtos-title" className="text-base font-semibold text-gray-900">
          {dashboard.topProdutos}
        </h2>
        <a 
          href="/relatorios/geral" 
          className="inline-flex items-center justify-center px-3 py-2 h-8 bg-[#f5f5f5] text-gray-800 text-sm font-medium rounded-[100px] hover:bg-[#e5e5e5] transition-colors dashboard-focus-visible border border-gray-300"
          aria-label={dashboard.acessarRelatoriosCompletos}
          role="button"
        >
          <AccessIcon size={24} color="#6b7280" />
        </a>
      </div>
      
      <div>
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
            {produtosExibir.map((produto, index) => (
              <ProdutoItem key={index} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProdutosVendidos.displayName = 'ProdutosVendidos';
