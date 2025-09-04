import { ConfiguracaoLoja, HorarioPausa, HorarioEspecial, HorarioDia } from '../../../types';

// Tipos específicos para a página de Horários
export interface HorariosData {
  config: ConfiguracaoLoja;
  horarioAtual: Date;
  loading: boolean;
  error: string | null;
}

// Props para componentes de Horários
export interface HorariosLayoutProps {
  data: HorariosData;
  onSave: () => void;
  onRetry: () => void;
  loading?: boolean;
}

export interface HorariosFormProps {
  config: ConfiguracaoLoja;
  onHorarioChange: (dia: string, campo: string, valor: any) => void;
  onAdicionarPausa: (dia: string) => void;
  onRemoverPausa: (dia: string, index: number) => void;
  onAtualizarPausa: (dia: string, index: number, campo: string, valor: any) => void;
  onAdicionarHorarioEspecial: () => void;
  onRemoverHorarioEspecial: (index: number) => void;
  onAtualizarHorarioEspecial: (index: number, campo: string, valor: any) => void;
  onAtualizarConfiguracaoAvancada: (campo: string, valor: any) => void;
}

export interface HorariosListProps {
  config: ConfiguracaoLoja;
  horarioAtual: Date;
  onHorarioChange: (dia: string, campo: string, valor: any) => void;
  onAdicionarPausa: (dia: string) => void;
  onRemoverPausa: (dia: string, index: number) => void;
  onAtualizarPausa: (dia: string, index: number, campo: string, valor: any) => void;
}

// Hook return types
export interface UseHorariosReturn {
  data: HorariosData;
  handleSave: () => Promise<void>;
  handleRetry: () => void;
  handleHorarioChange: (dia: string, campo: string, valor: any) => void;
  adicionarPausa: (dia: string) => void;
  removerPausa: (dia: string, index: number) => void;
  atualizarPausa: (dia: string, index: number, campo: string, valor: any) => void;
  adicionarHorarioEspecial: () => void;
  removerHorarioEspecial: (index: number) => void;
  atualizarHorarioEspecial: (index: number, campo: string, valor: any) => void;
  atualizarConfiguracaoAvancada: (campo: string, valor: any) => void;
}

export interface UseHorariosActionsReturn {
  handleSave: () => Promise<void>;
  handleRetry: () => void;
}

// Tipos para dias da semana
export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

// Interface para configuração de horário de um dia
export interface HorarioDiaConfig extends HorarioDia {
  dia: DiaSemana;
  label: string;
}

// Interface para pausa de horário
export interface PausaConfig extends HorarioPausa {
  dia: DiaSemana;
  index: number;
}

// Interface para horário especial
export interface HorarioEspecialConfig extends HorarioEspecial {
  index: number;
}
