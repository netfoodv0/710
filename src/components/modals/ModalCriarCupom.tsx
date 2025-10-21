import React, { useState } from 'react';
import { ModalGlobal } from './ModalGlobal';
import { FormInput } from '../forms/FormInput';
import { FormSelect } from '../forms/FormSelect';
import { FormTextarea } from '../forms/FormTextarea';
import { Button } from '../ui/Button';
import { Cupom } from '../../pages/PaginaCupons/types/cupons.types';
import { FirebaseCuponsService } from '../../services/firebase/cuponsService';
import { useNotificationContext } from '../../context/notificationContextUtils';

interface ModalCriarCupomProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (cupom: Cupom) => void;
}

interface FormData {
  codigo: string;
  descricao: string;
  tipo: 'percentual' | 'valor_fixo' | 'brinde' | 'frete_gratis';
  valor: number;
  status: 'ativo' | 'inativo';
  categoria: string;
  dataExpiracao: string;
  usoMaximo: number;
  valorMinimo: number;
}

const tiposCupom = [
  { value: 'percentual', label: 'Percentual' },
  { value: 'valor_fixo', label: 'Valor Fixo' },
  { value: 'brinde', label: 'Brinde' },
  { value: 'frete_gratis', label: 'Frete Grátis' }
];

const statusOptions = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' }
];

const categorias = [
  'Desconto Fixo',
  'Desconto Percentual',
  'Frete Grátis',
  'Brinde'
];

