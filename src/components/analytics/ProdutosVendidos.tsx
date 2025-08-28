import React from 'react';
import { useDashboardTranslation } from '../../hooks/useTranslation';
import { useDataFormatter } from '../../hooks/useDataFormatter';
import { useErrorHandler } from '../../services/errorService';
import { getDataWithFallback } from '../../services/mockDataService';
import { ProdutoVendido } from '../../types/dashboard';
import { ReportIcon, ContainerCustom } from '../ui';

interface ProdutosVendidosProps {
  produtos: ProdutoVendido[];
  loading?: boolean;
}

// Componente para renderizar item individual
const ProdutoItem: React.FC<{ produto: ProdutoVendido }> = ({ produto }) => {
  const { getProductImage, formatCurrency } = useDataFormatter();
  const { dashboard } = useDashboardTranslation();
  const { handleImageError } = useErrorHandler();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 bg-white rounded-lg dashboard-card-border h-[62px]">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={getProductImage(produto.nome)} 
          alt={`Imagem do produto ${produto.nome}`}
          className="w-full h-full object-cover"
          onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center', 'ProdutoItem')}
        />
      </div>
      <div className="grid grid-rows-2 gap-1">
        <p className="font-medium text-gray-700 text-sm">{produto.nome}</p>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-xs text-gray-500">{produto.quantidade} {dashboard.vendas}</span>
          <span className="text-xs font-semibold text-gray-900">{formatCurrency(produto.receita)}</span>
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
      <section className="dashboard-analytics-card" aria-labelledby="top-produtos-title">
        <div className="dashboard-analytics-header">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
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
      </section>
    );
  }

  return (
    <ContainerCustom className="flex flex-col max-h-[500px]" aria-labelledby="top-produtos-title">
      <div className="dashboard-analytics-header">
        <h2 id="top-produtos-title" className="text-base font-semibold text-gray-900">
          {dashboard.topProdutos}
        </h2>
      </div>
      
      <div className="dashboard-analytics-content">
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
            {produtosExibir.map((produto, index) => (
              <ProdutoItem key={index} produto={produto} />
            ))}
          </div>
          
          <div className="mt-auto pt-2 flex-shrink-0">
            <a 
              href="/relatorios/geral" 
              className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors dashboard-focus-visible"
              aria-label={dashboard.acessarRelatoriosCompletos}
              role="button"
            >
              <ReportIcon size={24} color="#FFFFFF" />
              <span>{dashboard.acessarRelatoriosCompletos}</span>
            </a>
          </div>
        </div>
      </div>
    </ContainerCustom>
  );
});

ProdutosVendidos.displayName = 'ProdutosVendidos';
