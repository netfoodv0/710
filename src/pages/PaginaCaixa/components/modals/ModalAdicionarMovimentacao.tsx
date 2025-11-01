import React, { useState } from 'react';
import { ModalGlobal } from '../../../../components/modals/ModalGlobal';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/input';

interface ModalAdicionarMovimentacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (descricao: string, valor: number) => void;
  tipo: 'entrada' | 'saida';
}

export function ModalAdicionarMovimentacao({ 
  isOpen, 
  onClose, 
  onConfirm, 
  tipo 
}: ModalAdicionarMovimentacaoProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('R$ 0,00');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = parseFloat(numericValue) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };

  const parseCurrencyToNumber = (value: string) => {
    const numericValue = value.replace(/R\$\s?|\./g, '').replace(',', '.');
    return parseFloat(numericValue) || 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValor(formatCurrency(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao.trim()) {
      return;
    }

    setLoading(true);
    try {
      const valorNumerico = parseCurrencyToNumber(valor);
      await onConfirm(descricao, valorNumerico);
      
      // Reset form
      setDescricao('');
      setValor('R$ 0,00');
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar movimentação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDescricao('');
    setValor('R$ 0,00');
    onClose();
  };

  const titulo = tipo === 'entrada' ? 'Adicionar Entrada' : 'Adicionar Saída';

  const footer = (
    <div className="flex gap-3 justify-end">
      <Button
        type="button"
        variant="default"
        onClick={handleClose}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="default"
        onClick={handleSubmit}
        disabled={loading || !descricao.trim()}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {loading ? 'Adicionando...' : 'Adicionar'}
      </Button>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title={titulo}
      size="sm"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Input
            id="descricao"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição"
            required
          />
        </div>

        <div>
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-2">
            Valor
          </label>
          <Input
            id="valor"
            type="text"
            value={valor}
            onChange={handleInputChange}
            placeholder="R$ 0,00"
            required
          />
        </div>
      </form>
    </ModalGlobal>
  );
}


