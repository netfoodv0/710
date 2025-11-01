import React, { createContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '../services/authService';
import { auth } from '../lib/firebase';
import type { AuthState, LoginFormData } from '../types/global/auth';
import { environment } from '../config/environment';

interface AuthContextType extends AuthState {
  cadastrarLoja: (data: any) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      if (environment.app.debug) console.log('🔄 Recarregando dados do usuário...');
      updateState({ status: 'loading', error: null });
      
      const user = await AuthService.getCurrentUser();
      const loja = await AuthService.getCurrentLoja();
      
      if (environment.app.debug) console.log('👤 Usuário obtido:', user?.uid, 'Email:', user?.email);
      if (environment.app.debug) console.log('🏪 Loja obtida:', loja?.nomeLoja);
      
      if (user) {
        updateState({
          user,
          loja,
          status: 'authenticated',
          error: null
        });
        if (environment.app.debug) console.log('✅ Usuário autenticado com sucesso');
      } else {
        updateState({
          user: null,
          loja: null,
          status: 'unauthenticated',
          error: null
        });
        if (environment.app.debug) console.log('❌ Usuário não autenticado');
      }
    } catch (error: any) {
      console.error('❌ Erro ao recarregar dados do usuário:', error);
      updateState({
        status: 'error',
        error: 'Erro ao carregar dados do usuário'
      });
    }
  }, [updateState]);

  // Função de cadastro
  const cadastrarLoja = useCallback(async (data: any) => {
    try {
      if (environment.app.debug) console.log('🔵 authContext.cadastrarLoja() - Iniciando cadastro...');
      updateState({ status: 'loading', error: null });
      
      // Criar conta no Firebase (isso dispara automaticamente o onAuthStateChanged)
      await AuthService.cadastrarLoja(data);
      
      if (environment.app.debug) console.log('✅ authContext.cadastrarLoja() - Cadastro bem-sucedido');
      if (environment.app.debug) console.log('✅ O onAuthStateChanged vai atualizar o estado automaticamente');
      
      // Não precisamos atualizar o estado manualmente aqui
      // O onAuthStateChanged vai fazer isso automaticamente
      
    } catch (error: any) {
      console.error('❌ authContext.cadastrarLoja() - Erro no cadastro:', error);
      updateState({
        status: 'error',
        error: error.message
      });
      throw error;
    }
  }, [updateState]);

  // Função de login
  const login = useCallback(async (data: LoginFormData) => {
    try {
      if (environment.app.debug) console.log('🔵 authContext.login() - Iniciando login...');
      updateState({ status: 'loading', error: null });
      
      // Fazer login no Firebase (isso dispara automaticamente o onAuthStateChanged)
      await AuthService.login(data);
      
      if (environment.app.debug) console.log('✅ authContext.login() - Login bem-sucedido');
      if (environment.app.debug) console.log('✅ O onAuthStateChanged vai atualizar o estado automaticamente');
      
      // Não precisamos atualizar o estado manualmente aqui
      // O onAuthStateChanged vai fazer isso automaticamente
      
    } catch (error: any) {
      console.error('❌ authContext.login() - Erro no login:', error);
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
    if (environment.app.debug) console.log('🔵 Iniciando listener onAuthStateChanged...');
    
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      if (environment.app.debug) console.log('🔵 onAuthStateChanged disparado:', firebaseUser ? 'Usuário logado' : 'Usuário deslogado');
      
      if (firebaseUser) {
        if (environment.app.debug) console.log('📧 Email:', firebaseUser.email);
        if (environment.app.debug) console.log('🆔 UID:', firebaseUser.uid);
        if (environment.app.debug) console.log('✅ emailVerified:', firebaseUser.emailVerified);
        try {
          if (environment.app.debug) console.log('🔵 Buscando dados do usuário no Firestore...');
          updateState({ status: 'loading' });
          
          // Tentar buscar dados imediatamente
          let user = await AuthService.getCurrentUser();
          let loja = await AuthService.getCurrentLoja();
          
          // Se não encontrou os dados, pode ser um cadastro novo
          // Aguardar um pouco e tentar novamente
          if (!user && firebaseUser) {
            if (environment.app.debug) console.log('⏳ Dados não encontrados, aguardando 300ms...');
            await new Promise(resolve => setTimeout(resolve, 300));
            user = await AuthService.getCurrentUser();
            loja = await AuthService.getCurrentLoja();
          }
          
          if (user) {
            if (environment.app.debug) console.log('✅ Dados do usuário encontrados:', user.email);
            if (environment.app.debug) console.log('✅ Loja:', loja?.nomeLoja || 'Sem loja');
            updateState({
              user,
              loja,
              status: 'authenticated',
              error: null
            });
          } else {
            // Usuário Firebase existe mas não tem dados no Firestore
            if (environment.app.debug) console.warn('⚠️ Usuário Firebase existe mas não tem dados no Firestore');
            updateState({
              user: null,
              loja: null,
              status: 'unauthenticated',
              error: null
            });
          }
        } catch (error) {
          console.error('❌ Erro ao carregar dados do usuário:', error);
          updateState({
            user: null,
            loja: null,
            status: 'unauthenticated',
            error: null
          });
        }
      } else {
        if (environment.app.debug) {
          console.log('🔵 Nenhum usuário Firebase detectado');
          console.log('🔍 Verificando auth.currentUser...', auth.currentUser ? 'Existe' : 'null');
        }
        
        updateState({
          user: null,
          loja: null,
          status: 'unauthenticated',
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, [updateState]);

  const value: AuthContextType = useMemo(() => ({
    ...state,
    cadastrarLoja,
    login,
    logout,
    clearError,
    refreshUserData
  }), [state, cadastrarLoja, login, logout, clearError, refreshUserData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ REMOVER o hook useAuth daqui para evitar conflitos
// O hook useAuth está em src/hooks/useAuth.ts 