export function ModalCriarCupom({ isOpen, onClose, onSuccess }: ModalCriarCupomProps) {
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    descricao: '',
    tipo: 'percentual',
    valor: 0,
    status: 'ativo',
    categoria: 'Desconto Percentual',
    dataExpiracao: '',
    usoMaximo: 100,
    valorMinimo: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const cuponsService = new FirebaseCuponsService();
  const { showError, showSuccess } = useNotificationContext();

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'Código é obrigatório';
    } else if (formData.codigo.length < 3) {
      newErrors.codigo = 'Código deve ter pelo menos 3 caracteres';
    } else if (formData.codigo.length > 20) {
      newErrors.codigo = 'Código deve ter no máximo 20 caracteres';
    } else if (!/^[A-Z0-9]+$/.test(formData.codigo.toUpperCase())) {
      newErrors.codigo = 'Código deve conter apenas letras e números';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (formData.valor < 0) {
      newErrors.valor = 'Valor não pode ser negativo';
    }

    if (formData.tipo === 'percentual' && formData.valor > 100) {
      newErrors.valor = 'Percentual não pode ser maior que 100%';
    }

    if (!formData.dataExpiracao) {
      newErrors.dataExpiracao = 'Data de expiração é obrigatória';
    } else {
      const dataExp = new Date(formData.dataExpiracao);
      const hoje = new Date();
      if (dataExp <= hoje) {
        newErrors.dataExpiracao = 'Data de expiração deve ser futura';
      }
    }

    if (formData.usoMaximo <= 0) {
      newErrors.usoMaximo = 'Uso máximo deve ser maior que zero';
    }

    if (formData.valorMinimo < 0) {
      newErrors.valorMinimo = 'Valor mínimo não pode ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Verificar se código já existe
      const codigoExiste = await cuponsService.verificarCodigoExistente(formData.codigo);
      if (codigoExiste) {
        setErrors({ codigo: 'Este código já está em uso' });
        showError('Este código de cupom já está em uso. Escolha outro código.');
        setIsSubmitting(false);
        return;
      }

      // Criar cupom
      const cupomId = await cuponsService.criarCupom({
        codigo: formData.codigo.toUpperCase(),
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: formData.valor,
        status: formData.status,
        categoria: formData.categoria,
        dataExpiracao: formData.dataExpiracao,
        usoMaximo: formData.usoMaximo,
        usosAtuais: 0,
        valorMinimo: formData.valorMinimo
      });

      // Criar objeto do cupom para atualização instantânea
      const cupomCriado: Cupom = {
        id: cupomId,
        codigo: formData.codigo.toUpperCase(),
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: formData.valor,
        status: formData.status,
        categoria: formData.categoria,
        dataCriacao: new Date().toISOString().split('T')[0],
        dataExpiracao: formData.dataExpiracao,
        usoMaximo: formData.usoMaximo,
        usosAtuais: 0,
        valorMinimo: formData.valorMinimo
      };

      // Chamar onSuccess imediatamente com o cupom criado
      if (typeof onSuccess === 'function') {
        onSuccess(cupomCriado);
      }
      showSuccess('Cupom criado com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Erro ao criar cupom:', error);
      showError('Erro ao criar cupom. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      codigo: '',
      descricao: '',
      tipo: 'percentual',
      valor: 0,
      status: 'ativo',
      categoria: 'Desconto Percentual',
      dataExpiracao: '',
      usoMaximo: 100,
      valorMinimo: 0
    });
    setErrors({});
    onClose();
  };

  const footer = (
    <div className="flex gap-3 justify-end">
      <Button
        variant="secondary"
        onClick={handleClose}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Criando...' : 'Criar Cupom'}
      </Button>
    </div>
  );

  return (
    <ModalGlobal
      isOpen={isOpen}
      onClose={handleClose}
      title="Criar Novo Cupom"
      size="lg"
      footer={footer}
      maxHeight="40rem"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Código do Cupom"
            value={formData.codigo}
            onChange={(value) => handleInputChange('codigo', (value as string).toUpperCase())}
            error={errors.codigo}
            placeholder="Ex: DESCONTO10"
            maxLength={20}
          />
          
          <FormSelect
            label="Tipo"
            value={formData.tipo}
            onChange={(value) => handleInputChange('tipo', value as FormData['tipo'])}
            options={tiposCupom}
            error={errors.tipo}
          />
        </div>

        <FormTextarea
          label="Descrição"
          value={formData.descricao}
          onChange={(value) => handleInputChange('descricao', value as string)}
          error={errors.descricao}
          placeholder="Descreva o cupom..."
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label={formData.tipo === 'percentual' ? 'Percentual (%)' : 'Valor (R$)'}
            type="number"
            value={formData.valor}
            onChange={(value) => handleInputChange('valor', typeof value === 'number' ? value : parseFloat(value as string) || 0)}
            error={errors.valor}
            min={0}
            max={formData.tipo === 'percentual' ? 100 : undefined}
            step={formData.tipo === 'percentual' ? 0.1 : 0.01}
          />

          <FormInput
            label="Valor Mínimo (R$)"
            type="number"
            value={formData.valorMinimo}
            onChange={(value) => handleInputChange('valorMinimo', typeof value === 'number' ? value : parseFloat(value as string) || 0)}
            error={errors.valorMinimo}
            min={0}
            step={0.01}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Status"
            value={formData.status}
            onChange={(value) => handleInputChange('status', value as FormData['status'])}
            options={statusOptions}
            error={errors.status}
          />

          <FormSelect
            label="Categoria"
            value={formData.categoria}
            onChange={(value) => handleInputChange('categoria', value as string)}
            options={categorias.map(cat => ({ value: cat, label: cat }))}
            error={errors.categoria}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Data de Expiração"
            type="date"
            value={formData.dataExpiracao}
            onChange={(value) => handleInputChange('dataExpiracao', value as string)}
            error={errors.dataExpiracao}
            min={new Date().toISOString().split('T')[0]}
          />

          <FormInput
            label="Uso Máximo"
            type="number"
            value={formData.usoMaximo}
            onChange={(value) => handleInputChange('usoMaximo', typeof value === 'number' ? value : parseInt(value as string) || 0)}
            error={errors.usoMaximo}
            min={1}
          />
        </div>
      </div>
    </ModalGlobal>
  );
}