import { useState, useEffect } from 'react';
import { Produto, FormularioProdutoProps } from '../types/produtos';

type TabType = 'basico' | 'midia' | 'classificacoes' | 'disponibilidade' | 'descontos';

interface UseFormularioProdutoProps {
  produto?: Produto;
  onSubmit: (data: Partial<Produto>) => void;
}

export function useFormularioProduto({ produto, onSubmit }: UseFormularioProdutoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basico');
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Map<string, File>>(new Map());

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
    
    // Reset errors when produto changes
    setErrors({});
    setUploadedFiles(new Map());
  }, [produto]);

  // Limpar blob URLs problemáticas ao montar o componente
  useEffect(() => {
    const limparBlobProblematicas = () => {
      const imagens = document.querySelectorAll('img[src^="blob:"]');
      imagens.forEach((img) => {
        try {
          const imgElement = img as HTMLImageElement;
          // Se a imagem não carregou (naturalWidth === 0), revogar a URL
          if (imgElement.naturalWidth === 0) {
            URL.revokeObjectURL(imgElement.src);
            imgElement.removeAttribute('src');
          }
        } catch (error) {
          // Erro silencioso ao limpar blob
        }
      });
    };

    // Executar limpeza após um pequeno delay
    const timer = setTimeout(limparBlobProblematicas, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: keyof Produto, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome?.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.descricao?.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.preco || formData.preco <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }

    if (!formData.categoriaId) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Converter blob URLs para base64 se necessário
      const processedData = { ...formData };
      
      // Processar imagem principal
      if (formData.imagem && formData.imagem.startsWith('blob:')) {
        const file = uploadedFiles.get(formData.imagem);
        if (file) {
          // Converter para base64
          const reader = new FileReader();
          reader.onload = () => {
            processedData.imagem = reader.result as string;
            onSubmit(processedData);
          };
          reader.readAsDataURL(file);
          return;
        }
      }
      
      // Processar galeria de fotos
      if (formData.galeriaFotos && formData.galeriaFotos.length > 0) {
        const processedGaleria: string[] = [];
        let processedCount = 0;
        
        formData.galeriaFotos.forEach((url, index) => {
          if (url.startsWith('blob:')) {
            const file = uploadedFiles.get(url);
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                processedGaleria[index] = reader.result as string;
                processedCount++;
                
                if (processedCount === formData.galeriaFotos!.length) {
                  processedData.galeriaFotos = processedGaleria;
                  onSubmit(processedData);
                }
              };
              reader.readAsDataURL(file);
            } else {
              processedGaleria[index] = url;
              processedCount++;
            }
          } else {
            processedGaleria[index] = url;
            processedCount++;
          }
        });
        
        if (processedCount === formData.galeriaFotos!.length) {
          processedData.galeriaFotos = processedGaleria;
          onSubmit(processedData);
        }
        return;
      }
      
      onSubmit(processedData);
    }
  };

  const formatarPreco = (valor: number): string => {
    return valor.toFixed(2).replace('.', ',');
  };

  const parsearPreco = (valor: string): number => {
    return parseFloat(valor.replace(',', '.')) || 0;
  };

  const handleImageUpload = async (file: File, type: 'principal' | 'galeria') => {
    // Criar URL temporária para preview
    const url = URL.createObjectURL(file);
    
    // Armazenar o arquivo para uso posterior
    setUploadedFiles(prev => new Map(prev).set(url, file));
    
    if (type === 'principal') {
      handleInputChange('imagem', url);
    } else {
      const galeriaAtual = formData.galeriaFotos || [];
      handleInputChange('galeriaFotos', [...galeriaAtual, url]);
    }
    
    return url;
  };

  const handleImageRemove = (url: string, type: 'principal' | 'galeria') => {
    // Revogar URL de blob para liberar memória
    URL.revokeObjectURL(url);
    
    // Remover arquivo do Map
    setUploadedFiles(prev => {
      const newMap = new Map(prev);
      newMap.delete(url);
      return newMap;
    });
    
    if (type === 'principal') {
      handleInputChange('imagem', undefined);
    } else {
      const galeriaAtual = formData.galeriaFotos || [];
      handleInputChange('galeriaFotos', galeriaAtual.filter(img => img !== url));
    }
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    errors,
    isEditing,
    handleInputChange,
    handleSubmit,
    formatarPreco,
    parsearPreco,
    handleImageUpload,
    handleImageRemove
  };
} 