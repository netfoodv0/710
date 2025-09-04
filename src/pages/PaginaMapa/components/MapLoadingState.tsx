import React from 'react';
import { MapLoadingStateProps } from '../types';

export function MapLoadingState({ message = 'Carregando configurações da loja...' }: MapLoadingStateProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
