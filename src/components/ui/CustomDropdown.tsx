import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerIcon?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function CustomDropdown({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Selecione uma opção',
  className = '',
  triggerIcon,
  disabled = false,
  size = 'md'
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs h-10',
    md: 'px-3 py-2 text-sm h-10',
    lg: 'px-4 py-2 text-base h-10'
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 w-full text-left font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-0.5 focus:ring-purple-400 focus:border-purple-400 transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${sizeClasses[size]} rounded-md`}
      >
        {triggerIcon && <span className="flex-shrink-0">{triggerIcon}</span>}
        <span className="flex-1 truncate">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ease-in-out flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className={`absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[8rem] transition-opacity duration-200 ease-in-out ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => !option.disabled && handleOptionClick(option.value)}
              disabled={option.disabled}
              className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                option.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : selectedValue === option.value
                  ? 'bg-blue-50 text-blue-700 font-medium hover:bg-blue-100'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
              <span className="flex-1">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 