import { useState, useEffect, useRef, useCallback } from 'react';

interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  lastConnected: number | null;
  connectionAttempts: number;
  error: string | null;
}

/**
 * Hook para gerenciar conexão estável e evitar loops infinitos
 */
export function useStableConnection(
  initialConnectionState: boolean = false,
  maxReconnectionAttempts: number = 3
) {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: initialConnectionState,
    isConnecting: false,
    lastConnected: initialConnectionState ? Date.now() : null,
    connectionAttempts: 0,
    error: null
  });

  const isInitializedRef = useRef(false);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Função para conectar
  const connect = useCallback(async () => {
    if (connectionState.isConnecting || connectionState.isConnected) {
      console.log('🔄 Já conectando ou conectado, ignorando...');
      return;
    }

    if (connectionState.connectionAttempts >= maxReconnectionAttempts) {
      console.log('🚫 Máximo de tentativas de conexão atingido');
      setConnectionState(prev => ({
        ...prev,
        error: 'Máximo de tentativas de conexão atingido'
      }));
      return;
    }

    console.log('🔌 Iniciando conexão...');
    setConnectionState(prev => ({
      ...prev,
      isConnecting: true,
      error: null
    }));

    // Simular tentativa de conexão
    try {
      // Aqui você implementaria sua lógica de conexão real
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout de conexão'));
        }, 5000);

        // Simular sucesso após 2 segundos
        setTimeout(() => {
          clearTimeout(timeout);
          resolve(true);
        }, 2000);
      });

      console.log('✅ Conexão estabelecida com sucesso!');
      setConnectionState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        lastConnected: Date.now(),
        connectionAttempts: 0,
        error: null
      }));

    } catch (error) {
      console.error('❌ Erro na conexão:', error);
      setConnectionState(prev => ({
        ...prev,
        isConnecting: false,
        connectionAttempts: prev.connectionAttempts + 1,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }));

      // Tentar reconectar automaticamente se não excedeu o limite
      if (connectionState.connectionAttempts < maxReconnectionAttempts) {
        scheduleReconnection();
      }
    }
  }, [connectionState.isConnecting, connectionState.isConnected, connectionState.connectionAttempts, maxReconnectionAttempts]);

  // Função para desconectar
  const disconnect = useCallback(async () => {
    console.log('🔌 Desconectando...');
    
    // Limpar timeouts
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
    }
    if (reconnectionIntervalRef.current) {
      clearInterval(reconnectionIntervalRef.current);
    }

    setConnectionState(prev => ({
      ...prev,
      isConnected: false,
      isConnecting: false,
      error: null
    }));
  }, []);

  // Agendar reconexão
  const scheduleReconnection = useCallback(() => {
    const delay = Math.min(1000 * Math.pow(2, connectionState.connectionAttempts), 10000);
    console.log(`🔄 Agendando reconexão em ${delay}ms...`);
    
    connectionTimeoutRef.current = setTimeout(() => {
      connect();
    }, delay);
  }, [connect, connectionState.connectionAttempts]);

  // Reconectar manualmente
  const reconnect = useCallback(async () => {
    console.log('🔄 Reconectando manualmente...');
    await disconnect();
    
    // Resetar tentativas
    setConnectionState(prev => ({
      ...prev,
      connectionAttempts: 0,
      error: null
    }));
    
    // Tentar conectar novamente
    setTimeout(() => {
      connect();
    }, 1000);
  }, [connect, disconnect]);

  // Inicializar conexão apenas uma vez
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      if (initialConnectionState) {
        connect();
      }
    }
  }, [connect, initialConnectionState]);

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (reconnectionIntervalRef.current) {
        clearInterval(reconnectionIntervalRef.current);
      }
    };
  }, []);

  return {
    ...connectionState,
    connect,
    disconnect,
    reconnect,
    scheduleReconnection
  };
}
