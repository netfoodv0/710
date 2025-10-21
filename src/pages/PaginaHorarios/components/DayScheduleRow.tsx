import React from 'react';
import { HorarioData } from '../types';
import { DayToggle } from './DayToggle';
import { TimeSelector } from './TimeSelector';

interface DayScheduleRowProps {
  horario: HorarioData;
  onUpdateHorario: (diaSemana: string, newData: Partial<HorarioData>) => void;
  onToggleDia: (diaSemana: string) => void;
  t: (key: string) => string;
}

export function DayScheduleRow({ 
  horario, 
  onUpdateHorario, 
  onToggleDia, 
  t 
}: DayScheduleRowProps) {
  const handleTimeChange = (field: 'horaAbertura' | 'horaFechamento', value: string) => {
    onUpdateHorario(horario.diaSemana, { [field]: value });
  };

  const handleToggle = () => {
    onToggleDia(horario.diaSemana);
  };

  return (
    <div className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
      {/* Nome do dia */}
      <div className="w-32 flex-shrink-0">
        <span className="text-sm font-medium text-gray-900">
          {horario.diaSemana}
        </span>
      </div>

      {/* Toggle de aberto/fechado */}
      <div className="flex items-center gap-2 w-24">
        <DayToggle 
          isActive={horario.ativo} 
          onToggle={handleToggle}
          t={t}
        />
        <span className={`text-xs ${horario.ativo ? 'text-[#8217d5]' : 'text-gray-500'}`}>
          {horario.ativo ? t('open') : t('closed')}
        </span>
      </div>

      {/* Seletores de horário */}
      <div className="flex items-center gap-2">
        <TimeSelector
          value={horario.horaAbertura}
          onChange={(value) => handleTimeChange('horaAbertura', value)}
        />
        <span className="text-gray-500">-</span>
        <TimeSelector
          value={horario.horaFechamento}
          onChange={(value) => handleTimeChange('horaFechamento', value)}
        />
      </div>
    </div>
  );
}
