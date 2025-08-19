/**
 * Sistema de retry logic para operações do Firebase
 * Implementa backoff exponencial e jitter para evitar thundering herd
 */
export class FirebaseRetry {
  private static readonly DEFAULT_MAX_RETRIES = 3;
  private static readonly DEFAULT_BASE_DELAY = 1000; // 1 segundo
  private static readonly MAX_DELAY = 30000; // 30 segundos

  /**
   * Executa operação com retry automático
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const {
      maxRetries = this.DEFAULT_MAX_RETRIES,
      baseDelay = this.DEFAULT_BASE_DELAY,
      maxDelay = this.MAX_DELAY,
      shouldRetry = this.defaultShouldRetry,
      onRetry = this.defaultOnRetry
    } = options;

    let lastError: Error;
    let attempt = 1;

    while (attempt <= maxRetries) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // Verificar se deve tentar novamente
        if (attempt === maxRetries || !shouldRetry(error, attempt)) {
          throw lastError;
        }

        // Calcular delay com backoff exponencial e jitter
        const delay = this.calculateDelay(attempt, baseDelay, maxDelay);
        
        // Log da tentativa
        onRetry(error, attempt, delay, maxRetries);
        
        // Aguardar antes da próxima tentativa
        await this.sleep(delay);
        attempt++;
      }
    }

    throw lastError!;
  }

  /**
   * Calcula delay com backoff exponencial e jitter
   */
  private static calculateDelay(attempt: number, baseDelay: number, maxDelay: number): number {
    // Backoff exponencial: baseDelay * 2^(attempt-1)
    const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    
    // Adicionar jitter para evitar thundering herd
    const jitter = Math.random() * 0.1 * exponentialDelay;
    
    // Aplicar delay máximo
    return Math.min(exponentialDelay + jitter, maxDelay);
  }

  /**
   * Função de sleep
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Função padrão para determinar se deve tentar novamente
   */
  private static defaultShouldRetry(error: any, attempt: number): boolean {
    // Não tentar novamente para erros de permissão
    if (error?.code === 'permission-denied') {
      return false;
    }

    // Não tentar novamente para erros de validação
    if (error?.code === 'invalid-argument') {
      return false;
    }

    // Tentar novamente para erros de rede e servidor
    return error?.code === 'unavailable' || 
           error?.code === 'deadline-exceeded' ||
           error?.code === 'resource-exhausted' ||
           error?.code === 'internal' ||
           error?.code === 'network-error';
  }

  /**
   * Função padrão para logging de retry
   */
  private static defaultOnRetry(error: any, attempt: number, delay: number, maxRetries: number): void {
    console.warn(
      `[FirebaseRetry] Tentativa ${attempt}/${maxRetries} falhou.`,
      `Próxima tentativa em ${delay}ms.`,
      `Erro: ${error?.message || error}`
    );
  }
}

/**
 * Opções para configuração do retry
 */
export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: any, attempt: number) => boolean;
  onRetry?: (error: any, attempt: number, delay: number, maxRetries: number) => void;
}

/**
 * Decorator para adicionar retry automático a métodos
 */
export function withRetry(options: RetryOptions = {}) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return FirebaseRetry.withRetry(
        () => method.apply(this, args),
        options
      );
    };
  };
}

/**
 * Hook React para operações com retry
 */
export function useFirebaseRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const execute = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setRetryCount(0);

    try {
      const result = await FirebaseRetry.withRetry(
        async () => {
          setRetryCount(prev => prev + 1);
          return await operation();
        },
        {
          ...options,
          onRetry: (error, attempt, delay, maxRetries) => {
            setRetryCount(attempt);
            options.onRetry?.(error, attempt, delay, maxRetries);
          }
        }
      );
      
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [operation, options]);

  React.useEffect(() => {
    execute();
  }, [execute]);

  const retry = React.useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, retryCount, retry };
}
