import { useState, useEffect } from 'react';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria, DiaSemana } from '../../../types';
import { useNotifications } from '../../../hooks/useNotifications';

const DIAS_SEMANA: DiaSemana[] = [
  { id: 0, nome: 'Domingo', ativo: false },
  { id: 1, nome: 'Segunda', ativo: false },
  { id: 2, nome: 'Terça', ativo: false },
  { id: 3, nome: 'Quarta', ativo: false },
  { id: 4, nome: 'Quinta', ativo: false },
  { id: 5, nome: 'Sexta', ativo: false },
  { id: 6, nome: 'Sábado', ativo: false }
];

interface UseModalCategoriaProps {
  categoria?: Categoria | CategoriaAdicional;
  isOpen: boolean;
  tipo: 'produtos' | 'adicionais';
  onSave: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
  onUpdateStatus?: (id: string, status: 'ativo' | 'inativo') => Promise<void>;
  onUpdateDisponibilidade?: (id: string, disponibilidade: DisponibilidadeCategoria) => Promise<void>;
  onClose: () => void;
}

export function useModalCategoria({
  categoria,
  isOpen,
  tipo,
  onSave,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdateStatus,
  onUpdateDisponibilidade,
  onClose
}: UseModalCategoriaProps) {
  const { showError } = useNotifications();
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'padrao' as 'padrao' | 'pizza' | 'obrigatorio',
    tipoSelecao: 'unica' as 'unica' | 'multipla' | 'somavel',
    quantidadeMinima: 0,
    quantidadeMaxima: 0,
    status: 'ativo' as 'ativo' | 'inativo'
  });

  const [showDisponibilidade, setShowDisponibilidade] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeCategoria>({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
    horarioInicio: '08:00',
    horarioFim: '22:00'
  });

  const isEditing = !!categoria;

  // Initialize form data when categoria changes
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
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
        horarioInicio: '08:00',
        horarioFim: '22:00'
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
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
        horarioInicio: '08:00',
        horarioFim: '22:00'
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
    
    // ✅ CORREÇÃO: Adicionar campos obrigatórios para categorias
    const categoriaData = {
      ...formData,
      ordem: 0, // Campo obrigatório para categorias
      ativa: true, // Campo obrigatório para categorias
      status: formData.status // Campo obrigatório para categorias
    };
    
    // ✅ CORREÇÃO: Adicionar campos específicos para categorias adicionais
    if (tipo === 'adicionais') {
      // Para categorias adicionais, usar status em vez de ativa
      delete categoriaData.ativa;
      categoriaData.status = formData.status;
      categoriaData.disponibilidade = disponibilidade;
      categoriaData.tipo = formData.tipo;
      categoriaData.tipoSelecao = formData.tipoSelecao;
      categoriaData.quantidadeMinima = formData.quantidadeMinima;
      categoriaData.quantidadeMaxima = formData.quantidadeMaxima;
    }
    
    if (isEditing && onEdit) {
      await onEdit(categoria!.id, categoriaData);
    } else {
      await onSave(categoriaData);
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

  const handleStatusChange = async (status: 'ativo' | 'inativo') => {
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

  return {
    formData,
    setFormData,
    disponibilidade,
    setDisponibilidade,
    showDisponibilidade,
    setShowDisponibilidade,
    isEditing,
    handleSubmit,
    handleDelete,
    handleDuplicate,
    handleStatusChange,
    handleSaveDisponibilidade
  };
} 