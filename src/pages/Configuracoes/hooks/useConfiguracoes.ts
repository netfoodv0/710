import { useState } from 'react';
import { ConfiguracaoLoja } from '../../../types';

interface UseConfiguracoesProps {
  configuracaoInicial: ConfiguracaoLoja;
}

export function useConfiguracoes({ configuracaoInicial }: UseConfiguracoesProps) {
  const [config, setConfig] = useState<ConfiguracaoLoja>(configuracaoInicial);
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações!');
    } finally {
      setSalvando(false);
    }
  };

  const handleHorarioChange = (
    dia: keyof typeof config.horarioFuncionamento, 
    campo: 'abertura' | 'fechamento' | 'ativo', 
    valor: string | boolean
  ) => {
    setConfig(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          [campo]: valor
        }
      }
    }));
  };

  return {
    config,
    setConfig,
    salvando,
    handleSalvar,
    handleHorarioChange
  };
} 