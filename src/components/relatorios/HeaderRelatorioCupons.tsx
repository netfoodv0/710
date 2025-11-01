import React, { useState } from 'react';
import { PeriodType } from '../../components/filters/FiltroPeriodo';
import { FixedPageHeader } from '../../components/ui';
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

  // Botão Novo Cupom
  const rightContent = (
    <button
      onClick={handleOpenModal}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium text-sm rounded"
      style={{ height: '32px' }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Novo Cupom
    </button>
  );

  return (
    <>
      <FixedPageHeader
        title="Cupons"
        rightContent={rightContent}
      />
      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-[50px]" />
      
      <ModalCriarCupom
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCupom}
      />
    </>
  );
};
