// Cardápio Feature Types - Extraídos de src/types/index.ts

import { z } from 'zod';

export interface Produto {
  id: string;
  restauranteId: string; // ID do restaurante
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem?: string;
  ativo: boolean;
  tempoPreparoMinutos: number;
  ingredientes: string[];
  extras: Extra[];
}

export interface Extra {
  id: string;
  nome: string;
  preco: number;
}

export interface Categoria {
  id: string;
  restauranteId: string; // ID do restaurante
  nome: string;
  descricao?: string;
  ativa: boolean;
  ordem: number;
}

export interface CategoriaAdicional {
  id: string;
  nome: string;
  descricao?: string;
  status: 'ativo' | 'inativo';
  disponibilidade: DisponibilidadeCategoria;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface DisponibilidadeCategoria {
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  domingo: boolean;
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
}

// Schemas de validação Zod
export const produtoSchema = z.object({
  id: z.string(),
  restauranteId: z.string(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  preco: z.number().positive('Preço deve ser positivo'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  imagem: z.string().optional(),
  ativo: z.boolean(),
  tempoPreparoMinutos: z.number().positive('Tempo de preparo deve ser positivo'),
  ingredientes: z.array(z.string()),
  extras: z.array(z.object({
    id: z.string(),
    nome: z.string(),
    preco: z.number()
  }))
});

export const categoriaSchema = z.object({
  id: z.string(),
  restauranteId: z.string(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  ativa: z.boolean(),
  ordem: z.number().int().min(0)
});

// Tipos inferidos dos schemas
export type ProdutoValidado = z.infer<typeof produtoSchema>;
export type CategoriaValidada = z.infer<typeof categoriaSchema>; 