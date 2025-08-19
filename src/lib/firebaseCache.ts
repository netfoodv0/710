/**
 * Sistema de cache inteligente para operações do Firebase
 * Melhora performance e reduz chamadas desnecessárias
 */
export class FirebaseCache {
  private static cache = new Map<string, CacheEntry>();
  private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos
  private static readonly MAX_CACHE_SIZE = 1000; // Máximo de itens em cache

  /**
   * Estrutura de uma entrada no cache
   */
  private static CacheEntry = class {
    constructor(
      public data: any,
      public timestamp: number,
      public ttl: number,
      public accessCount: number = 0
    ) {}
  }

  /**
   * Adiciona item ao cache
   */
  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    // Limpar cache se estiver muito cheio
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.cleanup();
    }

    this.cache.set(key, new this.CacheEntry(data, Date.now(), ttl));
  }

  /**
   * Obtém item do cache
   */
  static get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Verificar se expirou
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    // Incrementar contador de acesso
    entry.accessCount++;
    
    return entry.data;
  }

  /**
   * Verifica se item existe no cache e não expirou
   */
  static has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) return false;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Remove item específico do cache
   */
  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Remove múltiplos itens baseado em padrão
   */
  static invalidate(pattern: string): number {
    let deletedCount = 0;
    
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    return deletedCount;
  }

  /**
   * Limpa todo o cache
   */
  static clear(): void {
    this.cache.clear();
  }

  /**
   * Limpa itens expirados e menos acessados
   */
  static cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    // Remover itens expirados
    entries.forEach(([key, entry]) => {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    });
    
    // Se ainda estiver muito cheio, remover itens menos acessados
    if (this.cache.size > this.MAX_CACHE_SIZE * 0.8) {
      const sortedEntries = entries
        .filter(([_, entry]) => now - entry.timestamp <= entry.ttl)
        .sort((a, b) => a[1].accessCount - b[1].accessCount);
      
      const toRemove = sortedEntries.slice(0, this.cache.size - this.MAX_CACHE_SIZE * 0.5);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  /**
   * Obtém estatísticas do cache
   */
  static getStats() {
    const now = Date.now();
    let expiredCount = 0;
    let totalAccessCount = 0;
    
    this.cache.forEach(entry => {
      if (now - entry.timestamp > entry.ttl) {
        expiredCount++;
      }
      totalAccessCount += entry.accessCount;
    });
    
    return {
      totalItems: this.cache.size,
      expiredItems: expiredCount,
      validItems: this.cache.size - expiredCount,
      totalAccessCount,
      averageAccessCount: this.cache.size > 0 ? totalAccessCount / this.cache.size : 0,
      maxSize: this.MAX_CACHE_SIZE
    };
  }

  /**
   * Gera chave de cache baseada em parâmetros
   */
  static generateKey(collection: string, operation: string, params: any = {}): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|');
    
    return `${collection}:${operation}:${sortedParams}`;
  }
}

/**
 * Hook para usar cache em componentes React
 */
export function useFirebaseCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = FirebaseCache.DEFAULT_TTL
): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async () => {
    // Tentar obter do cache primeiro
    const cached = FirebaseCache.get(key);
    if (cached) {
      setData(cached);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      FirebaseCache.set(key, result, ttl);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = React.useCallback(() => {
    FirebaseCache.delete(key);
    fetchData();
  }, [key, fetchData]);

  return { data, loading, error, refetch };
}
