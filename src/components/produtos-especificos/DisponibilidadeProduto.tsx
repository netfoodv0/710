import React, { useState } from 'react';
import { Clock, Calendar, Check } from 'lucide-react';
import { DisponibilidadeProduto, DiaSemana, DisponibilidadeProdutoProps } from '../../types/produtos';

export const DisponibilidadeProduto: React.FC<DisponibilidadeProdutoProps> = ({
  disponibilidade,
  onChange,
  produtoId
}) => {
  const [isActive, setIsActive] = useState(disponibilidade?.ativo ?? false);

  const diasSemana: DiaSemana[] = [
    { id: 0, nome: 'Domingo', ativo: false },
    { id: 1, nome: 'Segunda', ativo: false },
    { id: 2, nome: 'Terça', ativo: false },
    { id: 3, nome: 'Quarta', ativo: false },
    { id: 4, nome: 'Quinta', ativo: false },
    { id: 5, nome: 'Sexta', ativo: false },
    { id: 6, nome: 'Sábado', ativo: false }
  ];

  const handleToggleActive = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    
    if (newActive) {
      // Ativar com configuração padrão
      onChange({
        id: `disp-${produtoId}-${Date.now()}`,
        produtoId,
        diasSemana: diasSemana.map(dia => ({ ...dia, ativo: true })),
        horarioInicio: '11:00',
        horarioFim: '22:00',
        ativo: true
      });
    } else {
      // Desativar
      onChange({
        id: disponibilidade?.id || `disp-${produtoId}-${Date.now()}`,
        produtoId,
        diasSemana: disponibilidade?.diasSemana || diasSemana,
        horarioInicio: disponibilidade?.horarioInicio || '11:00',
        horarioFim: disponibilidade?.horarioFim || '22:00',
        ativo: false
      });
    }
  };

  const handleDiaChange = (diaId: number, ativo: boolean) => {
    if (!disponibilidade) return;

    const novosDias = disponibilidade.diasSemana.map(dia => 
      dia.id === diaId ? { ...dia, ativo } : dia
    );

    onChange({
      ...disponibilidade,
      diasSemana: novosDias
    });
  };

  const handleHorarioChange = (campo: 'horarioInicio' | 'horarioFim', valor: string) => {
    if (!disponibilidade) return;

    onChange({
      ...disponibilidade,
      [campo]: valor
    });
  };

  const diasAtivos = disponibilidade?.diasSemana.filter(dia => dia.ativo).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Período de Disponibilidade
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Caso adicione disponibilidade, o produto estará visível no cardápio somente nos períodos selecionados.
        </p>
      </div>

      {/* Toggle de Ativação */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Clock size={20} className="text-gray-600" />
          <div>
            <h4 className="font-medium text-gray-900">Disponibilidade Personalizada</h4>
            <p className="text-sm text-gray-600">
              {isActive 
                ? `${diasAtivos} dia(s) selecionado(s)` 
                : 'Produto sempre disponível'
              }
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleToggleActive}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Configuração de Disponibilidade */}
      {isActive && disponibilidade && (
        <div className="space-y-6">
          {/* Dias da Semana */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Dias da Semana</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {disponibilidade.diasSemana.map((dia) => (
                <label key={dia.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={dia.ativo}
                    onChange={(e) => handleDiaChange(dia.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">{dia.nome}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Horários */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Horário de Funcionamento</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário de Início
                </label>
                <input
                  type="time"
                  value={disponibilidade.horarioInicio}
                  onChange={(e) => handleHorarioChange('horarioInicio', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário de Fim
                </label>
                <input
                  type="time"
                  value={disponibilidade.horarioFim}
                  onChange={(e) => handleHorarioChange('horarioFim', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Calendar size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Resumo da Disponibilidade</h4>
                <p className="text-sm text-blue-700 mt-1">
                  O produto estará disponível {diasAtivos} dia(s) por semana, 
                  das {disponibilidade.horarioInicio} às {disponibilidade.horarioFim}.
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {disponibilidade.diasSemana
                    .filter(dia => dia.ativo)
                    .map(dia => (
                      <span key={dia.id} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        <Check size={12} className="mr-1" />
                        {dia.nome}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informações */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xs font-medium">i</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Como funciona a disponibilidade</h4>
            <p className="text-sm text-gray-600 mt-1">
              Quando ativada, o produto só aparecerá no cardápio durante os dias e horários selecionados. 
              Isso é útil para produtos sazonais, especiais ou que dependem de ingredientes frescos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 