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
    return period === 'weekly' ? 'Semanal' : 'Mensal';
  }, []);

  const getPeriodDays = useCallback((period: PeriodType) => {
    return period === 'weekly' ? 7 : 30;
  }, []);

  return {
    selectedPeriod,
    handlePeriodChange,
    getPeriodLabel,
    getPeriodDays
  };
} 