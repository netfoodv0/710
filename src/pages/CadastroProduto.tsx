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
import { CadastroProdutoLoading, CadastroProdutoHeader } from './CadastroProduto/components';

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
      <div className="min-h-screen bg-slate-50">
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

        {/* Cabeçalho fixo reutilizável */}
        <CadastroProdutoHeader
          isEditMode={isEditMode}
          status={status}
          onStatusChange={handleStatusChange}
          onCancel={handleCancel}
          onSave={() => {
            // Encontrar o formulário e submeter
            const form = document.getElementById('produto-form') as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
          isSubmitting={isSubmitting}
        />
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[82px]" />

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
