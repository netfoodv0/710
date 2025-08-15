import { useState, useCallback } from 'react';
import { PeriodType } from '../components/PeriodFilter';

export function usePeriodFilter(initialPeriod: PeriodType = 'weekly') {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(initialPeriod);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
    // Aqui você pode adicionar lógica adicional quando o período mudar
    // Por exemplo, recarregar dados, atualizar gráficos, etc.
  }, []);

  const getPeriodLabel = useCallback((period: PeriodType) => {
    switch (period) {
      case 'weekly':
        return 'Semanal';
      case 'monthly':
        return 'Mensal';
      default:
        return 'Semanal';
    }
  }, []);

  const getPeriodDays = useCallback((period: PeriodType) => {
    switch (period) {
      case 'weekly':
        return 7;
      case 'monthly':
        return 30;
      default:
        return 7;
    }
  }, []);

  return {
    selectedPeriod,
    handlePeriodChange,
    getPeriodLabel,
    getPeriodDays
  };
}