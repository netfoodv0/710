import React from 'react';
import { LeafletMap } from './LeafletMap';
import { MapContainerProps } from '../types';

export function MapContainer({ config, showHeatmap, showDeliveryRadius }: MapContainerProps) {
  return (
    <div className="flex-1">
      <LeafletMap
        height="100vh"
        center={[-21.2055, -41.8887]} // Itaperuna/RJ - centro dos dados fictícios
        zoom={13}
        lojaEndereco={config?.endereco}
        showHeatmap={showHeatmap}
        showDeliveryRadius={showDeliveryRadius}
      />
    </div>
  );
}
