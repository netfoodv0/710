import { useState, useEffect } from 'react';
import { ConfiguracaoLoja, HorarioPausa, HorarioEspecial, HorarioDia } from '../../../types';
import { FirebaseConfiguracaoService } from '../../../services/firebaseConfiguracaoService';
import { useAuth } from '../../../hooks/useAuth';
import { useNotificationContext } from '../../../context/notificationContextUtils';

interface UseConfiguracoesProps {
  configuracaoInicial?: ConfiguracaoLoja;
}

// Configuração padrão para o restaurante
const configuracaoPadrao: ConfiguracaoLoja = {
  id: '1',
  restauranteId: '1',
  nomeRestaurante: 'Meu Restaurante',
  descricao: 'Restaurante especializado em comida caseira e tradicional',
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
    segunda: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
    terca: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
    quarta: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
    quinta: { abertura: '08:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' },
    sexta: { abertura: '08:00', fechamento: '23:00', ativo: true, pausas: [], entregaAte: '22:30', pedidoAte: '22:00' },
    sabado: { abertura: '09:00', fechamento: '23:00', ativo: true, pausas: [], entregaAte: '22:30', pedidoAte: '22:00' },
    domingo: { abertura: '10:00', fechamento: '22:00', ativo: true, pausas: [], entregaAte: '21:30', pedidoAte: '21:00' }
  },
  horariosEspeciais: [],
  configuracaoAvancada: {
    aceitarPedidosForaHorario: false,
    tempoLimiteEntrega: 60,
    pausaAutomatica: true,
    notificarMudancaHorario: true
  },
  taxaEntrega: 5.00,
  tempoPreparoMedio: 30,
  valorMinimoEntrega: 15.00,
  raioEntregaKm: 5,
  ativo: true,
  
  // Novas propriedades para configurações
  entregaDomicilio: true,
  retiradaLocal: true,
  entregaDelivery: true,
  pedidoMinimo: '15,00',
  raioEntrega: '5',
  
  // Horários simplificados
  horarioAbertura: '08:00',
  horarioFechamento: '22:00',
  diasFuncionamento: {
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: true,
    domingo: true
  },
  
  // Formas de pagamento
  pagamentoDinheiro: true,
  pagamentoCredito: true,
  pagamentoDebito: true,
  pagamentoPix: true,
  pagamentoValeRefeicao: false,
  
  // Notificações
  notificacoesEmail: true,
  notificacoesSMS: false,
  notificacoesPush: true,
  alertasEstoque: true,
  
  // Aparência
  tema: 'claro',
  corPrincipal: 'azul',
  modoCompacto: false,
  animacoes: true
};

export function useConfiguracoes({ configuracaoInicial }: UseConfiguracoesProps = {}) {
  const { user, loja } = useAuth();
  const { addNotification } = useNotificationContext();
  const [config, setConfig] = useState<ConfiguracaoLoja>(configuracaoInicial || configuracaoPadrao);
  const [salvando, setSalvando] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Carregar configurações do Firebase quando o componente monta
  useEffect(() => {
    const carregarConfiguracoes = async () => {
      const lojaId = user?.uid || loja?.id;
      
      if (!lojaId) {
        return;
      }

      try {
        const configuracaoCarregada = await FirebaseConfiguracaoService.buscarConfiguracaoPorLoja(lojaId);
        
        if (configuracaoCarregada) {
          setConfig(configuracaoCarregada);
        } else {
          // Se não existe configuração, criar uma padrão
          const nomeRestaurante = loja?.nomeLoja || user?.nome || 'Meu Restaurante';
          const novaConfiguracao = await FirebaseConfiguracaoService.criarConfiguracaoPadrao(
            lojaId, 
            nomeRestaurante
          );
          setConfig(novaConfiguracao);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);


      }
    };

    carregarConfiguracoes();
  }, [user?.uid, loja?.id, loja?.nomeLoja, user?.nome, addNotification]);

  const handleSalvar = async () => {
    const lojaId = user?.uid || loja?.id;
    if (!lojaId) {
      
      return;
    }

    setSalvando(true);
    setError(null);
    try {
      // Garantir que o ID e restauranteId estão corretos
      const configParaSalvar = {
        ...config,
        id: lojaId,
        restauranteId: lojaId
      };

      await FirebaseConfiguracaoService.salvarConfiguracao(configParaSalvar);
      
      
    } catch (error) {
      
      
      throw error;
    } finally {
      setSalvando(false);
    }
  };

  const limparErro = () => {
    setError(null);
  };

  const handleHorarioChange = (
    dia: keyof typeof config.horarioFuncionamento, 
    campo: keyof HorarioDia, 
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

  const adicionarPausa = (dia: keyof typeof config.horarioFuncionamento) => {
    const novaPausa: HorarioPausa = {
      inicio: '12:00',
      fim: '13:00',
      ativo: true,
      motivo: 'Almoço'
    };

    setConfig(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          pausas: [...prev.horarioFuncionamento[dia].pausas, novaPausa]
        }
      }
    }));
  };

  const removerPausa = (dia: keyof typeof config.horarioFuncionamento, index: number) => {
    setConfig(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          pausas: prev.horarioFuncionamento[dia].pausas.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const atualizarPausa = (
    dia: keyof typeof config.horarioFuncionamento,
    index: number,
    campo: keyof HorarioPausa,
    valor: string | boolean
  ) => {
    setConfig(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          pausas: prev.horarioFuncionamento[dia].pausas.map((pausa, i) => 
            i === index ? { ...pausa, [campo]: valor } : pausa
          )
        }
      }
    }));
  };

  const adicionarHorarioEspecial = () => {
    const novoHorario: HorarioEspecial = {
      id: Date.now().toString(),
      data: new Date().toISOString().split('T')[0],
      abertura: '08:00',
      fechamento: '22:00',
      ativo: true,
      motivo: 'Evento especial',
      pausas: []
    };

    setConfig(prev => ({
      ...prev,
      horariosEspeciais: [...prev.horariosEspeciais, novoHorario]
    }));
  };

  const removerHorarioEspecial = (id: string) => {
    setConfig(prev => ({
      ...prev,
      horariosEspeciais: prev.horariosEspeciais.filter(h => h.id !== id)
    }));
  };

  const atualizarHorarioEspecial = (
    id: string,
    campo: keyof HorarioEspecial,
    valor: string | boolean | HorarioPausa[]
  ) => {
    setConfig(prev => ({
      ...prev,
      horariosEspeciais: prev.horariosEspeciais.map(h => 
        h.id === id ? { ...h, [campo]: valor } : h
      )
    }));
  };

  const atualizarConfiguracaoAvancada = (
    campo: keyof typeof config.configuracaoAvancada,
    valor: boolean | number
  ) => {
    setConfig(prev => ({
      ...prev,
      configuracaoAvancada: {
        ...prev.configuracaoAvancada,
        [campo]: valor
      }
    }));
  };

  return {
    config,
    setConfig,
    salvando,

    error,
    handleSalvar,
    handleHorarioChange,
    adicionarPausa,
    removerPausa,
    atualizarPausa,
    adicionarHorarioEspecial,
    removerHorarioEspecial,
    atualizarHorarioEspecial,
    atualizarConfiguracaoAvancada,
    limparErro
  };
}