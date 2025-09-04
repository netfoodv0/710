import { useState, useEffect, useCallback } from 'react';
import { useConfiguracoes } from '../../PaginaConfiguracoes/hooks/useConfiguracoes';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { UseHorariosReturn, HorariosData } from '../types';

export function useHorarios(): UseHorariosReturn {
  const { 
    config, 
    setConfig, 
    salvando,
    handleSalvar, 
    error, 
    limparErro,
    handleHorarioChange,
    adicionarPausa,
    removerPausa,
    atualizarPausa,
    adicionarHorarioEspecial,
    removerHorarioEspecial,
    atualizarHorarioEspecial,
    atualizarConfiguracaoAvancada
  } = useConfiguracoes();
  
  const { showSuccess, showError } = useNotificationContext();
  
  const [horarioAtual, setHorarioAtual] = useState(new Date());

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setHorarioAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para salvar horários
  const handleSave = useCallback(async () => {
    try {
      await handleSalvar();
      showSuccess('Horários salvos com sucesso!');
    } catch (err) {
      showError('Erro ao salvar horários');
    }
  }, [handleSalvar, showSuccess, showError]);

  // Função para tentar novamente em caso de erro
  const handleRetry = useCallback(() => {
    limparErro();
  }, [limparErro]);

  // Dados consolidados
  const data: HorariosData = {
    config,
    horarioAtual,
    loading: salvando,
    error
  };

  return {
    data,
    handleSave,
    handleRetry,
    handleHorarioChange,
    adicionarPausa,
    removerPausa,
    atualizarPausa,
    adicionarHorarioEspecial,
    removerHorarioEspecial,
    atualizarHorarioEspecial,
    atualizarConfiguracaoAvancada
  };
}
