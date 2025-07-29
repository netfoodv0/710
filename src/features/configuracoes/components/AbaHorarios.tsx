import React from 'react';
import { Card } from '../Card';
import { ConfiguracaoLoja } from '../../types';
import { diasSemana } from '../../data/configuracaoMock';

interface AbaHorariosProps {
  config: ConfiguracaoLoja;
  onConfigChange: (config: ConfiguracaoLoja) => void;
}

export function AbaHorarios({ config, onConfigChange }: AbaHorariosProps) {
  const handleHorarioChange = (
    dia: keyof typeof config.horarioFuncionamento, 
    campo: 'abertura' | 'fechamento' | 'ativo', 
    valor: string | boolean
  ) => {
    onConfigChange({
      ...config,
      horarioFuncionamento: {
        ...config.horarioFuncionamento,
        [dia]: {
          ...config.horarioFuncionamento[dia],
          [campo]: valor
        }
      }
    });
  };

  return (
    <Card className="p-0 min-h-[600px] rounded">
      <div className="p-6 space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Horários de Funcionamento</h3>
        
        <div className="space-y-4">
          {diasSemana.map((dia) => {
            const horario = config.horarioFuncionamento[dia.key];
            return (
              <div key={dia.key} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[62px]">
                <div className="w-28">
                  <span className="font-medium text-gray-900 text-sm">{dia.label}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={horario.ativo}
                      onChange={(e) => handleHorarioChange(dia.key, 'ativo', e.target.checked)}
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                  <span className="text-xs text-gray-600">{horario.ativo ? 'Aberto' : 'Fechado'}</span>
                </div>
                
                <div className="flex gap-4 flex-1">
                  <div className={horario.ativo ? 'block' : 'invisible'}>
                    <label className="block text-xs text-gray-600 mb-1">Abertura</label>
                    <input
                      type="time"
                      value={horario.abertura}
                      onChange={(e) => handleHorarioChange(dia.key, 'abertura', e.target.value)}
                      className="bg-[#eeeeee] text-[rgb(97,97,97)] p-1.5 border border-gray-300 rounded focus:outline-none text-sm"
                    />
                  </div>
                  
                  <div className={horario.ativo ? 'block' : 'invisible'}>
                    <label className="block text-xs text-gray-600 mb-1">Fechamento</label>
                    <input
                      type="time"
                      value={horario.fechamento}
                      onChange={(e) => handleHorarioChange(dia.key, 'fechamento', e.target.value)}
                      className="bg-[#eeeeee] text-[rgb(97,97,97)] p-1.5 border border-gray-300 rounded focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ações rápidas */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Ações Rápidas</h4>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => {
                const novoConfig = { ...config };
                diasSemana.forEach(dia => {
                  novoConfig.horarioFuncionamento[dia.key] = {
                    ...novoConfig.horarioFuncionamento[dia.key],
                    ativo: true
                  };
                });
                onConfigChange(novoConfig);
              }}
              className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs"
            >
              Abrir Todos os Dias
            </button>
            <button 
              onClick={() => {
                const novoConfig = { ...config };
                ['segunda', 'terca', 'quarta', 'quinta', 'sexta'].forEach(dia => {
                  novoConfig.horarioFuncionamento[dia as keyof typeof config.horarioFuncionamento] = {
                    abertura: '11:00',
                    fechamento: '23:00',
                    ativo: true
                  };
                });
                onConfigChange(novoConfig);
              }}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs"
            >
              Horário Comercial (Seg-Sex)
            </button>
            <button 
              onClick={() => {
                const novoConfig = { ...config };
                ['sabado', 'domingo'].forEach(dia => {
                  novoConfig.horarioFuncionamento[dia as keyof typeof config.horarioFuncionamento] = {
                    ...novoConfig.horarioFuncionamento[dia as keyof typeof config.horarioFuncionamento],
                    ativo: false
                  };
                });
                onConfigChange(novoConfig);
              }}
              className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-xs"
            >
              Fechar Fins de Semana
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}