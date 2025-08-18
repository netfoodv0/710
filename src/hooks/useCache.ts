import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live em milissegundos
  key: string;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export const useCache = <T>(options: CacheOptions) => {
  const { ttl = 5 * 60 * 1000, key } = options; // 5 minutos por padrão

  const [cachedData, setCachedData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para salvar dados no cache
  const saveToCache = useCallback((data: T) => {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
      setCachedData(data);
    } catch (error) {
      // Tratar erro silenciosamente
    }
  }, [key, ttl]);

  // Função para carregar dados do cache
  const loadFromCache = useCallback((): T | null => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const now = Date.now();

      // Verificar se o cache ainda é válido
      if (now - cacheData.timestamp < cacheData.ttl) {
        setCachedData(cacheData.data);
        return cacheData.data;
      } else {
        // Cache expirado, remover
        localStorage.removeItem(key);
        setCachedData(null);
        return null;
      }
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  }, [key]);

  // Função para limpar o cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setCachedData(null);
    } catch (error) {
      // Tratar erro silenciosamente
    }
  }, [key]);

  // Função para verificar se o cache é válido
  const isCacheValid = useCallback((): boolean => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return false;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const now = Date.now();
      return now - cacheData.timestamp < cacheData.ttl;
    } catch (error) {
      return false;
    }
  }, [key]);

  // Função para atualizar apenas parte dos dados em cache
  const updateCache = useCallback((updater: (current: T | null) => T) => {
    const current = loadFromCache();
    const updated = updater(current);
    saveToCache(updated);
  }, [loadFromCache, saveToCache]);

  // Carregar dados do cache na inicialização
  useEffect(() => {
    loadFromCache();
  }, [loadFromCache, key]);

  return {
    cachedData,
    isLoading,
    saveToCache,
    loadFromCache,
    clearCache,
    isCacheValid,
    updateCache
  };
};
