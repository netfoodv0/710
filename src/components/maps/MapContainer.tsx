import React from 'react';
import { LeafletMap } from './LeafletMap';
import { ConfiguracaoLoja } from '../../types';

interface MapContainerProps {
  config: ConfiguracaoLoja | null;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
}

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
