import React from 'react';
import { usePaginaEmBranco } from './hooks';
import { PaginaEmBrancoProps } from './types';

export function PaginaEmBranco({ ...props }: PaginaEmBrancoProps) {
  const { data, isLoading, error, handleUpdateData, t } = usePaginaEmBranco();

  return (
    <div>
      <h1>Página em Branco</h1>
      {/* Adicione aqui o conteúdo da página em branco */}
    </div>
  );
}