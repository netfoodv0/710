import React from 'react';
import { Bot, BotOff } from 'lucide-react';
import { useBot } from '../../context/botContext';

interface BotToggleButtonProps {
  className?: string;
  chatId?: string; // ID da conversa específica
}

export default function BotToggleButton({ className = '', chatId }: BotToggleButtonProps) {
  const { isBotEnabled, toggleBotForChat, isBotActiveForChat } = useBot();
  
  // Se não tiver chatId, não mostrar o botão
  if (!chatId) return null;
  
  const isActive = isBotActiveForChat(chatId);
  
  const handleToggle = () => {
    toggleBotForChat(chatId);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center justify-center transition-all duration-200
        ${isActive 
          ? 'text-green-400 hover:text-green-300' 
          : 'text-gray-400 hover:text-gray-300'
        }
        ${className}
      `}
      title={isActive ? 'Robô ativado para este contato - Clique para desativar' : 'Robô desativado para este contato - Clique para ativar'}
    >
      {isActive ? (
        <Bot className="w-5 h-5" />
      ) : (
        <BotOff className="w-5 h-5" />
      )}
    </button>
  );
}
