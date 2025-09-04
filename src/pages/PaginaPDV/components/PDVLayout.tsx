import React from 'react';
import { PDVLayout as PDVLayoutComponent } from '../../../components/pdv/core/PDVLayout';
import { PDVLayoutProps } from '../types';

export function PDVLayout({ data, onRetry }: PDVLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conteúdo Principal do PDV */}
      <PDVLayoutComponent />
    </div>
  );
}
