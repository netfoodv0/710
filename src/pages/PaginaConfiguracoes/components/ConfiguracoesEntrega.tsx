import React from 'react';
import { ConfiguracoesEntregaProps } from '../types';

export function ConfiguracoesEntrega({ config, onConfigChange, loading }: ConfiguracoesEntregaProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Entrega</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxa de Entrega (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.taxaEntrega || 0}
              onChange={(e) => onConfigChange({ taxaEntrega: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Mínimo (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.valorMinimoEntrega || 0}
              onChange={(e) => onConfigChange({ valorMinimoEntrega: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raio de Entrega (km)
          </label>
          <input
            type="number"
            value={config.raioEntregaKm || 0}
            onChange={(e) => onConfigChange({ raioEntregaKm: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="entregaDomicilio"
            checked={config.entregaDomicilio || false}
            onChange={(e) => onConfigChange({ entregaDomicilio: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="entregaDomicilio" className="ml-2 block text-sm text-gray-900">
            Ativar entrega domiciliar
          </label>
        </div>
      </div>
    </div>
  );
}


