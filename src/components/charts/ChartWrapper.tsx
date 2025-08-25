import React, { Suspense } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ChartWrapper({ children, fallback }: ChartWrapperProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
        <p className="text-gray-500 text-sm">Carregando gráfico...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

// Wrapper específico para cada tipo de chart
export function BarChartWrapper({ children }: { children: React.ReactNode }) {
  return <ChartWrapper>{children}</ChartWrapper>;
}

export function PieChartWrapper({ children }: { children: React.ReactNode }) {
  return <ChartWrapper>{children}</ChartWrapper>;
}

export function AreaChartWrapper({ children }: { children: React.ReactNode }) {
  return <ChartWrapper>{children}</ChartWrapper>;
}

export function PerformanceChartWrapper({ children }: { children: React.ReactNode }) {
  return <ChartWrapper>{children}</ChartWrapper>;
}
