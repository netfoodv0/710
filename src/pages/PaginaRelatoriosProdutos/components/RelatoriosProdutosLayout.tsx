import React from 'react';
import { NotificationToast } from '../../../components/NotificationToast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { HeaderRelatorioProdutos } from '../../../components/relatorios';
import { DataTable } from '../../../components/ui';
import { EstatisticasCustom } from '../../../components/EstatisticasCustom';
import { BagIcon, NewCustomerIcon, CompletedOrderIcon, RevenueIcon } from '../../../components/ui';
import { ChartBarDaily } from '../../../components/charts/BarChartDaily';
import { RelatoriosProdutosLayoutProps } from '../types';

export function RelatoriosProdutosLayout({
  selectedPeriod,
  onPeriodChange,
  onExport,
  loading,
  error,
  produtos,
  columns,
  categoriasFiltros,
  statusOptions,
  destaqueOptions,
  estatisticasProdutos
}: RelatoriosProdutosLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho da página */}
        <HeaderRelatorioProdutos
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
          onExport={onExport}
          loading={loading}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-6 pt-2 pb-12" style={{ padding: '24px 24px 50px 24px' }}>
          {/* Loading state apenas para operações específicas */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Processando...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    Erro ao carregar relatório
                  </h3>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Container de Estatísticas de Produtos */}
          <EstatisticasCustom
            estatisticas={[
              {
                label: 'Total de Produtos',
                valor: estatisticasProdutos.totalProdutos,
                icon: BagIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Novos Produtos',
                valor: estatisticasProdutos.novosProdutos,
                icon: NewCustomerIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Produtos em Destaque',
                valor: estatisticasProdutos.produtosDestaque,
                icon: CompletedOrderIcon,
                iconColor: '#6b7280'
              },
              {
                label: 'Taxa de Vendas',
                valor: `${estatisticasProdutos.taxaVendas.toFixed(1)}%`,
                icon: RevenueIcon,
                iconColor: '#6b7280'
              }
            ]}
          />
          
          {/* Margem de 24px abaixo das estatísticas */}
          <div className="mb-6"></div>

          {/* Gráfico de Barras Diário */}
          <ChartBarDaily />
          
          {/* Margem abaixo do gráfico */}
          <div className="mb-6"></div>

          {/* Tabela de Produtos */}
          <DataTable
            data={produtos}
            columns={columns}
            searchPlaceholder="Buscar produtos..."
            searchFields={['nome', 'categoria']}
            filters={{
              categories: categoriasFiltros,
              statuses: statusOptions,
              showDateRange: true
            }}
            actions={{
              onView: (produto) => console.log('Visualizar:', produto)
            }}
            pagination={{
              itemsPerPageOptions: [5, 8, 10, 15, 20],
              defaultItemsPerPage: 8
            }}
            onAdd={() => console.log('Adicionar novo produto')}
            addButtonText="Novo Produto"
          />
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}


