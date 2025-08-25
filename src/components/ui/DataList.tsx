import React from 'react';
import { useDashboardTranslation } from '../../hooks/useTranslation';

// Interface genérica para o componente de lista
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
  action?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

// Componente genérico de lista de dados
export const DataList = <T,>({ 
  items, 
  renderItem, 
  title, 
  action, 
  className = '',
  emptyMessage,
  loading = false
}: DataListProps<T>) => {
  const { dashboard } = useDashboardTranslation();
  const defaultEmptyMessage = emptyMessage || dashboard.nenhumItemEncontrado;

  if (loading) {
    return (
      <section className={`dashboard-analytics-card ${className}`} aria-labelledby={title ? 'data-list-title' : undefined}>
        {title && (
          <div className="dashboard-analytics-header">
            <h2 id="data-list-title" className="text-base font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        <div className="dashboard-analytics-content">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`dashboard-analytics-card ${className}`} aria-labelledby={title ? 'data-list-title' : undefined}>
      {title && (
        <div className="dashboard-analytics-header">
          <h2 id="data-list-title" className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="dashboard-analytics-content">
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p className="text-sm">{defaultEmptyMessage}</p>
          </div>
        )}
      </div>
      
      {action && (
        <div className="mt-auto pt-2 flex-shrink-0">
          <a 
            href={action.href}
            className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors dashboard-focus-visible"
            aria-label={action.label}
            role="button"
          >
            {action.icon}
            <span>{action.label}</span>
          </a>
        </div>
      )}
    </section>
  );
};

// Componente específico para listas com scroll
export const ScrollableDataList = <T,>({ 
  items, 
  renderItem, 
  title, 
  action, 
  className = '',
  emptyMessage,
  loading = false
}: DataListProps<T>) => {
  const { dashboard } = useDashboardTranslation();
  const defaultEmptyMessage = emptyMessage || dashboard.nenhumItemEncontrado;

  if (loading) {
    return (
      <section className={`dashboard-analytics-card ${className}`} aria-labelledby={title ? 'scrollable-data-list-title' : undefined}>
        {title && (
          <div className="dashboard-analytics-header">
            <h2 id="scrollable-data-list-title" className="text-base font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        <div className="dashboard-analytics-content">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`dashboard-analytics-card ${className}`} aria-labelledby={title ? 'scrollable-data-list-title' : undefined}>
      {title && (
        <div className="dashboard-analytics-header">
          <h2 id="scrollable-data-list-title" className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="dashboard-analytics-content">
        {items.length > 0 ? (
          <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar min-h-0">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p className="text-sm">{defaultEmptyMessage}</p>
          </div>
        )}
      </div>
      
      {action && (
        <div className="mt-auto pt-2 flex-shrink-0">
          <a 
            href={action.href}
            className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors dashboard-focus-visible"
            aria-label={action.label}
            role="button"
          >
            {action.icon}
            <span>{action.label}</span>
          </a>
        </div>
      )}
    </section>
  );
};
