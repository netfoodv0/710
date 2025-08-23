import React from 'react';
import { CardapioHeader } from './CardapioHeader';
import { CardapioSidebar } from './CardapioSidebar';
import { CardapioMain } from './CardapioMain';
import { CardapioModals } from './CardapioModals';
import { CardapioNotifications } from './CardapioNotifications';
import { CardapioError } from './CardapioError';
import { CardapioSkeleton } from '../../../components/skeletons/CardapioSkeleton';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCardapioSkeleton } from '../../../hooks/useCardapioSkeleton';

export function CardapioContent() {
  const { state } = useCardapioContext();
  const showSkeleton = useCardapioSkeleton();

  // Se houver erro, mostrar componente de erro
  if (state.errorProdutos) {
    return (
      <CardapioError 
        error={state.errorProdutos} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  // Se estiver carregando, mostrar skeleton
  if (showSkeleton) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Cabeçalho */}
        <CardapioHeader />
        
        {/* Skeleton */}
        <CardapioSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      {/* Notificações */}
      <CardapioNotifications />

      {/* Cabeçalho */}
      <CardapioHeader />

      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-0" />

      {/* Conteúdo Principal */}
      <div className="pt-6 px-6">
        {/* Layout em Flex: Sidebar de Categorias + Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Esquerda - Categorias */}
          <CardapioSidebar />

          {/* Conteúdo Principal */}
          <CardapioMain />
        </div>
      </div>

      {/* Modais */}
      <CardapioModals />
    </div>
  );
}
