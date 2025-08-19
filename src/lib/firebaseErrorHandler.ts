/**
 * Sistema centralizado de tratamento de erros do Firebase
 * Fornece mensagens de erro amigáveis e logging estruturado
 */
export class FirebaseErrorHandler {
  /**
   * Mapeia códigos de erro do Firebase para mensagens amigáveis
   */
  private static readonly ERROR_MESSAGES: Record<string, string> = {
    'permission-denied': 'Acesso negado. Verifique suas permissões.',
    'unavailable': 'Serviço temporariamente indisponível. Tente novamente.',
    'not-found': 'Recurso não encontrado.',
    'already-exists': 'Este recurso já existe.',
    'invalid-argument': 'Dados inválidos fornecidos.',
    'deadline-exceeded': 'Operação expirou. Tente novamente.',
    'resource-exhausted': 'Limite de recursos atingido.',
    'failed-precondition': 'Operação não pode ser executada no estado atual.',
    'aborted': 'Operação foi cancelada.',
    'out-of-range': 'Valor fora do intervalo permitido.',
    'unimplemented': 'Operação não implementada.',
    'internal': 'Erro interno do servidor.',
    'data-loss': 'Perda de dados detectada.',
    'unauthenticated': 'Usuário não autenticado.',
    'network-error': 'Erro de conexão. Verifique sua internet.',
    'quota-exceeded': 'Cota de uso excedida.',
    'cancelled': 'Operação foi cancelada pelo usuário.'
  };

  /**
   * Trata erros do Firebase e retorna mensagens amigáveis
   */
  static handle(error: any, context: string): never {
    const errorCode = error?.code || 'unknown';
    const errorMessage = this.ERROR_MESSAGES[errorCode] || 'Erro inesperado ocorreu.';
    
    // Log estruturado do erro
    console.error(`[${context}] Erro Firebase:`, {
      code: errorCode,
      message: error.message,
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack,
      originalError: error
    });

    // Criar erro personalizado
    const customError = new Error(`${errorMessage} (${context})`);
    customError.name = 'FirebaseError';
    (customError as any).originalError = error;
    (customError as any).errorCode = errorCode;
    (customError as any).context = context;
    
    throw customError;
  }

  /**
   * Verifica se um erro é específico do Firebase
   */
  static isFirebaseError(error: any): boolean {
    return error && (
      error.code || 
      error.message?.includes('Firebase') ||
      error.message?.includes('permission-denied') ||
      error.message?.includes('unavailable')
    );
  }

  /**
   * Obtém mensagem de erro amigável sem lançar exceção
   */
  static getErrorMessage(error: any, context: string): string {
    try {
      const errorCode = error?.code || 'unknown';
      const baseMessage = this.ERROR_MESSAGES[errorCode] || 'Erro inesperado ocorreu.';
      return `${baseMessage} (${context})`;
    } catch {
      return `Erro desconhecido (${context})`;
    }
  }

  /**
   * Log de erro para analytics/monitoramento
   */
  static logError(error: any, context: string, additionalData?: any) {
    const errorInfo = {
      code: error?.code || 'unknown',
      message: error?.message || 'Unknown error',
      context,
      timestamp: new Date().toISOString(),
      additionalData,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Log para console em desenvolvimento
    if (import.meta.env.DEV) {
      console.error('Firebase Error Log:', errorInfo);
    }

    // Aqui você pode adicionar integração com serviços de monitoramento
    // como Sentry, LogRocket, etc.
    
    return errorInfo;
  }
}

/**
 * Decorator para capturar erros automaticamente em métodos
 */
export function withErrorHandling(context: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await method.apply(this, args);
      } catch (error) {
        FirebaseErrorHandler.logError(error, `${context}.${propertyName}`);
        throw error;
      }
    };
  };
}
