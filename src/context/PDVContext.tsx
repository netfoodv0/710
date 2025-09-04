import React, { createContext, useContext, ReactNode } from 'react';
import { usePDV } from '../hooks/usePDV';

// Criar o contexto
const PDVContext = createContext<ReturnType<typeof usePDV> | undefined>(undefined);

// Provider do contexto
export const PDVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pdvState = usePDV();
  
  return (
    <PDVContext.Provider value={pdvState}>
      {children}
    </PDVContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const usePDVContext = () => {
  const context = useContext(PDVContext);
  if (context === undefined) {
    throw new Error('usePDVContext deve ser usado dentro de um PDVProvider');
  }
  return context;
};

