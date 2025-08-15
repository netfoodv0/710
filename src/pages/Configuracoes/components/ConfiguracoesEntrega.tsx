import React from 'react';
import { Truck, DollarSign, Clock, MapPin } from 'lucide-react';
import { ConfiguracaoLoja } from '../../../types';

interface ConfiguracoesEntregaProps {
  config: ConfiguracaoLoja;
  setConfig: React.Dispatch<React.SetStateAction<ConfiguracaoLoja>>;
}

export function ConfiguracoesEntrega({ config, setConfig }: ConfiguracoesEntregaProps) {
  const handleInputChange = (field: keyof ConfiguracaoLoja, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Configurações de Entrega</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Taxa de Entrega */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Taxa de Entrega</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor da Taxa (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={config.taxaEntrega}
                onChange={(e) => handleInputChange('taxaEntrega', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Valor Mínimo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Valor Mínimo</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor Mínimo para Entrega (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={config.valorMinimoEntrega}
                onChange={(e) => handleInputChange('valorMinimoEntrega', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tempo de Preparo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Tempo de Preparo</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo Médio de Preparo (minutos)
              </label>
              <input
                type="number"
                min="1"
                value={config.tempoPreparoMedio}
                onChange={(e) => handleInputChange('tempoPreparoMedio', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Raio de Entrega */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Raio de Entrega</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raio de Entrega (km)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={config.raioEntregaKm}
                onChange={(e) => handleInputChange('raioEntregaKm', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Status de Entrega */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Status de Entrega</h4>
            </div>
          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.ativo}
                onChange={(e) => handleInputChange('ativo', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
            </label>
            <span className="text-xs text-gray-700">
              {config.ativo ? 'Entregas ativas' : 'Entregas desativadas'}
            </span>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="text-xs font-medium text-gray-900">Informações Importantes</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• A taxa de entrega será aplicada a todos os pedidos</li>
            <li>• Pedidos abaixo do valor mínimo não serão aceitos</li>
            <li>• O tempo de preparo é uma estimativa média</li>
            <li>• O raio de entrega determina a área de atendimento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}