/**
 * Sistema de monitoramento de performance para operações do Firebase
 * Rastreia tempo de execução, sucesso/falha e métricas de uso
 */
export class FirebasePerformance {
  private static metrics = new Map<string, PerformanceMetric>();
  private static readonly MAX_METRICS = 1000;

  /**
   * Estrutura para métricas de performance
   */
  private static PerformanceMetric = class {
    constructor(
      public operationName: string,
      public collectionName: string,
      public successCount: number = 0,
      public errorCount: number = 0,
      public totalTime: number = 0,
      public minTime: number = Infinity,
      public maxTime: number = 0,
      public lastExecuted: Date = new Date(),
      public lastError?: Error
    ) {}

    get averageTime(): number {
      const totalOperations = this.successCount + this.errorCount;
      return totalOperations > 0 ? this.totalTime / totalOperations : 0;
    }

    get successRate(): number {
      const totalOperations = this.successCount + this.errorCount;
      return totalOperations > 0 ? (this.successCount / totalOperations) * 100 : 0;
    }
  }

  /**
   * Rastreia uma operação do Firebase
   */
  static async traceOperation<T>(
    operationName: string,
    collectionName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    const metricKey = `${collectionName}:${operationName}`;
    
    // Obter ou criar métrica
    let metric = this.metrics.get(metricKey);
    if (!metric) {
      metric = new this.PerformanceMetric(operationName, collectionName);
      this.metrics.set(metricKey, metric);
      
      // Limpar métricas antigas se necessário
      if (this.metrics.size > this.MAX_METRICS) {
        this.cleanupOldMetrics();
      }
    }

    try {
      const result = await operation();
      
      // Registrar sucesso
      const executionTime = performance.now() - startTime;
      metric.successCount++;
      metric.totalTime += executionTime;
      metric.minTime = Math.min(metric.minTime, executionTime);
      metric.maxTime = Math.max(metric.maxTime, executionTime);
      metric.lastExecuted = new Date();
      
      return result;
    } catch (error) {
      // Registrar erro
      const executionTime = performance.now() - startTime;
      metric.errorCount++;
      metric.totalTime += executionTime;
      metric.minTime = Math.min(metric.minTime, executionTime);
      metric.maxTime = Math.max(metric.maxTime, executionTime);
      metric.lastExecuted = new Date();
      metric.lastError = error as Error;
      
      throw error;
    }
  }

  /**
   * Obtém métricas para uma operação específica
   */
  static getMetric(collectionName: string, operationName: string): PerformanceMetric | null {
    const key = `${collectionName}:${operationName}`;
    return this.metrics.get(key) || null;
  }

  /**
   * Obtém todas as métricas
   */
  static getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Obtém métricas resumidas
   */
  static getSummary(): PerformanceSummary {
    const metrics = Array.from(this.metrics.values());
    
    const totalOperations = metrics.reduce((sum, m) => sum + m.successCount + m.errorCount, 0);
    const totalSuccess = metrics.reduce((sum, m) => sum + m.successCount, 0);
    const totalErrors = metrics.reduce((sum, m) => sum + m.errorCount, 0);
    const totalTime = metrics.reduce((sum, m) => sum + m.totalTime, 0);
    
    return {
      totalOperations,
      totalSuccess,
      totalErrors,
      successRate: totalOperations > 0 ? (totalSuccess / totalOperations) * 100 : 0,
      averageTime: totalOperations > 0 ? totalTime / totalOperations : 0,
      totalCollections: new Set(metrics.map(m => m.collectionName)).size,
      totalOperations: metrics.length
    };
  }

  /**
   * Obtém métricas por coleção
   */
  static getMetricsByCollection(): Map<string, PerformanceMetric[]> {
    const grouped = new Map<string, PerformanceMetric[]>();
    
    this.metrics.forEach(metric => {
      if (!grouped.has(metric.collectionName)) {
        grouped.set(metric.collectionName, []);
      }
      grouped.get(metric.collectionName)!.push(metric);
    });
    
    return grouped;
  }

  /**
   * Obtém operações mais lentas
   */
  static getSlowestOperations(limit: number = 10): PerformanceMetric[] {
    return Array.from(this.metrics.values())
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, limit);
  }

  /**
   * Obtém operações com mais erros
   */
  static getOperationsWithMostErrors(limit: number = 10): PerformanceMetric[] {
    return Array.from(this.metrics.values())
      .filter(m => m.errorCount > 0)
      .sort((a, b) => b.errorCount - a.errorCount)
      .slice(0, limit);
  }

  /**
   * Limpa métricas antigas
   */
  private static cleanupOldMetrics(): void {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    for (const [key, metric] of this.metrics.entries()) {
      if (metric.lastExecuted < oneHourAgo) {
        this.metrics.delete(key);
      }
    }
  }

  /**
   * Limpa todas as métricas
   */
  static clear(): void {
    this.metrics.clear();
  }

  /**
   * Exporta métricas para análise
   */
  static exportMetrics(): string {
    const summary = this.getSummary();
    const metrics = this.getAllMetrics();
    
    return JSON.stringify({
      summary,
      metrics: metrics.map(m => ({
        collectionName: m.collectionName,
        operationName: m.operationName,
        successCount: m.successCount,
        errorCount: m.errorCount,
        averageTime: m.averageTime,
        successRate: m.successRate,
        lastExecuted: m.lastExecuted.toISOString()
      })),
      timestamp: new Date().toISOString()
    }, null, 2);
  }
}

/**
 * Interface para métricas de performance
 */
export interface PerformanceMetric {
  operationName: string;
  collectionName: string;
  successCount: number;
  errorCount: number;
  totalTime: number;
  minTime: number;
  maxTime: number;
  averageTime: number;
  successRate: number;
  lastExecuted: Date;
  lastError?: Error;
}

/**
 * Interface para resumo de performance
 */
export interface PerformanceSummary {
  totalOperations: number;
  totalSuccess: number;
  totalErrors: number;
  successRate: number;
  averageTime: number;
  totalCollections: number;
  totalOperations: number;
}

/**
 * Hook React para monitorar performance
 */
export function useFirebasePerformance() {
  const [metrics, setMetrics] = React.useState<PerformanceMetric[]>([]);
  const [summary, setSummary] = React.useState<PerformanceSummary | null>(null);

  React.useEffect(() => {
    const updateMetrics = () => {
      setMetrics(FirebasePerformance.getAllMetrics());
      setMetrics(FirebasePerformance.getSummary());
    };

    // Atualizar métricas a cada 5 segundos
    const interval = setInterval(updateMetrics, 5000);
    updateMetrics(); // Atualizar imediatamente

    return () => clearInterval(interval);
  }, []);

  const clearMetrics = React.useCallback(() => {
    FirebasePerformance.clear();
    setMetrics([]);
    setSummary(null);
  }, []);

  const exportMetrics = React.useCallback(() => {
    return FirebasePerformance.exportMetrics();
  }, []);

  return {
    metrics,
    summary,
    clearMetrics,
    exportMetrics,
    getSlowestOperations: FirebasePerformance.getSlowestOperations,
    getOperationsWithMostErrors: FirebasePerformance.getOperationsWithMostErrors,
    getMetricsByCollection: FirebasePerformance.getMetricsByCollection
  };
}
