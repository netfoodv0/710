import { useState, useCallback, useEffect } from 'react';
import { Produto } from '../types/produtos';

export interface FormData {
  // Informações Básicas
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  precoPromocional?: number;
  
  // Mídia
  imagens: string[];
  
  // Detalhes do Produto
  tempoPreparo: number;
  calorias?: number;
  porcoes: number;
  peso?: number;
  tamanhoPorcao?: number;
  unidadePorcao?: string;
  serveAte?: number;
  
  // Ingredientes e Alergenos
  ingredientes: string[];
  alergenos: string[];
  
  // Tags e Classificações
  tags: string[];
  vegetariano: boolean;
  vegano: boolean;
  semGluten: boolean;
  semLactose: boolean;
  semAcucar: boolean;
  organico: boolean;
  
  // Disponibilidade
  disponivel: boolean;
  destaque: boolean;
  promocao: boolean;
  status: 'ativo' | 'inativo' | 'em_falta';
  
  // Horários de Disponibilidade
  disponibilidadeDias: {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    domingo: boolean;
  };
  horarioInicio: string;
  horarioFim: string;
  
  // Estoque
  controlarEstoque: boolean;
  quantidadeEstoque?: number;
  estoqueMinimo?: number;
  

  
  // Adicionais/Complementos
  complementos: string[];
  
  // Variações
  temVariacoes: boolean;
  variacoes: Array<{
    nome: string;
    preco: number;
    disponivel: boolean;
  }>;
}

export interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  nome: '',
  descricao: '',
  categoria: '',
  preco: 0,
  imagens: [],
  tempoPreparo: 15,
  porcoes: 1,
  tamanhoPorcao: 1,
  unidadePorcao: 'un',
  serveAte: 1,
  ingredientes: [],
  alergenos: [],
  tags: [],
  vegetariano: false,
  vegano: false,
  semGluten: false,
  semLactose: false,
  semAcucar: false,
  organico: false,
  disponivel: true,
  destaque: false,
  promocao: false,
  status: 'ativo',
  disponibilidadeDias: {
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: true,
    domingo: true,
  },
  horarioInicio: '08:00',
  horarioFim: '22:00',
  controlarEstoque: false,
  complementos: [],
  temVariacoes: false,
  variacoes: [],
};

export function useNovoProdutoForm(dadosIniciais?: Partial<FormData>) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Aplicar dados iniciais quando o hook for inicializado ou quando dadosIniciais mudarem
  useEffect(() => {
    if (dadosIniciais && Object.keys(dadosIniciais).length > 0) {
      setFormData(prevData => ({
        ...prevData,
        ...dadosIniciais
      }));
    }
  }, [dadosIniciais]);

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando ele for alterado
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const addToArray = useCallback((field: keyof FormData, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), item]
    }));
  }, []);

  const removeFromArray = useCallback((field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  }, []);

  const addVariacao = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      variacoes: [
        ...prev.variacoes,
        { nome: '', preco: 0, disponivel: true }
      ]
    }));
  }, []);

  const updateVariacao = useCallback((index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      variacoes: prev.variacoes.map((variacao, i) =>
        i === index ? { ...variacao, [field]: value } : variacao
      )
    }));
  }, []);

  const removeVariacao = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      variacoes: prev.variacoes.filter((_, i) => i !== index)
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validações obrigatórias
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do produto é obrigatório';
    } else if (formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    } else if (formData.descricao.length < 10) {
      newErrors.descricao = 'Descrição deve ter pelo menos 10 caracteres';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (formData.preco <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }

    if (formData.precoPromocional && formData.precoPromocional >= formData.preco) {
      newErrors.precoPromocional = 'Preço promocional deve ser menor que o preço normal';
    }

    if (formData.tempoPreparo <= 0) {
      newErrors.tempoPreparo = 'Tempo de preparo deve ser maior que zero';
    }

    if (formData.porcoes <= 0) {
      newErrors.porcoes = 'Número de porções deve ser maior que zero';
    }

    if (formData.controlarEstoque) {
      if (!formData.quantidadeEstoque || formData.quantidadeEstoque < 0) {
        newErrors.quantidadeEstoque = 'Quantidade em estoque é obrigatória quando controle está ativo';
      }
      if (!formData.estoqueMinimo || formData.estoqueMinimo < 0) {
        newErrors.estoqueMinimo = 'Estoque mínimo é obrigatório quando controle está ativo';
      }
    }

    // Validar horários
    if (formData.horarioInicio >= formData.horarioFim) {
      newErrors.horarioFim = 'Horário de fim deve ser posterior ao horário de início';
    }

    // Validar variações se habilitadas
    if (formData.temVariacoes) {
      formData.variacoes.forEach((variacao, index) => {
        if (!variacao.nome.trim()) {
          newErrors[`variacao_${index}_nome`] = 'Nome da variação é obrigatório';
        }
        if (variacao.preco <= 0) {
          newErrors[`variacao_${index}_preco`] = 'Preço da variação deve ser maior que zero';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const submitForm = useCallback(async (onSubmit: (data: FormData) => Promise<void>) => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      return true;
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const formatPrice = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }, []);

  const parsePrice = useCallback((value: string): number => {
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numericValue) || 0;
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    addToArray,
    removeFromArray,
    addVariacao,
    updateVariacao,
    removeVariacao,
    validateForm,
    resetForm,
    submitForm,
    formatPrice,
    parsePrice,
  };
}
