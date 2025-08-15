/**
 * GoogleFloatingSelect - Componente de select com label flutuante inspirado no Material Design
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <GoogleFloatingSelect
 *   label="Categoria"
 *   value={categoria}
 *   onChange={(value) => setCategoria(value)}
 *   options={[
 *     { value: '1', label: 'Bebidas' },
 *     { value: '2', label: 'Comidas' }
 *   ]}
 * />
 * 
 * // Com validação e erro
 * <GoogleFloatingSelect
 *   label="Categoria *"
 *   value={categoria}
 *   onChange={(value) => setCategoria(value)}
 *   error="Categoria é obrigatória"
 *   required
 * />
 * ```
 */
import React, { useState, useRef, forwardRef, useCallback, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface GoogleFloatingSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  className?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined' | 'filled';
  onChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const GoogleFloatingSelect = forwardRef<HTMLSelectElement, GoogleFloatingSelectProps>(
  ({ 
    label, 
    className, 
    onFocus, 
    onBlur, 
    onChange, 
    value, 
    error,
    helperText,
    variant = 'default',
    id,
    options,
    placeholder = "Selecione uma opção",
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);

    // Verificar se há valor selecionado
    useEffect(() => {
      const hasSelectedValue = value && value.toString().length > 0 && value !== '';
      setHasValue(hasSelectedValue);
    }, [value]);

    // Memoização dos handlers para evitar re-renders desnecessários
    const handleFocus = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setHasValue(newValue.length > 0 && newValue !== '');
      onChange?.(newValue, e);
    }, [onChange]);

    // Memoização do estado do label flutuante - Corrigida para só ativar quando há valor válido
    const isLabelFloating = useMemo(() => {
      const hasValidValue = value && value.toString().length > 0 && value !== '';
      return isFocused || hasValidValue;
    }, [isFocused, value]);

    // Memoização das classes para melhor performance
    const baseSelectClasses = useMemo(() => 
      "w-full h-10 px-4 text-base bg-transparent outline-none transition-all duration-500 ease-out appearance-none",
      []
    );
    
    const variantClasses = useMemo(() => ({
      default: "border border-gray-300 rounded-lg focus:border-blue-500",
      outlined: "border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      filled: "border-b-2 border-gray-300 bg-gray-50 rounded-t-lg focus:border-b-blue-700 focus:bg-white"
    }), []);

    const labelClasses = useMemo(() => ({
      default: "absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 transition-all duration-400 ease-out pointer-events-none",
      outlined: "absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 transition-all duration-400 ease-out pointer-events-none",
      filled: "absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 transition-all duration-400 ease-out pointer-events-none"
    }), []);

    const floatingLabelClasses = useMemo(() => ({
      default: "absolute left-3 top-0 text-sm text-blue-600 bg-white px-1 font-medium transition-all duration-400 ease-out",
      outlined: "absolute left-3 top-0 text-sm text-blue-600 bg-white px-1 font-medium transition-all duration-400 ease-out",
      filled: "absolute left-3 top-0 text-sm text-blue-600 bg-white px-1 font-medium transition-all duration-400 ease-out"
    }), []);

    // Geração de ID único se não fornecido
    const selectId = useMemo(() => id || `google-floating-select-${Math.random().toString(36).substr(2, 9)}`, [id]);

    return (
      <div className={cn("relative", className)}>
        <select
          ref={ref || selectRef}
          id={selectId}
          className={cn(
            baseSelectClasses,
            variantClasses[variant],
            error && "border-red-500 focus:border-red-500",
            "placeholder-transparent"
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error || helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <label
          htmlFor={selectId}
          className={cn(
            labelClasses[variant],
            isFocused && "text-blue-600",
            error && "text-red-500",
            isLabelFloating && floatingLabelClasses[variant],
            isLabelFloating && error && "text-red-500"
          )}
        >
          {label}
        </label>

        {/* Ícone de seta para baixo */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>

        {/* Texto de erro ou helper com acessibilidade */}
        {(error || helperText) && (
          <div 
            id={`${selectId}-helper`}
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

GoogleFloatingSelect.displayName = "GoogleFloatingSelect"; 