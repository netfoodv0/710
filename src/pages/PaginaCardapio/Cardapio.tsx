import React from 'react';
import { CardapioProvider } from '../../context/CardapioContext';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useCardapio } from './hooks/useCardapio';

// Componentes
import { CardapioLayout } from './components/CardapioLayout';

export default function Cardapio() {
  const { 
    data, 
    handleRetry 
  } = useCardapio();

  return (
    <ErrorBoundary>
      <CardapioProvider>
        <CardapioLayout 
          data={data}
          onRetry={handleRetry}
        />
      </CardapioProvider>
    </ErrorBoundary>
  );
}
