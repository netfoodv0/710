// Tipos específicos para a página de Mapa
import { ConfiguracaoLoja } from '../../../types';

// Estados do mapa
export interface MapState {
  isSidebarOpen: boolean;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
  loading: boolean;
  error: string | null;
}

// Props para componentes de Mapa
export interface MapLayoutProps {
  config: ConfiguracaoLoja | null;
  isSidebarOpen: boolean;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
  onToggleSidebar: () => void;
  onToggleHeatmap: () => void;
  onToggleDeliveryRadius: () => void;
}

export interface MapContainerProps {
  config: ConfiguracaoLoja | null;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
}

export interface MapSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
  onToggleHeatmap: () => void;
  onToggleDeliveryRadius: () => void;
  config: ConfiguracaoLoja | null;
}

export interface MapControlsProps {
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
  onToggleHeatmap: () => void;
  onToggleDeliveryRadius: () => void;
}

export interface SidebarToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface StoreAddressWarningProps {
  config: ConfiguracaoLoja | null;
}

export interface MapLoadingStateProps {
  message?: string;
}

// Hook return types
export interface UseMapStateReturn {
  isSidebarOpen: boolean;
  showHeatmap: boolean;
  showDeliveryRadius: boolean;
  toggleSidebar: () => void;
  toggleHeatmap: () => void;
  toggleDeliveryRadius: () => void;
}

export interface UseMapActionsReturn {
  toggleSidebar: () => void;
  toggleHeatmap: () => void;
  toggleDeliveryRadius: () => void;
  resetMapState: () => void;
  saveMapState: () => void;
}

// Tipos para configurações do mapa
export interface MapConfig {
  center: [number, number];
  zoom: number;
  maxZoom: number;
  minZoom: number;
}

export interface DeliveryRadiusConfig {
  radius: number;
  color: string;
  opacity: number;
}

export interface HeatmapConfig {
  radius: number;
  maxZoom: number;
  intensity: number;
}

// Tipos para dados do mapa
export interface MapData {
  config: ConfiguracaoLoja | null;
  loading: boolean;
  error: string | null;
}

// Tipos para localStorage
export interface MapStorageKeys {
  SIDEBAR_OPEN: string;
  SHOW_HEATMAP: string;
  SHOW_DELIVERY_RADIUS: string;
}

// Tipos para eventos do mapa
export interface MapEvent {
  type: 'sidebar-toggle' | 'heatmap-toggle' | 'delivery-radius-toggle';
  timestamp: number;
  data?: any;
}

// Tipos para estatísticas do mapa
export interface MapStats {
  totalViews: number;
  lastUpdate: string;
  deliveryRadius: number;
  heatmapPoints: number;
}

// Tipos para traduções
export interface MapTranslations {
  title: string;
  subtitle: string;
  sidebar: {
    title: string;
    controls: string;
    deliveryRadius: string;
    heatmap: string;
  };
  controls: {
    toggleSidebar: string;
    toggleHeatmap: string;
    toggleDeliveryRadius: string;
  };
  loading: {
    message: string;
  };
  error: {
    message: string;
    retry: string;
  };
  warning: {
    noAddress: string;
    configureAddress: string;
  };
}
