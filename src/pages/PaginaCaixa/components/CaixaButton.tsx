import React from 'react';
import { CreditCard } from 'lucide-react';
import { useCaixaModals } from '../context/CaixaModalsContext';
import { useCaixa } from '../hooks';

interface CaixaButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

export function CaixaButton({ 
  className = '', 
  size = 'md', 
  variant = 'primary' 
}: CaixaButtonProps) {
  const { openModalCaixaFechado, openModalCaixaAbertoDetalhes } = useCaixaModals();
  const { caixaAtual } = useCaixa();

  const handleClick = () => {
    if (caixaAtual) {
      openModalCaixaAbertoDetalhes();
    } else {
      openModalCaixaFechado();
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-red-600 text-red-600 hover:bg-red-50'
  };

  const baseClasses = 'inline-flex items-center gap-2 font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      title="Abrir Caixa - Gerenciar operações de caixa"
    >
      <CreditCard className="w-4 h-4" />
      Caixa
    </button>
  );
}
