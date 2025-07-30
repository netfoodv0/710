export interface ConfiguracaoLoja {
  id: string;
  restauranteId: string; // ID do restaurante
  nomeRestaurante: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  horarioFuncionamento: {
    segunda: { abertura: string; fechamento: string; ativo: boolean };
    terca: { abertura: string; fechamento: string; ativo: boolean };
    quarta: { abertura: string; fechamento: string; ativo: boolean };
    quinta: { abertura: string; fechamento: string; ativo: boolean };
    sexta: { abertura: string; fechamento: string; ativo: boolean };
    sabado: { abertura: string; fechamento: string; ativo: boolean };
    domingo: { abertura: string; fechamento: string; ativo: boolean };
  };
  taxaEntrega: number;
  tempoPreparoMedio: number;
  valorMinimoEntrega: number;
  raioEntregaKm: number;
  ativo: boolean;
}

export type AbaConfiguracao = 'geral' | 'entrega' | 'horarios' | 'notificacoes' | 'aparencia';

export interface NotificacaoConfig {
  key: string;
  label: string;
  desc: string;
  ativo: boolean;
} 