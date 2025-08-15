import { CACHE_KEYS, CACHE_VALIDITY_TIME } from '../constants';

export const useCacheLogic = () => {
  // Verificar se há dados em cache para pular a autenticação
  const hasCachedData = (): boolean => {
    try {
      const cachedChats = localStorage.getItem(CACHE_KEYS.CHATS);
      if (cachedChats) {
        const cacheData = JSON.parse(cachedChats);
        const now = Date.now();
        // Verificar se o cache ainda é válido
        if (now - cacheData.timestamp < CACHE_VALIDITY_TIME) {
          return cacheData.data && cacheData.data.length > 0;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Limpar cache do localStorage
  const clearCache = (): void => {
    localStorage.removeItem(CACHE_KEYS.CHATS);
    localStorage.removeItem(CACHE_KEYS.MESSAGES);
  };

  return {
    hasCachedData,
    clearCache
  };
};
