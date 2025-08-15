import { useState, useEffect } from 'react';
import { Cupom, CupomFormData, CupomValidacao } from '../types/cupons';
import { useNotificationContext } from '../context/notificationContextUtils';

interface UseModalCupomProps {
  cupom?: Cupom;
  isOpen: boolean;
  onSave: (cupom: Omit<Cupom, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit?: (id: string, cupom: Partial<Cupom>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onClose: () => void;
}

export function useModalCupom({
  cupom,
  isOpen,
  onSave,
  onEdit,
  onDelete,
  onClose
}: UseModalCupomProps) {
  const { showSuccess, showError } = useNotificationContext();
  const isEditing = !!cupom;

  const [formData, setFormData] = useState<CupomFormData>({
    codigo: '',
    descricao: '',
    tipo: 'desconto_percentual',
    valor: 0,
    valorMinimoPedido: 0,
    dataInicio: '',
    dataFim: '',
    limiteUsos: 0,
    ativo: true
  });

  const [validacao, setValidacao] = useState<CupomValidacao>({
    codigo: '',
    descricao: '',
    valor: '',
    dataInicio: '',
    dataFim: '',
    limiteUsos: ''
  });

  // Reset form when modal opens/closes or cupom changes
  useEffect(() => {
    if (isOpen) {
      if (cupom) {
        // Editing mode - populate form with cupom data
        setFormData({
          codigo: cupom.codigo,
          descricao: cupom.descricao,
          tipo: cupom.tipo,
          valor: cupom.valor,
          valorMinimoPedido: cupom.valorMinimoPedido || 0,
          dataInicio: cupom.dataInicio instanceof Date 
            ? cupom.dataInicio.toISOString().split('T')[0]
            : cupom.dataInicio.toString().split('T')[0],
          dataFim: cupom.dataFim instanceof Date 
            ? cupom.dataFim.toISOString().split('T')[0]
            : cupom.dataFim.toString().split('T')[0],
          limiteUsos: cupom.limiteUsos || 0,
          ativo: cupom.ativo
        });
      } else {
        // Creating mode - reset form
        setFormData({
          codigo: '',
          descricao: '',
          tipo: 'desconto_percentual',
          valor: 0,
          valorMinimoPedido: 0,
          dataInicio: '',
          dataFim: '',
          limiteUsos: 0,
          ativo: true
        });
      }
      
      // Reset validation
      setValidacao({
        codigo: '',
        descricao: '',
        valor: '',
        dataInicio: '',
        dataFim: '',
        limiteUsos: ''
      });
    }
  }, [isOpen, cupom]);

  const validateForm = (): CupomValidacao => {
    const erros: CupomValidacao = {
      codigo: '',
      descricao: '',
      valor: '',
      dataInicio: '',
      dataFim: '',
      limiteUsos: ''
    };

    if (!formData.codigo.trim()) {
      erros.codigo = 'Código é obrigatório';
    } else if (formData.codigo.length < 3) {
      erros.codigo = 'Código deve ter pelo menos 3 caracteres';
    }

    if (!formData.descricao.trim()) {
      erros.descricao = 'Descrição é obrigatória';
    }

    if (formData.valor <= 0) {
      erros.valor = 'Valor deve ser maior que zero';
    } else if (formData.tipo === 'percentual' && formData.valor > 100) {
      erros.valor = 'Percentual não pode ser maior que 100%';
    }

    if (!formData.dataInicio) {
      erros.dataInicio = 'Data de início é obrigatória';
    }

    if (!formData.dataFim) {
      erros.dataFim = 'Data de fim é obrigatória';
    } else if (formData.dataInicio && new Date(formData.dataFim) <= new Date(formData.dataInicio)) {
      erros.dataFim = 'Data de fim deve ser posterior à data de início';
    }

    return erros;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const erros = validateForm();
    const hasErrors = Object.values(erros).some(error => error !== '');
    
    if (hasErrors) {
      setValidacao(erros);
      return;
    }

    try {
      const cupomData = {
        codigo: formData.codigo,
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: formData.valor,
        valorMinimoPedido: formData.valorMinimoPedido,
        dataInicio: new Date(formData.dataInicio),
        dataFim: new Date(formData.dataFim),
        limiteUsos: formData.limiteUsos,
        usosAtuais: cupom?.usosAtuais || 0,
        ativo: formData.ativo,
        criadoEm: cupom?.criadoEm || new Date(),
        atualizadoEm: new Date()
      };

      if (isEditing && cupom && onEdit) {
        await onEdit(cupom.id, cupomData);
        showSuccess('Cupom atualizado com sucesso!');
      } else {
        await onSave(cupomData);
        showSuccess('Cupom criado com sucesso!');
      }
      
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
      showError('Erro ao salvar cupom. Tente novamente.');
    }
  };

  const handleDelete = async () => {
    if (!cupom || !onDelete) return;
    
    if (window.confirm('Tem certeza que deseja excluir este cupom?')) {
      try {
        await onDelete(cupom.id);
        showSuccess('Cupom excluído com sucesso!');
        onClose();
      } catch (error) {
        console.error('Erro ao excluir cupom:', error);
        showError('Erro ao excluir cupom. Tente novamente.');
      }
    }
  };

  return {
    formData,
    setFormData,
    validacao,
    setValidacao,
    isEditing,
    handleSubmit,
    handleDelete
  };
}