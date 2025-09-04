import React, { useState } from 'react';
import { FormInput } from '../forms/FormInput';

import { CustomDropdown, DropdownOption } from '../ui';
import { CustomModal } from './CustomModal';
import { CupomFormData } from '../../types/global/cupom';

interface ModalCriarCupomProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cupomData: CupomFormData) => void;
}

const tiposCupom: DropdownOption[] = [
  { value: 'fixo', label: 'Desconto Fixo (R$)' },
  { value: 'percentual', label: 'Desconto Percentual (%)' },
  { value: 'frete_gratis', label: 'Frete Grátis' },
  { value: 'brinde', label: 'Brinde' }
];

export function ModalCriarCupom({ isOpen, onClose, onSubmit }: ModalCriarCupomProps) {
  const [formData, setFormData] = useState<CupomFormData>({
    codigo: '',
    descricao: '',
    categoria: '',
    tipoDesconto: 'fixo',
    valorDesconto: 0,
    valorMinimo: 0,
    maximoUsos: 100,
    dataInicio: '',
    dataFim: '',
    ativo: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CupomFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (formData.tipoDesconto !== 'frete_gratis' && formData.tipoDesconto !== 'brinde') {
      if (formData.valorDesconto <= 0) {
        newErrors.valorDesconto = 'Valor do desconto deve ser maior que zero';
      }
    }

    if (formData.valorMinimo < 0) {
      newErrors.valorMinimo = 'Valor mínimo não pode ser negativo';
    }

    if (formData.maximoUsos <= 0) {
      newErrors.maximoUsos = 'Máximo de usos deve ser maior que zero';
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
    }

    if (!formData.dataFim) {
      newErrors.dataFim = 'Data de fim é obrigatória';
    }

    if (formData.dataInicio && formData.dataFim && new Date(formData.dataInicio) >= new Date(formData.dataFim)) {
      newErrors.dataFim = 'Data de fim deve ser posterior à data de início';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      codigo: '',
      descricao: '',
      categoria: '',
      tipoDesconto: 'fixo',
      valorDesconto: 0,
      valorMinimo: 0,
      maximoUsos: 100,
      dataInicio: '',
      dataFim: '',
      ativo: true
    });
    setErrors({});
    onClose();
  };

  const isDescontoValor = formData.tipoDesconto === 'fixo' || formData.tipoDesconto === 'percentual';

  const footerContent = (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={handleClose}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
      >
        CANCELAR
      </button>
      <button
        onClick={handleSubmit}
        disabled={!formData.codigo.trim() || !formData.descricao.trim()}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        SALVAR
      </button>
    </div>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Criar Novo Cupom"
      size="medium"
      footerContent={footerContent}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 pb-2">
            Informações Básicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Código do Cupom"
              type="text"
              value={formData.codigo}
              onChange={(value) => handleInputChange('codigo', value as string)}
              required
              helperText={errors.codigo}
            />
            
            <FormInput
              label="Descrição"
              type="text"
              value={formData.descricao}
              onChange={(value) => handleInputChange('descricao', value as string)}
              required
              helperText={errors.descricao}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cupom *
              </label>
              <CustomDropdown
                options={tiposCupom}
                selectedValue={formData.tipoDesconto}
                onValueChange={(value) => {
                  handleInputChange('tipoDesconto', value as any);
                  // Definir categoria automaticamente baseada no tipo
                  const categoriaMap: Record<string, string> = {
                    'fixo': 'Desconto Fixo',
                    'percentual': 'Desconto Percentual',
                    'frete_gratis': 'Frete Grátis',
                    'brinde': 'Brinde'
                  };
                  handleInputChange('categoria', categoriaMap[value] || '');
                }}
                placeholder="Selecione o tipo de cupom"
                size="md"
              />
              {errors.categoria && (
                <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>
              )}
            </div>
          </div>
        </div>

        {/* Configuração do Desconto */}
        {isDescontoValor && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 pb-2">
              Configuração do Desconto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={formData.tipoDesconto === 'fixo' ? 'Valor do Desconto (R$)' : 'Percentual (%)'}
                type="number"
                value={formData.valorDesconto}
                onChange={(value) => handleInputChange('valorDesconto', typeof value === 'number' ? value : parseFloat(value) || 0)}
                required
                min={0}
                step={formData.tipoDesconto === 'fixo' ? 0.01 : 1}
                helperText={errors.valorDesconto}
              />
              
              <FormInput
                label="Valor Mínimo do Pedido (R$)"
                type="number"
                value={formData.valorMinimo}
                onChange={(value) => handleInputChange('valorMinimo', typeof value === 'number' ? value : parseFloat(value) || 0)}
                min={0}
                step={0.01}
                helperText={errors.valorMinimo}
              />
            </div>
          </div>
        )}

        {/* Configurações de Uso */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 pb-2">
            Configurações de Uso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Máximo de Usos"
              type="number"
              value={formData.maximoUsos}
              onChange={(value) => handleInputChange('maximoUsos', typeof value === 'number' ? value : parseInt(value) || 1)}
              required
              min={1}
              helperText={errors.maximoUsos}
            />
            
            <div className="flex items-center space-x-3 mt-8">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={(e) => handleInputChange('ativo', e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="ativo" className="text-sm font-medium text-gray-700">
                Cupom ativo
              </label>
            </div>
          </div>
        </div>

        {/* Período de Validade */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 pb-2">
            Período de Validade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Data de Início"
              type="datetime-local"
              value={formData.dataInicio}
              onChange={(value) => handleInputChange('dataInicio', String(value))}
              required
              helperText={errors.dataInicio}
            />
            
            <FormInput
              label="Data de Fim"
              type="datetime-local"
              value={formData.dataFim}
              onChange={(value) => handleInputChange('dataFim', String(value))}
              required
              helperText={errors.dataFim}
            />
          </div>
        </div>
      </form>
    </CustomModal>
  );
}
