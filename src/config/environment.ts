/**
 * Configuração centralizada do ambiente
 * Centraliza todas as variáveis de ambiente e configurações
 */

export const environment = {
  // Firebase Configuration
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC2I0Cy3olXowdUmDRFIKoqMS6Tgy4PqPQ",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vault-v2-ef6d6.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vault-v2-ef6d6",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vault-v2-ef6d6.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "848566827539",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:848566827539:web:9004fa618db6534501dde6",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZELND5C5HC"
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || "Sistema Voult",
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    environment: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || "development",
    debug: import.meta.env.VITE_DEBUG === "true" || import.meta.env.DEV
  },

  // Firebase Performance Configuration
  firebasePerformance: {
    enabled: import.meta.env.VITE_FIREBASE_PERFORMANCE_ENABLED === "true" || import.meta.env.DEV,
    maxMetrics: parseInt(import.meta.env.VITE_FIREBASE_MAX_METRICS || "1000"),
    cleanupInterval: parseInt(import.meta.env.VITE_FIREBASE_CLEANUP_INTERVAL || "3600000") // 1 hora
  },

  // Cache Configuration
  cache: {
    defaultTTL: parseInt(import.meta.env.VITE_CACHE_DEFAULT_TTL || "300000"), // 5 minutos
    maxSize: parseInt(import.meta.env.VITE_CACHE_MAX_SIZE || "1000"),
    cleanupThreshold: parseFloat(import.meta.env.VITE_CACHE_CLEANUP_THRESHOLD || "0.8")
  },

  // Retry Configuration
  retry: {
    defaultMaxRetries: parseInt(import.meta.env.VITE_RETRY_MAX_ATTEMPTS || "3"),
    defaultBaseDelay: parseInt(import.meta.env.VITE_RETRY_BASE_DELAY || "1000"),
    maxDelay: parseInt(import.meta.env.VITE_RETRY_MAX_DELAY || "30000")
  },

  // Error Handling Configuration
  errorHandling: {
    logToConsole: import.meta.env.VITE_ERROR_LOG_TO_CONSOLE === "true" || import.meta.env.DEV,
    logToExternal: import.meta.env.VITE_ERROR_LOG_TO_EXTERNAL === "true" || false,
    externalServiceUrl: import.meta.env.VITE_ERROR_EXTERNAL_SERVICE_URL || "",
    maxErrorLogSize: parseInt(import.meta.env.VITE_ERROR_MAX_LOG_SIZE || "1000")
  },

  // Development Configuration
  development: {
    mockData: import.meta.env.VITE_MOCK_DATA === "true" || false,
    slowNetwork: import.meta.env.VITE_SLOW_NETWORK === "true" || false,
    networkDelay: parseInt(import.meta.env.VITE_NETWORK_DELAY || "0"),
    showPerformanceMetrics: import.meta.env.VITE_SHOW_PERFORMANCE_METRICS === "true" || import.meta.env.DEV
  }
};

/**
 * Valida se a configuração está correta
 */
export function validateEnvironment(): void {
  const requiredFields = [
    'firebase.apiKey',
    'firebase.authDomain',
    'firebase.projectId',
    'firebase.storageBucket',
    'firebase.messagingSenderId',
    'firebase.appId'
  ];

  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    const value = field.split('.').reduce((obj, key) => obj?.[key], environment);
    if (!value) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    console.warn('⚠️ Campos de configuração Firebase ausentes:', missingFields);
    
    if (environment.app.environment === 'production') {
      throw new Error(`Configuração Firebase incompleta: ${missingFields.join(', ')}`);
    }
  }
}

/**
 * Obtém configuração específica do Firebase
 */
export function getFirebaseConfig() {
  return environment.firebase;
}

/**
 * Verifica se está em modo de desenvolvimento
 */
export function isDevelopment(): boolean {
  return environment.app.environment === 'development' || import.meta.env.DEV;
}

/**
 * Verifica se está em modo de produção
 */
export function isProduction(): boolean {
  return environment.app.environment === 'production' || import.meta.env.PROD;
}

/**
 * Verifica se deve usar emuladores
 */
export function shouldUseEmulators(): boolean {
  return import.meta.env.VITE_USE_EMULATORS === 'true' && isDevelopment();
}

/**
 * Obtém configuração de cache
 */
export function getCacheConfig() {
  return environment.cache;
}

/**
 * Obtém configuração de retry
 */
export function getRetryConfig() {
  return environment.retry;
}

// Validar ambiente na inicialização
if (typeof window !== 'undefined') {
  validateEnvironment();
}
