import React, { createContext, useContext, useRef, useCallback, ReactNode } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheContextType {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, ttl?: number) => void;
  has: (key: string) => boolean;
  clear: (key?: string) => void;
  clearExpired: () => void;
}

const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({ children }: { children: ReactNode }) {
  const cache = useRef<Map<string, CacheItem<any>>>(new Map());
  const defaultTTL = 5 * 60 * 1000; // 5 minutos

  const get = useCallback(<T,>(key: string): T | null => {
    const item = cache.current.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      cache.current.delete(key);
      return null;
    }

    return item.data;
  }, []);

  const set = useCallback(<T,>(key: string, data: T, ttl: number = defaultTTL) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }, []);

  const has = useCallback((key: string): boolean => {
    const item = cache.current.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      cache.current.delete(key);
      return false;
    }

    return true;
  }, []);

  const clear = useCallback((key?: string) => {
    if (key) {
      cache.current.delete(key);
    } else {
      cache.current.clear();
    }
  }, []);

  const clearExpired = useCallback(() => {
    const now = Date.now();
    for (const [key, item] of cache.current.entries()) {
      if (now - item.timestamp > item.ttl) {
        cache.current.delete(key);
      }
    }
  }, []);

  // Limpar cache expirado periodicamente
  React.useEffect(() => {
    const interval = setInterval(clearExpired, 60000); // A cada minuto
    return () => clearInterval(interval);
  }, [clearExpired]);

  const value: CacheContextType = {
    get,
    set,
    has,
    clear,
    clearExpired
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache deve ser usado dentro de CacheProvider');
  }
  return context;
}
