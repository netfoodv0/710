// Tipos relacionados a hooks

export interface UseStateReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
}

export interface UseEffectReturn {
  cleanup: () => void;
}

export interface UseCallbackReturn<T extends (...args: any[]) => any> {
  callback: T;
  dependencies: any[];
}

export interface UseMemoReturn<T> {
  value: T;
  dependencies: any[];
}

export interface UseRefReturn<T> {
  current: T;
}

export interface UseContextReturn<T> {
  value: T;
  provider: React.ComponentType<{ value: T; children: React.ReactNode }>;
}

export interface UseReducerReturn<State, Action> {
  state: State;
  dispatch: (action: Action) => void;
}

export interface UseQueryReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseMutationReturn<T, V> {
  mutate: (variables: V) => Promise<T>;
  loading: boolean;
  error: Error | null;
  data: T | undefined;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  setValue: (field: keyof T, value: any) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
  reset: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseSessionStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}