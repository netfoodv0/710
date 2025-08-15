import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BotContextType {
  isBotEnabled: boolean;
  activeChats: Set<string>; // IDs das conversas onde o robô está ativo
  toggleBotForChat: (chatId: string) => void;
  isBotActiveForChat: (chatId: string) => boolean;
  setBotEnabled: (enabled: boolean) => void;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

export const useBot = () => {
  const context = useContext(BotContext);
  if (context === undefined) {
    throw new Error('useBot deve ser usado dentro de um BotProvider');
  }
  return context;
};

interface BotProviderProps {
  children: ReactNode;
}

export const BotProvider: React.FC<BotProviderProps> = ({ children }) => {
  const [isBotEnabled, setIsBotEnabled] = useState(true); // Ativar por padrão
  const [activeChats, setActiveChats] = useState<Set<string>>(new Set());

  const toggleBotForChat = (chatId: string) => {
    setActiveChats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chatId)) {
        newSet.delete(chatId);
      } else {
        newSet.add(chatId);
      }
      return newSet;
    });
  };

  const isBotActiveForChat = (chatId: string) => {
    return activeChats.has(chatId);
  };

  const setBotEnabled = (enabled: boolean) => {
    setIsBotEnabled(enabled);
  };

  return (
    <BotContext.Provider value={{
      isBotEnabled,
      activeChats,
      toggleBotForChat,
      isBotActiveForChat,
      setBotEnabled,
    }}>
      {children}
    </BotContext.Provider>
  );
};
