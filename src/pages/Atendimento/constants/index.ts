// Constantes para cache do WhatsApp
export const CACHE_KEYS = {
  CHATS: 'whatsapp-chats',
  MESSAGES: 'whatsapp-messages'
} as const;

// Tempo de validade do cache em milissegundos (10 minutos)
export const CACHE_VALIDITY_TIME = 10 * 60 * 1000;

// Delay para verificação de cache
export const CACHE_CHECK_DELAY = 100;
