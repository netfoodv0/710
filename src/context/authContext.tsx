import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '../services/authService';
import type { Usuario, Loja, AuthState, AuthStatus } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, senha: string) => Promise<void>;
  cadastrarLoja: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ EXPORTAR o AuthContext
export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loja: null,
    status: 'idle',
    error: null
  });

  // Função para atualizar o estado
  const updateState = useCallback((updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Função para limpar erro
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  // Função para recarregar dados do usuário
  const refreshUserData = useCallback(async () => {
    try {
      console.log('🔄 Recarregando dados do usuário...');
      updateState({ status: 'loading', error: null });
      
      const user = await AuthService.getCurrentUser();
      const loja = await AuthService.getCurrentLoja();
      
      console.log('👤 Usuário obtido:', user?.uid, 'Email:', user?.email);
      console.log('🏪 Loja obtida:', loja?.nomeLoja);
      
      if (user) {
        updateState({
          user,
          loja,
          status: 'authenticated',
          error: null
        });
        console.log('✅ Usuário autenticado com sucesso');
      } else {
        updateState({
          user: null,
          loja: null,
          status: 'unauthenticated',
          error: null
        });
        console.log('❌ Usuário não autenticado');
      }
    } catch (error: any) {
      console.error('❌ Erro ao recarregar dados do usuário:', error);
      updateState({
        status: 'error',
        error: 'Erro ao carregar dados do usuário'
      });
    }
  }, [updateState]);

  // Função de login
  const login = useCallback(async (email: string, senha: string) => {
    try {
      updateState({ status: 'loading', error: null });
      
      const user = await AuthService.login({ email, senha });
      const loja = await AuthService.getCurrentLoja();
      
      updateState({
        user,
        loja,
        status: 'authenticated',
        error: null
      });
    } catch (error: any) {
      updateState({
        status: 'error',
        error: error.message
      });
      throw error;
    }
  }, [updateState]);

  // Função de cadastro
  const cadastrarLoja = useCallback(async (data: any) => {
    try {
      updateState({ status: 'loading', error: null });
      
      const { usuario, loja } = await AuthService.cadastrarLoja(data);
      
      updateState({
        user: usuario,
        loja,
        status: 'authenticated',
        error: null
      });
    } catch (error: any) {
      updateState({
        status: 'error',
        error: error.message
      });
      throw error;
    }
  }, [updateState]);

  // Função de logout
  const logout = useCallback(async () => {
    try {
      updateState({ status: 'loading' });
      
      await AuthService.logout();
      
      updateState({
        user: null,
        loja: null,
        status: 'unauthenticated',
        error: null
      });
    } catch (error: any) {
      updateState({
        status: 'error',
        error: error.message
      });
    }
  }, [updateState]);

  // Listener para mudanças de autenticação
  useEffect(() => {
    
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      
      if (firebaseUser) {
        try {
          updateState({ status: 'loading' });
          
          const user = await AuthService.getCurrentUser();
          const loja = await AuthService.getCurrentLoja();
          
          if (user) {
            updateState({
              user,
              loja,
              status: 'authenticated',
              error: null
            });
          } else {
            // Usuário Firebase existe mas não tem dados no Firestore
            console.warn('Usuário Firebase existe mas não tem dados no Firestore');
            updateState({
              user: null,
              loja: null,
              status: 'unauthenticated',
              error: 'Dados do usuário não encontrados'
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          updateState({
            user: null,
            loja: null,
            status: 'error',
            error: 'Erro ao carregar dados do usuário'
          });
        }
      } else {
        updateState({
          user: null,
          loja: null,
          status: 'unauthenticated',
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = useMemo(() => ({
    ...state,
    login,
    cadastrarLoja,
    logout,
    clearError,
    refreshUserData
  }), [state, login, cadastrarLoja, logout, clearError, refreshUserData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ REMOVER o hook useAuth daqui para evitar conflitos
// O hook useAuth está em src/hooks/useAuth.ts 
