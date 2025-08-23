import React, { useState } from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { PageHeader } from '../../components/ui';
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
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Cupom
          </button>
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
