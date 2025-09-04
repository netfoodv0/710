import React from 'react';
import { MapControls } from './MapControls';
import { StoreAddressWarning } from './StoreAddressWarning';
import { SidebarToggleButton } from './SidebarToggleButton';
import { MapSidebarProps } from '../types';

export function MapSidebar({
  isOpen,
  onToggle,
  showHeatmap,
  showDeliveryRadius,
  onToggleHeatmap,
  onToggleDeliveryRadius,
  config
}: MapSidebarProps) {
  if (!isOpen) {
    return (
      <SidebarToggleButton
        isOpen={false}
        onClick={onToggle}
        position="right"
      />
    );
  }

  return (
    <div className="relative">
      <SidebarToggleButton
        isOpen={true}
        onClick={onToggle}
        position="left"
      />
      
      <div className="w-[280px] bg-white border-l border-gray-200 overflow-y-auto p-4">
        <MapControls
          showHeatmap={showHeatmap}
          showDeliveryRadius={showDeliveryRadius}
          onToggleHeatmap={onToggleHeatmap}
          onToggleDeliveryRadius={onToggleDeliveryRadius}
        />

        {/* Informações sobre endereço da loja */}
        {!config?.endereco?.rua && <StoreAddressWarning />}
      </div>
    </div>
  );
}
