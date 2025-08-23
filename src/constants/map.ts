export const MAP_CONSTANTS = {
  DEFAULT_CENTER: [-21.2055, -41.8887] as [number, number], // Itaperuna/RJ
  DEFAULT_ZOOM: 13,
  HEIGHT: '100vh',
  SIDEBAR_WIDTH: '280px',
  TOGGLE_BUTTON_OFFSET: '48px' // -left-12 = -48px
} as const;

export const DELIVERY_RADIUS_CONFIG = [
  { raio: 1000, cor: '#8B5CF6', opacidade: 0.3, peso: 2, descricao: 'Entrega rápida' },
  { raio: 2000, cor: '#6B7280', opacidade: 0.25, peso: 1.5, descricao: 'Entrega padrão' },
  { raio: 3000, cor: '#374151', opacidade: 0.2, peso: 1, descricao: 'Entrega estendida' },
  { raio: 5000, cor: '#1F2937', opacidade: 0.15, peso: 0.8, descricao: 'Entrega especial' }
] as const;

export const HEATMAP_GRADIENT = {
  0.0: 'darkblue',
  0.1: 'blue',
  0.2: 'cyan',
  0.3: 'lime',
  0.4: 'yellow',
  0.5: 'orange',
  0.7: 'red',
  0.9: 'darkred',
  1.0: 'crimson'
} as const;

export const HEATMAP_CONFIG = {
  radius: 25,
  blur: 35,
  maxZoom: 17,
  minOpacity: 0.8
} as const;

export const BAIRROS_ITAPERUNA = [
  'Centro, Itaperuna, RJ, Brasil',
  'Niterói, Itaperuna, RJ, Brasil', 
  'Cidade Nova, Itaperuna, RJ, Brasil',
  'Horto Florestal, Itaperuna, RJ, Brasil',
  'Aeroporto, Itaperuna, RJ, Brasil',
  'Vinhosa, Itaperuna, RJ, Brasil',
  'Jardim Belvedere, Itaperuna, RJ, Brasil',
  'Jardim Valéria, Itaperuna, RJ, Brasil'
] as const;
