// Tipos relacionados a categorias

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  ativa: boolean;
  ordem: number;
  lojaId: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  disponibilidade?: PeriodoDisponibilidade[];
}

export interface CriarCategoriaData {
  nome: string;
  descricao?: string;
  ativa?: boolean;
  ordem?: number;
  disponibilidade?: PeriodoDisponibilidade[];
}

export interface EditarCategoriaData {
  id: string;
  nome?: string;
  descricao?: string;
  ativa?: boolean;
  ordem?: number;
  disponibilidade?: PeriodoDisponibilidade[];
}

export interface FiltrosCategoria {
  ativa?: boolean;
  nome?: string;
  ordenarPor?: 'nome' | 'ordem' | 'dataCriacao';
  ordenacao?: 'asc' | 'desc';
}

export interface DiaSemana {
  id: number;
  nome: string;
  abreviacao: string;
}

export interface PeriodoDisponibilidade {
  diaSemana: DiaSemana;
  horarioInicio: string;
  horarioFim: string;
  ativo: boolean;
}

export const DIAS_SEMANA: DiaSemana[] = [
  { id: 0, nome: 'Domingo', abreviacao: 'Dom' },
  { id: 1, nome: 'Segunda-feira', abreviacao: 'Seg' },
  { id: 2, nome: 'Terça-feira', abreviacao: 'Ter' },
  { id: 3, nome: 'Quarta-feira', abreviacao: 'Qua' },
  { id: 4, nome: 'Quinta-feira', abreviacao: 'Qui' },
  { id: 5, nome: 'Sexta-feira', abreviacao: 'Sex' },
  { id: 6, nome: 'Sábado', abreviacao: 'Sáb' },
];