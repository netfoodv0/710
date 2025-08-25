import React, { useEffect } from 'react';
import { CardapioProvider } from '../context/CardapioContext';
import { CardapioContent } from '../features/cardapio/components/CardapioContent';
import { ErrorBoundary } from '../components/ErrorBoundary';


export default function Cardapio() {




  return (
    <ErrorBoundary>
      <CardapioProvider>
        <CardapioContent />
      </CardapioProvider>
    </ErrorBoundary>
  );
}