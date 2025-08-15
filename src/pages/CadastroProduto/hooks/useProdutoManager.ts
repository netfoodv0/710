import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseCardapioService } from '../../../services/firebaseCardapioService';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { Produto } from '../../../types/produtos';
import { FormData } from '../../../hooks/useNovoProdutoForm';
import { transformFormDataToProduto, transformProdutoToFormData } from '../utils/produtoTransformUtils';

export const useProdutoManager = (id?: string) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotificationContext();
  const [produtoExistente, setProdutoExistente] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'ativo' | 'inativo' | 'em_falta'>('ativo');

  const isEditMode = !!id;

  // Carregar produto existente se estiver em modo de edição
  useEffect(() => {
    if (isEditMode && id) {
      const carregarProduto = async () => {
        try {
          setLoading(true);
          console.log('Tentando carregar produto com ID:', id);
          const produto = await firebaseCardapioService.buscarProduto(id);
          console.log('Produto carregado:', produto);
          if (produto) {
            setProdutoExistente(produto);
            setStatus(produto.status || 'ativo');
          } else {
            console.log('Produto não encontrado');
            showError('Produto não encontrado');
          }
        } catch (error) {
          console.error('Erro ao carregar produto:', error);
          showError('Erro ao carregar dados do produto');
        } finally {
          setLoading(false);
        }
      };
      
      carregarProduto();
    }
  }, [isEditMode, id, showError]);

  const handleCancel = () => {
    navigate('/cardapio');
  };

  const handleStatusChange = (newStatus: 'ativo' | 'inativo' | 'em_falta') => {
    setStatus(newStatus);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Transformar dados do formulário para dados do produto
      const produtoData = transformFormDataToProduto(data, status);

      if (isEditMode && id) {
        // Modo de edição
        await firebaseCardapioService.editarProduto(id, produtoData);
        showSuccess('Produto atualizado com sucesso!', 3000);
      } else {
        // Modo de criação
        const produtoId = await firebaseCardapioService.criarProduto(produtoData);
        showSuccess('Produto cadastrado com sucesso!', 3000);
        console.log('Produto salvo com ID:', produtoId);
      }
      
      // Aguardar um pouco para mostrar a notificação antes de navegar
      setTimeout(() => {
        navigate('/cardapio');
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      const mensagem = isEditMode ? 'Erro ao atualizar produto. Tente novamente.' : 'Erro ao cadastrar produto. Tente novamente.';
      showError(mensagem, 5000);
      throw error; // Re-throw para que o formulário saiba que houve erro
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preparar dados iniciais do formulário
  const getDadosIniciais = (categoriaUrl?: string) => {
    if (isEditMode && produtoExistente) {
      return transformProdutoToFormData(produtoExistente);
    }
    return {
      categoria: categoriaUrl || ''
    };
  };

  return {
    produtoExistente,
    loading,
    isSubmitting,
    status,
    isEditMode,
    handleCancel,
    handleStatusChange,
    handleSubmit,
    getDadosIniciais
  };
};
