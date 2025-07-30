import React, { useState, useEffect, useCallback } from 'react';
import { Package, Settings, Plus, List, AlertCircle } from 'lucide-react';
import { GerenciadorCategorias, FiltrosCardapio, EstatisticasCardapio } from '../features/cardapio/components';
import { ListaProdutos } from '../components/lists/ListaProdutos';
import { useProdutosFirebase } from '../hooks/useProdutosFirebase';
import { useCategoriasFirebase } from '../hooks/useCategoriasFirebase';
import { useFiltrosCardapio } from '../hooks/useFiltrosCardapio';
import { useNotificationContext } from '../context/notificationContextUtils';
import { useAnalyticsContext } from '../context/analyticsContextUtils';
import { useAnalyticsService } from '../utils/analytics';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useIsMobile } from '../hooks/useMediaQuery';

export function Cardapio() {
  const [activeSection, setActiveSection] = useState<'categorias' | 'produtos'>('categorias');
  const isMobile = useIsMobile();

  const {
    produtos,
    loading: loadingProdutos,
    error: errorProdutos,
    criarProduto,
    editarProduto,
    excluirProduto,
    duplicarProduto,
    estatisticas
  } = useProdutosFirebase();

  const { categorias } = useCategoriasFirebase();

  const {
    filtros,
    searchTerm,
    produtosFiltrados,
    estatisticasFiltros,
    handleFiltrosChange,
    setSearchTerm
  } = useFiltrosCardapio(produtos);

  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  // ✅ MELHORIA: Analytics seguro
  const { analytics } = useAnalyticsContext();
  const analyticsService = useAnalyticsService(analytics);

  const sections = [
    {
      id: 'categorias' as const,
      label: 'Gerenciar Categorias',
      icon: Settings,
      description: 'Organize categorias de produtos e adicionais'
    },
    {
      id: 'produtos' as const,
      label: 'Produtos',
      icon: Package,
      description: 'Gerencie produtos do cardápio'
    }
  ];

  const handleToggleStatus = useCallback(async (id: string, status: 'ativo' | 'inativo' | 'em_falta') => {
    try {
      await editarProduto(id, { status });
      showSuccess('Status do produto atualizado com sucesso!');
      
      // ✅ MELHORIA: Log do evento de analytics
      analyticsService.logProdutoEvent('toggle_status', id);
    } catch (error) {
      showError('Erro ao atualizar status do produto');
    }
  }, [editarProduto, showSuccess, showError, analyticsService]);

  const handleRetry = useCallback(() => {
    // Recarregar dados
    window.location.reload();
  }, []);

  // ✅ MELHORIA: Log de mudança de seção
  const handleSectionChange = useCallback((section: 'categorias' | 'produtos') => {
    setActiveSection(section);
    analyticsService.logCardapioEvent('mudanca_secao', { secao: section });
  }, [analyticsService]);

  // ✅ MELHORIA: Log de filtros aplicados
  const handleFiltrosChangeWithAnalytics = useCallback((novosFiltros: any) => {
    handleFiltrosChange(novosFiltros);
    
    // Log apenas filtros que mudaram
    Object.entries(novosFiltros).forEach(([key, value]) => {
      if (filtros[key as keyof typeof filtros] !== value) {
        analyticsService.logFiltroEvent(key, String(value));
      }
    });
  }, [handleFiltrosChange, filtros, analyticsService]);

  // ✅ MELHORIA: Log de busca
  const handleSearchChangeWithAnalytics = useCallback((term: string) => {
    setSearchTerm(term);
    
    if (term.length > 2) {
      analyticsService.logBuscaEvent(term, produtosFiltrados.length);
    }
  }, [setSearchTerm, produtosFiltrados.length, analyticsService]);

  // Error state
  if (errorProdutos) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
          </div>
          <p className="text-red-700 mb-4">{errorProdutos}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={removeNotification}
          />
        ))}

        {/* Cabeçalho Fixo - Melhorado para Mobile */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-white border border-slate-200 rounded">
            <div className="p-4">
              {/* Título e subtítulo */}
              <div className="mb-4">
                <h1 className="text-lg font-bold text-gray-900">Cardápio</h1>
                <p className="text-gray-600 mt-1 text-sm">Gerencie seus produtos e categorias</p>
              </div>
              
              {/* Navegação por Abas - Melhorada para Mobile */}
              <div className="flex bg-gray-100 rounded-lg p-1 cardapio-tabs">
                <button 
                  onClick={() => handleSectionChange('categorias')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 cardapio-tab mobile-nav-button ${
                    activeSection === 'categorias'
                      ? 'bg-white text-blue-600 shadow-sm active'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Categorias</span>
                  <span className="sm:hidden">Cat.</span>
                </button>
                <button 
                  onClick={() => handleSectionChange('produtos')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 cardapio-tab mobile-nav-button ${
                    activeSection === 'produtos'
                      ? 'bg-white text-blue-600 shadow-sm active'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Produtos</span>
                  <span className="sm:hidden">Prod.</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col px-4 pb-4">
          {/* Estatísticas - apenas para seção de produtos */}
          {activeSection === 'produtos' && (
            <div className="flex-shrink-0 mb-4">
              <EstatisticasCardapio estatisticas={estatisticasFiltros} />
            </div>
          )}

          {/* Filtros - apenas para seção de produtos */}
          {activeSection === 'produtos' && (
            <div className="flex-shrink-0 mb-4">
              <FiltrosCardapio
                filtros={filtros}
                onFiltrosChange={handleFiltrosChangeWithAnalytics}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChangeWithAnalytics}
                categorias={categorias.map(cat => cat.nome)}
              />
            </div>
          )}

          {/* Conteúdo Principal */}
          <div className="flex-1 bg-white border border-slate-200 rounded">
            {activeSection === 'categorias' ? (
              <div>
                <div className="p-4">
                  <GerenciadorCategorias />
                </div>
              </div>
            ) : (
              <div>
                <div className="p-4">
                  <ListaProdutos
                    produtos={produtosFiltrados}
                    categorias={categorias}
                    loading={loadingProdutos}
                    onCreate={criarProduto}
                    onEdit={editarProduto}
                    onDelete={excluirProduto}
                    onDuplicate={duplicarProduto}
                    onToggleStatus={handleToggleStatus}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}