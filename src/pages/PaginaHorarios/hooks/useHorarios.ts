import { useState, useEffect, useCallback } from 'react';
import { useHorariosActions } from './useHorariosActions';
import { useHorariosTranslation } from './useHorariosTranslation';
import { HorarioData, HorariosConfig, UseHorariosReturn } from '../types';

const DIAS_SEMANA = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
  'Quinta-feira', 'Sexta-feira', 'Sábado'
];

const generateInitialHorarios = (): HorarioData[] => {
  return DIAS_SEMANA.map(dia => ({
    id: dia.toLowerCase().replace('-', '_'),
    diaSemana: dia,
    horaAbertura: '00:00',
    horaFechamento: '23:59',
    ativo: true
  }));
};

export function useHorarios(): UseHorariosReturn {
  const [data, setData] = useState<HorariosConfig>({
    fusoHorario: 'America/Sao_Paulo', // Fuso horário padrão do Brasil
    horarios: generateInitialHorarios()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { 
    fetchHorariosData, 
    saveHorariosData 
  } = useHorariosActions();
  
  const { t } = useHorariosTranslation();

  // Carrega os dados iniciais
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchHorariosData();
        setData(result);
      } catch (err) {
        // Erro silencioso - não exibe mensagem
        console.error('Erro ao carregar horários:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchHorariosData]);

  // Atualiza um horário específico
  const handleUpdateHorario = useCallback(async (diaSemana: string, newData: Partial<HorarioData>) => {
    try {
      setData(prev => ({
        ...prev,
        horarios: prev.horarios.map(horario => 
          horario.diaSemana === diaSemana 
            ? { ...horario, ...newData }
            : horario
        )
      }));
    } catch (err) {
      // Erro silencioso - não exibe mensagem
      console.error('Erro ao atualizar horário:', err);
    }
  }, []);

  // Atualiza o fuso horário
  const handleUpdateFusoHorario = useCallback(async (fusoHorario: string) => {
    try {
      setData(prev => ({
        ...prev,
        fusoHorario
      }));
    } catch (err) {
      // Erro silencioso - não exibe mensagem
      console.error('Erro ao atualizar fuso horário:', err);
    }
  }, []);

  // Alterna o status ativo/inativo de um dia
  const handleToggleDia = useCallback(async (diaSemana: string) => {
    try {
      setData(prev => ({
        ...prev,
        horarios: prev.horarios.map(horario => 
          horario.diaSemana === diaSemana 
            ? { ...horario, ativo: !horario.ativo }
            : horario
        )
      }));
    } catch (err) {
      // Erro silencioso - não exibe mensagem
      console.error('Erro ao alterar status do dia:', err);
    }
  }, []);

  // Salva todos os horários
  const handleSaveHorarios = useCallback(async () => {
    setIsSaving(true);
    
    try {
      await saveHorariosData(data);
    } catch (err) {
      // Erro silencioso - não exibe mensagem
      console.error('Erro ao salvar horários:', err);
    } finally {
      setIsSaving(false);
    }
  }, [data, saveHorariosData]);

  return {
    data,
    isLoading,
    isSaving,
    handleUpdateHorario,
    handleUpdateFusoHorario,
    handleToggleDia,
    handleSaveHorarios,
    t
  };
}
