/**
 * Configurações para o WhatsApp Web
 */

export const WHATSAPP_CONFIG = {
  // Configurações de conexão
  CONNECTION: {
    BACKEND_URL: 'http://localhost:3001',
    TIMEOUT: 10000,
    RECONNECTION_ATTEMPTS: 5,
    RECONNECTION_DELAY: 1000,
    MAX_RECONNECTION_DELAY: 10000,
    BACKOFF_MULTIPLIER: 2
  },

  // Configurações de cache
  CACHE: {
    CHATS_TTL: 5 * 60 * 1000,        // 5 minutos
    MESSAGES_TTL: 2 * 60 * 1000,     // 2 minutos
    MEDIA_TTL: 10 * 60 * 1000,       // 10 minutos
    AUTH_TTL: 30 * 60 * 1000         // 30 minutos
  },

  // Configurações de performance
  PERFORMANCE: {
    MESSAGE_BATCH_SIZE: 50,           // Mensagens por lote
    CHAT_BATCH_SIZE: 20,              // Chats por lote
    SCROLL_THRESHOLD: 100,            // Pixels para carregar mais
    DEBOUNCE_DELAY: 300,              // Delay para busca
    THROTTLE_DELAY: 100               // Delay para scroll
  },

  // Configurações de UI
  UI: {
    LOADING_DELAY: 500,               // Delay mínimo para loading
    ANIMATION_DURATION: 200,          // Duração das animações
    NOTIFICATION_DURATION: 3000,      // Duração das notificações
    TYPING_INDICATOR_DELAY: 1000     // Delay para indicador de digitação
  },

  // Configurações de rede
  NETWORK: {
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    REQUEST_TIMEOUT: 30000,
    UPLOAD_TIMEOUT: 60000
  }
};

/**
 * Função para obter configurações baseadas no ambiente
 */
export function getWhatsAppConfig() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    ...WHATSAPP_CONFIG,
    CONNECTION: {
      ...WHATSAPP_CONFIG.CONNECTION,
      // Em desenvolvimento, usar localhost
      BACKEND_URL: isDevelopment 
        ? 'http://localhost:3001' 
        : process.env.REACT_APP_WHATSAPP_BACKEND_URL || 'https://seu-backend.com',
      
      // Em produção, aumentar timeouts
      TIMEOUT: isProduction ? 15000 : WHATSAPP_CONFIG.CONNECTION.TIMEOUT,
      RECONNECTION_ATTEMPTS: isProduction ? 10 : WHATSAPP_CONFIG.CONNECTION.RECONNECTION_ATTEMPTS
    },
    
    CACHE: {
      ...WHATSAPP_CONFIG.CACHE,
      // Em produção, aumentar TTL
      CHATS_TTL: isProduction ? 10 * 60 * 1000 : WHATSAPP_CONFIG.CACHE.CHATS_TTL,
      MESSAGES_TTL: isProduction ? 5 * 60 * 1000 : WHATSAPP_CONFIG.CACHE.MESSAGES_TTL
    }
  };
}

/**
 * Função para verificar se o backend está disponível
 */
export async function checkBackendAvailability(): Promise<boolean> {
  try {
    const config = getWhatsAppConfig();
    const response = await fetch(`${config.CONNECTION.BACKEND_URL}/health`, {
      method: 'GET',
      mode: 'cors',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend não disponível:', error);
    return false;
  }
}
