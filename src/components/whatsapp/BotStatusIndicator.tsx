import React from 'react';
import { useBot } from '../../context/botContext';

interface BotStatusIndicatorProps {
  chatId?: string; // ID da conversa específica
}

export default function BotStatusIndicator({ chatId }: BotStatusIndicatorProps) {
  const { isBotEnabled, isBotActiveForChat } = useBot();
  
  // Se não tiver chatId, não mostrar nada
  if (!chatId) return null;
  
  const isActive = isBotActiveForChat(chatId);

  if (!isActive) {
    return null; // Não mostrar nada quando o robô estiver desativado para este chat
  }

  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
      <span className="text-green-400 text-xs font-medium">
        Robô
      </span>
    </div>
  );
}
