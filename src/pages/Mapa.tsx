import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MapLayout } from '../components/maps/MapLayout';
import { MapLoadingState } from '../components/maps/MapLoadingState';
import { useMapState } from '../hooks/useMapState';
import { useConfiguracoesLoja } from '../hooks/useConfiguracoesLoja';

export function Mapa(): JSX.Element {
  const {
    isSidebarOpen,
    showHeatmap,
    showDeliveryRadius,
    toggleSidebar,
    toggleHeatmap,
    toggleDeliveryRadius
  } = useMapState();

  const { config, loading } = useConfiguracoesLoja();

  if (loading) {
    return <MapLoadingState />;
  }

  return (
    <ErrorBoundary>
      <MapLayout
        config={config}
        isSidebarOpen={isSidebarOpen}
        showHeatmap={showHeatmap}
        showDeliveryRadius={showDeliveryRadius}
        onToggleSidebar={toggleSidebar}
        onToggleHeatmap={toggleHeatmap}
        onToggleDeliveryRadius={toggleDeliveryRadius}
      />
    </ErrorBoundary>
  );
}

