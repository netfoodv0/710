import React from 'react';
import LandingPageMobile from './LandingPageMobile';
import LandingPageDesktop from './LandingPageDesktop';

export default function LandingPage() {
  // Detectar se é mobile baseado no tamanho da tela
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  };

  // Renderizar a versão correta baseada no dispositivo
  if (isMobile()) {
    return <LandingPageMobile />;
  }

  return <LandingPageDesktop />;
}
