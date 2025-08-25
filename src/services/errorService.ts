// Serviço de tratamento de erros para o dashboard
export interface ErrorContext {
  component: string;
  action: string;
  data?: any;
  timestamp: Date;
}

export interface ErrorLog {
  error: Error;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Serviço de logging
class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Limite de logs em memória

  // Log de erro com contexto
  logError(error: Error, context: Omit<ErrorContext, 'timestamp'>, severity: ErrorLog['severity'] = 'medium') {
    const errorLog: ErrorLog = {
      error,
      context: {
        ...context,
        timestamp: new Date()
      },
      severity
    };

    // Adicionar ao array de logs
    this.logs.push(errorLog);
    
    // Manter apenas os logs mais recentes
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log no console para desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${severity.toUpperCase()}] ${context.component}:${context.action}`, error, context);
    }

    // Aqui você pode enviar para serviços externos como Sentry, LogRocket, etc.
    this.sendToExternalService(errorLog);
  }

  // Enviar erro para serviço externo
  private sendToExternalService(errorLog: ErrorLog) {
    // Implementar integração com serviços de monitoramento
    // Por exemplo: Sentry, LogRocket, Bugsnag, etc.
    
    // Simulação de envio para serviço externo
    if (process.env.NODE_ENV === 'production') {
      // fetch('/api/errors', {
      //   method: 'POST',
      //   body: JSON.stringify(errorLog),
      //   headers: { 'Content-Type': 'application/json' }
      // }).catch(console.error);
    }
  }

  // Obter logs de erro
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  // Limpar logs
  clearLogs() {
    this.logs = [];
  }

  // Obter estatísticas de erros
  getErrorStats() {
    const severityCounts = this.logs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.logs.length,
      bySeverity: severityCounts,
      recent: this.logs.slice(-10) // Últimos 10 erros
    };
  }
}

// Instância global do logger
export const errorLogger = new ErrorLogger();

// Funções utilitárias para tratamento de erros
export const logError = (error: Error, context: Omit<ErrorContext, 'timestamp'>, severity?: ErrorLog['severity']) => {
  errorLogger.logError(error, context, severity);
};

// Função para tratamento robusto de erros de imagem
export const handleImageError = (event: Event, fallbackUrl: string, context: string) => {
  const target = event.target as HTMLImageElement;
  
  try {
    // Tentar carregar imagem de fallback
    target.src = fallbackUrl;
    
    // Log do erro para monitoramento
    logError(
      new Error(`Failed to load image: ${target.src}`),
      { component: 'ImageLoader', action: 'fallback', data: { originalSrc: target.src, fallbackUrl } },
      'low'
    );
  } catch (fallbackError) {
    // Se o fallback também falhar, usar placeholder
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyMEMyOS41IDIwIDIxIDI4LjUgMjEgMzlDMjEgNDkuNSAyOS41IDU4IDQwIDU4QzUwLjUgNTggNTkgNDkuNSA1OSAzOUM1OSAyOC41IDUwLjUgMjAgNDAgMjBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xNiA2NEMxNiA2NCAyNCA1NiAzMiA1NkM0MCA1NiA0OCA2NCA0OCA2NEgxNloiIGZpbGw9IiM5QjlBQTAiLz4KPC9zdmc+';
    
    logError(
      new Error(`Failed to load fallback image: ${fallbackUrl}`),
      { component: 'ImageLoader', action: 'fallback-failed', data: { fallbackUrl } },
      'medium'
    );
  }
};

// Função para tratamento de erros de API
export const handleApiError = (error: any, context: string) => {
  let severity: ErrorLog['severity'] = 'medium';
  
  // Determinar severidade baseada no tipo de erro
  if (error.status >= 500) {
    severity = 'high';
  } else if (error.status >= 400) {
    severity = 'medium';
  } else {
    severity = 'low';
  }

  logError(
    new Error(`API Error: ${error.message || 'Unknown error'}`),
    { component: 'API', action: context, data: { status: error.status, url: error.url } },
    severity
  );

  return severity;
};

// Função para tratamento de erros de validação
export const handleValidationError = (error: Error, field: string, value: any) => {
  logError(
    error,
    { component: 'Validation', action: 'field-validation', data: { field, value } },
    'low'
  );
};

// Hook para uso em componentes
export const useErrorHandler = () => {
  return {
    logError,
    handleImageError,
    handleApiError,
    handleValidationError,
    getErrorStats: () => errorLogger.getErrorStats()
  };
};
