import React, { useState, useEffect } from 'react';
import { ModalGlobal } from './ModalGlobal';
import { Button } from '../ui/Button';
import { HorarioDisponibilidade } from '../forms/DisponibilidadeProduto';

interface ModalDisponibilidadeProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (horarios: HorarioDisponibilidade[]) => void;
  horariosIniciais?: HorarioDisponibilidade[];
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

export function ModalDisponibilidade({ 
  isOpen, 
  onClose, 
  onConfirm, 
  horariosIniciais 
}: ModalDisponibilidadeProps) {
  const [horarios, setHorarios] = useState<HorarioDisponibilidade[]>([]);

  // Inicializar horários quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      if (horariosIniciais && horariosIniciais.length > 0) {
        setHorarios(horariosIniciais);
      } else {
        // Horários padrão
        setHorarios([
          { dia: 'segunda', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'terca', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'quarta', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'quinta', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'sexta', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'sabado', inicio: '08:00', fim: '18:00', ativo: false },
          { dia: 'domingo', inicio: '08:00', fim: '18:00', ativo: false }
        ]);
      }
    }
  }, [isOpen, horariosIniciais]);

  const handleToggleDia = (diaId: string) => {
    const novoHorarios = horarios.map(horario => 
      horario.dia === diaId 
        ? { ...horario, ativo: !horario.ativo }
        : horario
    );
    setHorarios(novoHorarios);
  };

  const handleChangeHorario = (diaId: string, campo: 'inicio' | 'fim', valor: string) => {
    const novoHorarios = horarios.map(horario => 
      horario.dia === diaId 
        ? { ...horario, [campo]: valor }
        : horario
    );
    setHorarios(novoHorarios);
  };


  const handleConfirm = () => {
    onConfirm(horarios);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const diasAtivos = horarios.filter(h => h.ativo).length;

  const footer = (
    <div className="flex gap-3 justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
      >
        Cancelar
      </Button>
      <Button
        type="button"
        onClick={handleConfirm}
      >
        Salvar
      </Button>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title="Configurar Disponibilidade"
      size="sm"
      footer={footer}
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Configure os dias da semana e horários em que o produto estará disponível.
        </div>
        
        <div className="space-y-2">
          {diasSemana.map((dia) => {
            const horario = horarios.find(h => h.dia === dia.id);
            const isAtivo = horario?.ativo || false;
            
            return (
              <div key={dia.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                {/* Toggle button para ativar/desativar o dia */}
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleDia(dia.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      isAtivo ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAtivo ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Label do dia */}
                <div className="flex-shrink-0 w-24">
                  <span 
                    className={`text-sm font-medium ${
                      isAtivo ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {dia.label}
                  </span>
                </div>
                
                {/* Campos de horário */}
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={horario?.inicio || '08:00'}
                    onChange={(e) => handleChangeHorario(dia.id, 'inicio', e.target.value)}
                    disabled={!isAtivo}
                    className={`px-2 py-1 text-sm border rounded transition-colors ${
                      isAtivo 
                        ? 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  />
                  
                  <span className="text-gray-400">-</span>
                  
                  <input
                    type="time"
                    value={horario?.fim || '18:00'}
                    onChange={(e) => handleChangeHorario(dia.id, 'fim', e.target.value)}
                    disabled={!isAtivo}
                    className={`px-2 py-1 text-sm border rounded transition-colors ${
                      isAtivo 
                        ? 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          {diasAtivos === 0 && "Nenhum dia selecionado"}
          {diasAtivos === 1 && "1 dia selecionado"}
          {diasAtivos > 1 && `${diasAtivos} dias selecionados`}
        </div>
      </div>
    </ModalGlobal>
  );
}
