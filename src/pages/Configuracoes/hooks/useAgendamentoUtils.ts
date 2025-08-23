import { useMemo } from 'react';
import { ConfiguracaoLoja } from '../../../types';

export function useAgendamentoUtils(config: ConfiguracaoLoja | null) {
  const horariosExemplo = useMemo(() => {
    if (!config?.agendamentoAtivo) return [];
    
    const intervalo = config?.agendamentoAntecedencia || 30;
    const janela = config?.agendamentoJanela || 30;
    
    const horarios = [];
    
    // Primeiro horário: 19:00
    const horaInicio1 = '19:00';
    const fimMinutos1 = 0 + janela;
    const horaFim1 = 19 + Math.floor(fimMinutos1 / 60);
    const minutoFim1 = fimMinutos1 % 60;
    const horaFimStr1 = `${horaFim1.toString().padStart(2, '0')}:${minutoFim1.toString().padStart(2, '0')}`;
    horarios.push(`${horaInicio1} - ${horaFimStr1}`);
    
    // Segundo horário: baseado no intervalo
    const horaInicio2 = '19:30';
    const fimMinutos2 = 30 + janela;
    const horaFim2 = 19 + Math.floor(fimMinutos2 / 60);
    const minutoFim2 = fimMinutos2 % 60;
    const horaFimStr2 = `${horaFim2.toString().padStart(2, '0')}:${minutoFim2.toString().padStart(2, '0')}`;
    horarios.push(`${horaInicio2} - ${horaFimStr2}`);
    
    return horarios;
  }, [config?.agendamentoAtivo, config?.agendamentoAntecedencia, config?.agendamentoLimite]);

  return {
    horariosExemplo
  };
}
