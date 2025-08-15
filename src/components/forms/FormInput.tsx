import React from 'react';
import { colors } from '../../styles/designTokens';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'password' | 'url';
  value: string | number;
  onChange: (value: string | number) => void;
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
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
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
  className = ''
}: FormInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          className={`
            w-full h-10 px-4 border rounded-md text-sm transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${suffix ? 'pr-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-purple-500'
            }
            ${disabled 
              ? 'bg-gray-50 cursor-not-allowed' 
              : 'bg-white hover:border-gray-400'
            }
            focus:outline-none
          `}
        />

        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </div>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
