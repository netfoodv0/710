import React from 'react';

interface FormSwitchProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSwitch({
  label,
  name,
  checked,
  onChange,
  description,
  disabled = false,
  className = ''
}: FormSwitchProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          id={name}
          onClick={handleChange}
          disabled={disabled}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 flex-shrink-0
            ${checked 
              ? 'bg-purple-600' 
              : 'bg-gray-300'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-opacity-80'
            }
            focus:outline-none
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
              ${checked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>

        <div className="flex flex-col">
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <span className="text-xs text-gray-500 mt-1">{description}</span>
          )}
        </div>
      </div>
    </div>
  );
}
