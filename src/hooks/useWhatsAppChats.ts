import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { WhatsAppChat, Message } from '../components/whatsapp/types/Conversation';
import { useCache } from './useCache';
import { useWhatsAppFirebaseSync } from './useWhatsAppFirebaseSync';
import { useBot } from '../context/botContext';

interface WhatsAppChatsState {
  chats: WhatsAppChat[];
  currentChat: WhatsAppChat | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export const useWhatsAppChats = () => {
  console.log('🚀 useWhatsAppChats - Hook inicializado');
  
  // Hook do robô
  const { isBotEnabled, isBotActiveForChat } = useBot();
  
  // Cache para conversas e mensagens
  const chatsCache = useCache<WhatsAppChat[]>({ key: 'whatsapp-chats', ttl: 10 * 60 * 1000 }); // 10 minutos
  const messagesCache = useCache<{ [chatId: string]: Message[] }>({ key: 'whatsapp-messages', ttl: 15 * 60 * 1000 }); // 15 minutos
  
  console.log('📦 Cache de conversas:', {
    isValid: chatsCache.isCacheValid(),
    hasData: !!chatsCache.cachedData,
    dataLength: chatsCache.cachedData?.length || 0
  });
  
  const [state, setState] = useState<WhatsAppChatsState>({
    chats: [],
    currentChat: null,
    messages: [],
    loading: false,
    error: null
  });

  const socketRef = useRef<Socket | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageUpdateRef = useRef<number>(0);
  
  // Estado estável de conexão para evitar mudanças rápidas
  const [isConnected, setIsConnected] = useState(false);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sincronizar status com Firebase
  const { updateFirebaseStatus } = useWhatsAppFirebaseSync(socketRef.current?.connected || false);
  
  // Usar refs para armazenar as funções de callback dos eventos
  const loadChatsRef = useRef<() => void>();
  const selectChatRef = useRef<(chat: WhatsAppChat) => void>();

  // Função para carregar conversas (definida aqui para evitar problemas de referência)
  const loadChats = useCallback(() => {
    // Evitar chamadas repetidas se já estiver carregando
    if (state.loading) {
      console.log('⚠️ Já está carregando conversas, ignorando chamada...');
      return;
    }
    
    // Verificar se há dados em cache válidos
    if (chatsCache.isCacheValid() && chatsCache.cachedData && chatsCache.cachedData.length > 0) {
      console.log('📦 Usando conversas do cache');
      setState(prev => ({ 
        ...prev, 
        chats: chatsCache.cachedData!,
        loading: false,
        error: null
      }));
      return;
    }
    
    // Evitar chamadas se já tiver conversas carregadas
    if (state.chats.length > 0) {
      console.log('⚠️ Já existem conversas carregadas, ignorando chamada...');
      return;
    }
    
    console.log('🔄 Carregando conversas do servidor...');
    console.log('🔌 Socket status:', {
      connected: socketRef.current?.connected,
      socketId: socketRef.current?.id,
      readyState: socketRef.current?.readyState
    });
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    if (socketRef.current && socketRef.current.connected) {
      console.log('📤 Emitindo evento get-chats...');
      socketRef.current.emit('get-chats');
      
      // Adicionar timeout para detectar se a resposta não chegar
      setTimeout(() => {
        console.log('⏰ Timeout - Verificando se as conversas foram carregadas...');
        console.log('📊 Estado atual:', state);
      }, 5000);
    } else {
      console.warn('⚠️ Socket não conectado - tentando reconectar para carregar conversas...');
      
      // Tentar reconectar antes de mostrar erro
      if (socketRef.current && !socketRef.current.connected) {
        console.log('🔄 Tentando reconectar socket para conversas...');
        socketRef.current.connect();
        
        // Aguardar reconexão e tentar novamente
        setTimeout(() => {
          if (socketRef.current && socketRef.current.connected) {
            console.log('✅ Reconectado! Carregando conversas...');
            socketRef.current.emit('get-chats');
          } else {
            console.error('❌ Não foi possível reconectar para carregar conversas');
            setState(prev => ({ 
              ...prev, 
              error: 'Não conectado ao servidor. Verifique se o servidor WhatsApp está rodando.', 
              loading: false 
            }));
          }
        }, 2000);
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Erro de conexão. Recarregue a página para tentar novamente.', 
          loading: false 
        }));
      }
    }
  }, [state.loading, state.chats.length, chatsCache]);

  // Função para iniciar polling automático das mensagens
  const startMessagePolling = useCallback((chatId: string) => {
    console.log('🔄 Iniciando polling automático para:', chatId);
    
    // Limpar polling anterior se existir
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    
    // Polling a cada 5 segundos
    pollingIntervalRef.current = setInterval(() => {
      if (socketRef.current && socketRef.current.connected) {
        console.log('📡 Polling automático - buscando mensagens...');
        socketRef.current.emit('get-messages', { 
          chatId: chatId, 
          limit: 50 
        });
      }
    }, 5000); // 5 segundos
  }, []);

  // Função para parar polling
  const stopMessagePolling = useCallback(() => {
    console.log('⏹️ Parando polling automático');
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);

  // Atualizar a ref quando a função mudar
  useEffect(() => {
    loadChatsRef.current = loadChats;
  }, [loadChats]);

  useEffect(() => {
    // Conectar ao backend
    console.log('🔌 useWhatsAppChats - Conectando ao backend...', new Date().toISOString());
    
    // Verificar se já existe uma conexão
    if (socketRef.current) {
      console.log('⚠️ Socket já existe, desconectando anterior...');
      socketRef.current.disconnect();
    }
    
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
      timeout: 10000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    });

    // Eventos de conexão do socket
    socketRef.current.on('connect', () => {
      console.log('✅ useWhatsAppChats - Socket conectado:', socketRef.current?.id);
      // Atualizar status no Firebase
      updateFirebaseStatus(true);
      
      // Limpar timeout anterior e definir conexão imediatamente
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ useWhatsAppChats - Socket desconectado');
      stopMessagePolling(); // Parar polling quando desconectar
      // Atualizar status no Firebase
      updateFirebaseStatus(false);
      
      // Usar debounce para desconexão - aguardar 2 segundos antes de marcar como desconectado
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      
      connectionTimeoutRef.current = setTimeout(() => {
        setIsConnected(false);
      }, 2000); // 2 segundos de delay
    });

    socketRef.current.on('reconnect', () => {
      console.log('🔄 useWhatsAppChats - Socket reconectado');
      // Atualizar status no Firebase
      updateFirebaseStatus(true);
      
      // Limpar timeout anterior e definir conexão imediatamente
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      setIsConnected(true);
      
      // Reiniciar polling se houver chat selecionado
      setState(prev => {
        if (prev.currentChat) {
          setTimeout(() => {
            startMessagePolling(prev.currentChat!.id);
          }, 1000);
        }
        return prev;
      });
    });

    socketRef.current.on('reconnect_error', (error) => {
      console.log('❌ useWhatsAppChats - Erro na reconexão:', error);
    });

    // Status de conexão do WhatsApp
    socketRef.current.on('connection-status', (status) => {
      console.log('📊 useWhatsAppChats - Status de conexão:', status);
      console.log('📊 Estado atual:', state);
      
      // Atualizar estado de conexão estável
      if (status.connected) {
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
        }
        setIsConnected(true);
      } else {
        // Usar debounce para desconexão
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
        }
        connectionTimeoutRef.current = setTimeout(() => {
          setIsConnected(false);
        }, 2000); // 2 segundos de delay
      }
      
      if (status.connected && !state.loading && state.chats.length === 0) {
        console.log('🚀 WhatsApp conectado - carregando conversas automaticamente...');
        // Aguardar um pouco para garantir que o socket esteja estável
        setTimeout(() => {
          console.log('⏰ Executando loadChats após delay...');
          loadChatsRef.current?.();
        }, 1000);
      } else {
        console.log('⚠️ Não carregando conversas automaticamente:', {
          connected: status.connected,
          loading: state.loading,
          chatsCount: state.chats.length
        });
      }
    });

    // Receber dados das conversas
    socketRef.current.on('chats-data', (data) => {
      console.log('📨 Evento chats-data recebido:', data);
      if (data.success) {
        console.log('📋 Conversas recebidas:', data.chats);
        console.log('📊 Estado anterior:', state);
        
        // Salvar conversas no cache
        chatsCache.saveToCache(data.chats);
        
        setState(prev => {
          const newState = { 
            ...prev, 
            chats: data.chats, 
            loading: false, 
            error: null 
          };
          console.log('📊 Novo estado:', newState);
          return newState;
        });
      } else {
        console.error('❌ Erro ao buscar conversas:', data.error);
        setState(prev => ({ 
          ...prev, 
          error: data.error, 
          loading: false 
        }));
      }
    });

    // Evento global de WhatsApp pronto
    socketRef.current.on('whatsapp-ready', (info: any) => {
      console.log('🚀 WhatsApp pronto - verificando se precisa carregar conversas');
      
      // Só carregar conversas se não houver cache válido
      if (!state.loading && state.chats.length === 0 && !chatsCache.isCacheValid()) {
        console.log('🔄 Cache inválido, carregando conversas automaticamente');
        setTimeout(() => {
          loadChatsRef.current?.();
        }, 1000);
      } else if (chatsCache.isCacheValid() && chatsCache.cachedData && chatsCache.cachedData.length > 0) {
        console.log('📦 Cache válido, usando conversas existentes');
        setState(prev => ({ 
          ...prev, 
          chats: chatsCache.cachedData!,
          loading: false,
          error: null
        }));
      }
    });

    // Receber mensagens de uma conversa
    socketRef.current.on('messages-data', (data) => {
      console.log('📨 Evento messages-data recebido:', data);
      console.log('📊 Estado atual antes de atualizar mensagens:', state);
      
      if (data.success) {
        console.log('📨 Mensagens recebidas para:', data.chatId);
        console.log('📨 Quantidade de mensagens:', data.messages.length);
        
        setState(prev => {
          // Ordenar mensagens por timestamp (mais antigas primeiro, mais recentes por último)
          const sortedMessages = data.messages.sort((a, b) => a.timestamp - b.timestamp);
          console.log('📊 Ordenação das mensagens:', sortedMessages.map(m => ({ 
            timestamp: m.timestamp, 
            fromMe: m.fromMe, 
            body: m.body?.substring(0, 30) 
          })));
          
          // Verificar se houve mudanças nas mensagens para evitar re-renders desnecessários
          const messagesChanged = prev.messages.length !== sortedMessages.length ||
            prev.messages.some((msg, index) => 
              !sortedMessages[index] || 
              msg.id !== sortedMessages[index].id ||
              msg.body !== sortedMessages[index].body
            );
          
          if (messagesChanged) {
            console.log('📊 Mensagens mudaram, atualizando estado');
            lastMessageUpdateRef.current = Date.now();
          } else {
            console.log('📊 Nenhuma mudança nas mensagens, mantendo estado');
          }
          
          // Salvar mensagens no cache
          if (data.chatId) {
            const currentCache = messagesCache.cachedData || {};
            const updatedCache = {
              ...currentCache,
              [data.chatId]: sortedMessages
            };
            messagesCache.saveToCache(updatedCache);
          }
          
          const newState = { 
            ...prev, 
            messages: sortedMessages,
            loading: false, 
            error: null 
          };
          console.log('📊 Novo estado após mensagens:', newState);
          return newState;
        });
      } else {
        console.error('❌ Erro ao buscar mensagens:', data.error);
        setState(prev => ({ 
          ...prev, 
          error: data.error, 
          loading: false 
        }));
      }
    });

    // Nova mensagem recebida em tempo real
    socketRef.current.on('new-message', (data) => {
      console.log('📩 Nova mensagem em tempo real:', data);
      console.log('📩 Chat atual:', socketRef.current ? 'conectado' : 'desconectado');
      
      setState(prev => {
        console.log('📩 Estado anterior:', {
          currentChatId: prev.currentChat?.id,
          messagesCount: prev.messages.length,
          chatIdFromMessage: data.chatId
        });
        
        // Atualizar mensagens se for do chat atual
        let newMessages = prev.messages;
        if (prev.currentChat && prev.currentChat.id === data.chatId) {
          console.log('✅ Adicionando mensagem ao chat atual');
          
          // Verificar se a mensagem já existe (evitar duplicatas)
          const messageExists = prev.messages.some(m => m.id === data.message.id);
          if (!messageExists) {
            // Adicionar nova mensagem e ordenar por timestamp
            const updatedMessages = [...prev.messages, data.message];
            newMessages = updatedMessages.sort((a, b) => a.timestamp - b.timestamp);
            console.log('📊 Nova mensagem adicionada e ordenada:', data.message);
          } else {
            console.log('⚠️ Mensagem já existe, ignorando duplicata');
            newMessages = prev.messages;
          }
        } else {
          console.log('⚠️ Mensagem não é do chat atual:', {
            currentChatId: prev.currentChat?.id,
            messageChatId: data.chatId
          });
        }
        
        // Atualizar lista de chats
        const updatedChats = prev.chats.map(chat => {
          if (chat.id === data.chatId) {
            return {
              ...chat,
              lastMessage: {
                id: data.message.id,
                body: data.message.body,
                timestamp: data.message.timestamp,
                fromMe: data.message.fromMe,
                type: data.message.type
              },
              timestamp: data.message.timestamp,
              unreadCount: data.message.fromMe ? chat.unreadCount : chat.unreadCount + 1
            };
          }
          return chat;
        });

        const newState = {
          ...prev,
          chats: updatedChats,
          messages: newMessages
        };
        
        console.log('📩 Novo estado:', {
          messagesCount: newState.messages.length,
          lastMessage: newState.messages[newState.messages.length - 1]?.body
        });

        // Verificar se o robô deve responder automaticamente
        if (!data.message.fromMe && isBotEnabled && isBotActiveForChat(data.chatId)) {
          console.log('🤖 Mensagem recebida de cliente, ativando robô para:', data.chatId);
          sendBotAutoReply(data.chatId, data.message.body);
        }
        
        return newState;
      });
    });

    // Mensagem enviada
    socketRef.current.on('message-sent', (result) => {
      if (result.success) {
        console.log('✅ Mensagem enviada:', result.messageId);
        console.log('📤 ChatId da mensagem enviada:', result.chatId);
        
        // Forçar uma atualização das mensagens do chat atual após envio
        setState(prev => {
          if (prev.currentChat && prev.currentChat.id === result.chatId) {
            console.log('🔄 Forçando recarregamento das mensagens após envio');
            
            // Remover mensagens temporárias antes de recarregar
            const messagesWithoutTemp = prev.messages.filter(m => !m.id.startsWith('temp-'));
            
            // Emitir get-messages para recarregar as mensagens
            if (socketRef.current && socketRef.current.connected) {
              setTimeout(() => {
                console.log('📨 Recarregando mensagens após envio...');
                socketRef.current?.emit('get-messages', { 
                  chatId: result.chatId, 
                  limit: 50 
                });
              }, 1000); // Aguardar 1s para garantir que a mensagem foi processada pelo WhatsApp
            }
            
            return {
              ...prev,
              messages: messagesWithoutTemp
            };
          }
          return prev;
        });
      } else {
        console.error('❌ Erro ao enviar mensagem:', result.error);
        setState(prev => ({ 
          ...prev, 
          error: `Erro ao enviar: ${result.error}` 
        }));
      }
    });

    return () => {
      console.log('🧹 useWhatsAppChats - Cleanup, desconectando socket...');
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      stopMessagePolling();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const selectChat = useCallback((chat: WhatsAppChat) => {
    console.log('📱 Selecionando conversa:', chat.name);
    console.log('📱 Dados da conversa:', chat);
    console.log('🔌 Socket status na seleção:', {
      connected: socketRef.current?.connected,
      socketId: socketRef.current?.id
    });
    
    // Parar polling anterior
    stopMessagePolling();
    
    // Verificar se há mensagens em cache para este chat
    const cachedMessages = messagesCache.cachedData?.[chat.id];
    if (cachedMessages && cachedMessages.length > 0) {
      console.log('📦 Usando mensagens do cache para:', chat.id);
      setState(prev => ({ 
        ...prev, 
        currentChat: chat, 
        messages: cachedMessages,
        loading: false,
        error: null
      }));
      
      // Iniciar polling automático para este chat
      setTimeout(() => {
        startMessagePolling(chat.id);
      }, 1000);
      return;
    }
    
    setState(prev => ({ 
      ...prev, 
      currentChat: chat, 
      messages: [], 
      loading: true,
      error: null
    }));
    
    if (socketRef.current && socketRef.current.connected) {
      console.log('📤 Emitindo evento get-messages para:', chat.id);
      console.log('📤 Dados enviados:', { chatId: chat.id, limit: 50 });
      
      // Buscar mensagens iniciais
      socketRef.current.emit('get-messages', { 
        chatId: chat.id, 
        limit: 50 
      });
      
      // Iniciar polling automático para esta conversa
      setTimeout(() => {
        startMessagePolling(chat.id);
      }, 2000); // Aguardar 2s para carregar mensagens iniciais
      
      // Adicionar timeout para detectar se a resposta não chegar
      setTimeout(() => {
        setState(currentState => {
          console.log('⏰ Timeout - Verificando se as mensagens foram carregadas...');
          console.log('📊 Estado atual das mensagens:', currentState.messages.length);
          console.log('📊 Estado atual do loading:', currentState.loading);
          
          // Se ainda estiver carregando após 5 segundos, mostrar erro
          if (currentState.loading && currentState.messages.length === 0) {
            return {
              ...currentState,
              loading: false,
              error: 'Timeout ao carregar mensagens'
            };
          }
          return currentState;
        });
      }, 5000);
    } else {
      console.warn('⚠️ Socket não conectado - tentando reconectar para carregar mensagens...');
      
      // Tentar reconectar antes de mostrar erro
      if (socketRef.current && !socketRef.current.connected) {
        console.log('🔄 Tentando reconectar socket...');
        socketRef.current.connect();
        
        // Aguardar um tempo para reconexão e tentar novamente
        setTimeout(() => {
          if (socketRef.current && socketRef.current.connected) {
            console.log('✅ Reconectado! Tentando carregar mensagens novamente...');
            socketRef.current.emit('get-messages', { 
              chatId: chat.id, 
              limit: 50 
            });
            setTimeout(() => {
              startMessagePolling(chat.id);
            }, 2000);
          } else {
            console.error('❌ Não foi possível reconectar o socket');
            setState(prev => ({ 
              ...prev, 
              error: 'Não conectado ao servidor. Verifique se o servidor WhatsApp está rodando.', 
              loading: false 
            }));
          }
        }, 2000);
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Erro de conexão. Recarregue a página para tentar novamente.', 
          loading: false 
        }));
      }
    }
  }, [startMessagePolling, stopMessagePolling, messagesCache]);

  // Carregar cache na inicialização
  useEffect(() => {
    console.log('🚀 Inicializando hook - verificando cache...');
    
    // Carregar conversas do cache se disponíveis
    if (chatsCache.isCacheValid() && chatsCache.cachedData && chatsCache.cachedData.length > 0) {
      console.log('📦 Cache de conversas válido, carregando...');
      setState(prev => ({ 
        ...prev, 
        chats: chatsCache.cachedData!,
        loading: false,
        error: null
      }));
    }
  }, []); // Executar apenas uma vez na montagem

  // Monitorar mudanças no cache e atualizar estado
  useEffect(() => {
    if (chatsCache.cachedData && chatsCache.cachedData.length > 0) {
      console.log('📦 Cache atualizado, sincronizando estado...');
      setState(prev => ({ 
        ...prev, 
        chats: chatsCache.cachedData!,
        loading: false,
        error: null
      }));
    }
  }, [chatsCache.cachedData]);

  // Atualizar a ref quando a função mudar
  useEffect(() => {
    selectChatRef.current = selectChat;
  }, [selectChat]);

  const sendMessage = useCallback((message: string, chatId?: string) => {
    if (!socketRef.current) {
      setState(prev => ({ 
        ...prev, 
        error: 'Não conectado ao servidor' 
      }));
      return;
    }

    const targetChatId = chatId || state.currentChat?.id;
    if (!targetChatId) {
      setState(prev => ({ 
        ...prev, 
        error: 'Nenhuma conversa selecionada' 
      }));
      return;
    }

    console.log('📤 Enviando mensagem para:', targetChatId);
    console.log('📤 Mensagem:', message);
    
    // Adicionar mensagem temporária imediatamente para feedback visual
    const tempMessage = {
      id: `temp-${Date.now()}`,
      body: message,
      timestamp: Date.now() / 1000,
      fromMe: true,
      type: 'chat',
      hasMedia: false,
      contact: {
        id: 'me',
        name: 'Você',
        number: ''
      }
    };

    setState(prev => {
      if (prev.currentChat && prev.currentChat.id === targetChatId) {
        console.log('➕ Adicionando mensagem temporária para feedback visual');
        // Garantir que a mensagem temporária seja adicionada por último (mais recente)
        const updatedMessages = [...prev.messages, tempMessage];
        // Ordenar novamente para garantir ordem correta
        const sortedMessages = updatedMessages.sort((a, b) => a.timestamp - b.timestamp);
        console.log('📊 Mensagem temporária adicionada:', tempMessage);
        return {
          ...prev,
          messages: sortedMessages
        };
      }
      return prev;
    });
    
    socketRef.current.emit('send-message', { 
      chatId: targetChatId, 
      message 
    });
  }, [state.currentChat?.id]);

  // Função de auto-resposta do robô
  const sendBotAutoReply = useCallback(async (chatId: string, originalMessage: string) => {
    if (!isBotEnabled || !isBotActiveForChat(chatId)) {
      console.log('🤖 Robô não está ativo para este chat:', chatId);
      return;
    }

    console.log('🤖 Robô ativo, respondendo automaticamente para:', chatId);
    
    // Aguardar um pouco para parecer mais natural
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Resposta padrão para qualquer mensagem (personalizável)
    const customMessage = localStorage.getItem('botDefaultMessage');
    const autoReply = customMessage || 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.';

    console.log('🤖 Resposta automática gerada:', autoReply);

    // Enviar a resposta automática
    if (socketRef.current) {
      socketRef.current.emit('send-message', {
        chatId,
        message: autoReply
      });
      console.log('🤖 Resposta automática enviada com sucesso!');
    }
  }, [isBotEnabled, isBotActiveForChat]);

  const sendMessageToNumber = useCallback((number: string, message: string) => {
    if (!socketRef.current) {
      setState(prev => ({ 
        ...prev, 
        error: 'Não conectado ao servidor' 
      }));
      return;
    }

    console.log('📤 Enviando mensagem para número:', number);
    socketRef.current.emit('send-message', { 
      number, 
      message 
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Função global para teste de cache
  if (typeof window !== 'undefined') {
    (window as any).testCache = () => {
      console.log('🧪 TESTE DE CACHE GLOBAL');
      console.log('📦 Cache de conversas:', {
        isValid: chatsCache.isCacheValid(),
        hasData: !!chatsCache.cachedData,
        dataLength: chatsCache.cachedData?.length || 0,
        data: chatsCache.cachedData
      });
      console.log('📦 Cache de mensagens:', {
        isValid: messagesCache.isCacheValid(),
        hasData: !!messagesCache.cachedData,
        keys: messagesCache.cachedData ? Object.keys(messagesCache.cachedData) : []
      });
      console.log('📊 Estado atual:', state);
    };
  }

  return {
    chats: state.chats,
    currentChat: state.currentChat,
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    loadChats,
    selectChat,
    sendMessage,
    sendMessageToNumber,
    clearError,
    startMessagePolling,
    stopMessagePolling,
    isConnected: isConnected,
    sendBotAutoReply,
    // Funções de cache
    clearCache: () => {
      chatsCache.clearCache();
      messagesCache.clearCache();
    },
    refreshCache: () => {
      chatsCache.clearCache();
      messagesCache.clearCache();
      loadChats();
    }
  };
};
