import { useCallback } from 'react';
import { ConfiguracaoLoja } from '../../../types';

export function useConfiguracoesForm(
  config: ConfiguracaoLoja | null, 
  setConfig: React.Dispatch<React.SetStateAction<ConfiguracaoLoja | null>>
) {
  const updateConfig = useCallback((updates: Partial<ConfiguracaoLoja>) => {
    setConfig(prev => prev ? { ...prev, ...updates } : null);
  }, [setConfig]);

  const updateEndereco = useCallback((field: string, value: string) => {
    setConfig(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value
        }
      };
    });
  }, [setConfig]);

  const getEnderecoCompleto = useCallback(() => {
    return {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      ...config?.endereco
    };
  }, [config]);

  const toggleSwitch = useCallback((field: keyof ConfiguracaoLoja, value: boolean) => {
    updateConfig({ [field]: value });
  }, [updateConfig]);

  const updateNumberField = useCallback((field: keyof ConfiguracaoLoja, value: string) => {
    const numValue = parseInt(value) || 0;
    updateConfig({ [field]: numValue });
  }, [updateConfig]);

  const updateStringField = useCallback((field: keyof ConfiguracaoLoja, value: string) => {
    updateConfig({ [field]: value });
  }, [updateConfig]);

  return {
    config,
    updateConfig,
    updateEndereco,
    getEnderecoCompleto,
    toggleSwitch,
    updateNumberField,
    updateStringField
  };
}
