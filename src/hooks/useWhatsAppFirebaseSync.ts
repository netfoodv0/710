import { useEffect, useCallback, useRef } from 'react';
import { firebaseWhatsAppService, getCurrentUserId } from '../services/firebaseWhatsAppService';

/**
 * Hook para sincronizar o status do WhatsApp com o Firebase
 * Deve ser usado junto com o useWhatsAppChats
 */
export const useWhatsAppFirebaseSync = (isConnected: boolean) => {
  const userId = getCurrentUserId();

  // Atualizar status no Firebase quando a conexão mudar
  const updateFirebaseStatus = useCallback(async (connected: boolean) => {
    try {
      await firebaseWhatsAppService.updateConnectionStatus(
        userId,
        connected,
        connected ? {
          deviceId: `web-${Date.now()}`,
          pushName: 'Web WhatsApp',
          platform: 'web'
        } : undefined
      );
      console.log(`📡 Status sincronizado com Firebase: ${connected ? 'conectado' : 'desconectado'}`);
    } catch (error) {
      console.error('❌ Erro ao sincronizar status com Firebase:', error);
    }
  }, [userId]);

  // Sincronizar status quando a conexão mudar
  const lastConnectionState = useRef<boolean>(isConnected);
  useEffect(() => {
    // Só atualizar se o estado realmente mudou
    if (lastConnectionState.current !== isConnected) {
      console.log(`🔄 useWhatsAppFirebaseSync - Conexão mudou: ${lastConnectionState.current} → ${isConnected}`);
      updateFirebaseStatus(isConnected);
      lastConnectionState.current = isConnected;
    }
  }, [isConnected, updateFirebaseStatus]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      // Marcar como desconectado ao sair
      firebaseWhatsAppService.updateConnectionStatus(userId, false).catch(console.error);
    };
  }, [userId]);

  return {
    updateFirebaseStatus,
    userId
  };
};
