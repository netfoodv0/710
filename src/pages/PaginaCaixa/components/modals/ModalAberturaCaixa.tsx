import React, { useState } from 'react';
import { ModalGlobal } from '../../../../components/modals/ModalGlobal';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/input';
import { useCaixa } from '../../hooks';

interface ModalAberturaCaixaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (caixaId: string) => void;
}

export function ModalAberturaCaixa({ isOpen, onClose, onConfirm }: ModalAberturaCaixaProps) {
  const [saldoInicial, setSaldoInicial] = useState('R$ 0,00');
  const { abrirCaixa, loading, error, clearError } = useCaixa();

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

  const parseCurrencyToNumber = (value: string) => {
    // Remove "R$", espaços e vírgulas, mantém apenas números
    const numericValue = value.replace(/R\$\s?|\./g, '').replace(',', '.');
    return parseFloat(numericValue) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      clearError();
      
      const dados = {
        saldoInicial: parseCurrencyToNumber(saldoInicial),
        observacoes: 'Caixa aberto com saldo inicial'
      };

      const caixaId = await abrirCaixa(dados);
      
      // Reset form
      setSaldoInicial('R$ 0,00');
      
      // Callback
      onConfirm(caixaId);
    } catch (error) {
      console.error('Erro ao abrir caixa:', error);
    }
  };

  const handleClose = () => {
    // Reset form ao fechar
    setSaldoInicial('R$ 0,00');
    clearError();
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSaldoInicial(formatCurrency(value));
  };

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
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Abrindo...' : 'Abrir Caixa'}
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
              <label htmlFor="saldoInicial" className="block text-sm font-medium text-gray-700 mb-2">
                Saldo Inicial
              </label>
              <Input
                id="saldoInicial"
                type="text"
                value={saldoInicial}
                onChange={handleInputChange}
                className="text-left text-lg"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </ModalGlobal>
  );
}
