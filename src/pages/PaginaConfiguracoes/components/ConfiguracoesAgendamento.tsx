import React from 'react';
import { ConfiguracoesAgendamentoProps } from '../types';

export function ConfiguracoesAgendamento({ config, onConfigChange, loading }: ConfiguracoesAgendamentoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Agendamento</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agendamentoAtivo"
            checked={config.agendamentoAtivo || false}
            onChange={(e) => onConfigChange({ agendamentoAtivo: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="agendamentoAtivo" className="ml-2 block text-sm text-gray-900">
            Ativar sistema de agendamento
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antecedência Mínima (min)
            </label>
            <input
              type="number"
              value={config.agendamentoAntecedencia || 30}
              onChange={(e) => onConfigChange({ agendamentoAntecedencia: parseInt(e.target.value) || 30 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Janela de Tempo (min)
            </label>
            <input
              type="number"
              value={config.agendamentoJanela || 30}
              onChange={(e) => onConfigChange({ agendamentoJanela: parseInt(e.target.value) || 30 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
