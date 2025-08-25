import React from 'react';
import { MesasProvider } from '../context/MesasContext';
import { MesasContent } from '../features/mesas/components/MesasContent';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Mesas() {
  return (
    <ErrorBoundary>
      <MesasProvider>
        <MesasContent />
      </MesasProvider>
    </ErrorBoundary>
  );
}

// Export default para compatibilidade com lazy loading
export default Mesas;