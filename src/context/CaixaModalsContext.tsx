import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CaixaModalsContextType {
  isModalCaixaFechadoOpen: boolean;
  openModalCaixaFechado: () => void;
  closeModalCaixaFechado: () => void;
  isModalAberturaCaixaOpen: boolean;
  openModalAberturaCaixa: () => void;
  closeModalAberturaCaixa: () => void;
  onCaixaAberto: (callback: () => void) => void;
  triggerCaixaAberto: () => void;
}

const CaixaModalsContext = createContext<CaixaModalsContextType | undefined>(undefined);

interface CaixaModalsProviderProps {
  children: ReactNode;
}

export function CaixaModalsProvider({ children }: CaixaModalsProviderProps) {
  const [isModalCaixaFechadoOpen, setIsModalCaixaFechadoOpen] = useState(false);
  const [isModalAberturaCaixaOpen, setIsModalAberturaCaixaOpen] = useState(false);
  const [caixaAbertoCallbacks, setCaixaAbertoCallbacks] = useState<(() => void)[]>([]);

  const openModalCaixaFechado = () => {
    setIsModalCaixaFechadoOpen(true);
  };

  const closeModalCaixaFechado = () => {
    setIsModalCaixaFechadoOpen(false);
  };

  const openModalAberturaCaixa = () => {
    setIsModalAberturaCaixaOpen(true);
  };

  const closeModalAberturaCaixa = () => {
    setIsModalAberturaCaixaOpen(false);
  };

  const onCaixaAberto = useCallback((callback: () => void) => {
    setCaixaAbertoCallbacks(prev => [...prev, callback]);
  }, []);

  const triggerCaixaAberto = useCallback(() => {
    caixaAbertoCallbacks.forEach(callback => callback());
  }, [caixaAbertoCallbacks]);

  return (
    <CaixaModalsContext.Provider
      value={{
        isModalCaixaFechadoOpen,
        openModalCaixaFechado,
        closeModalCaixaFechado,
        isModalAberturaCaixaOpen,
        openModalAberturaCaixa,
        closeModalAberturaCaixa,
        onCaixaAberto,
        triggerCaixaAberto,
      }}
    >
      {children}
    </CaixaModalsContext.Provider>
  );
}

export function useCaixaModals() {
  const context = useContext(CaixaModalsContext);
  if (context === undefined) {
    throw new Error('useCaixaModals deve ser usado dentro de um CaixaModalsProvider');
  }
  return context;
}
