import { lazy } from 'react';

// Lazy loading para todos os charts
export const BarChart = lazy(() => import('./BarChart'));
export const GraficoPizza = lazy(() => import('../analytics/GraficoPizza'));
export const GraficoArea = lazy(() => import('../analytics/GraficoArea'));
export const GraficosVendas = lazy(() => import('../../features/relatorios/components/GraficosVendas'));
export const GraficosPerformance = lazy(() => import('../../features/relatorios/components/GraficosPerformance'));
export const GraficoPerformance = lazy(() => import('../../features/relatorios/components/GraficoPerformance'));
export const GraficoFrequenciaPedidos = lazy(() => import('../../features/relatorios/components/GraficoFrequenciaPedidos'));
export const GraficoFormasPagamento = lazy(() => import('../../features/relatorios/components/GraficoFormasPagamento'));
export const GraficoTiposPedidos = lazy(() => import('../../features/historico/components/GraficoTiposPedidos'));

// Componentes que não são charts mas são pesados
export const OrganogramaPage = lazy(() => import('../../pages/PaginaOrganograma/OrganogramaPage'));
