import React from 'react';
import { PDVProvider } from '../../context/PDVContext';

// Hooks customizados
import { usePDV } from './hooks/usePDV';

// Componentes
import { PDVLayout } from './components/PDVLayout';

export const PDVPage: React.FC = () => {
  const { 
    data, 
    handleRetry 
  } = usePDV();

  return (
    <PDVProvider>
      <PDVLayout 
        data={data}
        onRetry={handleRetry}
      />
    </PDVProvider>
  );
};

export default PDVPage;
