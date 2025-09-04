import { useCallback } from 'react';
import { UseHorariosActionsReturn } from '../types';

interface UseHorariosActionsProps {
  onSave: () => Promise<void>;
  onRetry: () => void;
}

export function useHorariosActions({ onSave, onRetry }: UseHorariosActionsProps): UseHorariosActionsReturn {
  const handleSave = useCallback(async () => {
    await onSave();
  }, [onSave]);

  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return {
    handleSave,
    handleRetry
  };
}
