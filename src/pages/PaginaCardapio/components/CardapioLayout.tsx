import React from 'react';
import { CardapioHeader } from '../../../features/cardapio/components/CardapioHeader';
import { CardapioSidebar } from '../../../features/cardapio/components/CardapioSidebar';
import { CardapioMain } from '../../../features/cardapio/components/CardapioMain';
import { CardapioModals } from '../../../features/cardapio/components/CardapioModals';
import { CardapioNotifications } from '../../../features/cardapio/components/CardapioNotifications';
import { CardapioModalsProvider } from '../../../context/CardapioModalsContext';

export function CardapioLayout() {
  return (
    <CardapioModalsProvider>
      <div className="min-h-screen">
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
    </CardapioModalsProvider>
  );
}

