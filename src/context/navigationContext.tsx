import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface NavigationContextType {
  isNavigating: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  startNavigation: () => void;
  endNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPage, setCurrentPage] = useState('relatorios');

  const startNavigation = useCallback(() => setIsNavigating(true), []);
  const endNavigation = useCallback(() => setIsNavigating(false), []);

  const handleSetCurrentPage = useCallback((page: string) => {
    setCurrentPage(page);
    // Navegação instantânea - sem loading
  }, []);

  const contextValue = useMemo(() => ({
    isNavigating,
    currentPage,
    setCurrentPage: handleSetCurrentPage,
    startNavigation,
    endNavigation,
  }), [isNavigating, currentPage, handleSetCurrentPage, startNavigation, endNavigation]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
