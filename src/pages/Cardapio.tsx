import React, { useState, useEffect, useCallback } from 'react';
import { Package, Settings, Plus, List, AlertCircle } from 'lucide-react';
import { GerenciadorCategorias, FiltrosCardapio, EstatisticasCardapio } from '../components/cardapio';
import { ListaProdutos } from '../components/produtos';
import { useProdutosFirebase } from '../hooks/useProdutosFirebase';
import { useCategoriasFirebase } from '../hooks/useCategoriasFirebase';
import { useFiltrosCardapio } from '../hooks/useFiltrosCardapio';
import { useNotificationContext } from '../context/notificationContextUtils';
import { useAnalyticsContext } from '../context/analyticsContextUtils';
import { useAnalyticsService } from '../utils/analytics';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Cardapio() {
  const [activeSection, setActiveSection] = useState<'categorias' | 'produtos'>('categorias');

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

        {/* Cabeçalho Fixo */}
        <div className="flex-shrink-0 p-4">
          <div className="bg-white border border-slate-200 rounded" style={{ height: '72px' }}>
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ height: '100%' }}>
              {/* Esquerda: Título e subtítulo */}
              <div>
                <h1 className="text-sm font-bold text-gray-900">Cardápio</h1>
                <p className="text-gray-600 mt-1 text-xs">Gerencie seus produtos e categorias</p>
              </div>
              
              {/* Direita: Ações */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleSectionChange('categorias')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    activeSection === 'categorias'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Categorias
                </button>
                <button 
                  onClick={() => handleSectionChange('produtos')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    activeSection === 'produtos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Produtos
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