/**
 * GoogleFloatingInput - Componente de input com label flutuante inspirado no Material Design
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <GoogleFloatingInput
 *   label="Nome completo"
 *   value={name}
 *   onChange={(value) => setName(value)}
 * />
 * 
 * // Com validação e erro (sempre filled)
 * <GoogleFloatingInput
 *   label="Email"
 *   value={email}
 *   onChange={(value) => setEmail(value)}
 *   error="Email inválido"
 * />
 * 
 * // Com texto de ajuda (sempre filled)
 * <GoogleFloatingInput
 *   label="Senha"
 *   type="password"
 *   helperText="Mínimo 8 caracteres"
 * />
 * 
 * // Como textarea
 * <GoogleFloatingInput
 *   label="Descrição"
 *   value={description}
 *   onChange={(value) => setDescription(value)}
 *   as="textarea"
 *   rows={4}
 * />
 * ```
 */
import React, { useState, useRef, forwardRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface BaseGoogleFloatingInputProps {
  label: string;
  className?: string;
  error?: string;
  helperText?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
  rows?: number;
}

interface GoogleFloatingInputProps extends BaseGoogleFloatingInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  as?: 'input';
}

interface GoogleFloatingTextareaProps extends BaseGoogleFloatingInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  as: 'textarea';
}

type GoogleFloatingInputComponentProps = GoogleFloatingInputProps | GoogleFloatingTextareaProps;

export const GoogleFloatingInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, GoogleFloatingInputComponentProps>(
  ({ 
    label, 
    className, 
    onFocus, 
    onBlur, 
    onChange, 
    value, 
    error,
    helperText,
    id,
    as = 'input',
    rows = 3,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Memoização dos handlers para evitar re-renders desnecessários
    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e as any);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e as any);
    }, [onBlur]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setHasValue(newValue.length > 0);
      onChange?.(newValue, e);
    }, [onChange]);

    // Memoização do estado do label flutuante
    const isLabelFloating = useMemo(() => 
      isFocused || hasValue || (value && value.toString().length > 0),
      [isFocused, hasValue, value]
    );

    // Memoização das classes para melhor performance
    const baseInputClasses = useMemo(() => 
      as === 'textarea' 
        ? "w-full px-4 py-3 text-base bg-transparent outline-none transition-all duration-500 ease-out resize-none"
        : "w-full h-10 px-4 text-base bg-transparent outline-none transition-all duration-500 ease-out",
      [as]
    );
    
    const filledInputClasses = useMemo(() => (
      "border-b-2 border-gray-300 bg-gray-50 rounded-t-lg focus:border-b-purple-700 focus:bg-white"
    ), []);

    const baseLabelClasses = useMemo(() => (
      "absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 transition-all duration-400 ease-out pointer-events-none"
    ), []);

    const floatingLabelClasses = useMemo(() => (
      "absolute left-3 top-0 text-sm text-purple-600 bg-white px-1 font-medium transition-all duration-400 ease-out"
    ), []);

    // Geração de ID único se não fornecido
    const inputId = useMemo(() => id || `google-floating-input-${Math.random().toString(36).substr(2, 9)}`, [id]);

    return (
      <div className={cn("relative", className)}>
        {as === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={cn(
              baseInputClasses,
              filledInputClasses,
              error && "border-red-500 focus:border-red-500",
              "placeholder-transparent"
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error || helperText ? `${inputId}-helper` : undefined}
            rows={rows}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            className={cn(
              baseInputClasses,
              filledInputClasses,
              error && "border-red-500 focus:border-red-500",
              "placeholder-transparent"
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error || helperText ? `${inputId}-helper` : undefined}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        
        <label
          htmlFor={inputId}
          className={cn(
            baseLabelClasses,
            isFocused && "text-purple-600",
            error && "text-red-500",
            isLabelFloating && floatingLabelClasses,
            isLabelFloating && error && "text-red-500"
          )}
        >
          {label}
        </label>

        {/* Texto de erro ou helper com acessibilidade */}
        {(error || helperText) && (
          <div 
            id={`${inputId}-helper`}
            className={cn(
              "mt-1 text-xs",
              error ? "text-red-500" : "text-gray-500"
            )}
            role={error ? 'alert' : 'note'}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

GoogleFloatingInput.displayName = "GoogleFloatingInput"; 
