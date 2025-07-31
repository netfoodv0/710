import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Loja } from '../types/auth';

interface LojaContextType {
  loja: Loja | null;
  lojaId: string | null;
  isLoading: boolean;
  error: string | null;
  refreshLoja: () => Promise<void>;
}

const LojaContext = createContext<LojaContextType | undefined>(undefined);

export { LojaContext };

interface LojaProviderProps {
  children: ReactNode;
}

export const LojaProvider: React.FC<LojaProviderProps> = ({ children }) => {
  const { user, status } = useAuth();
  const [loja, setLoja] = useState<Loja | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lojaId = user?.uid || null;

  const refreshLoja = async () => {
    if (!lojaId) {
      setLoja(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Buscar dados da loja do Firestore
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      const lojaDoc = await getDoc(doc(db, 'lojas', lojaId));
      
      if (lojaDoc.exists()) {
        const lojaData = lojaDoc.data() as Loja;
        setLoja(lojaData);
      } else {
        setError('Dados da loja não encontrados');
        setLoja(null);
      }
    } catch (err: any) {
      console.error('Erro ao carregar dados da loja:', err);
      setError('Erro ao carregar dados da loja');
      setLoja(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar dados da loja quando o usuário mudar
  useEffect(() => {
    if (status === 'authenticated' && lojaId) {
      refreshLoja();
    } else if (status === 'unauthenticated') {
      setLoja(null);
      setIsLoading(false);
      setError(null);
    }
  }, [status, lojaId]);

  const value: LojaContextType = {
    loja,
    lojaId,
    isLoading,
    error,
    refreshLoja
  };

  return (
    <LojaContext.Provider value={value}>
      {children}
    </LojaContext.Provider>
  );
};

// Hook para usar o contexto da loja
export const useLoja = () => {
  const context = useContext(LojaContext);
  if (context === undefined) {
    throw new Error('useLoja deve ser usado dentro de um LojaProvider');
  }
  return context;
}; 