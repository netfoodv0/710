import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FixedPageHeader } from './FixedPageHeader';

interface PageHeaderConfig {
  title: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  height?: number;
}

interface PageHeaderContextType {
  setHeader: (config: PageHeaderConfig) => void;
  clearHeader: () => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export function usePageHeader() {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within PageHeaderProvider');
  }
  return context;
}

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [headerConfig, setHeaderConfig] = useState<PageHeaderConfig | null>(null);
  
  const setHeader = useCallback((config: PageHeaderConfig) => {
    setHeaderConfig(config);
  }, []);
  
  const clearHeader = useCallback(() => {
    setHeaderConfig(null);
  }, []);
  
  // Memoizar o objeto value para evitar recriações desnecessárias
  const contextValue = useCallback(() => ({ setHeader, clearHeader }), [setHeader, clearHeader]);
  
  return (
    <PageHeaderContext.Provider value={contextValue()}>
      {/* Renderizar header primeiro para que fique acima do conteúdo */}
      {headerConfig && (
        <FixedPageHeader {...headerConfig} />
      )}
      {children}
    </PageHeaderContext.Provider>
  );
}

