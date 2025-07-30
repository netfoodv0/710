import React from 'react';
import { Clock } from 'lucide-react';
import { DisponibilidadeCategoria, DiaSemana } from '../../types';

interface ModalCategoriaDisponibilidadeProps {
  disponibilidade: DisponibilidadeCategoria;
  setDisponibilidade: (data: DisponibilidadeCategoria) => void;
  showDisponibilidade: boolean;
  setShowDisponibilidade: (show: boolean) => void;
  onSaveDisponibilidade: () => void;
  isEditing: boolean;
}

const DIAS_SEMANA: DiaSemana[] = [
  { id: 0, nome: 'Domingo', ativo: false },
  { id: 1, nome: 'Segunda', ativo: false },
  { id: 2, nome: 'Terça', ativo: false },
  { id: 3, nome: 'Quarta', ativo: false },
  { id: 4, nome: 'Quinta', ativo: false },
  { id: 5, nome: 'Sexta', ativo: false },
  { id: 6, nome: 'Sábado', ativo: false }
];

export function ModalCategoriaDisponibilidade({ 
  disponibilidade, 
  setDisponibilidade, 
  showDisponibilidade, 
  setShowDisponibilidade, 
  onSaveDisponibilidade,
  isEditing 
}: ModalCategoriaDisponibilidadeProps) {
  const toggleDiaSemana = (diaId: number) => {
    setDisponibilidade(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.map(dia => 
        dia.id === diaId ? { ...dia, ativo: !dia.ativo } : dia
      )
    }));
  };

  if (!isEditing) return null;

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Disponibilidade</h3>
        <button
          type="button"
          onClick={() => setShowDisponibilidade(!showDisponibilidade)}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <Clock size={16} className="mr-1" />
          {showDisponibilidade ? 'Ocultar' : 'Configurar'}
        </button>
      </div>

      {showDisponibilidade && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          {/* Dias da Semana */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dias da Semana
            </label>
            <div className="grid grid-cols-2 gap-2">
              {disponibilidade.diasSemana.map((dia) => (
                <label key={dia.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dia.ativo}
                    onChange={() => toggleDiaSemana(dia.id)}
                    className="mr-2"
                  />
                  <span className="text-sm">{dia.nome}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Horários */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário de Início
              </label>
              <input
                type="time"
                value={disponibilidade.horarioInicio}
                onChange={(e) => setDisponibilidade(prev => ({ ...prev, horarioInicio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário de Fim
              </label>
              <input
                type="time"
                value={disponibilidade.horarioFim}
                onChange={(e) => setDisponibilidade(prev => ({ ...prev, horarioFim: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onSaveDisponibilidade}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar Disponibilidade
          </button>
        </div>
      )}
    </div>
  );
} 