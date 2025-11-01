import { useMemo } from 'react';

/**
 * Hook para gerar dados de tendência para gráficos de estatísticas
 * Gera uma série temporal baseada no valor atual e padrões de tendência
 * 
 * @param currentValue - Valor atual da métrica
 * @param patternIndex - Índice do padrão de tendência a usar (0-3)
 * @param historicalData - Dados históricos reais (opcional, ainda não implementado)
 * @returns Array de números representando a tendência ao longo do tempo
 */
export function useTrendData(
  currentValue: number,
  patternIndex: number = 0,
  historicalData?: number[]
): number[] {
  return useMemo(() => {
    // Se houver dados históricos reais, usar eles
    if (historicalData && historicalData.length > 0) {
      // Normalizar dados históricos para ter 14 pontos
      if (historicalData.length === 14) {
        return historicalData;
      }
      
      // Interpolar ou estender dados históricos para 14 pontos
      const targetLength = 14;
      if (historicalData.length < targetLength) {
        // Estender dados históricos mantendo a tendência
        const step = (currentValue - historicalData[historicalData.length - 1]) / 
                     (targetLength - historicalData.length);
        const extended = [...historicalData];
        for (let i = historicalData.length; i < targetLength; i++) {
          extended.push(historicalData[historicalData.length - 1] + step * (i - historicalData.length + 1));
        }
        return extended;
      }
      
      // Se tiver mais pontos, pegar os últimos 14
      return historicalData.slice(-targetLength);
    }

    // Padrões base de tendência (simula 14 dias: 7 anteriores + 7 atuais)
    // Cada padrão representa um comportamento diferente
    const TREND_PATTERNS = [
      // Padrão 0: Crescimento estável (Total de Produtos)
      [10, 10, 10, 10, 10, 10, 10, 12, 14, 13, 15, 16, 18, 20],
      // Padrão 1: Crescimento moderado (Baixo Estoque)
      [8, 8, 8, 8, 8, 8, 8, 10, 11, 12, 13, 14, 15, 16],
      // Padrão 2: Variação com queda (Sem Estoque)
      [6, 6, 6, 6, 6, 6, 6, 7, 8, 7, 9, 10, 11, 12],
      // Padrão 3: Crescimento acelerado (Valor Total)
      [15, 15, 15, 15, 15, 15, 15, 18, 19, 20, 21, 22, 23, 24]
    ];

    // Selecionar padrão base
    const basePattern = TREND_PATTERNS[patternIndex % TREND_PATTERNS.length];
    
    // Se temos um valor atual > 0, escalar o padrão para refletir esse valor
    if (currentValue > 0) {
      const lastBaseValue = basePattern[basePattern.length - 1];
      
      // Calcular fator de escala
      const scaleFactor = currentValue / Math.max(lastBaseValue, 1);
      
      // Escalar apenas os últimos valores (últimos 5 pontos) para manter tendência inicial
      return basePattern.map((value, index) => {
        // Manter valores iniciais próximos ao padrão base
        // Escalar progressivamente nos últimos pontos
        if (index < basePattern.length - 5) {
          return value;
        }
        
        // Escalar progressivamente
        const progress = (index - (basePattern.length - 5)) / 5;
        const scaledValue = value + (value * scaleFactor - value) * progress;
        
        return Math.max(1, Math.round(scaledValue));
      });
    }

    // Se valor atual é 0 ou negativo, retornar padrão base
    return basePattern;
  }, [currentValue, patternIndex, historicalData]);
}


