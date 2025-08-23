import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import { SaveIcon } from '../ui';
import { ModalCategoriaProps, CriarCategoriaData, PeriodoDisponibilidade } from '../../types/categoria';
import { FormularioDisponibilidade } from '../forms/FormularioDisponibilidade';
import { FormSwitch } from '../forms/FormSwitch';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

export function ModalCategoria({
  isOpen,
  onClose,
  categoria,
  onSave,
  onEdit
}: ModalCategoriaProps) {
  const [formData, setFormData] = useState<CriarCategoriaData>({
    nome: '',
    status: 'ativo',
    agendamentoPrevio: false,
    tempoExtraProducao: false,
    disponibilidade: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Resetar form quando modal abrir/fechar
  useEffect(() => {
    if (isOpen) {
      if (categoria) {
        setFormData({
          nome: categoria.nome,
          status: categoria.status,
          agendamentoPrevio: categoria.agendamentoPrevio,
          tempoExtraProducao: categoria.tempoExtraProducao,
          disponibilidade: categoria.disponibilidade
        });
      } else {
        setFormData({
          nome: '',
          status: 'ativo',
          agendamentoPrevio: false,
          tempoExtraProducao: false,
          disponibilidade: []
        });
      }
      setErrors({});
    }
  }, [isOpen, categoria]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome da categoria é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (categoria && onEdit) {
        await onEdit(categoria.id, formData);
      } else {
        await onSave(formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  const handleInputChange = (field: keyof CriarCategoriaData, value: any) => {
    // Garantir que disponibilidade seja sempre um array
    if (field === 'disponibilidade') {
      const valueSeguro = Array.isArray(value) ? value : [];
      setFormData(prev => ({ ...prev, [field]: valueSeguro }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDisponibilidadeChange = (periodos: PeriodoDisponibilidade[]) => {
    // Garantir que periodos seja sempre um array válido
    const periodosSeguros = periodos || [];
    handleInputChange('disponibilidade', periodosSeguros);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={true}
    >
      <ModalHeader showCloseButton={true} onClose={onClose}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <Tag className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {categoria ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            <p className="text-sm text-gray-500">
              {categoria ? 'Modifique os dados da categoria' : 'Crie uma nova categoria para seus produtos'}
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome da categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da categoria *
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Ex: Smashelândia burguer"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.nome ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.nome && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-red-600">{errors.nome}</span>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'ativo', label: 'Ativo', color: 'green' },
                { value: 'inativo', label: 'Inativo', color: 'gray' },
                { value: 'em_falta', label: 'Em falta', color: 'orange' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.status === option.value
                      ? `border-${option.color}-300 bg-${option.color}-50`
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formData.status === option.value}
                    onChange={(e) => handleInputChange('status', e.target.value as any)}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${
                    formData.status === option.value
                      ? `text-${option.color}-700`
                      : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Opções adicionais */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Agendamento prévio obrigatório</h4>
                <p className="text-xs text-gray-500">Clientes precisarão agendar antes de pedir</p>
              </div>
              <FormSwitch
                name="agendamentoPrevio"
                label=""
                checked={formData.agendamentoPrevio}
                onChange={(checked) => handleInputChange('agendamentoPrevio', checked)}
                className="mb-0"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Ative ou desative tempo extra para produção</h4>
                <p className="text-xs text-gray-500">Produtos desta categoria terão tempo extra de preparo</p>
              </div>
              <FormSwitch
                name="tempoExtraProducao"
                label=""
                checked={formData.tempoExtraProducao}
                onChange={(checked) => handleInputChange('tempoExtraProducao', checked)}
                className="mb-0"
              />
            </div>
          </div>

          {/* Disponibilidade */}
          <FormularioDisponibilidade
            periodos={formData.disponibilidade}
            onChange={handleDisponibilidadeChange}
          />

        </form>
      </ModalBody>

      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <SaveIcon size={24} color="#ffffff" />
          {categoria ? 'Salvar alterações' : 'Criar categoria'}
        </button>
      </ModalFooter>
    </Modal>
  );
}
