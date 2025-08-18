import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TrashIcon, ClockIcon } from '../ui';
import { PeriodoDisponibilidade, DiaSemana, DIAS_SEMANA } from '../../types/categoria';

interface FormularioDisponibilidadeProps {
  periodos?: PeriodoDisponibilidade[];
  onChange: (periodos: PeriodoDisponibilidade[]) => void;
}

export function FormularioDisponibilidade({ periodos, onChange }: FormularioDisponibilidadeProps) {
  // Garantir que periodos seja sempre um array válido
  const periodosSeguros = periodos || [];
  
  const [showForm, setShowForm] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState<DiaSemana[]>([]);
  const [horarioInicio, setHorarioInicio] = useState('08:00');
  const [horarioFim, setHorarioFim] = useState('22:00');

  const toggleDiaSemana = (dia: DiaSemana) => {
    setDiasSelecionados(prev => {
      const existe = prev.find(d => d.id === dia.id);
      if (existe) {
        return prev.filter(d => d.id !== dia.id);
      } else {
        return [...prev, dia];
      }
    });
  };

  const adicionarPeriodo = () => {
    if (diasSelecionados.length > 0 && horarioInicio && horarioFim) {
      const novosPeriodos = diasSelecionados.map(dia => ({
        id: `${Date.now()}-${dia.id}`,
        diaSemana: dia,
        horarioInicio,
        horarioFim,
        ativo: true
      }));
      
      onChange([...periodosSeguros, ...novosPeriodos]);
      setDiasSelecionados([]);
      setHorarioInicio('08:00');
      setHorarioFim('22:00');
      setShowForm(false);
    }
  };

  const removerPeriodo = (id: string) => {
    onChange(periodosSeguros.filter(p => p.id !== id));
  };

  const toggleAtivo = (id: string) => {
    onChange(periodosSeguros.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disponibilidade
          </label>
          <p className="text-xs text-gray-500">
            Caso adicione disponibilidade, a categoria estará visível no cardápio somente nos períodos selecionados.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar período
        </button>
      </div>

      {/* Lista de períodos existentes */}
      {periodosSeguros.length > 0 ? (
        <div className="space-y-2">
          {periodosSeguros.map((periodo) => (
            <div
              key={periodo.id}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                periodo.ativo ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                                 <ClockIcon size={24} color={periodo.ativo ? '#16a34a' : '#9ca3af'} />
                <div>
                  <span className={`text-sm font-medium ${periodo.ativo ? 'text-green-900' : 'text-gray-500'}`}>
                    {periodo.diaSemana.nome}
                  </span>
                  <p className={`text-xs ${periodo.ativo ? 'text-green-700' : 'text-gray-400'}`}>
                    {periodo.horarioInicio} às {periodo.horarioFim}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleAtivo(periodo.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    periodo.ativo
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {periodo.ativo ? 'Ativo' : 'Inativo'}
                </button>
                <button
                  type="button"
                  onClick={() => removerPeriodo(periodo.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <TrashIcon size={24} color="#dc2626" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <ClockIcon size={32} color="#9ca3af" />
          <p className="text-sm text-gray-500">
            Nenhum período de disponibilidade adicionado
          </p>
        </div>
      )}

      {/* Formulário para adicionar novo período */}
      {showForm && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Adicionar período de disponibilidade</h4>
          
          {/* Seleção de dias da semana */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Selecione os dias em que o produto estará disponível
            </label>
            <div className="grid grid-cols-7 gap-2">
              {DIAS_SEMANA.map((dia) => {
                const isSelected = diasSelecionados.find(d => d.id === dia.id);
                return (
                  <button
                    key={dia.id}
                    type="button"
                    onClick={() => toggleDiaSemana(dia)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                      isSelected
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {dia.abreviacao}
                  </button>
                );
              })}
            </div>
            {diasSelecionados.length > 0 && (
              <p className="text-xs text-green-600 mt-1">
                {diasSelecionados.length} dia(s) selecionado(s)
              </p>
            )}
          </div>

          {/* Horários */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Selecione o horário em que o produto estará disponível nestes dias
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">De</label>
                <input
                  type="time"
                  value={horarioInicio}
                  onChange={(e) => setHorarioInicio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Até</label>
                <input
                  type="time"
                  value={horarioFim}
                  onChange={(e) => setHorarioFim(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setDiasSelecionados([]);
                setHorarioInicio('08:00');
                setHorarioFim('22:00');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={adicionarPeriodo}
              disabled={diasSelecionados.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
