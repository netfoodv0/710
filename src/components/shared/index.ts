// Componentes compartilhados unificados

// Estatísticas unificadas
export { 
  EstatisticasUnificadas, 
  useEstatisticasPadrao,
  type EstatisticaItem 
} from './EstatisticasUnificadas';

// Animações unificadas
export {
  AnimatedContainer,
  AnimatedList,
  AnimatedPresence,
  LoadingAnimado,
  useAnimacao,
  animacoesPadrao
} from './AnimatedContainer';

// Re-exportar outros componentes compartilhados existentes
export { Table, TableActions } from '../Table';
export { Card, StatsCard, QuickActionCard, ProductCard } from '../Card';
export { StatusBadge, StatusActions } from '../StatusBadge';
export { ErrorBoundary } from '../ErrorBoundary';
export { NotificationToast } from '../NotificationToast';
