import React from 'react';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Selecione uma opção',
  required = false,
  error,
  disabled = false,
  className = ''
}: FormSelectProps) {
  // Converter as opções para o formato do CustomDropdown
  const dropdownOptions: DropdownOption[] = options.map(option => ({
    value: option.value,
    label: option.label,
    disabled: option.disabled
  }));

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <CustomDropdown
        options={dropdownOptions}
        selectedValue={value}
        onValueChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'ring-0.5 ring-red-300 border-red-300' : ''}
      />

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
