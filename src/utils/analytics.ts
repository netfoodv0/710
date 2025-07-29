import { logEvent, Analytics } from 'firebase/analytics';

interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

/**
 * Utilitário para enviar eventos do Analytics de forma segura
 */
export class AnalyticsService {
  private analytics: Analytics | null = null;

  constructor(analytics: Analytics | null) {
    this.analytics = analytics;
  }

  /**
   * Envia um evento para o Analytics se disponível
   */
  logEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.analytics) {
      console.log(`Analytics não disponível - Evento: ${eventName}`, parameters);
      return;
    }

    try {
      logEvent(this.analytics, eventName, parameters);
      console.log(`Evento enviado: ${eventName}`, parameters);
    } catch (error) {
      console.warn(`Erro ao enviar evento ${eventName}:`, error);
    }
  }

  /**
   * Eventos pré-definidos para o cardápio
   */
  logCardapioEvent(action: string, details?: Record<string, any>): void {
    this.logEvent('cardapio_action', {
      action,
      timestamp: new Date().toISOString(),
      ...details
    });
  }

  /**
   * Eventos de produtos
   */
  logProdutoEvent(action: 'criar' | 'editar' | 'excluir' | 'duplicar' | 'toggle_status', produtoId?: string): void {
    this.logCardapioEvent(`produto_${action}`, {
      produto_id: produtoId,
      action
    });
  }

  /**
   * Eventos de categorias
   */
  logCategoriaEvent(action: 'criar' | 'editar' | 'excluir' | 'duplicar', categoriaId?: string, tipo?: 'produtos' | 'adicionais'): void {
    this.logCardapioEvent(`categoria_${action}`, {
      categoria_id: categoriaId,
      tipo,
      action
    });
  }

  /**
   * Eventos de filtros
   */
  logFiltroEvent(filtro: string, valor: string): void {
    this.logCardapioEvent('filtro_aplicado', {
      filtro,
      valor
    });
  }

  /**
   * Eventos de busca
   */
  logBuscaEvent(termo: string, resultados: number): void {
    this.logCardapioEvent('busca_realizada', {
      termo,
      resultados
    });
  }
}

/**
 * Hook para usar o Analytics de forma segura
 */
export function useAnalyticsService(analytics: Analytics | null) {
  return new AnalyticsService(analytics);
} 