import { useState, useEffect } from 'react';

interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
}

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: string;
  width: number;
  height: number;
}

const breakpoints: Breakpoint[] = [
  { name: 'mobile', minWidth: 0, maxWidth: 639 },
  { name: 'tablet', minWidth: 640, maxWidth: 1023 },
  { name: 'desktop', minWidth: 1024, maxWidth: 1279 },
  { name: 'largeDesktop', minWidth: 1280 }
];

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const height = typeof window !== 'undefined' ? window.innerHeight : 768;
    
    return getResponsiveState(width, height);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState(getResponsiveState(width, height));
    };

    const handleOrientationChange = () => {
      // Pequeno delay para garantir que a orientação foi alterada
      setTimeout(handleResize, 100);
    };

    // Adicionar listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Forçar detecção inicial
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return state;
}

function getResponsiveState(width: number, height: number): ResponsiveState {
  let currentBreakpoint = 'mobile';
  
  for (const breakpoint of breakpoints) {
    if (width >= breakpoint.minWidth && (!breakpoint.maxWidth || width <= breakpoint.maxWidth)) {
      currentBreakpoint = breakpoint.name;
      break;
    }
  }

  return {
    isMobile: currentBreakpoint === 'mobile',
    isTablet: currentBreakpoint === 'tablet',
    isDesktop: currentBreakpoint === 'desktop',
    isLargeDesktop: currentBreakpoint === 'largeDesktop',
    currentBreakpoint,
    width,
    height
  };
}

// Hook para forçar re-renderização em mudanças de breakpoint
export function useBreakpointChange() {
  const responsive = useResponsive();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // Forçar re-renderização quando o breakpoint mudar
    setForceUpdate(prev => prev + 1);
  }, [responsive.currentBreakpoint]);

  return { responsive, forceUpdate };
}
