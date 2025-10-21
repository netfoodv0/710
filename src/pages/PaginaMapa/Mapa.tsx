import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useMapState } from './hooks';
import { useConfiguracoesLoja } from '../../hooks/useConfiguracoesLoja';
import { MapLayout, MapLoadingState } from './components';

export default function Mapa(): JSX.Element {
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


