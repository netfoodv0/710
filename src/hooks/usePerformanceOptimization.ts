import { useState, useEffect, useCallback } from 'react';

interface PerformanceOptimizationOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  enableAnimations?: boolean;
}

export function usePerformanceOptimization(options: PerformanceOptimizationOptions = {}) {
  const {
    delay = 100,
    threshold = 0.1,
    rootMargin = '100px',
    enableAnimations = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detectar dispositivo de baixa performance
  useEffect(() => {
    const checkDevicePerformance = () => {
      // Verificar se é um dispositivo móvel
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Verificar se tem memória limitada
      const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      
      // Verificar se tem conexão lenta
      const hasSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g' ||
         navigator.connection.effectiveType === '3g');
      
      // Verificar se tem CPU limitada
      const hasLimitedCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      
      setIsLowPerformance(isMobile && (hasLimitedMemory || hasSlowConnection || hasLimitedCPU));
    };

    checkDevicePerformance();
  }, []);

  // Detectar preferência de movimento reduzido
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Carregar componentes com delay otimizado
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enableAnimations && !isLowPerformance && !isReducedMotion) {
        setIsVisible(true);
      } else {
        // Carregar imediatamente em dispositivos de baixa performance
        setIsVisible(true);
      }
    }, isLowPerformance ? 0 : delay);

    return () => clearTimeout(timer);
  }, [delay, enableAnimations, isLowPerformance, isReducedMotion]);

  // Intersection Observer para carregar componentes pesados
  const observeElement = useCallback((elementId: string) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { 
        threshold, 
        rootMargin,
        // Desabilitar em dispositivos de baixa performance
        ...(isLowPerformance && { threshold: 0 })
      }
    );

    const target = document.getElementById(elementId);
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, isLowPerformance]);

  // Função para otimizar animações baseada no dispositivo
  const getOptimizedAnimationClass = useCallback((baseClass: string) => {
    if (isLowPerformance || isReducedMotion) {
      return ''; // Sem animações em dispositivos de baixa performance
    }
    return baseClass;
  }, [isLowPerformance, isReducedMotion]);

  // Função para otimizar transições
  const getOptimizedTransitionClass = useCallback(() => {
    if (isLowPerformance || isReducedMotion) {
      return ''; // Sem transições em dispositivos de baixa performance
    }
    return 'transition-optimized';
  }, [isLowPerformance, isReducedMotion]);

  return {
    isVisible,
    isIntersecting,
    isLowPerformance,
    isReducedMotion,
    observeElement,
    getOptimizedAnimationClass,
    getOptimizedTransitionClass
  };
}
