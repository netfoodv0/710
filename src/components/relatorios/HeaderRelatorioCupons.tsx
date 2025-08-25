import React, { useState } from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { PageHeader, ActionButton } from '../../components/ui';
import { ModalCriarCupom } from '../modals/ModalCriarCupom';

interface HeaderRelatorioCuponsProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onExport: () => void;
  loading: boolean;
}

export const HeaderRelatorioCupons: React.FC<HeaderRelatorioCuponsProps> = ({
  selectedPeriod,
  onPeriodChange,
  onExport,
  loading
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCupom = (cupomData: any) => {
    console.log('Novo cupom criado:', cupomData);
    // Aqui você pode implementar a lógica para salvar o cupom
    // Por exemplo, chamar uma API ou atualizar o estado local
  };

  return (
    <>
      <PageHeader
        title="Relatório de Cupons"
        subtitle="Análise completa dos cupons, descontos e promoções da sua loja"
        rightContent={
          <ActionButton
            label="Novo Cupom"
            onClick={handleOpenModal}
            variant="primary"
            size="md"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          />
        }
      />
      
      <ModalCriarCupom
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCupom}
      />
    </>
  );
};
