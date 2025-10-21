import { useCallback } from 'react';
import { HorarioData, HorariosConfig } from '../types';
import { FirebaseConfiguracaoService } from '../../../services/firebaseConfiguracaoService';
import { ConfiguracaoLoja } from '../../../features/configuracoes/types/configuracoes.types';
import { useAuth } from '../../../hooks';

const DIAS_SEMANA = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
  'Quinta-feira', 'Sexta-feira', 'Sábado'
];

const DIAS_FIREBASE = {
  'Domingo': 'domingo',
  'Segunda-feira': 'segunda',
  'Terça-feira': 'terca',
  'Quarta-feira': 'quarta',
  'Quinta-feira': 'quinta',
  'Sexta-feira': 'sexta',
  'Sábado': 'sabado'
};

export function useHorariosActions() {
  const { loja } = useAuth();

  const fetchHorariosData = useCallback(async (): Promise<HorariosConfig> => {
    if (!loja?.id) {
      throw new Error('Loja não encontrada');
    }

    try {
      let configuracao = await FirebaseConfiguracaoService.buscarConfiguracaoPorLoja(loja.id);
      
      if (!configuracao) {
        // Se não existe configuração, criar uma padrão
        console.log('Configuração não encontrada, criando configuração padrão...');
        configuracao = await FirebaseConfiguracaoService.criarConfiguracaoPadrao(loja.id, 'Minha Loja');
      }
      
      // Converter estrutura do Firebase para nossa estrutura
      const horarios: HorarioData[] = DIAS_SEMANA.map(dia => {
        const diaFirebase = DIAS_FIREBASE[dia as keyof typeof DIAS_FIREBASE];
        const horarioFirebase = configuracao.horarioFuncionamento?.[diaFirebase];
        
        return {
          id: diaFirebase,
          diaSemana: dia,
          horaAbertura: horarioFirebase?.abertura || '08:00',
          horaFechamento: horarioFirebase?.fechamento || '22:00',
          ativo: horarioFirebase?.ativo || true
        };
      });

      return {
        fusoHorario: configuracao.fusoHorario || 'America/Sao_Paulo',
        horarios
      };
    } catch (error) {
      console.error('Erro ao buscar configuração de horários:', error);
      throw error;
    }
  }, [loja?.id]);

  const saveHorariosData = useCallback(async (config: HorariosConfig): Promise<void> => {
    if (!loja?.id) {
      throw new Error('Loja não encontrada');
    }

    try {
      // Buscar configuração atual
      const configuracaoAtual = await FirebaseConfiguracaoService.buscarConfiguracaoPorLoja(loja.id);
      
      if (!configuracaoAtual) {
        throw new Error('Configuração da loja não encontrada');
      }
      
      // Converter nossa estrutura para estrutura do Firebase
      const novoHorarioFuncionamento = { ...configuracaoAtual.horarioFuncionamento };
      
      config.horarios.forEach(horario => {
        const diaFirebase = DIAS_FIREBASE[horario.diaSemana as keyof typeof DIAS_FIREBASE];
        if (diaFirebase && novoHorarioFuncionamento[diaFirebase as keyof typeof novoHorarioFuncionamento]) {
          novoHorarioFuncionamento[diaFirebase as keyof typeof novoHorarioFuncionamento] = {
            abertura: horario.horaAbertura,
            fechamento: horario.horaFechamento,
            ativo: horario.ativo
          };
        }
      });

      // Atualizar configuração
      const configuracaoAtualizada: ConfiguracaoLoja = {
        ...configuracaoAtual,
        fusoHorario: config.fusoHorario,
        horarioFuncionamento: novoHorarioFuncionamento,
        dataAtualizacao: new Date()
      };

      await FirebaseConfiguracaoService.salvarConfiguracao(configuracaoAtualizada);
    } catch (error) {
      console.error('Erro ao salvar configuração de horários:', error);
      throw error;
    }
  }, [loja?.id]);

  return {
    fetchHorariosData,
    saveHorariosData
  };
}
