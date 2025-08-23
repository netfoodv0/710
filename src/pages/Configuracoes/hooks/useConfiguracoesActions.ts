import { useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { ConfiguracaoLoja } from '../../../types';

export function useConfiguracoesActions(
  config: ConfiguracaoLoja | null,
  onSave: () => Promise<void>,
  onRetry: () => void
) {
  const { showSuccess, showError } = useNotificationContext();

  const handleSave = useCallback(async () => {
    try {
      await onSave();
      showSuccess('Configurações salvas com sucesso!');
    } catch (err) {
      showError('Erro ao salvar configurações');
    }
  }, [onSave, showSuccess, showError]);

  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    handleSave,
    handleRetry,
    handleReload
  };
}
