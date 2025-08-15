import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputPersonalizadoProps {
  label?: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'password' | 'url' | 'search';
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  suffix?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled' | 'minimal';
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  pattern?: string;
  title?: string;
}

export const InputPersonalizado = forwardRef<HTMLInputElement, InputPersonalizadoProps>(
  ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    required = false,
    error,
    disabled = false,
    icon,
    suffix,
    maxLength,
    min,
    max,
    step,
    className = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    size = 'md',
    variant = 'default',
    autoComplete,
    autoFocus = false,
    readOnly = false,
    pattern,
    title
  }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
      onChange(newValue);
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
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-purple-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            pattern={pattern}
            title={title}
            className={cn(
              'w-full border rounded-lg text-sm transition-all duration-200 ease-in-out',
              'focus:outline-none',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              'readonly:bg-gray-50 readonly:cursor-default',
              icon ? `pl-10` : '',
              suffix ? 'pr-12' : '',
              sizeClasses[size],
              variantClasses[variant],
              error 
                ? 'border-red-300 focus:border-red-500' 
                : '',
              !error && !disabled && 'hover:border-gray-400',
              inputClassName
            )}
          />

          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              {suffix}
            </div>
          )}

          {/* Indicador de foco removido */}
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
    );
  }
);

InputPersonalizado.displayName = 'InputPersonalizado';
