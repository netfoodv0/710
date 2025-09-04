import React from 'react';
import { ConfiguracoesAparenciaProps } from '../types';

export function ConfiguracoesAparencia({ config, onConfigChange, loading }: ConfiguracoesAparenciaProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Aparência</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cor Principal
          </label>
          <select
            value={config.corPrincipal || 'roxo'}
            onChange={(e) => onConfigChange({ corPrincipal: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
            <option value="roxo">Roxo</option>
            <option value="vermelho">Vermelho</option>
            <option value="laranja">Laranja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <input
            type="url"
            value={config.fotoLoja || ''}
            onChange={(e) => onConfigChange({ fotoLoja: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://exemplo.com/logo.png"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tema
          </label>
          <select
            value={config.tema || 'claro'}
            onChange={(e) => onConfigChange({ tema: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
            <option value="auto">Automático</option>
          </select>
        </div>
      </div>
    </div>
  );
}
