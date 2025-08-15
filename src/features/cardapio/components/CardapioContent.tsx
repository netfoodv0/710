import React from 'react';
import { CardapioHeader } from './CardapioHeader';
import { CardapioSidebar } from './CardapioSidebar';
import { CardapioMain } from './CardapioMain';
import { CardapioModals } from './CardapioModals';
import { CardapioNotifications } from './CardapioNotifications';
import { CardapioError } from './CardapioError';
import { useCardapioContext } from '../../../context/CardapioContext';

export function CardapioContent() {
  const { state } = useCardapioContext();

  // Se houver erro, mostrar componente de erro
  if (state.errorProdutos) {
    return (
      <CardapioError 
        error={state.errorProdutos} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      {/* Notificações */}
      <CardapioNotifications />

      {/* Cabeçalho */}
      <CardapioHeader />

      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-[90px] md:h-[98px]" />

      {/* Conteúdo Principal */}
      <div className="pb-4 px-4">
        {/* Layout em Flex: Sidebar de Categorias + Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row gap-4">
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
