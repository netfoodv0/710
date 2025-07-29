export * from './pedidoUtils';
export * from './analytics';
export * from './cep';

/**
 * Utility function to conditionally join class names together
 * Alternative implementation without clsx dependency
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 