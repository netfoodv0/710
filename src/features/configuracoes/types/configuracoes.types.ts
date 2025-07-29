// Configurações Feature Types - Extraídos de src/types/index.ts

import { z } from 'zod';

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

// Schemas de validação Zod
export const configuracaoLojaSchema = z.object({
  id: z.string(),
  restauranteId: z.string(),
  nomeRestaurante: z.string().min(1, 'Nome do restaurante é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos'),
  telefone: z.string().min(10, 'Telefone é obrigatório'),
  email: z.string().email('Email inválido'),
  endereco: z.object({
    rua: z.string().min(1, 'Rua é obrigatória'),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    estado: z.string().min(2, 'Estado é obrigatório'),
    cep: z.string().min(8, 'CEP é obrigatório')
  }),
  horarioFuncionamento: z.object({
    segunda: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    terca: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    quarta: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    quinta: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    sexta: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    sabado: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    }),
    domingo: z.object({
      abertura: z.string(),
      fechamento: z.string(),
      ativo: z.boolean()
    })
  }),
  taxaEntrega: z.number().min(0, 'Taxa de entrega deve ser positiva'),
  tempoPreparoMedio: z.number().min(1, 'Tempo de preparo deve ser positivo'),
  valorMinimoEntrega: z.number().min(0, 'Valor mínimo deve ser positivo'),
  raioEntregaKm: z.number().min(0, 'Raio de entrega deve ser positivo'),
  ativo: z.boolean()
});

export const notificacaoConfigSchema = z.object({
  key: z.string(),
  label: z.string(),
  desc: z.string(),
  ativo: z.boolean()
});

// Tipos inferidos dos schemas
export type ConfiguracaoLojaValidada = z.infer<typeof configuracaoLojaSchema>;
export type NotificacaoConfigValidada = z.infer<typeof notificacaoConfigSchema>; 