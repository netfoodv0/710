import React, { forwardRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

// CSS para os spinners
const spinnerStyles = `
  /* Remove as setas padrão do input type="number" */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
  
  .custom-spinner {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 1;
  }
  
  .spinner-btn {
    width: 16px;
    height: 16px;
    background: #f3e8ff;
    border: 1px solid #e9d5ff;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 2;
  }
  
  .spinner-btn:hover {
    background: #e9d5ff;
    border-color: #c084fc;
  }
  
  .spinner-btn svg {
    width: 10px;
    height: 10px;
    color: #a855f7;
  }
  
  .spinner-btn:disabled {
    background: #f3f4f6;
    border-color: #d1d5db;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Estilo para a caixa de unidade */
  .unit-box {
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    height: 40px;
  }
`;

interface InputPersonalizadoQuantidadeProps {
  label?: string;
  name: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled' | 'minimal';
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
}

export const InputPersonalizadoQuantidade = forwardRef<HTMLInputElement, InputPersonalizadoQuantidadeProps>(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    disabled = false,
    className = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    size = 'md',
    variant = 'default',
    min,
    max,
    step = 1,
    suffix,
    icon,
    autoComplete,
    autoFocus = false,
    readOnly = false
  }, ref) => {
    
    const handleIncrement = () => {
      if (readOnly) return;
      const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      if (readOnly) return;
      const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        onChange(newValue);
      }
    };

    const sizeClasses = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-sm px-4',
      lg: 'h-12 text-base px-4'
    };

    const variantClasses = {
      default: 'border-gray-300 bg-white focus:border-purple-500',
      outlined: 'border-2 border-gray-300 bg-transparent focus:border-purple-500',
      filled: 'border-gray-300 bg-gray-50 focus:border-purple-500',
      minimal: 'border-b-2 border-gray-300 bg-transparent focus:border-purple-500 rounded-none'
    };

    return (
      <>
        <style>{spinnerStyles}</style>
        <div className={cn('flex flex-col space-y-2', className)}>
          {label && (
            <label
              htmlFor={name}
              className={cn(
                'text-sm font-medium text-gray-700 flex items-center gap-1 transition-colors',
                disabled && 'text-gray-400',
                labelClassName
              )}
            >
              {icon && <span className="flex-shrink-0">{icon}</span>}
              {label}
              {required && <span className="text-red-500 font-bold">*</span>}
            </label>
          )}

        <div className="relative group">
          <input
            ref={ref}
            id={name}
            name={name}
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            min={min}
            max={max}
            step={step}
            className={cn(
              'w-full border rounded-md text-sm transition-all duration-200 ease-in-out',
              'focus:outline-none',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              'readonly:bg-gray-50 readonly:cursor-default',
              'pr-12', // Espaço para os spinners
              sizeClasses[size],
              variantClasses[variant],
              error 
                ? 'border-red-300 focus:border-red-500' 
                : '',
              !error && !disabled && 'hover:border-gray-400',
              inputClassName
            )}
          />
          
          {/* Spinners roxos personalizados */}
          <div className="custom-spinner">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || readOnly || (max !== undefined && (typeof value === 'string' ? parseFloat(value) || 0 : value) >= max)}
              className="spinner-btn"
              title="Aumentar"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || readOnly || (min !== undefined && (typeof value === 'string' ? parseFloat(value) || 0 : value) <= min)}
              className="spinner-btn"
              title="Diminuir"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Suffix (opcional) */}
          {suffix && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {suffix}
            </div>
          )}
        </div>

        {error && (
          <div className={cn(
            'flex items-center gap-2 text-sm text-red-500 animate-in slide-in-from-top-1',
            errorClassName
          )}>
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
      </>
    );
  }
);

InputPersonalizadoQuantidade.displayName = 'InputPersonalizadoQuantidade';


