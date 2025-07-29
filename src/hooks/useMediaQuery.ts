import { useState, useEffect } from 'react';

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
}

export function useMediaQuery() {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        xs: width >= 475,
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
      });
      
      setIsMobile(width <= 768);
    };

    // Initial check
    updateBreakpoints();

    // Add event listener
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return {
    breakpoints,
    isMobile,
    isTablet: breakpoints.md && !breakpoints.lg,
    isDesktop: breakpoints.lg,
  };
} 