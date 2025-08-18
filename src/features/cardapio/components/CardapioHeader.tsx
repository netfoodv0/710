import React from 'react';
import { PageHeader } from '../../../components/ui';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCardapioActions } from '../../../hooks/useCardapioActions';

export function CardapioHeader() {
  const { state } = useCardapioContext();

  return (
    <PageHeader
      title="Cardápio"
      subtitle="Gerencie seus produtos"
    />
  );
}
