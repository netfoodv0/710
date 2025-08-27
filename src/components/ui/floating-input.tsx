import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, onFocus, onBlur, onChange, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue || (value && value.toString().length > 0);

    return (
      <div className="relative">
        <input
          ref={ref || inputRef}
          className={cn(
            "peer w-full h-12 px-3 py-4 text-base bg-transparent border border-slate-300 rounded-md outline-none transition-all duration-200",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            "placeholder-transparent",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          {...props}
        />
                 <label
           className={cn(
             "absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500 transition-all duration-200 pointer-events-none",
             "peer-focus:text-blue-500",
             isLabelFloating && "transform -translate-y-3.5 scale-75 text-blue-500 top-0"
           )}
         >
           {label}
         </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput"; 
