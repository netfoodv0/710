import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useBot } from '../context/botContext';
import { getWhatsAppConfig } from '../config/whatsapp';

export interface WhatsAppConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  qrCode: string | null;
  error: string | null;
  clientInfo: any | null;
  statusMessage?: string;
  statusType?: 'info' | 'success' | 'error' | 'warning';
}

export const useWhatsAppConnection = () => {
  // Hook do robô
  const { isBotEnabled, isBotActiveForChat } = useBot();
  
  const [connectionState, setConnectionState] = useState<WhatsAppConnectionState>({
    isConnected: false,
    isConnecting: false,
    qrCode: null,
    error: null,
    clientInfo: null,
    statusMessage: 'Desconectado',
    statusType: 'info'
  });

  const socketRef = useRef<Socket | null>(null);
  const isInitializedRef = useRef(false);
  const connectionAttemptsRef = useRef(0);
  const maxAttempts = getWhatsAppConfig().CONNECTION.RECONNECTION_ATTEMPTS;

  // Função para conectar ao backend (executada apenas uma vez)
  const connectToBackend = useCallback(() => {
    if (isInitializedRef.current || socketRef.current) {
      return; // Já conectado ou inicializando
    }

    isInitializedRef.current = true;
    
    const config = getWhatsAppConfig();
    socketRef.current = io(config.CONNECTION.BACKEND_URL, {
      transports: ['websocket', 'polling'],
      timeout: config.CONNECTION.TIMEOUT,
      reconnection: true,
      reconnectionAttempts: config.CONNECTION.RECONNECTION_ATTEMPTS,
      reconnectionDelay: config.CONNECTION.RECONNECTION_DELAY,
      maxReconnectionDelay: config.CONNECTION.MAX_RECONNECTION_DELAY,
      backoffMultiplier: config.CONNECTION.BACKOFF_MULTIPLIER
    });

    // Eventos do Socket
    socketRef.current.on('connect', () => {
      connectionAttemptsRef.current = 0; // Resetar tentativas
      setConnectionState(prev => ({ 
        ...prev, 
        statusMessage: 'Conectado ao servidor', 
        statusType: 'success' 
      }));
    });

    socketRef.current.on('disconnect', (reason: string) => {
      // Só tentar reconectar se não foi uma desconexão intencional
      if (reason !== 'io client disconnect') {
        connectionAttemptsRef.current++;
      }
      
      setConnectionState(prev => ({ 
        ...prev, 
        statusMessage: 'Desconectado do servidor', 
        statusType: 'error' 
      }));
    });

    // Status da conexão
    socketRef.current.on('connection-status', (status) => {
      setConnectionState(prev => ({
        ...prev,
        isConnected: status.connected,
        clientInfo: status.clientInfo,
        statusMessage: status.connected ? 'WhatsApp conectado' : 'WhatsApp desconectado',
        statusType: status.connected ? 'success' : 'info'
      }));
    });

    // QR Code recebido
    socketRef.current.on('qr-code', (qr: string) => {
      setConnectionState(prev => ({ 
        ...prev, 
        qrCode: qr, 
        isConnecting: true,
        statusMessage: 'QR Code gerado - Escaneie com seu WhatsApp',
        statusType: 'info'
      }));
    });

    // WhatsApp conectado
    socketRef.current.on('connected', (info: any) => {
      setConnectionState(prev => ({ 
        ...prev, 
        isConnected: true, 
        isConnecting: false, 
        qrCode: null,
        clientInfo: info,
        error: null,
        statusMessage: `Conectado como: ${info.pushname}`,
        statusType: 'success'
      }));
    });

    // Evento global de WhatsApp pronto (enviado para todos os clientes)
    socketRef.current.on('whatsapp-ready', (info: any) => {
      setConnectionState(prev => ({ 
        ...prev, 
        isConnected: true, 
        isConnecting: false, 
        qrCode: null,
        clientInfo: info,
        error: null,
        statusMessage: `Conectado como: ${info.pushname}`,
        statusType: 'success'
      }));
    });

    // WhatsApp desconectado
    socketRef.current.on('disconnected', (reason: string) => {
      console.log('🔌 WhatsApp desconectado:', reason);
      setConnectionState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isConnecting: false,
        qrCode: null,
        clientInfo: null,
        statusMessage: `Desconectado: ${reason}`,
        statusType: 'warning'
      }));
    });

    // Erro de conexão
    socketRef.current.on('connection-error', (error: string) => {
      console.error('❌ Erro de conexão:', error);
      setConnectionState(prev => ({ 
        ...prev, 
        error: `Erro de conexão: ${error}`,
        isConnecting: false,
        statusMessage: `Erro: ${error}`,
        statusType: 'error'
      }));
    });

    // Erro de autenticação
    socketRef.current.on('auth-error', (error: string) => {
      console.error('❌ Erro de autenticação:', error);
      setConnectionState(prev => ({ 
        ...prev, 
        error: `Erro de autenticação: ${error}`,
        isConnecting: false,
        statusMessage: `Falha na autenticação: ${error}`,
        statusType: 'error'
      }));
    });

    // Atualizações de status
    socketRef.current.on('status-update', (update: { message: string; type: string }) => {
      console.log('📊 Status update:', update);
      setConnectionState(prev => ({ 
        ...prev, 
        statusMessage: update.message,
        statusType: update.type as any
      }));
    });

    // Mensagem recebida
    socketRef.current.on('message-received', (message: any) => {
      console.log('📩 Mensagem recebida:', message);
      
      // Verificar se o robô deve responder automaticamente
      if (!message.fromMe && isBotEnabled && isBotActiveForChat(message.chat?.id || message.from)) {
        console.log('🤖 Robô ativo, respondendo automaticamente para:', message.chat?.id || message.from);
        
        // Aguardar um pouco para parecer mais natural
        setTimeout(() => {
          // Resposta padrão para qualquer mensagem (personalizável)
          const customMessage = localStorage.getItem('botDefaultMessage');
          const autoReply = customMessage || 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.';

          console.log('🤖 Resposta automática gerada:', autoReply);

          // Enviar a resposta automática
          if (socketRef.current) {
            socketRef.current.emit('send-message', {
              chatId: message.chat?.id || message.from,
              message: autoReply
            });
            console.log('🤖 Resposta automática enviada com sucesso!');
          }
        }, 1000 + Math.random() * 2000);
      }
      
      // Aqui você pode implementar notificações ou atualizar a UI
    });

    // Erro de reconexão
    socketRef.current.on('reconnect_failed', () => {
      console.error('❌ Falha na reconexão após todas as tentativas');
      setConnectionState(prev => ({
        ...prev,
        error: 'Falha na reconexão automática',
        statusMessage: 'Falha na reconexão - Tente conectar manualmente',
        statusType: 'error'
      }));
    });

  }, [maxAttempts]);

  // Conectar ao backend apenas uma vez na montagem
  useEffect(() => {
    connectToBackend();
    
    // Cleanup apenas na desmontagem do componente
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        isInitializedRef.current = false;
        connectionAttemptsRef.current = 0;
      }
    };
  }, [connectToBackend]);

  const initializeClient = async () => {
    setConnectionState(prev => ({ 
      ...prev, 
      isConnecting: true, 
      error: null,
      statusMessage: 'Iniciando conexão...',
      statusType: 'info'
    }));
    
    if (socketRef.current) {
      socketRef.current.emit('connect-whatsapp');
    } else {
      setConnectionState(prev => ({ 
        ...prev, 
        error: 'Não conectado ao servidor',
        isConnecting: false,
        statusMessage: 'Erro: Não conectado ao servidor',
        statusType: 'error'
      }));
    }
  };

  const disconnect = async () => {
    setConnectionState(prev => ({ 
      ...prev,
      statusMessage: 'Desconectando...',
      statusType: 'info'
    }));
    
    if (socketRef.current) {
      socketRef.current.emit('disconnect-whatsapp');
      
      // Aguardar um pouco para a desconexão ser processada
      setTimeout(() => {
        // Emitir evento para limpar sessão (sem fechar terminal)
        socketRef.current?.emit('close-terminal');
        
        // NÃO desconectar o socket - manter conexão com backend
        // socketRef.current.disconnect(); // REMOVIDO!
        
        // Atualizar estado
        setConnectionState(prev => ({ 
          ...prev,
          isConnected: false,
          isConnecting: false,
          qrCode: null,
          clientInfo: null,
          statusMessage: 'Sessão limpa - Pronto para nova conexão',
          statusType: 'info'
        }));
      }, 1000);
    }
  };

  const sendMessage = async (number: string, message: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error('Não conectado ao servidor'));
        return;
      }

      if (!connectionState.isConnected) {
        reject(new Error('WhatsApp não está conectado'));
        return;
      }

      // Emitir evento para enviar mensagem
      socketRef.current.emit('send-message', { number, message });

      // Aguardar resposta
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Mensagem não foi enviada'));
      }, 30000); // 30 segundos de timeout

      socketRef.current.once('message-sent', (result: { success: boolean; error?: string; messageId?: string }) => {
        clearTimeout(timeout);
        
        if (result.success) {
          resolve(true);
        } else {
          reject(new Error(result.error || 'Erro desconhecido'));
        }
      });
    });
  };

  return {
    connectionState,
    initializeClient,
    disconnect,
    sendMessage,
    isBackendConnected: socketRef.current?.connected || false
  };
};