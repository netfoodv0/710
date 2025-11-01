import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CaixaModalsContextType {
  isModalCaixaFechadoOpen: boolean;
  openModalCaixaFechado: () => void;
  closeModalCaixaFechado: () => void;
  isModalAberturaCaixaOpen: boolean;
  openModalAberturaCaixa: () => void;
  closeModalAberturaCaixa: () => void;
  isModalCaixaAbertoDetalhesOpen: boolean;
  openModalCaixaAbertoDetalhes: () => void;
  closeModalCaixaAbertoDetalhes: () => void;
  closeAllModals: () => void;
}

const CaixaModalsContext = createContext<CaixaModalsContextType | undefined>(undefined);

interface CaixaModalsProviderProps {
  children: ReactNode;
}

export function CaixaModalsProvider({ children }: CaixaModalsProviderProps) {
  const [isModalCaixaFechadoOpen, setIsModalCaixaFechadoOpen] = useState(false);
  const [isModalAberturaCaixaOpen, setIsModalAberturaCaixaOpen] = useState(false);
  const [isModalCaixaAbertoDetalhesOpen, setIsModalCaixaAbertoDetalhesOpen] = useState(false);

  const openModalCaixaFechado = useCallback(() => {
    setIsModalCaixaFechadoOpen(true);
  }, []);

  const closeModalCaixaFechado = useCallback(() => {
    setIsModalCaixaFechadoOpen(false);
  }, []);

  const openModalAberturaCaixa = useCallback(() => {
    setIsModalAberturaCaixaOpen(true);
  }, []);

  const closeModalAberturaCaixa = useCallback(() => {
    setIsModalAberturaCaixaOpen(false);
  }, []);

  const openModalCaixaAbertoDetalhes = useCallback(() => {
    setIsModalCaixaAbertoDetalhesOpen(true);
  }, []);

  const closeModalCaixaAbertoDetalhes = useCallback(() => {
    setIsModalCaixaAbertoDetalhesOpen(false);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsModalCaixaFechadoOpen(false);
    setIsModalAberturaCaixaOpen(false);
    setIsModalCaixaAbertoDetalhesOpen(false);
  }, []);

  return (
    <CaixaModalsContext.Provider
      value={{
        isModalCaixaFechadoOpen,
        openModalCaixaFechado,
        closeModalCaixaFechado,
        isModalAberturaCaixaOpen,
        openModalAberturaCaixa,
        closeModalAberturaCaixa,
        isModalCaixaAbertoDetalhesOpen,
        openModalCaixaAbertoDetalhes,
        closeModalCaixaAbertoDetalhes,
        closeAllModals,
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








