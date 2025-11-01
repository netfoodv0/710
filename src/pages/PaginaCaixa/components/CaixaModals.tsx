import React from 'react';
import { ModalCaixaFechado, ModalAberturaCaixa, ModalCaixaAbertoDetalhes } from './modals';
import { useCaixaModals } from '../context/CaixaModalsContext';
import { useCaixa } from '../hooks';

export function CaixaModals() {
  const { 
    isModalCaixaFechadoOpen, 
    closeModalCaixaFechado,
    isModalAberturaCaixaOpen,
    closeModalAberturaCaixa,
    isModalCaixaAbertoDetalhesOpen,
    closeModalCaixaAbertoDetalhes,
    openModalAberturaCaixa,
    closeAllModals
  } = useCaixaModals();
  
  const { caixaAtual } = useCaixa();

  const handleAbrirCaixa = () => {
    // Abrir modal de abertura por cima do modal de caixa fechado
    openModalAberturaCaixa();
  };

  const handleConfirmCaixaAberto = (caixaId: string) => {
    console.log('Caixa aberto com ID:', caixaId);
    
    // Fechar ambos os modais após confirmar
    closeAllModals();
  };

  const handleCancelarAbertura = () => {
    // Fechar ambos os modais ao cancelar
    closeAllModals();
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
        onClose={handleCancelarAbertura}
        onConfirm={handleConfirmCaixaAberto}
      />

      {caixaAtual && (
        <ModalCaixaAbertoDetalhes
          isOpen={isModalCaixaAbertoDetalhesOpen}
          onClose={closeModalCaixaAbertoDetalhes}
          caixa={caixaAtual}
        />
      )}
    </>
  );
}
