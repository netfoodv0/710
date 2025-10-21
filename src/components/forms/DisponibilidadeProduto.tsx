import React from 'react';

export interface HorarioDisponibilidade {
  dia: string;
  inicio: string;
  fim: string;
  ativo: boolean;
}

interface DisponibilidadeProdutoProps {
  horarios: HorarioDisponibilidade[];
  onChange: (horarios: HorarioDisponibilidade[]) => void;
}

const diasSemana = [
  { id: 'segunda', label: 'Segunda-feira' },
  { id: 'terca', label: 'Terça-feira' },
  { id: 'quarta', label: 'Quarta-feira' },
  { id: 'quinta', label: 'Quinta-feira' },
  { id: 'sexta', label: 'Sexta-feira' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo' }
];

export function DisponibilidadeProduto({ horarios, onChange }: DisponibilidadeProdutoProps) {
  const handleToggleDia = (diaId: string) => {
    const novoHorarios = horarios.map(horario => 
      horario.dia === diaId 
        ? { ...horario, ativo: !horario.ativo }
        : horario
    );
    onChange(novoHorarios);
  };

  const handleChangeHorario = (diaId: string, campo: 'inicio' | 'fim', valor: string) => {
    const novoHorarios = horarios.map(horario => 
      horario.dia === diaId 
        ? { ...horario, [campo]: valor }
        : horario
    );
    onChange(novoHorarios);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Disponibilidade por Dia da Semana
      </label>
      
      <div className="space-y-2">
        {diasSemana.map((dia) => {
          const horario = horarios.find(h => h.dia === dia.id);
          const isAtivo = horario?.ativo || false;
          
          return (
            <div key={dia.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              {/* Checkbox para ativar/desativar o dia */}
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  id={`dia-${dia.id}`}
                  checked={isAtivo}
                  onChange={() => handleToggleDia(dia.id)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
              </div>
              
              {/* Label do dia */}
              <div className="flex-shrink-0 w-24">
                <label 
                  htmlFor={`dia-${dia.id}`}
                  className={`text-sm font-medium cursor-pointer ${
                    isAtivo ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {dia.label}
                </label>
              </div>
              
              {/* Campos de horário */}
              <div className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-1">
                  <label className="text-xs text-gray-500">Início:</label>
                  <input
                    type="time"
                    value={horario?.inicio || '08:00'}
                    onChange={(e) => handleChangeHorario(dia.id, 'inicio', e.target.value)}
                    disabled={!isAtivo}
                    className={`px-2 py-1 text-sm border rounded ${
                      isAtivo 
                        ? 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  />
                </div>
                
                <span className="text-gray-400">-</span>
                
                <div className="flex items-center gap-1">
                  <label className="text-xs text-gray-500">Fim:</label>
                  <input
                    type="time"
                    value={horario?.fim || '18:00'}
                    onChange={(e) => handleChangeHorario(dia.id, 'fim', e.target.value)}
                    disabled={!isAtivo}
                    className={`px-2 py-1 text-sm border rounded ${
                      isAtivo 
                        ? 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Botão para ativar todos os dias */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            const todosAtivos = horarios.map(h => ({ ...h, ativo: true }));
            onChange(todosAtivos);
          }}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          Ativar todos os dias
        </button>
      </div>
    </div>
  );
}



