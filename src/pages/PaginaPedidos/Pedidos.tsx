import React from 'react';

// Hooks customizados
import { usePedidos } from './hooks/usePedidos';

// Componentes
import { PedidosLayout } from './components/PedidosLayout';

export default function Pedidos() {
  const { 
    data, 
    handleAceitar,
    handleAvançar,
    handleFinalizar,
    handleRecusar,
    handleSearchChange,
    handleClearSearch,
    handleSearchSubmit,
    handleOpenPDV
  } = usePedidos();

  return (
    <PedidosLayout 
      data={data}
      onAceitar={handleAceitar}
      onAvançar={handleAvançar}
      onFinalizar={handleFinalizar}
      onRecusar={handleRecusar}
      onSearchChange={handleSearchChange}
      onClearSearch={handleClearSearch}
      onSearchSubmit={handleSearchSubmit}
      onOpenPDV={handleOpenPDV}
    />
  );
}


