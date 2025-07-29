import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '../services/authService';
import type { Usuario, Loja, AuthState, AuthStatus } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, senha: string) => Promise<void>;
  cadastrarLoja: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const updateState = (updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Função para limpar erro
  const clearError = () => {
    updateState({ error: null });
  };

  // Função de login
  const login = async (email: string, senha: string) => {
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
  };

  // Função de cadastro
  const cadastrarLoja = async (data: any) => {
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
  };

  // Função de logout
  const logout = async () => {
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
      throw error;
    }
  };

  // Listener para mudanças de autenticação
  useEffect(() => {
    console.log('Setting up auth listener...');
    
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      
      if (firebaseUser) {
        try {
          updateState({ status: 'loading' });
          
          const user = await AuthService.getCurrentUser();
          const loja = await AuthService.getCurrentLoja();
          
          console.log('User data:', user);
          console.log('Loja data:', loja);
          
          if (user) {
            updateState({
              user,
              loja,
              status: 'authenticated',
              error: null
            });
          } else {
            updateState({
              user: null,
              loja: null,
              status: 'unauthenticated',
              error: null
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

  const value: AuthContextType = {
    ...state,
    login,
    cadastrarLoja,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 