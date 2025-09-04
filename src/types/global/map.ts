// Tipos relacionados ao mapa

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MapAddress {
  endereco: string;
  coordenadas: MapCoordinates;
  bairro?: string;
  cidade?: string;
  cep?: string;
  referencia?: string;
}

export interface MapMarker {
  id: string;
  position: MapCoordinates;
  title: string;
  description?: string;
  type: 'delivery' | 'pickup' | 'store' | 'customer';
  data?: any;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapConfig {
  center: MapCoordinates;
  zoom: number;
  bounds?: MapBounds;
  markers: MapMarker[];
  showHeatmap?: boolean;
  showDeliveryRadius?: boolean;
  deliveryRadius?: number;
}