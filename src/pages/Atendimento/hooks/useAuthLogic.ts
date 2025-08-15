import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { ConversationContext } from '../../../components/whatsapp';
import { firebaseWhatsAppService, getCurrentUserId } from '../../../services/firebaseWhatsAppService';

export const useAuthLogic = () => {
  const { isConnected } = useContext(ConversationContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Sempre começa como false
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [hasUserAuthenticated, setHasUserAuthenticated] = useState(false); // Nova flag para controlar autenticação manual
  
  // Refs para controlar operações e evitar loops
  const currentUserId = useRef<string>(getCurrentUserId());
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const hasInitialized = useRef(false);

  // Verificar status de autenticação no Firebase
  const checkFirebaseAuthStatus = useCallback(async () => {
    try {
      console.log('🔍 Verificando status de autenticação no Firebase...');
      
      const isConnected = await firebaseWhatsAppService.isUserConnected(currentUserId.current);
      
      // IMPORTANTE: Só considerar autenticado se o usuário autenticou manualmente
      if (isConnected && hasUserAuthenticated) {
        console.log('✅ Usuário conectado no Firebase, mantendo autenticação');
        setIsAuthenticated(true);
      } else {
        console.log('❌ Usuário não conectado no Firebase, mostrando autenticação');
        setIsAuthenticated(false);
        setHasUserAuthenticated(false); // Resetar flag se não estiver conectado
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status no Firebase:', error);
      setIsAuthenticated(false);
      setHasUserAuthenticated(false); // Resetar flag em caso de erro
    } finally {
      setIsCheckingAuth(false);
    }
  }, [hasUserAuthenticated]);

  // Atualizar status no Firebase quando conectar/desconectar
  const updateFirebaseStatus = useCallback(async (connected: boolean) => {
    try {
      await firebaseWhatsAppService.updateConnectionStatus(
        currentUserId.current,
        connected,
        connected ? {
          deviceId: 'web-client',
          pushName: 'Web WhatsApp',
          platform: 'web'
        } : undefined
      );
      console.log(`📡 Status atualizado no Firebase: ${connected ? 'conectado' : 'desconectado'}`);
    } catch (error) {
      console.error('❌ Erro ao atualizar status no Firebase:', error);
    }
  }, []);

  // Inicializar verificação de autenticação (executar apenas uma vez)
  useEffect(() => {
    if (hasInitialized.current) return;
    
    hasInitialized.current = true;
    
    const initializeAuth = async () => {
      // IMPORTANTE: Sempre começar com autenticação false
      setIsAuthenticated(false);
      setHasUserAuthenticated(false);
      
      // Verificar status inicial (mas não mudar autenticação automaticamente)
      await checkFirebaseAuthStatus();
      
      // Configurar listener para mudanças em tempo real
      const unsubscribe = firebaseWhatsAppService.subscribeToConnectionStatus(
        currentUserId.current,
        (status) => {
          if (status) {
            console.log('📡 Status atualizado em tempo real:', status);
            
            // Verificar se ainda está conectado (considerando timeout)
            const now = new Date();
            let isStillConnected = status.isConnected;
            
            // Se tiver lastSeen, verificar timeout
            if (status.lastSeen) {
              const lastSeen = status.lastSeen.toDate();
              const diffMinutes = (now.getTime() - lastSeen.getTime()) / (1000 * 60);
              isStillConnected = status.isConnected && diffMinutes <= 5; // 5 minutos de timeout
            }
            
            // IMPORTANTE: Só mudar autenticação se o usuário autenticou manualmente
            if (isStillConnected && hasUserAuthenticated) {
              console.log('✅ Reconectado via Firebase, restaurando autenticação');
              setIsAuthenticated(true);
            } else if (!isStillConnected && isAuthenticated && hasUserAuthenticated) {
              console.log('❌ Desconectado via Firebase, removendo autenticação');
              setIsAuthenticated(false);
              setHasUserAuthenticated(false);
            }
          }
        }
      );
      
      unsubscribeRef.current = unsubscribe;
    };
    
    initializeAuth();
    
    // Cleanup
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [checkFirebaseAuthStatus, isAuthenticated, hasUserAuthenticated]);

  // Monitorar mudanças na conexão do socket para atualizar Firebase
  const lastConnectionState = useRef<boolean>(isConnected);
  useEffect(() => {
    if (!hasInitialized.current) return;
    
    // Só atualizar se o estado realmente mudou
    if (lastConnectionState.current !== isConnected) {
      console.log(`🔄 Mudança na conexão: ${lastConnectionState.current} → ${isConnected}`);
      updateFirebaseStatus(isConnected);
      lastConnectionState.current = isConnected;
      
      // Só remover autenticação se não foi autenticado manualmente
      if (!isConnected && isAuthenticated && !hasUserAuthenticated) {
        console.log('🔌 Conexão do socket perdida, removendo autenticação');
        setIsAuthenticated(false);
      }
    }
  }, [isConnected, isAuthenticated, updateFirebaseStatus, hasUserAuthenticated]);

  // Função para reconectar
  const handleReconnect = useCallback(async () => {
    console.log('🔄 Iniciando reconexão...');
    
    try {
      // Limpar status no Firebase
      await firebaseWhatsAppService.updateConnectionStatus(currentUserId.current, false);
      
      // Resetar estado local apenas se não foi autenticado manualmente
      if (!hasUserAuthenticated) {
        setIsAuthenticated(false);
        setIsCheckingAuth(true);
        
        // Aguardar um pouco e verificar novamente
        setTimeout(async () => {
          await checkFirebaseAuthStatus();
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Erro durante reconexão:', error);
      if (!hasUserAuthenticated) {
        setIsCheckingAuth(false);
      }
    }
  }, [checkFirebaseAuthStatus, hasUserAuthenticated]);

  // Função chamada quando autenticação é bem-sucedida
  const handleAuthenticationSuccess = useCallback(async () => {
    try {
      console.log('✅ Autenticação bem-sucedida, atualizando Firebase');
      
      await firebaseWhatsAppService.updateConnectionStatus(
        currentUserId.current,
        true,
        {
          deviceId: 'web-client',
          pushName: 'Web WhatsApp',
          platform: 'web'
        }
      );
      
      setIsAuthenticated(true);
      setHasUserAuthenticated(true); // Definir a flag para indicar que o usuário autenticou
    } catch (error) {
      console.error('❌ Erro ao atualizar autenticação no Firebase:', error);
      // Mesmo com erro no Firebase, manter autenticação local
      setIsAuthenticated(true);
      setHasUserAuthenticated(true); // Definir a flag para indicar que o usuário autenticou
    }
  }, []);

  // Cleanup ao desmontar componente
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      
      // Atualizar status como desconectado ao sair
      firebaseWhatsAppService.updateConnectionStatus(currentUserId.current, false).catch(console.error);
    };
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated: handleAuthenticationSuccess,
    isCheckingCache: isCheckingAuth, // Mantendo nome original para compatibilidade
    isConnected,
    handleReconnect
  };
};