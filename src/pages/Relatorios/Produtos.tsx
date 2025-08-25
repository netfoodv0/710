import React, { useState, useCallback } from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { PeriodType } from '../../components/filters/FiltroPeriodo';

import { DataTable } from '../../components/ui';

// Componentes refatorados
import { 
  EstatisticasProdutos, 
  DistribuicaoCategoria, 
  HeaderRelatorioProdutos,
  useConfiguracaoTabelaProdutos 
} from '../../components/relatorios';

// Dados e hooks
import { 
  produtosFicticios, 
  estatisticasProdutos, 
  categorias, 
  cardPercentages 
} from '../../data/produtosMock';
import { useAnimacaoCards } from '../../hooks/useAnimacaoCards';

// Estilos
import './Produtos.css';

export default function RelatoriosProdutos() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hook para animações dos cards
  const { carregamentoCompleto, mostrarAnimacoes, alturasAnimadas } = useAnimacaoCards({
    percentuais: cardPercentages
  });
  
  // Configuração da tabela
  const { columns } = useConfiguracaoTabelaProdutos();
  
  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  // Categorias únicas para filtros
  const categoriasFiltros = React.useMemo(() => {
    return categorias.map(cat => ({ value: cat, label: cat }));
  }, []);

  // Status únicos para filtros
  const statusOptions = React.useMemo(() => {
    const status = [...new Set(produtosFicticios.map(p => p.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  // Destaque únicos para filtros
  const destaqueOptions = React.useMemo(() => {
    const destaque = [...new Set(produtosFicticios.map(p => p.destaque))];
    return destaque.map(d => ({ value: d.toString(), label: d ? 'Destaque' : 'Normal' }));
  }, []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      // Implementar exportação específica para produtos
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      showSuccess('Relatório de produtos exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório de produtos');
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}

        {/* Cabeçalho da página */}
        <HeaderRelatorioProdutos
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
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

          {/* Conteúdo principal com loading */}
          {!carregamentoCompleto ? (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando relatório de produtos...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Container de Estatísticas de Produtos */}
              <EstatisticasProdutos estatisticas={estatisticasProdutos} />

              {/* Funil de Fidelidade */}
              <DistribuicaoCategoria
                categorias={categorias}
                percentuais={cardPercentages}
                alturasAnimadas={alturasAnimadas}
                mostrarAnimacoes={mostrarAnimacoes}
              />

              {/* Tabela de Produtos */}
              <DataTable
                data={produtosFicticios}
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
            </>
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
