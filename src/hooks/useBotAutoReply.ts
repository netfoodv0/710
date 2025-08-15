import { useCallback, useEffect } from 'react';
import { useBot } from '../context/botContext';
import { useWhatsAppConnection } from './useWhatsAppConnection';

interface AutoReplyConfig {
  enabled: boolean;
  defaultMessage?: string;
  businessHours?: {
    start: string; // formato "09:00"
    end: string;   // formato "18:00"
  };
}

export const useBotAutoReply = (config: AutoReplyConfig) => {
  const { isBotEnabled, isBotActiveForChat } = useBot();
  const { socket } = useWhatsAppConnection();

  // Verificar se está dentro do horário comercial
  const isBusinessHours = useCallback(() => {
    if (!config.businessHours) return true;
    
    const now = new Date();
    const currentTime = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    return currentTime >= config.businessHours.start && currentTime <= config.businessHours.end;
  }, [config.businessHours]);

  // Gerar resposta automática baseada no contexto
  const generateAutoReply = useCallback((message: string, chatId: string) => {
    if (!config.enabled || !isBotEnabled || !isBotActiveForChat(chatId)) return null;

    const lowerMessage = message.toLowerCase();
    
    // Respostas baseadas em palavras-chave
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
      return 'Olá! Bem-vindo ao nosso atendimento. Como posso ajudá-lo hoje?';
    }
    
    if (lowerMessage.includes('cardápio') || lowerMessage.includes('menu') || lowerMessage.includes('produtos')) {
      return 'Claro! Aqui está nosso cardápio: [Link para o cardápio]. Posso ajudá-lo com algum pedido específico?';
    }
    
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('quanto custa')) {
      return 'Para informações sobre preços, posso ajudá-lo a consultar nosso cardápio. Qual produto você gostaria de saber o preço?';
    }
    
    if (lowerMessage.includes('entrega') || lowerMessage.includes('delivery') || lowerMessage.includes('tempo')) {
      return 'Nossa entrega é feita em até 40 minutos na região. Qual é o seu endereço para verificarmos a disponibilidade?';
    }
    
    if (lowerMessage.includes('horário') || lowerMessage.includes('funcionamento')) {
      return 'Funcionamos de segunda a domingo, das 11h às 23h. Em que horário você gostaria de fazer seu pedido?';
    }
    
    // Resposta padrão para mensagens não reconhecidas
    return config.defaultMessage || 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.';
  }, [config, isBotEnabled, isBusinessHours]);

  // Enviar resposta automática
  const sendAutoReply = useCallback(async (chatId: string, originalMessage: string) => {
    if (!isBotEnabled || !config.enabled || !isBusinessHours() || !isBotActiveForChat(chatId)) return;

    const autoReply = generateAutoReply(originalMessage, chatId);
    if (!autoReply) return;

    // Aguardar um pouco para parecer mais natural
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    if (socket) {
      socket.emit('send-message', {
        chatId,
        message: autoReply
      });
    }
  }, [isBotEnabled, config.enabled, isBusinessHours, generateAutoReply, socket]);

  return {
    sendAutoReply,
    generateAutoReply,
    isBusinessHours,
    isBotActive: isBotEnabled && config.enabled
  };
};
