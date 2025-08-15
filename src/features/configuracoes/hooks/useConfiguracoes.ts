import { useState } from 'react';
import { ConfiguracaoLoja } from '../../../types';

interface UseConfiguracoesProps {
  configuracaoInicial?: ConfiguracaoLoja;
}

// Configuração padrão para o restaurante
const configuracaoPadrao: ConfiguracaoLoja = {
  id: '1',
  restauranteId: '1',
  nomeRestaurante: 'Meu Restaurante',
  cnpj: '00.000.000/0000-00',
  telefone: '(11) 99999-9999',
  email: 'contato@meurestaurante.com',
  endereco: {
    rua: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  },
  horarioFuncionamento: {
    segunda: { abertura: '08:00', fechamento: '22:00', ativo: true },
    terca: { abertura: '08:00', fechamento: '22:00', ativo: true },
    quarta: { abertura: '08:00', fechamento: '22:00', ativo: true },
    quinta: { abertura: '08:00', fechamento: '22:00', ativo: true },
    sexta: { abertura: '08:00', fechamento: '23:00', ativo: true },
    sabado: { abertura: '09:00', fechamento: '23:00', ativo: true },
    domingo: { abertura: '10:00', fechamento: '22:00', ativo: true }
  },
  taxaEntrega: 5.00,
  tempoPreparoMedio: 30,
  valorMinimoEntrega: 15.00,
  raioEntregaKm: 5,
  ativo: true
};

export function useConfiguracoes({ configuracaoInicial }: UseConfiguracoesProps = {}) {
  const [config, setConfig] = useState<ConfiguracaoLoja>(configuracaoInicial || configuracaoPadrao);
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