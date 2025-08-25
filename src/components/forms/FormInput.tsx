import * as React from 'react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'datetime-local' | 'number' | 'select' | 'textarea' | 'password' | 'search';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg';
  required?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  validationMessage?: string;
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  options = [],
  rows = 4,
  className = '',
  fontSize = 'xs',
  required = false,
  disabled = false,
  variant = 'outlined',
  helperText,
  min,
  max,
  step,
  validationMessage
}: FormInputProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (onChange) {
      if (type === 'number') {
        onChange(parseFloat(e.target.value) || 0);
      } else {
        onChange(e.target.value);
      }
    }
  };

  const renderInput = () => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed";

    switch (type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${baseClasses} bg-white`}
          >
            <option value="">Selecione</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            rows={rows}
            className={`${baseClasses} bg-white resize-none`}
            placeholder={placeholder}
          />
        );
      
      case 'password':
        return (
          <input
            type="password"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${baseClasses} bg-white`}
            placeholder={placeholder}
          />
        );
      
      case 'search':
        return (
          <input
            type="search"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${baseClasses} bg-white`}
            placeholder={placeholder}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`${baseClasses} bg-white`}
            placeholder={placeholder}
          />
        );
      
      case 'datetime-local':
        return (
          <input
            type="datetime-local"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${baseClasses} bg-white`}
          />
        );
      
      default:
        return (
          <input
            type={type}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${baseClasses} bg-white`}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {helperText && (
        <p className="modal-error-message">{helperText}</p>
      )}
    </div>
  );
}
