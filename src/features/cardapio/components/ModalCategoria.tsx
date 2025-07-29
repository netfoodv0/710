import React, { useState, useEffect } from 'react';
import { X, Save, Edit, Copy, Trash2, Clock, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria, DiaSemana } from '../../types';
import { useNotifications } from '../../hooks/useNotifications';

interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria | CategoriaAdicional;
  onSave: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
  onUpdateStatus?: (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => Promise<void>;
  onUpdateDisponibilidade?: (id: string, disponibilidade: DisponibilidadeCategoria) => Promise<void>;
  loading?: boolean;
  tipo?: 'produtos' | 'adicionais';
}

const DIAS_SEMANA: DiaSemana[] = [
  { id: 0, nome: 'Domingo', ativo: false },
  { id: 1, nome: 'Segunda', ativo: false },
  { id: 2, nome: 'Terça', ativo: false },
  { id: 3, nome: 'Quarta', ativo: false },
  { id: 4, nome: 'Quinta', ativo: false },
  { id: 5, nome: 'Sexta', ativo: false },
  { id: 6, nome: 'Sábado', ativo: false }
];

export const ModalCategoria: React.FC<ModalCategoriaProps> = ({
  isOpen,
  onClose,
  categoria,
  onSave,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdateStatus,
  onUpdateDisponibilidade,
  loading = false,
  tipo = 'produtos'
}) => {
  const { showError } = useNotifications();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'padrao' as 'padrao' | 'pizza' | 'obrigatorio',
    tipoSelecao: 'unica' as 'unica' | 'multipla' | 'somavel',
    quantidadeMinima: 0,
    quantidadeMaxima: 0,
    status: 'ativo' as Categoria['status'] | CategoriaAdicional['status']
  });

  const [showDisponibilidade, setShowDisponibilidade] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeCategoria>({
    id: '',
    categoriaId: '',
    diasSemana: [...DIAS_SEMANA],
    horarioInicio: '08:00',
    horarioFim: '22:00',
    ativo: true
  });

  const isEditing = !!categoria;

  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome,
        descricao: categoria.descricao || '',
        tipo: 'tipo' in categoria ? categoria.tipo : 'padrao',
        tipoSelecao: 'tipoSelecao' in categoria ? categoria.tipoSelecao : 'unica',
        quantidadeMinima: 'quantidadeMinima' in categoria ? categoria.quantidadeMinima || 0 : 0,
        quantidadeMaxima: 'quantidadeMaxima' in categoria ? categoria.quantidadeMaxima || 0 : 0,
        status: categoria.status
      });

      if (categoria.disponibilidade) {
        setDisponibilidade(categoria.disponibilidade);
      }
    } else {
      setFormData({
        nome: '',
        descricao: '',
        tipo: 'padrao',
        tipoSelecao: 'unica',
        quantidadeMinima: 0,
        quantidadeMaxima: 0,
        status: 'ativo'
      });
      setDisponibilidade({
        id: '',
        categoriaId: '',
        diasSemana: [...DIAS_SEMANA],
        horarioInicio: '08:00',
        horarioFim: '22:00',
        ativo: true
      });
    }
  }, [categoria]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nome: '',
        descricao: '',
        tipo: 'padrao',
        tipoSelecao: 'unica',
        quantidadeMinima: 0,
        quantidadeMaxima: 0,
        status: 'ativo'
      });
      setDisponibilidade({
        id: '',
        categoriaId: '',
        diasSemana: [...DIAS_SEMANA],
        horarioInicio: '08:00',
        horarioFim: '22:00',
        ativo: true
      });
      setShowDisponibilidade(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação para categorias de adicionais com tipo múltipla ou somável
    if (tipo === 'adicionais' && (formData.tipoSelecao === 'multipla' || formData.tipoSelecao === 'somavel')) {
      if (formData.quantidadeMinima <= 0) {
        showError('A quantidade mínima deve ser maior que zero para opções múltiplas ou somáveis.');
        return;
      }
      if (formData.quantidadeMaxima < formData.quantidadeMinima) {
        showError('A quantidade máxima deve ser maior ou igual à quantidade mínima.');
        return;
      }
    }
    
    if (isEditing && onEdit) {
      await onEdit(categoria!.id, formData);
    } else {
      await onSave(formData);
    }
    
    onClose();
  };

  const handleDelete = async () => {
    if (categoria && onDelete) {
      await onDelete(categoria.id);
      onClose();
    }
  };

  const handleDuplicate = async () => {
    if (categoria && onDuplicate) {
      await onDuplicate(categoria.id);
      onClose();
    }
  };

  const handleStatusChange = async (status: Categoria['status']) => {
    if (categoria && onUpdateStatus) {
      await onUpdateStatus(categoria.id, status);
    }
  };

  const handleSaveDisponibilidade = async () => {
    if (categoria && onUpdateDisponibilidade) {
      await onUpdateDisponibilidade(categoria.id, disponibilidade);
    }
    setShowDisponibilidade(false);
  };

  const toggleDiaSemana = (diaId: number) => {
    setDisponibilidade(prev => ({
      ...prev,
      diasSemana: prev.diasSemana.map(dia => 
        dia.id === diaId ? { ...dia, ativo: !dia.ativo } : dia
      )
    }));
  };

  const getStatusIcon = (status: Categoria['status']) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'inativo':
        return <XCircle size={16} className="text-gray-400" />;
      case 'em_falta':
        return <AlertCircle size={16} className="text-orange-500" />;
      default:
        return null;
    }
  };

  const getTipoSelecaoDescription = (tipo: 'unica' | 'multipla' | 'somavel') => {
    switch (tipo) {
      case 'unica':
        return 'Cliente pode escolher apenas um item desta categoria';
      case 'multipla':
        return 'Cliente pode escolher um item de cada tipo desta categoria';
      case 'somavel':
        return 'Cliente pode escolher uma quantidade determinada de cada item';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Categoria *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Pizzas, Hambúrgueres, Bebidas..."
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição da categoria..."
                rows={3}
              />
            </div>

            {/* Tipo de Categoria - Para categorias de produtos */}
            {tipo === 'produtos' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Categoria *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'padrao' | 'pizza' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="padrao">Padrão</option>
                  <option value="pizza">Categoria de Pizza</option>
                </select>
              </div>
            )}

            {/* Tipo de Adicional - Para categorias de adicionais */}
            {tipo === 'adicionais' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Adicional *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'padrao' | 'obrigatorio' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="padrao">Padrão</option>
                  <option value="obrigatorio">Obrigatório</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.tipo === 'obrigatorio' 
                    ? 'O cliente será obrigado a escolher um item desta categoria no cardápio digital'
                    : 'O cliente pode escolher se quer ou não itens desta categoria'
                  }
                </p>
              </div>
            )}

            {/* Tipo de Seleção - Apenas para categorias de adicionais */}
            {tipo === 'adicionais' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Seleção *
                </label>
                <div className="space-y-3">
                  {(['unica', 'multipla', 'somavel'] as const).map((tipo) => (
                    <label key={tipo} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoSelecao"
                        value={tipo}
                        checked={formData.tipoSelecao === tipo}
                        onChange={() => setFormData(prev => ({ ...prev, tipoSelecao: tipo }))}
                        className="mt-1"
                        required
                      />
                      <div className="flex-1">
                        <div className="font-medium capitalize">
                          {tipo === 'unica' ? 'Opção Única' : tipo === 'multipla' ? 'Opção Múltipla' : 'Opção Somável'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {getTipoSelecaoDescription(tipo)}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantidade para Escolha - Apenas para opções múltipla ou somável */}
            {tipo === 'adicionais' && (formData.tipoSelecao === 'multipla' || formData.tipoSelecao === 'somavel') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade para Escolha
                </label>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">O cliente escolherá de</span>
                  <input
                    type="number"
                    value={formData.quantidadeMinima}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantidadeMinima: parseInt(e.target.value) || 0 }))}
                    className="w-20 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                  <span className="text-sm text-gray-600">até</span>
                  <input
                    type="number"
                    value={formData.quantidadeMaxima}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantidadeMaxima: parseInt(e.target.value) || 0 }))}
                    className="w-20 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                  <span className="text-sm text-gray-600">unidades</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.tipoSelecao === 'multipla' 
                    ? 'Quantidade de itens diferentes que o cliente pode escolher'
                    : 'Quantidade total de unidades que o cliente pode escolher'
                  }
                </p>
              </div>
            )}

            {/* Status (apenas para edição) */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['ativo', 'inativo', 'em_falta'] as const).map((status) => (
                    <label key={status} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={() => setFormData(prev => ({ ...prev, status }))}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {getStatusIcon(status)}
                        <span className="text-sm capitalize ml-2">
                          {status === 'em_falta' ? 'Em Falta' : status}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Disponibilidade */}
            {isEditing && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Disponibilidade</h3>
                  <button
                    type="button"
                    onClick={() => setShowDisponibilidade(!showDisponibilidade)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Clock size={16} className="mr-1" />
                    {showDisponibilidade ? 'Ocultar' : 'Configurar'}
                  </button>
                </div>

                {showDisponibilidade && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    {/* Dias da Semana */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dias da Semana
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {disponibilidade.diasSemana.map((dia) => (
                          <label key={dia.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={dia.ativo}
                              onChange={() => toggleDiaSemana(dia.id)}
                              className="mr-2"
                            />
                            <span className="text-sm">{dia.nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Horários */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horário de Início
                        </label>
                        <input
                          type="time"
                          value={disponibilidade.horarioInicio}
                          onChange={(e) => setDisponibilidade(prev => ({ ...prev, horarioInicio: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horário de Fim
                        </label>
                        <input
                          type="time"
                          value={disponibilidade.horarioFim}
                          onChange={(e) => setDisponibilidade(prev => ({ ...prev, horarioFim: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveDisponibilidade}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Salvar Disponibilidade
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={16} className="mr-1" />
                Excluir
              </button>
            )}
            {isEditing && onDuplicate && (
              <button
                type="button"
                onClick={handleDuplicate}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Copy size={16} className="mr-1" />
                Duplicar
              </button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !formData.nome}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} className="mr-1" />
              {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 