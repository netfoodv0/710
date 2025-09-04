import React from 'react';
import { MapContainer } from './MapContainer';
import { MapSidebar } from './MapSidebar';
import { MapLayoutProps } from '../types';

export function MapLayout({
  config,
  isSidebarOpen,
  showHeatmap,
  showDeliveryRadius,
  onToggleSidebar,
  onToggleHeatmap,
  onToggleDeliveryRadius
}: MapLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* MapContainer sempre recebe as props corretas, independente do sidebar */}
      <MapContainer
        config={config}
        showHeatmap={showHeatmap}
        showDeliveryRadius={showDeliveryRadius}
      />
      
      {/* MapSidebar controla apenas a interface, não afeta as funcionalidades do mapa */}
      <MapSidebar
        isOpen={isSidebarOpen}
        onToggle={onToggleSidebar}
        showHeatmap={showHeatmap}
        showDeliveryRadius={showDeliveryRadius}
        onToggleHeatmap={onToggleHeatmap}
        onToggleDeliveryRadius={onToggleDeliveryRadius}
        config={config}
      />
    </div>
  );
}
