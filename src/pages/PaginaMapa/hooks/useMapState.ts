import { useState, useCallback, useEffect } from 'react';
import { UseMapStateReturn, MapStorageKeys } from '../types';

// Chaves para localStorage
const STORAGE_KEYS: MapStorageKeys = {
  SIDEBAR_OPEN: 'map-sidebar-open',
  SHOW_HEATMAP: 'map-show-heatmap',
  SHOW_DELIVERY_RADIUS: 'map-show-delivery-radius'
};

export function useMapState(): UseMapStateReturn {
  // Inicializar estado com valores do localStorage ou padrões
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_OPEN);
    return saved ? JSON.parse(saved) : true;
  });
  
  const [showHeatmap, setShowHeatmap] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHOW_HEATMAP);
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showDeliveryRadius, setShowDeliveryRadius] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHOW_DELIVERY_RADIUS);
    return saved ? JSON.parse(saved) : true;
  });

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_OPEN, JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_HEATMAP, JSON.stringify(showHeatmap));
  }, [showHeatmap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_DELIVERY_RADIUS, JSON.stringify(showDeliveryRadius));
  }, [showDeliveryRadius]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const toggleHeatmap = useCallback(() => {
    setShowHeatmap(prev => !prev);
  }, []);

  const toggleDeliveryRadius = useCallback(() => {
    setShowDeliveryRadius(prev => !prev);
  }, []);

  return {
    isSidebarOpen,
    showHeatmap,
    showDeliveryRadius,
    toggleSidebar,
    toggleHeatmap,
    toggleDeliveryRadius
  };
}
