// React
import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

// Context e Hooks
import { useNotificationContext } from '../context/notificationContextUtils';
import { useCategorias } from '../hooks/useCategorias';
import { useAuth } from '../hooks/useAuth';

// Componentes
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NovoProdutoForm } from '../components/forms/NovoProdutoForm';

// Componentes locais
import { CadastroProdutoLoading } from './CadastroProduto/components';
import { PageHeader } from '../components/ui';

// Hooks locais
import { useProdutoManager } from './CadastroProduto/hooks';

// Types
import { FormData } from '../hooks/useNovoProdutoForm';

export function CadastroProduto() {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const { notifications, removeNotification } = useNotificationContext();

  // Hooks locais
  const {
    produtoExistente,
    loading,
    isSubmitting,
    status,
    isEditMode,
    handleCancel,
    handleStatusChange,
    handleSubmit,
    getDadosIniciais
  } = useProdutoManager(id);

  // Carregar categorias
  const { getLojaId } = useAuth();
  const lojaId = getLojaId();
  const { categorias: categoriasCompletas, loading: loadingCategorias } = useCategorias(lojaId || '', { status: 'ativo' });

  // Preparar opções de categoria para o select
  const opcoesCategoria = categoriasCompletas.map(categoria => ({
    value: categoria.nome,
    label: categoria.nome
  }));

  // Obter categoria da URL para pré-seleção
  const categoriaUrl = searchParams.get('categoria');
  
  // Preparar dados iniciais do formulário
  const dadosIniciais = getDadosIniciais(categoriaUrl || undefined);





  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#f7f5f3' }}>
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

        {/* Cabeçalho da página */}
        <PageHeader
          title={isEditMode ? "Editar Produto" : "Novo Produto"}
          subtitle={isEditMode ? "Edite as informações do produto" : "Crie um novo produto para seu cardápio"}
          leftContent={
            <div className="flex items-center gap-4">
              {/* Botão Voltar */}
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Voltar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>
              
              {/* Seletor de Status */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as 'ativo' | 'inativo' | 'em_falta')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="em_falta">Em Falta</option>
                </select>
              </div>
            </div>
          }
          actionButton={{
            label: isSubmitting ? "Salvando..." : "Salvar Produto",
            onClick: () => {
              // Encontrar o formulário e submeter
              const form = document.getElementById('produto-form') as HTMLFormElement;
              if (form) {
                form.requestSubmit();
              }
            },
            loading: isSubmitting,
            disabled: isSubmitting,
            variant: "success",
            size: "md"
          }}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Formulário */}
        <NovoProdutoForm
          onSubmit={handleSubmit}
          status={status}
          onStatusChange={handleStatusChange}
          categorias={opcoesCategoria}
          loadingCategorias={loadingCategorias}
          dadosIniciais={dadosIniciais}
        />
      </div>
    </ErrorBoundary>
  );
}
