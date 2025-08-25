import React from 'react';

interface RouteFallbackProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RouteFallback({ 
  message = 'Carregando página...', 
  size = 'md' 
}: RouteFallbackProps) {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96'
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} bg-gray-50 rounded-lg`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">{message}</p>
        <p className="text-gray-400 text-sm mt-2">Aguarde um momento...</p>
      </div>
    </div>
  );
}

// Fallbacks específicos para diferentes tipos de páginas
export function DashboardFallback() {
  return <RouteFallback message="Carregando dashboard..." size="lg" />;
}

export function ChartsFallback() {
  return <RouteFallback message="Carregando gráficos..." size="md" />;
}

export function TableFallback() {
  return <RouteFallback message="Carregando dados..." size="md" />;
}

export function FormFallback() {
  return <RouteFallback message="Carregando formulário..." size="md" />;
}
