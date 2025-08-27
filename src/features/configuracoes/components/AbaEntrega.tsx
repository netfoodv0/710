import React from 'react';
import { DollarSign, Clock, MapPin } from 'lucide-react';
import { Card } from '../Card';
import { ConfiguracaoLoja } from '../../types';

interface AbaEntregaProps {
  config: ConfiguracaoLoja;
  onConfigChange: (config: ConfiguracaoLoja) => void;
}

export function AbaEntrega({ config, onConfigChange }: AbaEntregaProps) {
  const handleInputChange = (field: keyof ConfiguracaoLoja, value: number) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <Card className="p-0 min-h-[600px] rounded">
      <div className="p-6 space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Entrega</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Taxa de Entrega (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={config.taxaEntrega}
                onChange={(e) => handleInputChange('taxaEntrega', parseFloat(e.target.value))}
                className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-9 pr-4 h-[34px] border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Valor Mínimo para Entrega (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={config.valorMinimoEntrega}
                onChange={(e) => handleInputChange('valorMinimoEntrega', parseFloat(e.target.value))}
                className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-9 pr-4 h-[34px] border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tempo Médio de Preparo (min)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={config.tempoPreparoMedio}
                onChange={(e) => handleInputChange('tempoPreparoMedio', parseInt(e.target.value))}
                className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-9 pr-4 h-[34px] border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Raio de Entrega (km)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={config.raioEntregaKm}
                onChange={(e) => handleInputChange('raioEntregaKm', parseInt(e.target.value))}
                className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full pl-9 pr-4 h-[34px] border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Informações adicionais sobre entrega */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Dicas para Configuração de Entrega</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• A taxa de entrega pode variar conforme a distância</li>
            <li>• O valor mínimo ajuda a garantir a viabilidade das entregas</li>
            <li>• O tempo de preparo deve incluir o tempo de cozimento e embalagem</li>
            <li>• O raio de entrega deve considerar o trânsito da sua região</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
