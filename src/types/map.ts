export interface MapCoordinates {
  latitude: number;
  longitude: number;
  dataAtualizacao: string;
}

export interface MapAddress {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  coordenadas?: MapCoordinates;
}

export interface MapConfig {
  endereco?: MapAddress;
}

export interface DeliveryRadius {
  raio: number;
  cor: string;
  opacidade: number;
  peso: number;
  descricao: string;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensidade: number;
}
