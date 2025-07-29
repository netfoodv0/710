import React from 'react';
import { Clock } from 'lucide-react';
import { ConfiguracaoLoja } from '../../../types';
import { diasSemana } from '../data/abasConfig';

interface ConfiguracoesHorariosProps {
  config: ConfiguracaoLoja;
  setConfig: React.Dispatch<React.SetStateAction<ConfiguracaoLoja>>;
}

export function ConfiguracoesHorarios({ config, setConfig }: ConfiguracoesHorariosProps) {
  const handleHorarioChange = (
    dia: keyof typeof config.horarioFuncionamento, 
    campo: 'abertura' | 'fechamento' | 'ativo', 
    valor: string | boolean
  ) => {
    setConfig(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          [campo]: valor
        }
      }
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded shadow-none min-h-[600px]">
      <div className="p-4 space-y-4">
        <h3 className="text-xs font-semibold text-gray-900">Horários de Funcionamento</h3>
        
        <div className="space-y-4">
          {diasSemana.map((dia) => {
            const horario = config.horarioFuncionamento[dia.key];
            
            return (
              <div key={dia.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={horario.ativo}
                      onChange={(e) => handleHorarioChange(dia.key, 'ativo', e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                  
                  <span className={`text-sm font-medium ${horario.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                    {dia.label}
                  </span>
                </div>
                
                <div className={`flex items-center gap-3 ${horario.ativo ? 'opacity-100' : 'opacity-50'}`}>
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

        {/* Informações Adicionais */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-medium text-blue-900">Dicas de Configuração</h4>
          </div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Configure os horários de funcionamento para cada dia da semana</li>
            <li>• Use o toggle para ativar/desativar dias específicos</li>
            <li>• Os horários determinam quando o restaurante aceita pedidos</li>
            <li>• Pedidos fora do horário não serão aceitos automaticamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 