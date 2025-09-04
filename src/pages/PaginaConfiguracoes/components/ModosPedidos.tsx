import { ModosPedidosProps } from '../types';

export function ModosPedidos({ config, onConfigChange, loading }: ModosPedidosProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Modos de Pedidos</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="aceitarPedidosDelivery"
            checked={config.aceitarPedidosDelivery || false}
            onChange={(e) => onConfigChange({ aceitarPedidosDelivery: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="aceitarPedidosDelivery" className="ml-2 block text-sm text-gray-900">
            Ativar pedidos delivery
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="aceitarPedidosRetirada"
            checked={config.aceitarPedidosRetirada || false}
            onChange={(e) => onConfigChange({ aceitarPedidosRetirada: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="aceitarPedidosRetirada" className="ml-2 block text-sm text-gray-900">
            Ativar pedidos para retirada
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="aceitarPedidosBalcao"
            checked={config.aceitarPedidosBalcao || false}
            onChange={(e) => onConfigChange({ aceitarPedidosBalcao: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="aceitarPedidosBalcao" className="ml-2 block text-sm text-gray-900">
            Ativar pedidos no balcão
          </label>
        </div>
      </div>
    </div>
  );
}
