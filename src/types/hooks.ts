// Tipos para hooks customizados

// Tipos para hooks de estado
export interface UseStateReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  reset: () => void;
}

// Tipos para hooks de API
export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// Tipos para hooks de formulário
export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  setValue: (field: keyof T, value: any) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
  reset: () => void;
  isValid: boolean;
  isDirty: boolean;
}

// Tipos para hooks de paginação
export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  reset: () => void;
}

// Tipos para hooks de filtros
export interface UseFilterReturn<T> {
  filteredData: T[];
  filters: Record<string, any>;
  searchTerm: string;
  updateFilter: (field: string, value: any) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  reset: () => void;
}

// Tipos para hooks de ordenação
export interface UseSortReturn<T> {
  sortedData: T[];
  sortBy: keyof T | null;
  sortDirection: 'asc' | 'desc';
  sort: (field: keyof T) => void;
  reset: () => void;
}

// Tipos para hooks de cache
export interface UseCacheReturn<T> {
  data: T | null;
  setData: (data: T) => void;
  clear: () => void;
  isExpired: boolean;
  expiresAt: number;
}

// Tipos para hooks de debounce
export interface UseDebounceReturn<T> {
  value: T;
  debouncedValue: T;
  setValue: (value: T) => void;
}

// Tipos para hooks de throttle
export interface UseThrottleReturn<T> {
  value: T;
  throttledValue: T;
  setValue: (value: T) => void;
}

// Tipos para hooks de local storage
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  remove: () => void;
}

// Tipos para hooks de session storage
export interface UseSessionStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  remove: () => void;
}

// Tipos para hooks de media queries
export interface UseMediaQueryReturn {
  matches: boolean;
  mediaQuery: string;
}

// Tipos para hooks de scroll
export interface UseScrollReturn {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollVelocity: number;
}

// Tipos para hooks de resize
export interface UseResizeReturn {
  width: number;
  height: number;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

// Tipos para hooks de click outside
export interface UseClickOutsideReturn {
  ref: React.RefObject<HTMLElement>;
  isOutside: boolean;
}

// Tipos para hooks de hover
export interface UseHoverReturn {
  ref: React.RefObject<HTMLElement>;
  isHovered: boolean;
}

// Tipos para hooks de focus
export interface UseFocusReturn {
  ref: React.RefObject<HTMLElement>;
  isFocused: boolean;
  focus: () => void;
  blur: () => void;
}

// Tipos para hooks de keyboard
export interface UseKeyboardReturn {
  key: string | null;
  keyCode: number | null;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

// Tipos para hooks de clipboard
export interface UseClipboardReturn {
  value: string;
  copy: (text: string) => Promise<void>;
  copied: boolean;
}

// Tipos para hooks de geolocation
export interface UseGeolocationReturn {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

// Tipos para hooks de network
export interface UseNetworkReturn {
  online: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | null;
  downlink: number | null;
  rtt: number | null;
}

// Tipos para hooks de online/offline
export interface UseOnlineReturn {
  online: boolean;
  offlineAt: Date | null;
}

// Tipos para hooks de visibility
export interface UseVisibilityReturn {
  visible: boolean;
  hidden: boolean;
}

// Tipos para hooks de fullscreen
export interface UseFullscreenReturn {
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
}

// Tipos para hooks de lock
export interface UseLockReturn {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
}
