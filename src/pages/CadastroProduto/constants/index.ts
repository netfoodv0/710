// Constantes para o cadastro de produtos

// Valores padrão para formulário
export const PRODUTO_DEFAULTS = {
  vendasTotais: 0,
  avaliacaoMedia: 0,
  numeroAvaliacoes: 0,
  tamanhoPorcao: 1,
  agendamentoObrigatorio: false,
  extras: [],
  sincronizadoComIfood: false,
  horarioInicio: '08:00',
  horarioFim: '22:00',
  disponibilidadeDias: {
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: true,
    domingo: true,
  }
} as const;

// Status disponíveis para produtos
export const PRODUTO_STATUS = {
  ATIVO: 'ativo' as const,
  INATIVO: 'inativo' as const,
  EM_FALTA: 'em_falta' as const
} as const;

export type ProdutoStatus = typeof PRODUTO_STATUS[keyof typeof PRODUTO_STATUS];
