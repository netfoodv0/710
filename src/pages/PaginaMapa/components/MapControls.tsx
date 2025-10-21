import React from 'react';
import { MapControlsProps } from '../types';

export function MapControls({
  showHeatmap,
  showDeliveryRadius,
  onToggleHeatmap,
  onToggleDeliveryRadius
}: MapControlsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Controles do Mapa
      </h3>
      
      {/* Toggle Mapa de Calor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="heatmap-toggle" className="text-sm font-medium text-gray-700">
            Mapa de Calor
          </label>
          <button
            id="heatmap-toggle"
            onClick={onToggleHeatmap}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              showHeatmap ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showHeatmap ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Toggle Raios de Entrega */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="delivery-radius-toggle" className="text-sm font-medium text-gray-700">
            Raios de Entrega
          </label>
          <button
            id="delivery-radius-toggle"
            onClick={onToggleDeliveryRadius}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              showDeliveryRadius ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showDeliveryRadius ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {/* Legenda dos raios de entrega */}
        {showDeliveryRadius && <DeliveryRadiusLegend />}
      </div>
    </div>
  );
}

function DeliveryRadiusLegend() {
  const raios = [
    { raio: '1km', cor: 'bg-purple-600', descricao: 'Entrega rápida' },
    { raio: '2km', cor: 'bg-gray-500', descricao: 'Entrega padrão' },
    { raio: '3km', cor: 'bg-gray-700', descricao: 'Entrega estendida' },
    { raio: '5km', cor: 'bg-gray-800', descricao: 'Entrega especial' }
  ];

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-medium text-gray-800 mb-2 text-sm">Área de Entrega</h4>
      <div className="space-y-1 text-xs">
        {raios.map((raio) => (
          <div key={raio.raio} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${raio.cor} bg-opacity-30`}></div>
            <span className="text-gray-700">{raio.raio} - {raio.descricao}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


