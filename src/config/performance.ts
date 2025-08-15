/**
 * Configurações de performance para otimizar a aplicação
 */

export const PERFORMANCE_CONFIG = {
  // Cache TTL (Time To Live) em milissegundos
  CACHE: {
    CATEGORIAS: 2 * 60 * 1000,        // 2 minutos
    PRODUTOS: 3 * 60 * 1000,          // 3 minutos
    PEDIDOS: 1 * 60 * 1000,           // 1 minuto
    DASHBOARD: 5 * 60 * 1000,         // 5 minutos
    RELATORIOS: 10 * 60 * 1000,       // 10 minutos
    DEFAULT: 5 * 60 * 1000             // 5 minutos padrão
  },

  // Debounce para inputs de busca
  DEBOUNCE: {
    SEARCH: 300,                       // 300ms
    FILTERS: 500,                      // 500ms
    FORM_SUBMIT: 1000                  // 1 segundo
  },

  // Lazy loading
  LAZY_LOADING: {
    THRESHOLD: 0.1,                    // 10% da viewport
    ROOT_MARGIN: '50px'                // Margem para carregar antes
  },

  // Virtualização para listas grandes
  VIRTUALIZATION: {
    ITEM_HEIGHT: 60,                   // Altura padrão do item
    OVERSCAN: 5,                       // Itens extras para renderizar
    THRESHOLD: 100                     // Aplicar virtualização em listas com mais de 100 itens
  },

  // Otimizações de imagem
  IMAGES: {
    LAZY_LOADING: true,
    PLACEHOLDER_BLUR: true,
    WEBP_SUPPORT: true,
    MAX_WIDTH: 1200,
    QUALITY: 85
  },

  // Otimizações de rede
  NETWORK: {
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    TIMEOUT: 10000,
    CACHE_STRATEGY: 'stale-while-revalidate'
  },

  // Otimizações de renderização
  RENDERING: {
    BATCH_UPDATES: true,
    MEMOIZATION: true,
    SUSPENSE: true,
    CONCURRENT_MODE: true
  }
};

/**
 * Função para verificar se deve usar otimizações baseado no dispositivo
 */
export function shouldUseOptimizations(): boolean {
  // Verificar se é um dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Verificar se tem conexão lenta
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.effectiveType === '3g'
  );

  // Verificar se tem pouca memória
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

  return !isMobile && !isSlowConnection && !hasLowMemory;
}

/**
 * Função para obter configurações baseadas no contexto
 */
export function getPerformanceConfig() {
  const useOptimizations = shouldUseOptimizations();
  
  return {
    ...PERFORMANCE_CONFIG,
    CACHE: {
      ...PERFORMANCE_CONFIG.CACHE,
      // Reduzir TTL em dispositivos com poucos recursos
      ...(useOptimizations ? {} : {
        CATEGORIAS: 1 * 60 * 1000,    // 1 minuto
        PRODUTOS: 2 * 60 * 1000,      // 2 minutos
        PEDIDOS: 30 * 1000,           // 30 segundos
        DASHBOARD: 3 * 60 * 1000,     // 3 minutos
        RELATORIOS: 5 * 60 * 1000     // 5 minutos
      })
    }
  };
}
