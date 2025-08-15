import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  rows = 4,
  maxLength,
  className = ''
}: FormTextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
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
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 border rounded-md text-sm transition-all duration-200 resize-none
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

        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {value.length}/{maxLength}
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
