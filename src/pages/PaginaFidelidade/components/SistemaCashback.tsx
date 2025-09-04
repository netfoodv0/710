import React from 'react';
import { FormSwitch } from '../../../components/forms/FormSwitch';
import { SistemaCashbackProps } from '../types';

export function SistemaCashback({
  taxaCashback,
  validadeCashback,
  sistemaCashbackAtivo,
  onTaxaChange,
  onValidadeChange,
  onToggle
}: SistemaCashbackProps) {
  return (
    <div className="bg-white border rounded-lg p-6" style={{ borderColor: '#cfd1d3' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>
          Sistema de Cashback
        </h3>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            sistemaCashbackAtivo 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {sistemaCashbackAtivo ? 'Ativo' : 'Inativo'}
          </span>
          <FormSwitch
            name="sistemaCashback"
            label=""
            checked={sistemaCashbackAtivo}
            onChange={(checked) => onToggle(checked)}
            className="mb-0"
          />
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">
        O sistema de cashback permite que seus clientes recebam uma porcentagem do valor gasto 
        em compras como crédito para futuras compras.
      </p>

      {/* Configuração */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxa de Cashback (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={taxaCashback}
            onChange={(e) => onTaxaChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Entre 0 e 100%"
          />
          <p className="text-xs text-gray-500 mt-1">Entre 0 e 100%</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Validade do Saldo (dias)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={validadeCashback}
            onChange={(e) => onValidadeChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Entre 1 e 365 dias"
          />
        </div>
      </div>

      {/* Benefícios */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Benefícios</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Atrai novos clientes</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Aumenta o valor médio do pedido</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Incentiva compras recorrentes</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">Melhora a satisfação do cliente</span>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="border rounded-lg p-4" style={{ borderColor: '#cfd1d3', backgroundColor: '#faf5ff' }}>
        <h4 className="font-medium text-gray-800 mb-3">Informações Importantes</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• O cashback é calculado sobre o valor total dos itens do pedido</li>
          <li>• O valor é creditado automaticamente após a confirmação da entrega</li>
          <li>• O cliente pode utilizar o saldo em qualquer compra futura</li>
        </ul>
      </div>
    </div>
  );
}
