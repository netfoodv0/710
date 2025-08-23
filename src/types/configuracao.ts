export interface HorarioPausa {
  inicio: string;
  fim: string;
  ativo: boolean;
  motivo?: string;
}

export interface HorarioEspecial {
  id: string;
  data: string;
  abertura: string;
  fechamento: string;
  ativo: boolean;
  motivo: string;
  pausas?: HorarioPausa[];
}

export interface HorarioDia {
  abertura: string;
  fechamento: string;
  ativo: boolean;
  pausas: HorarioPausa[];
  entregaAte?: string; // Horário limite para entrega
  pedidoAte?: string; // Horário limite para aceitar pedidos
}

export interface ConfiguracaoLoja {
  id: string;
  restauranteId: string; // ID do restaurante
  lojaId?: string; // Campo para compatibilidade com regras do Firestore
  nomeRestaurante: string;
  descricao?: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    // Coordenadas para evitar geocodificação repetida
    coordenadas?: {
      latitude: number;
      longitude: number;
      dataAtualizacao?: string; // ISO string da última atualização
    };
  };
  horarioFuncionamento: {
    segunda: HorarioDia;
    terca: HorarioDia;
    quarta: HorarioDia;
    quinta: HorarioDia;
    sexta: HorarioDia;
    sabado: HorarioDia;
    domingo: HorarioDia;
  };
  horariosEspeciais: HorarioEspecial[];
  configuracaoAvancada: {
    aceitarPedidosForaHorario: boolean;
    tempoLimiteEntrega: number; // em minutos
    pausaAutomatica: boolean;
    notificarMudancaHorario: boolean;
  };
  taxaEntrega: number;
  tempoPreparoMedio: number;
  valorMinimoEntrega: number;
  raioEntregaKm: number;
  ativo: boolean;
  
  // Novas propriedades para configurações
  entregaDomicilio?: boolean;
  retiradaLocal?: boolean;
  entregaDelivery?: boolean;
  pedidoMinimo?: string;
  raioEntrega?: string;
  
  // Horários simplificados
  horarioAbertura?: string;
  horarioFechamento?: string;
  diasFuncionamento?: {
    [key: string]: boolean;
  };
  
  // Formas de pagamento
  pagamentoDinheiro?: boolean;
  pagamentoCredito?: boolean;
  pagamentoDebito?: boolean;
  pagamentoPix?: boolean;
  pagamentoValeRefeicao?: boolean;
  
  // Notificações
  notificacoesEmail?: boolean;
  notificacoesSMS?: boolean;
  notificacoesPush?: boolean;
  alertasEstoque?: boolean;
  
  // Aparência
  tema?: 'claro' | 'escuro' | 'auto';
  corPrincipal?: 'azul' | 'verde' | 'roxo' | 'vermelho' | 'laranja';
  modoCompacto?: boolean;
  animacoes?: boolean;

  // Informações da Loja
  fotoLoja?: string;
  bannerLoja?: string;
  nomeMarca?: string;
  identificacaoUnidade?: string;
  linkPersonalizado?: string;
  
  // Modos de pedidos
  aceitarPedidosDelivery?: boolean;
  aceitarPedidosRetirada?: boolean;
  aceitarPedidosBalcao?: boolean;
  
  // Configurações de agendamento
  agendamentoAtivo?: boolean;
  agendamentoAntecedencia?: number; // em horas
  agendamentoLimite?: number; // em dias

  // Configurações de Impressão
  imprimirPeloComputador?: boolean;
  imprimirPeloCelular?: boolean;
  assistenteBrendi?: boolean;
  impressoraPrincipal?: string;
  
  // Configurações da Notinha
  mostrarCNPJ?: boolean;
  mostrarCategoria?: boolean;
  mostrarDescricao?: boolean;
  mostrarProdutosPizza?: 'nome-completo' | 'por-fracao';
  mostrarQuantidadeAdicionais?: boolean;
}

export type AbaConfiguracao = 'geral' | 'entrega' | 'horarios' | 'notificacoes' | 'aparencia';

export interface NotificacaoConfig {
  key: string;
  label: string;
  desc: string;
  ativo: boolean;
}