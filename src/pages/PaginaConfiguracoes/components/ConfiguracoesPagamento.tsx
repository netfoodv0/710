import React from 'react';
import { ConfiguracoesPagamentoProps } from '../types';

export function ConfiguracoesPagamento({ config, onConfigChange, loading }: ConfiguracoesPagamentoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Pagamento</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pagamentoDinheiro"
            checked={config.pagamentoDinheiro || false}
            onChange={(e) => onConfigChange({ pagamentoDinheiro: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="pagamentoDinheiro" className="ml-2 block text-sm text-gray-900">
            Aceitar pagamento em dinheiro
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pagamentoCartao"
            checked={config.pagamentoCartao || false}
            onChange={(e) => onConfigChange({ pagamentoCartao: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="pagamentoCartao" className="ml-2 block text-sm text-gray-900">
            Aceitar pagamento com cartão
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pagamentoPix"
            checked={config.pagamentoPix || false}
            onChange={(e) => onConfigChange({ pagamentoPix: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="pagamentoPix" className="ml-2 block text-sm text-gray-900">
            Aceitar pagamento via PIX
          </label>
        </div>
      </div>
    </div>
  );
}
