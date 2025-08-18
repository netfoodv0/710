export interface Categoria {
  id: string;
  nome: string;
  status: 'ativo' | 'inativo' | 'em_falta';
  agendamentoPrevio: boolean;
  tempoExtraProducao: boolean;
  disponibilidade: PeriodoDisponibilidade[];
  dataCriacao: Date;
  dataAtualizacao: Date;
  lojaId: string;
  posicao?: number; // Posição para ordenação personalizada
}

export interface PeriodoDisponibilidade {
  id: string;
  diaSemana: DiaSemana;
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  ativo: boolean;
}

export interface DiaSemana {
  id: number; // 0-6 (domingo a sábado)
  nome: string;
  abreviacao: string;
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

export interface CriarCategoriaData {
  nome: string;
  status: 'ativo' | 'inativo' | 'em_falta';
  agendamentoPrevio: boolean;
  tempoExtraProducao: boolean;
  disponibilidade: PeriodoDisponibilidade[];
  posicao?: number;
}

export interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria;
  onSave: (categoria: CriarCategoriaData) => Promise<void>;
  onEdit?: (id: string, categoria: Partial<Categoria>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
  loading?: boolean;
}
