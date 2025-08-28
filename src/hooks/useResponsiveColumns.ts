import { useState, useEffect } from 'react';

export function useResponsiveColumns() {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
        const calculateColumns = () => {
      const cardWidth = 240; // Largura fixa de cada card
      const gap = 24; // Gap entre colunas (gap-6 = 24px)
      const padding = 48; // Padding lateral (px-6 = 24px * 2)
      const availableWidth = window.innerWidth - padding;
      
      // Calcula quantas colunas cabem com margem de segurança mais conservadora
      let maxColumns = Math.floor((availableWidth - 80) / (cardWidth + gap)); // 80px de margem inicial
      
      // Adiciona margem de segurança adicional para evitar cortes
      if (maxColumns > 1) {
        const totalWidth = (maxColumns * cardWidth) + ((maxColumns - 1) * gap);
        if (totalWidth > availableWidth - 100) { // 100px de margem de segurança total
          maxColumns = Math.max(1, maxColumns - 1);
        }
      }
      
      // Limita entre 1 e 4 colunas
      maxColumns = Math.max(1, Math.min(4, maxColumns));
      
      setColumns(maxColumns);
    };

    // Calcula na montagem
    calculateColumns();

    // Recalcula no resize da janela
    window.addEventListener('resize', calculateColumns);
    
    // Cleanup
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  return columns;
}
