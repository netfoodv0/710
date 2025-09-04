import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { InputPersonalizado } from '../../../components/forms';
import { ConfiguracaoLoja } from '../../../types';
import { HorariosFormProps } from '../types';

export function HorariosForm({
  config,
  onHorarioChange,
  onAdicionarPausa,
  onRemoverPausa,
  onAtualizarPausa,
  onAdicionarHorarioEspecial,
  onRemoverHorarioEspecial,
  onAtualizarHorarioEspecial,
  onAtualizarConfiguracaoAvancada
}: HorariosFormProps) {
  const diasSemana = [
    { key: 'segunda', label: 'Segunda-feira' },
    { key: 'terca', label: 'Terça-feira' },
    { key: 'quarta', label: 'Quarta-feira' },
    { key: 'quinta', label: 'Quinta-feira' },
    { key: 'sexta', label: 'Sexta-feira' },
    { key: 'sabado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Tabela de horários */}
      <div 
        className="bg-white rounded-xl border border-dashboard overflow-hidden" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          overflow: 'hidden'
        }}
      >
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 table-header-32-5">
            <tr>
              <th className="px-4 text-left text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                Dia da Semana
              </th>
              <th className="px-4 text-left text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                Horários
              </th>
              <th className="px-4 text-center text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-dashboard">
            {diasSemana.map(({ key, label }) => {
              const horarios = config?.horariosFuncionamento?.[key] || [];
              
              return (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {label}
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      {horarios.map((horario: any, horarioIndex: number) => (
                        <div key={horarioIndex} className="flex items-center space-x-2">
                          <InputPersonalizado
                            type="time"
                            value={horario.abertura || ''}
                            onChange={(e) => onHorarioChange(key, 'abertura', e.target.value)}
                            className="w-24"
                          />
                          <span className="text-gray-500">-</span>
                          <InputPersonalizado
                            type="time"
                            value={horario.fechamento || ''}
                            onChange={(e) => onHorarioChange(key, 'fechamento', e.target.value)}
                            className="w-24"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => onAdicionarPausa(key)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Adicionar Pausa"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Horários Especiais */}
      <div className="mt-6 bg-white rounded-xl border border-dashboard p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Horários Especiais</h3>
          <button
            onClick={onAdicionarHorarioEspecial}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Horário Especial</span>
          </button>
        </div>
        
        {config?.horariosEspeciais?.map((horarioEspecial: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Horário Especial {index + 1}</h4>
              <button
                onClick={() => onRemoverHorarioEspecial(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <InputPersonalizado
                  value={horarioEspecial.nome || ''}
                  onChange={(e) => onAtualizarHorarioEspecial(index, 'nome', e.target.value)}
                  placeholder="Ex: Feriado"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Início
                </label>
                <InputPersonalizado
                  type="date"
                  value={horarioEspecial.dataInicio || ''}
                  onChange={(e) => onAtualizarHorarioEspecial(index, 'dataInicio', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Fim
                </label>
                <InputPersonalizado
                  type="date"
                  value={horarioEspecial.dataFim || ''}
                  onChange={(e) => onAtualizarHorarioEspecial(index, 'dataFim', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
