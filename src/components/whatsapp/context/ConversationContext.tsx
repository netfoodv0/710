import { createContext, ReactNode, useState, useCallback } from "react";
import { Message, Conversation, WhatsAppChat } from "../types/Conversation";
import { useWhatsAppChats } from "../../../hooks/useWhatsAppChats";

interface ConversationProviderProps {
  children: ReactNode;
}

interface ConversationContextType {
  conversation: Conversation;
  message: Message[];
  setConversation: ( conversation: Conversation ) => void;
  setMessage: ( message: Message[] ) => void;
  // Adicionar funcionalidades do hook
  chats: WhatsAppChat[];
  currentChat: WhatsAppChat | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  loadChats: () => void;
  selectChat: (chat: WhatsAppChat) => void;
  sendMessage: (message: string, chatId?: string) => void;
  clearError: () => void;
  isConnected: boolean;
  startMessagePolling?: (chatId: string) => void;
  stopMessagePolling?: () => void;
  // Funções de cache
  clearCache: () => void;
  refreshCache: () => void;
}

export const ConversationContext = createContext({} as ConversationContextType);

export const ConversationProvider = ({ children }: ConversationProviderProps) => {
  const [ conversation, setConversationData ] = useState<Conversation>({} as Conversation);
  const [ message, setMessageData ] = useState<Message[]>([]);

  // Usar o hook aqui para centralizar o estado
  const whatsappHook = useWhatsAppChats();

  const setConversation = useCallback((conversation: Conversation) => {
    console.log('🔄 ConversationContext - Definindo conversa:', conversation);
    setConversationData(conversation);
    
    // Automaticamente selecionar o chat no hook quando uma conversa for definida
    if (conversation.chatId && whatsappHook.selectChat) {
      console.log('🔄 ConversationContext - Selecionando chat automaticamente:', conversation.chatId);
      const chatData = {
        id: conversation.chatId,
        name: conversation.contactName,
        isGroup: conversation.isGroup || false,
        unreadCount: conversation.unreadCount || 0,
        timestamp: Date.now() / 1000,
        profilePicUrl: conversation.image,
        lastMessage: null
      };
      whatsappHook.selectChat(chatData);
    }
  }, [whatsappHook]);

  const setMessage = useCallback(( message: Message[] ) => {
    console.log('🔄 ConversationContext - Definindo mensagens:', message);
    setMessageData(message)
  }, []);

  return (
    <ConversationContext.Provider value={{
      conversation,
      message,
      setConversation,
      setMessage,
      // Expor todas as funcionalidades do hook
      ...whatsappHook,
    }}>
      {children}
    </ConversationContext.Provider>
  )
}
