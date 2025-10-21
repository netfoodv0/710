// Tipos específicos da página de Horários
export interface HorarioData {
  id?: string;
  diaSemana: string;
  horaAbertura: string;
  horaFechamento: string;
  ativo: boolean;
}

export interface HorariosConfig {
  fusoHorario: string;
  horarios: HorarioData[];
}

export interface HorariosProps {
  // Adicione aqui as props específicas da página de horários
}

export interface UseHorariosReturn {
  data: HorariosConfig;
  isLoading: boolean;
  isSaving: boolean;
  handleUpdateHorario: (diaSemana: string, newData: Partial<HorarioData>) => Promise<void>;
  handleUpdateFusoHorario: (fusoHorario: string) => Promise<void>;
  handleToggleDia: (diaSemana: string) => Promise<void>;
  handleSaveHorarios: () => Promise<void>;
  t: (key: string) => string;
}
