import React from 'react';
import { FusoHorarioProps } from '../types';

export function FusoHorario({ config, onConfigChange, loading }: FusoHorarioProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuso Horário</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuso Horário
          </label>
          <select
            value={config.fusoHorario || 'America/Sao_Paulo'}
            onChange={(e) => onConfigChange({ fusoHorario: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
            <option value="America/Manaus">Manaus (GMT-4)</option>
            <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
            <option value="America/Bahia">Bahia (GMT-3)</option>
            <option value="America/Fortaleza">Fortaleza (GMT-3)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="animacoes"
            checked={config.animacoes || false}
            onChange={(e) => onConfigChange({ animacoes: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="animacoes" className="ml-2 block text-sm text-gray-900">
            Ativar animações na interface
          </label>
        </div>
      </div>
    </div>
  );
}
