import React from 'react';
import { InformacoesLojaProps } from '../types';

export function InformacoesLoja({ config, onConfigChange, loading }: InformacoesLojaProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Loja</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo de Preparo Médio (min)
            </label>
            <input
              type="number"
              value={config.tempoPreparoMedio || 0}
              onChange={(e) => onConfigChange({ tempoPreparoMedio: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={config.ativo ? 'ativo' : 'inativo'}
              onChange={(e) => onConfigChange({ ativo: e.target.value === 'ativo' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
