import React from 'react';
import { ConfiguracaoNotinhaProps } from '../types';

export function ConfiguracaoNotinha({ config, onConfigChange, loading }: ConfiguracaoNotinhaProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuração da Notinha</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="mostrarCNPJ"
            checked={config.mostrarCNPJ || false}
            onChange={(e) => onConfigChange({ mostrarCNPJ: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="mostrarCNPJ" className="ml-2 block text-sm text-gray-900">
            Mostrar CNPJ na notinha
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="mostrarCategoria"
            checked={config.mostrarCategoria || false}
            onChange={(e) => onConfigChange({ mostrarCategoria: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="mostrarCategoria" className="ml-2 block text-sm text-gray-900">
            Mostrar categoria dos produtos
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="mostrarDescricao"
            checked={config.mostrarDescricao || false}
            onChange={(e) => onConfigChange({ mostrarDescricao: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="mostrarDescricao" className="ml-2 block text-sm text-gray-900">
            Mostrar descrição dos produtos
          </label>
        </div>
      </div>
    </div>
  );
}
