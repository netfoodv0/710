// Layout e componentes principais
export { Layout } from './Layout';
export { ErrorBoundary } from './ErrorBoundary';
export { NotificationToast } from './NotificationToast';
export { PeriodFilter } from './filters/FiltroPeriodo';

// Componentes genéricos
export { Card, StatsCard, QuickActionCard, ProductCard } from './Card';

// Tabela genérica
export { Table, TableActions } from './Table';

// Status badges
export { StatusBadge } from './StatusBadge';

// Componentes de estatísticas
export { EstatisticasCard } from './EstatisticasCard';
export { EstatisticasContainer } from './EstatisticasContainer';
export { EstatisticasHistoricoContainer } from './EstatisticasHistoricoContainer';
export { EstatisticasCustom } from './EstatisticasCustom';

// Componentes de paginação
export { LoadMoreButton } from './LoadMoreButton';

// Componentes de listas
export { ListaProdutos } from './lists/ListaProdutos';
export { ListaProdutosTable } from './lists/TabelaProdutos';

// Componentes de cardápio (movidos para features/cardapio/components)
// export * from './cardapio';

// Componentes de produtos
// export * from './produtos';

// Componentes de pedidos (movidos para features/pedidos/components)
// export * from './pedidos';

// Componentes de dashboard (movidos para features/dashboard/components)
// export * from './dashboard';

// Componentes de histórico (movidos para features/historico/components)
// export * from './historico';

// Componentes de configurações (movidos para features/configuracoes/components)
// export * from './configuracoes';

// Componentes de relatórios
export * from './relatorios';

// Componentes de formulários
export { FormInput } from './forms/FormInput';