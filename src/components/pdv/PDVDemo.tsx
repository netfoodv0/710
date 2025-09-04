import React, { useState } from 'react';
import { PDVModal } from './index';
import { ShoppingCart } from 'lucide-react';

export const PDVDemo: React.FC = () => {
  const [isPDVOpen, setIsPDVOpen] = useState(false);

  const openPDV = () => setIsPDVOpen(true);
  const closePDV = () => setIsPDVOpen(false);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sistema PDV - Demonstração
          </h1>
          <p className="text-lg text-gray-600">
            Clique no botão abaixo para abrir o sistema de PDV
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={openPDV}
            className="flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={24} />
            <span className="text-lg font-medium">Abrir PDV</span>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🚚 Delivery</h3>
            <p className="text-gray-600 text-sm">
              Pedidos para entrega em endereço com seleção de cliente e entregador
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🪑 Mesa</h3>
            <p className="text-gray-600 text-sm">
              Pedidos para consumo no local com número da mesa
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📦 Retirada</h3>
            <p className="text-gray-600 text-sm">
              Pedidos para retirada no local pelo cliente
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Esta é uma demonstração do sistema PDV em desenvolvimento</p>
          <p>Componentes implementados: Modal, Layout, Header, ActionBar, Categorias, Produtos e Resumo do Pedido</p>
        </div>
      </div>

      {/* Modal PDV */}
      <PDVModal isOpen={isPDVOpen} onClose={closePDV} />
    </div>
  );
};
