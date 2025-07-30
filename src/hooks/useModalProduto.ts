import { useState, useEffect, useRef } from 'react';
import { Produto, ScoreQualidade } from '../types/produtos';

interface UseModalProdutoProps {
  isOpen: boolean;
  produto?: Produto;
  onClose: () => void;
  onSave: (data: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, data: Partial<Produto>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDuplicate?: (id: string) => Promise<void>;
}

export function useModalProduto({
  isOpen,
  produto,
  onClose,
  onSave,
  onEdit,
  onDelete,
  onDuplicate
}: UseModalProdutoProps) {
  const [activeTab, setActiveTab] = useState<'formulario' | 'preview' | 'score'>('formulario');
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [scoreQualidade, setScoreQualidade] = useState<ScoreQualidade | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isEditing = !!produto;

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    } else {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        categoria: '',
        categoriaId: '',
        ativo: true,
        status: 'ativo',
        tempoPreparoMinutos: 20,
        ingredientes: [],
        extras: [],
        tamanhoPorcao: 1,
        agendamentoObrigatorio: false,
        destacado: false,
        galeriaFotos: [],
        complementos: [],
        tags: [],
        vendasTotais: 0,
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
        sincronizadoComIfood: false
      });
    }
  }, [produto]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        categoria: '',
        categoriaId: '',
        ativo: true,
        status: 'ativo',
        tempoPreparoMinutos: 20,
        ingredientes: [],
        extras: [],
        tamanhoPorcao: 1,
        agendamentoObrigatorio: false,
        destacado: false,
        galeriaFotos: [],
        complementos: [],
        tags: [],
        vendasTotais: 0,
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
        sincronizadoComIfood: false
      });
      setScoreQualidade(null);
      setActiveTab('formulario');
    }
  }, [isOpen]);

  const handleSubmit = async (data: Partial<Produto>) => {
    if (isEditing && onEdit) {
      await onEdit(produto!.id, data);
    } else {
      await onSave(data as Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (produto && onDelete) {
      await onDelete(produto.id);
      onClose();
    }
  };

  const handleDuplicate = async () => {
    if (produto && onDuplicate) {
      await onDuplicate(produto.id);
      onClose();
    }
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    setFormData,
    scoreQualidade,
    setScoreQualidade,
    formRef,
    isEditing,
    handleSubmit,
    handleDelete,
    handleDuplicate,
    handleFormSubmit
  };
} 