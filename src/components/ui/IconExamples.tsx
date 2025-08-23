import React from 'react';
import { DiscountIcon } from './DiscountIcon';
import { RejectedOrderIcon } from './RejectedOrderIcon';
import { CompletedOrderIcon } from './CompletedOrderIcon';
import { NewCustomerIcon } from './NewCustomerIcon';

export const IconExamples: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Exemplos de Uso dos Ícones Personalizados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ícone de Desconto */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Ícone de Desconto</h3>
          <div className="flex items-center gap-3">
            <DiscountIcon size={24} color="#666666" />
            <span className="text-sm text-gray-600">Desconto Geral</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <DiscountIcon size={16} color="#10B981" />
              <span className="text-xs text-gray-500">Tamanho pequeno, cor verde</span>
            </div>
            <div className="flex items-center gap-2">
              <DiscountIcon size={32} color="#EF4444" />
              <span className="text-xs text-gray-500">Tamanho grande, cor vermelha</span>
            </div>
          </div>
        </div>

        {/* Ícone de Pedido Rejeitado */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Pedido Rejeitado</h3>
          <div className="flex items-center gap-3">
            <RejectedOrderIcon size={24} color="#666666" />
            <span className="text-sm text-gray-600">Pedidos Rejeitados</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <RejectedOrderIcon size={16} color="#EF4444" />
              <span className="text-xs text-gray-500">Tamanho pequeno, cor vermelha</span>
            </div>
            <div className="flex items-center gap-2">
              <RejectedOrderIcon size={32} color="#DC2626" />
              <span className="text-xs text-gray-500">Tamanho grande, cor vermelha escura</span>
            </div>
          </div>
        </div>

        {/* Ícone de Pedido Finalizado */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Pedido Finalizado</h3>
          <div className="flex items-center gap-3">
            <CompletedOrderIcon size={24} color="#666666" />
            <span className="text-sm text-gray-600">Pedidos Finalizados</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <CompletedOrderIcon size={16} color="#10B981" />
              <span className="text-xs text-gray-500">Tamanho pequeno, cor verde</span>
            </div>
            <div className="flex items-center gap-2">
              <CompletedOrderIcon size={32} color="#059669" />
              <span className="text-xs text-gray-500">Tamanho grande, cor verde escura</span>
            </div>
          </div>
        </div>

        {/* Ícone de Cliente Novo */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Cliente Novo</h3>
          <div className="flex items-center gap-3">
            <NewCustomerIcon size={24} color="#666666" />
            <span className="text-sm text-gray-600">Clientes Novos</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <NewCustomerIcon size={16} color="#3B82F6" />
              <span className="text-xs text-gray-500">Tamanho pequeno, cor azul</span>
            </div>
            <div className="flex items-center gap-2">
              <NewCustomerIcon size={32} color="#1D4ED8" />
              <span className="text-xs text-gray-500">Tamanho grande, cor azul escura</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Como Usar</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Importação:</strong> <code>import { '{ DiscountIcon }' } from '../ui/DiscountIcon';</code></p>
          <p><strong>Uso básico:</strong> <code>&lt;DiscountIcon /&gt;</code></p>
          <p><strong>Com props:</strong> <code>&lt;DiscountIcon size={24} color="#666666" className="custom-class" /&gt;</code></p>
          <p><strong>Props disponíveis:</strong> size (número), color (string), className (string)</p>
        </div>
      </div>
    </div>
  );
};

export default IconExamples;
