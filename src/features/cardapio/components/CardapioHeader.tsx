import React from 'react';
import { RelatorioHeader } from '../../relatorios/components/RelatorioHeader';
import { usePeriodFilter } from '../../../hooks/usePeriodFilter';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCardapioActions } from '../../../hooks/useCardapioActions';

export function CardapioHeader() {
  const { selectedPeriod, handlePeriodChange } = usePeriodFilter();
  const { state, setActiveSection } = useCardapioContext();

  const handleSectionChange = (section: 'produtos') => {
    setActiveSection(section);
  };

  return (
    <RelatorioHeader
      title="Cardápio"
      subtitle="Gerencie seus produtos"
      selectedPeriod={selectedPeriod}
      onPeriodChange={handlePeriodChange}
      showTabNavigation={false}
      activeTab={state.activeSection}
      onTabChange={handleSectionChange}
      loading={state.loadingProdutos}
    />
  );
}
