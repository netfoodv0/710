import { useCallback } from 'react';
import { UseCuponsActionsReturn, Cupom, PeriodType } from '../types';

interface UseCuponsActionsProps {
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => Promise<void>;
  onView: (cupom: Cupom) => void;
  onEdit: (cupom: Cupom) => void;
  onDelete: (cupom: Cupom) => void;
  onAdd: () => void;
}

export function useCuponsActions({ 
  onPeriodChange, 
  onExport, 
  onView, 
  onEdit, 
  onDelete, 
  onAdd 
}: UseCuponsActionsProps): UseCuponsActionsReturn {
  const handlePeriodChange = useCallback((period: PeriodType) => {
    onPeriodChange(period);
  }, [onPeriodChange]);

  const handleExport = useCallback(async () => {
    await onExport();
  }, [onExport]);

  const handleView = useCallback((cupom: Cupom) => {
    onView(cupom);
  }, [onView]);

  const handleEdit = useCallback((cupom: Cupom) => {
    onEdit(cupom);
  }, [onEdit]);

  const handleDelete = useCallback((cupom: Cupom) => {
    onDelete(cupom);
  }, [onDelete]);

  const handleAdd = useCallback(() => {
    onAdd();
  }, [onAdd]);

  return {
    handlePeriodChange,
    handleExport,
    handleView,
    handleEdit,
    handleDelete,
    handleAdd
  };
}


