import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { cn } from '../../utils';

interface MobileInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: string;
  success?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  onClear?: () => void;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(({
  label,
  placeholder,
  value = '',
  onChange,
  type = 'text',
  variant = 'default',
  size = 'md',
  disabled = false,
  error,
  success = false,
  required = false,
  icon,
  onClear,
  className,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseClasses = 'w-full rounded-2xl transition-all duration-200 font-medium';
  
  const variantClasses = {
    default: 'border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
    outlined: 'border-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
    filled: 'border-2 border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const stateClasses = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-100',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-100',
    disabled: 'bg-gray-100 text-gray-500 cursor-not-allowed'
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (success) return stateClasses.success;
    return '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
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
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            getStateClass(),
            icon && 'pl-12',
            (type === 'search' || onClear) && 'pr-12',
            type === 'password' && 'pr-12',
            'focus:outline-none',
            'touch-manipulation'
          )}
          {...props}
        />
        
        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        
        {/* Clear Button */}
        {((type === 'search' && value) || onClear) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* Search Icon */}
        {type === 'search' && !value && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
          Campo válido
        </p>
      )}
    </div>
  );
});

MobileInput.displayName = 'MobileInput'; 