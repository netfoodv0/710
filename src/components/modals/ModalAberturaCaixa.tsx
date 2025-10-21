import React, { useState } from 'react';
import { ModalGlobal } from './ModalGlobal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCaixaService } from '../../hooks/useCaixaService';

interface ModalAberturaCaixaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (caixaId: string) => void;
}

export function ModalAberturaCaixa({ isOpen, onClose, onConfirm }: ModalAberturaCaixaProps) {
  const [saldoInicial, setSaldoInicial] = useState('');
  const { abrirCaixa, isLoading, error, clearError } = useCaixaService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!saldoInicial.trim()) {
      return;
    }

    try {
      clearError();
      
      const dados = {
        valorInicial: parseFloat(saldoInicial) || 0,
        observacoes: 'Caixa aberto com saldo inicial'
      };

      const caixaId = await abrirCaixa(dados);
      
      // Reset form
      setSaldoInicial('');
      
      // Callback opcional
      if (onConfirm) {
        onConfirm(caixaId);
      }
      
      onClose();
    } catch (error) {
      // Erro já é tratado pelo hook
      console.error('Erro ao abrir caixa:', error);
    }
  };

  const handleClose = () => {
    // Reset form ao fechar
    setSaldoInicial('');
    clearError();
    onClose();
  };

  const formatCurrency = (value: string) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para ter centavos
    const number = parseFloat(numericValue) / 100;
    
    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSaldoInicial(value);
  };

  const displayValue = saldoInicial ? formatCurrency(saldoInicial) : 'R$ 0,00';

  const footer = (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={!saldoInicial.trim() || isLoading}
        >
          {isLoading ? 'Abrindo...' : 'Abrir Caixa'}
        </Button>
      </div>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title="Abertura de Caixa"
      size="sm"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Defina o saldo inicial para abertura do caixa
          </p>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {displayValue}
              </div>
              <label htmlFor="saldoInicial" className="block text-sm font-medium text-gray-700 mb-2">
                Saldo Inicial
              </label>
              <Input
                id="saldoInicial"
                type="text"
                value={saldoInicial}
                onChange={handleInputChange}
                placeholder="0,00"
                className="text-center text-lg"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </ModalGlobal>
  );
}








