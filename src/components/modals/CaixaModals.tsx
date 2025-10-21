import React from 'react';
import { ModalCaixaFechado } from './ModalCaixaFechado';
import { ModalAberturaCaixa } from './ModalAberturaCaixa';
import { useCaixaModals } from '../../context/CaixaModalsContext';

export function CaixaModals() {
  const { 
    isModalCaixaFechadoOpen, 
    closeModalCaixaFechado,
    isModalAberturaCaixaOpen,
    closeModalAberturaCaixa,
    openModalAberturaCaixa,
    triggerCaixaAberto 
  } = useCaixaModals();

  const handleConfirmCaixaAberto = (caixaId: string) => {
    // Disparar callback para recarregar dados relacionados ao caixa
    triggerCaixaAberto();
    console.log('Caixa aberto com ID:', caixaId);
    
    // Fechar ambos os modais após confirmar
    closeModalAberturaCaixa();
    closeModalCaixaFechado();
  };

  const handleAbrirCaixa = () => {
    // Abrir modal de abertura por cima do modal de caixa fechado
    openModalAberturaCaixa();
  };

  return (
    <>
      <ModalCaixaFechado
        isOpen={isModalCaixaFechadoOpen}
        onClose={closeModalCaixaFechado}
        onConfirm={handleAbrirCaixa}
      />
      
      <ModalAberturaCaixa
        isOpen={isModalAberturaCaixaOpen}
        onClose={() => {
          closeModalAberturaCaixa();
          closeModalCaixaFechado();
        }}
        onConfirm={handleConfirmCaixaAberto}
      />
    </>
  );
}
