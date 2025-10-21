import React from 'react';
import { usePedidosEmAndamento } from '../../pages/PaginaDashboard/hooks';

export const PedidosEmAndamentoTest: React.FC = () => {
  const { pedidos, loading, error } = usePedidosEmAndamento();

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pedidos em Andamento (Teste)</h3>
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-red-800">Erro</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Pedidos em Andamento (Teste) - {pedidos.length} pedidos
      </h3>
      
      {pedidos.length === 0 ? (
        <p className="text-gray-500">Nenhum pedido pendente encontrado.</p>
      ) : (
        <div className="space-y-2">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="p-3 bg-gray-50 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{pedido.cliente}</p>
                  <p className="text-sm text-gray-600">#{pedido.numero}</p>
                  <p className="text-sm text-gray-500">Status: {pedido.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    R$ {pedido.total.toFixed(2)}
                  </p>
                  {pedido.horario && (
                    <p className="text-sm text-gray-500">{pedido.horario}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




