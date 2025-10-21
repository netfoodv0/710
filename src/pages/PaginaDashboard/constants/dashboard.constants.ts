// Constantes do Dashboard
export const DASHBOARD_CONSTANTS = {
  LOADING_MIN_DELAY_MS: 600,
  DAYS_7_MS: 7 * 24 * 60 * 60 * 1000,
  TOP_PRODUCTS_LIMIT: 5,
} as const;

// Placeholder SVG para imagens de produtos
export const PRODUCT_PLACEHOLDER_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkMzNS41ODE3IDMyIDMyIDM1LjU4MTcgMzIgNDBTMzUuNTgxNyA0OCA0MCA0OFM0OCA0NC40MTgzIDQ4IDQwUzQ0LjQxODMgMzIgNDAgMzJaTTQwIDQ0QzM3Ljc5MDkgNDQgMzYgNDIuMjA5MSAzNiA0MFMzNy43OTA5IDM2IDQwIDM2UzQ0IDM3Ljc5MDkgNDQgNDBTNDIuMjA5MSA0NCA0MCA0NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+' as const;

// Mapeamento de produtos para imagens
export const PRODUCT_IMAGE_MAP = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop&crop=center',
  hambúrguer: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop&crop=center',
  hamburger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop&crop=center',
  açaí: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center',
  acai: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center',
  sushi: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=80&h=80&fit=crop&crop=center',
  salada: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop&crop=center',
  batata: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=80&h=80&fit=crop&crop=center',
  combo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center',
} as const;

// Tipos de entrega
export const FORMA_ENTREGA = {
  DELIVERY: 'delivery',
  RETIRADA: 'retirada',
  BALCAO: 'balcao',
} as const;
