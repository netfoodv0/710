import React, { forwardRef } from 'react';
import { cn } from '../../utils';
import { Eye, EyeOff, Search } from 'lucide-react';

interface MobileInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  required = false,
  className,
  leftIcon,
  rightIcon,
  fullWidth = false
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const baseClasses = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-base';
  const stateClasses = {
    default: 'border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
    error: 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100',
    disabled: 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    return stateClasses.default;
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={cn('space-y-2', widthClass, className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            baseClasses,
            getStateClass(),
            leftIcon && 'pl-10',
            (rightIcon || type === 'password') && 'pr-10',
            'focus:outline-none'
          )}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        
        {rightIcon && type !== 'password' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

MobileInput.displayName = 'MobileInput'; 