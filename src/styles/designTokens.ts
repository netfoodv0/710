// Design Tokens para manter consistência visual
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Cores específicas do dashboard
  dashboard: {
    background: '#ffffff',
    backgroundRgb: 'rgb(255, 255, 255)',
    border: '#cfd1d3',
    borderRgb: 'rgb(207, 209, 211)',
    white: '#ffffff',
    grayLight: '#f3f4f6',
    grayDark: '#374151',
  },
  // Cores de status específicas
  status: {
    green: '#10b981',
    purple: '#8b5cf6',
    red: '#ef4444',
    blue: '#3b82f6',
  }
} as const;

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  // Valores específicos encontrados no projeto
  '32.5': '32.5px',
  '36': '36px',
  '40': '40px',
  '62': '62px',
  '71': '71px',
  '73': '73px',
  '98': '98px',
  '99': '99px',
  '120': '120px',
  '160': '160px',
  '200': '200px',
  '265': '265px',
  '290': '290px',
  '400': '400px',
  '500': '500px',
} as const;

export const borderRadius = {
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const;

// Status colors para componentes
export const statusColors = {
  novo: {
    bg: colors.warning[100],
    text: colors.warning[700],
    border: colors.warning[200],
  },
  confirmado: {
    bg: colors.primary[100],
    text: colors.primary[700],
    border: colors.primary[200],
  },
  preparando: {
    bg: colors.warning[100],
    text: colors.warning[700],
    border: colors.warning[200],
  },
  saiu_entrega: {
    bg: colors.success[100],
    text: colors.success[700],
    border: colors.success[200],
  },
  entregue: {
    bg: colors.gray[100],
    text: colors.gray[700],
    border: colors.gray[200],
  },
  cancelado: {
    bg: colors.error[100],
    text: colors.error[700],
    border: colors.error[200],
  },
} as const;

// Classes utilitárias para o dashboard
export const dashboardClasses = {
  container: 'dashboard-container',
  baseCard: 'dashboard-base-card',
  card: 'dashboard-card',
  statCard: 'dashboard-stat-card',
  analyticsCard: 'dashboard-analytics-card',
  infoBox: 'dashboard-info-box',
  iconContainer: 'dashboard-icon-container',
  analyticsHeader: 'dashboard-analytics-header',
  analyticsContent: 'dashboard-analytics-content',
  statusIndicator: 'dashboard-status-indicator',
  border: 'dashboard-border',
  customCard: 'custom-card',
  abaGeralCard: 'aba-geral-card',
} as const;

// Classes para botões
export const buttonClasses = {
  base: 'btn',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
} as const;

// Classes para modais
export const modalClasses = {
  backdrop: 'modal-backdrop',
  content: 'modal-content',
  header: 'modal-header',
  body: 'modal-body',
  footer: 'modal-footer',
} as const; 