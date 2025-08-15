import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface InputPersonalizadoPrecoProps {
  label?: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled' | 'minimal';
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export const InputPersonalizadoPreco = forwardRef<HTMLInputElement, InputPersonalizadoPrecoProps>(
  ({
    label,
    name,
    value,
    onChange,
    onBlur,
    placeholder = '0,00',
    required = false,
    error,
    disabled = false,
    className = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    size = 'md',
    variant = 'default',
    autoComplete,
    autoFocus = false,
    readOnly = false,
    min = 0,
    max,
    step = 0.01
  }, ref) => {
    
    // Estado interno para controlar o valor formatado
    const [displayValue, setDisplayValue] = useState<string>('');
    
    // Formatar valor para exibição (R$ 0,00)
    const formatarParaExibicao = (valor: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valor);
    };
    
    // Converter valor formatado para número
    const parsearValor = (valorFormatado: string): number => {
      // Remove R$, espaços e converte vírgula para ponto
      const valorLimpo = valorFormatado
        .replace(/[R$\s]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
      
      const numero = parseFloat(valorLimpo);
      return isNaN(numero) ? 0 : numero;
    };
    
    // Atualizar displayValue quando o value externo mudar
    useEffect(() => {
      setDisplayValue(formatarParaExibicao(value));
    }, [value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Se o input estiver vazio, definir como 0
      if (!inputValue.trim()) {
        setDisplayValue('R$ 0,00');
        onChange(0);
        return;
      }
      
      // Se o usuário digitou apenas números, formatar automaticamente
      if (/^\d+$/.test(inputValue.replace(/[R$\s,]/g, ''))) {
        const numero = parseFloat(inputValue.replace(/[R$\s,]/g, ''));
        const valorFormatado = formatarParaExibicao(numero / 100); // Dividir por 100 para centavos
        setDisplayValue(valorFormatado);
        onChange(numero / 100);
        return;
      }
      
      // Tentar parsear o valor formatado
      const numero = parsearValor(inputValue);
      setDisplayValue(inputValue);
      onChange(numero);
    };
    
    const handleBlur = () => {
      // Ao sair do campo, formatar corretamente
      const numero = parsearValor(displayValue);
      const valorFormatado = formatarParaExibicao(numero);
      setDisplayValue(valorFormatado);
      onChange(numero);
      
      if (onBlur) {
        onBlur();
      }
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Ao focar, selecionar todo o texto para facilitar edição
      e.target.select();
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permitir apenas números, vírgula, ponto, backspace, delete, setas
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Tab', 'Enter', 'Escape'
      ];
      
      const isNumber = /[\d,.]/.test(e.key);
      const isAllowedKey = allowedKeys.includes(e.key);
      
      if (!isNumber && !isAllowedKey) {
        e.preventDefault();
      }
    };

    const sizeClasses = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-sm px-4',
      lg: 'h-12 text-base px-4'
    };

    const variantClasses = {
      default: 'border-gray-300 bg-white focus:border-purple-500',
      outlined: 'border-2 border-gray-300 bg-transparent focus:border-purple-500',
      filled: 'border-gray-300 bg-gray-50 focus:border-purple-500',
      minimal: 'border-b-2 border-gray-300 bg-transparent focus:border-purple-500 rounded-none'
    };

    return (
      <div className={cn('flex flex-col space-y-2', className)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'text-sm font-medium text-gray-700 flex items-center gap-1 transition-colors',
              disabled && 'text-gray-400',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative group">
          <input
            ref={ref}
            id={name}
            name={name}
            type="text"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            min={min}
            max={max}
            step={step}
            className={cn(
              'w-full border rounded-md text-sm transition-all duration-200 ease-in-out',
              'focus:outline-none',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              'readonly:bg-gray-50 readonly:cursor-default',
              'text-left', // Alinhar texto à esquerda
              sizeClasses[size],
              variantClasses[variant],
              error 
                ? 'border-red-300 focus:border-red-500' 
                : '',
              !error && !disabled && 'hover:border-gray-400',
              inputClassName
            )}
          />
        </div>

        {error && (
          <div className={cn(
            'flex items-center gap-2 text-sm text-red-500 animate-in slide-in-from-top-1',
            errorClassName
          )}>
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

InputPersonalizadoPreco.displayName = 'InputPersonalizadoPreco';
