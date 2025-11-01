import { useEffect, useState, useRef } from 'react';

/**
 * Hook para detectar a largura do sidebar dinamicamente
 * 
 * Observa mudanças no DOM para detectar quando o sidebar é expandido ou recolhido.
 * Utiliza MutationObserver para detectar mudanças de estilo de forma eficiente.
 * 
 * @returns A largura atual do sidebar em pixels
 * 
 * @example
 * ```tsx
 * const sidebarWidth = useSidebarWidth();
 * // Usa a largura para posicionar elementos
 * <div style={{ marginLeft: `${sidebarWidth}px` }}>Conteúdo</div>
 * ```
 */
export function useSidebarWidth(): number {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const observerRef = useRef<MutationObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkSidebarWidth = () => {
      // Procura pelo primeiro elemento com width no style (geralmente o sidebar)
      const sidebar = document.querySelector('[style*="width"]') as HTMLElement;
      if (sidebar && sidebar.style.width) {
        const widthValue = sidebar.style.width;
        const width = parseInt(widthValue, 10);
        if (!isNaN(width)) {
          setSidebarWidth((prevWidth) => {
            // Só atualiza se a largura realmente mudou
            if (prevWidth !== width) {
              return width;
            }
            return prevWidth;
          });
        }
      }
    };

    // Verifica inicialmente após um pequeno delay para garantir que o DOM está carregado
    timeoutRef.current = setTimeout(() => {
      checkSidebarWidth();
      
      // Cria um MutationObserver para detectar mudanças no estilo do sidebar
      observerRef.current = new MutationObserver(checkSidebarWidth);
      const sidebar = document.querySelector('[style*="width"]') as HTMLElement;
      
      if (sidebar) {
        observerRef.current.observe(sidebar, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return sidebarWidth;
}
