import { useState, useEffect } from 'react';

interface MediaQueryOptions {
  minWidth?: number;
  maxWidth?: number;
  orientation?: 'portrait' | 'landscape';
}

export function useMediaQuery(query: string | MediaQueryOptions): boolean {
  const [matches, setMatches] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Don't run on server-side
    if (!isClient) {
      return;
    }

    // Early return if query is undefined or null
    if (!query) {
      setMatches(false);
      return;
    }

    let mediaQuery: string;

    if (typeof query === 'string') {
      mediaQuery = query;
    } else {
      const { minWidth, maxWidth, orientation } = query;
      const conditions = [];

      if (minWidth) conditions.push(`(min-width: ${minWidth}px)`);
      if (maxWidth) conditions.push(`(max-width: ${maxWidth}px)`);
      if (orientation) conditions.push(`(orientation: ${orientation})`);

      // If no conditions were added, return false
      if (conditions.length === 0) {
        setMatches(false);
        return;
      }

      mediaQuery = conditions.join(' and ');
    }

    // Ensure we have a valid media query
    if (!mediaQuery || mediaQuery.trim() === '') {
      setMatches(false);
      return;
    }

    try {
      const media = window.matchMedia(mediaQuery);
      setMatches(media.matches);

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } catch (error) {
      console.warn('Invalid media query:', mediaQuery, error);
      setMatches(false);
    }
  }, [query, isClient]);

  // Return false during SSR
  if (!isClient) {
    return false;
  }

  return matches;
}

// Predefined media queries with SSR safety
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [isClient]);

  return isClient ? isMobile : false;
};

export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsSmallMobile = () => useMediaQuery('(max-width: 480px)');
export const useIsLargeMobile = () => useMediaQuery('(min-width: 481px) and (max-width: 768px)');

// Orientation
export const useIsPortrait = () => useMediaQuery('(orientation: portrait)');
export const useIsLandscape = () => useMediaQuery('(orientation: landscape)');

// Touch device detection
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, [isClient]);

  return isClient ? isTouch : false;
};

// Device type detection
export const useDeviceType = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  return 'unknown';
};

// Screen size detection
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return screenSize;
}; 