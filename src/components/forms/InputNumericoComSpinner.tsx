import React, { forwardRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InputNumericoComSpinnerProps {
  label?: string;
  name: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const InputNumericoComSpinner = forwardRef<HTMLInputElement, InputNumericoComSpinnerProps>(
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
    min,
    max,
    step = 1
  }, ref) => {
    
    const handleIncrement = () => {
      const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        onChange(newValue);
      }
    };

    return (
      <div className={cn('flex flex-col space-y-2', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'text-sm font-medium text-gray-700 flex items-center gap-1 transition-colors',
              disabled && 'text-gray-400'
            )}
          >
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={cn(
              'w-full h-10 px-4 pr-12 border rounded-md text-sm transition-all duration-200 ease-in-out',
              'focus:outline-none focus:border-purple-500',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              error 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-300',
              !error && !disabled && 'hover:border-gray-400'
            )}
          />
          
          <div className="custom-spinner">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && (typeof value === 'string' ? parseFloat(value) || 0 : value) >= max)}
              className="spinner-btn"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && (typeof value === 'string' ? parseFloat(value) || 0 : value) <= min)}
              className="spinner-btn"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 animate-in slide-in-from-top-1">
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

InputNumericoComSpinner.displayName = 'InputNumericoComSpinner';





