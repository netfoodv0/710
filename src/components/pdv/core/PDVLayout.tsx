import React from 'react';
import { CategoryTabs } from '../products/CategoryTabs';
import { ProductGrid } from '../products/ProductGrid';
import { ProductSearch } from '../products/ProductSearch';
import { OrderSummary } from '../orders/OrderSummary';
import { PDVValuesDisplay } from './PDVValuesDisplay';

export const PDVLayout: React.FC = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: '#e5dade' }}>
      {/* Coluna 1: Pedido Atual (Lateral Esquerda) */}
      <div className="w-96 bg-white/60 border-2 border-white flex flex-col ml-4 mt-4 mb-4 rounded-l-2xl">
        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-tl-2xl">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Pedido Atual
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <OrderSummary />
        </div>
        
        {/* Exibição de Valores no Canto Inferior Esquerdo */}
        <div className="rounded-bl-2xl">
          <PDVValuesDisplay />
        </div>
      </div>

      {/* Coluna 2: Produtos (Centro) */}
      <div className="flex-1 bg-white/60 border-2 border-white flex flex-col mt-4 mb-4">
        <div className="px-4 h-[53px] border-b border-gray-200 bg-gray-50 flex items-center">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              Produtos
            </h3>
            <ProductSearch />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ProductGrid />
        </div>
      </div>

      {/* Coluna 3: Categorias (Lateral Direita) */}
      <div className="w-50 bg-white/60 border-2 border-white flex flex-col mt-4 mr-4 mb-4 rounded-r-2xl">
        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-tr-2xl">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Categorias
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto rounded-br-2xl">
          <CategoryTabs />
        </div>
      </div>
    </div>
  );
};
