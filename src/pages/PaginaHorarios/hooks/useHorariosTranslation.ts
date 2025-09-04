import { useTranslation } from '../../../hooks/useTranslation';

export function useHorariosTranslation() {
  const { t } = useTranslation();

  const horarios = {
    title: t('Horários de Funcionamento'),
    subtitle: t('Configure os horários de funcionamento do seu restaurante'),
    salvarHorarios: t('Salvar Horários'),
    horarioAtual: t('Horário Atual'),
    diasSemana: {
      segunda: t('Segunda-feira'),
      terca: t('Terça-feira'),
      quarta: t('Quarta-feira'),
      quinta: t('Quinta-feira'),
      sexta: t('Sexta-feira'),
      sabado: t('Sábado'),
      domingo: t('Domingo')
    },
    campos: {
      abertura: t('Abertura'),
      fechamento: t('Fechamento'),
      ativo: t('Ativo'),
      pausas: t('Pausas'),
      entregaAte: t('Entrega até'),
      pedidoAte: t('Pedido até')
    },
    botoes: {
      adicionarPausa: t('Adicionar Pausa'),
      removerPausa: t('Remover Pausa'),
      adicionarHorarioEspecial: t('Adicionar Horário Especial'),
      removerHorarioEspecial: t('Remover Horário Especial')
    },
    mensagens: {
      sucesso: t('Horários salvos com sucesso!'),
      erro: t('Erro ao salvar horários'),
      erroCarregar: t('Erro ao carregar configurações'),
      tentarNovamente: t('Tentar novamente')
    }
  };

  return { horarios };
}
