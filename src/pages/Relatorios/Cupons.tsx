import React, { useState, useCallback } from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { PeriodType } from '../../components/filters/FiltroPeriodo';

import { DataTable } from '../../components/ui';

// Componentes refatorados
import { 
  EstatisticasCupons, 
  DistribuicaoCategoria, 
  HeaderRelatorioCupons,
  useConfiguracaoTabelaCupons 
} from '../../components/relatorios';

// Dados e hooks
import { 
  cuponsFicticios, 
  estatisticasCupons, 
  categorias, 
  cardPercentages 
} from '../../data/cuponsMock';
import { useAnimacaoCards } from '../../hooks/useAnimacaoCards';

// Estilos
import './Cupons.css';

export default function RelatoriosCupons() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hook para animações dos cards
  const percentuais = React.useMemo(() => 
    cardPercentages.map(card => card.percentual), 
    [cardPercentages]
  );
  
  const { carregamentoCompleto, mostrarAnimacoes, alturasAnimadas } = useAnimacaoCards({
    percentuais
  });
  
  // Configuração da tabela
  const { columns } = useConfiguracaoTabelaCupons();
  
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
    const status = [...new Set(cuponsFicticios.map(c => c.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  // Tipo únicos para filtros
  const tipoOptions = React.useMemo(() => {
    const tipos = [...new Set(cuponsFicticios.map(c => c.tipo))];
    return tipos.map(t => ({ value: t, label: t === 'percentual' ? 'Percentual' : 'Valor Fixo' }));
  }, []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      // Implementar exportação específica para cupons
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      showSuccess('Relatório de cupons exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório de cupons');
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
        <HeaderRelatorioCupons
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
          loading={loading}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="px-4 sm:px-6 pt-2 pb-12 cupons-content-container">
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
                <p className="mt-4 text-gray-600">Carregando relatório de cupons...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Container de Estatísticas de Cupons */}
              <div className="cupons-stats-container">
                <EstatisticasCupons estatisticas={estatisticasCupons} />
              </div>

              {/* Distribuição por Categoria */}
              <div className="cupons-chart-container">
                <DistribuicaoCategoria
                  categorias={categorias}
                  percentuais={cardPercentages.map(card => card.percentual)}
                  alturasAnimadas={alturasAnimadas}
                  mostrarAnimacoes={mostrarAnimacoes}
                />
              </div>

              {/* Tabela de Cupons */}
              <div className="cupons-table-container">
                <DataTable
                  data={cuponsFicticios}
                  columns={columns}
                  searchPlaceholder="Buscar cupons..."
                  searchFields={['codigo', 'descricao']}
                  filters={{
                    categories: categoriasFiltros,
                    statuses: statusOptions,
                    tipos: tipoOptions,
                    showDateRange: true
                  }}
                  actions={{
                    onView: (cupom) => console.log('Visualizar:', cupom),
                    onEdit: (cupom) => console.log('Editar:', cupom),
                    onDelete: (cupom) => console.log('Excluir:', cupom)
                  }}
                  pagination={{
                    itemsPerPageOptions: [5, 8, 10, 15, 20],
                    defaultItemsPerPage: 8
                  }}
                  onAdd={() => console.log('Adicionar novo cupom')}
                  addButtonText="Novo Cupom"
                />
              </div>
            </>
          )}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
