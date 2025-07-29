import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Image, Tag, Clock, Star, Package } from 'lucide-react';
import { Produto, FormularioProdutoProps } from '../../types/produtos';
// import { UploadImagem } from './UploadImagem';
// import { ClassificacoesProduto } from './ClassificacoesProduto';
// import { DisponibilidadeProduto } from './DisponibilidadeProduto';
// import { DescontoProduto } from './DescontoProduto';
import { ComplementosProduto } from './ComplementosProduto';
import { useCategoriasFirebase } from '../../hooks/useCategoriasFirebase';

export const FormularioProduto: React.FC<FormularioProdutoProps> = ({
  produto,
  categorias,
  categoriasAdicionais,
  onSubmit,
  onCancel,
  loading = false,
  modo = 'avancado',
  formRef
}) => {
  const [activeTab, setActiveTab] = useState<'basico' | 'midia' | 'complementos' | 'classificacoes' | 'disponibilidade' | 'descontos'>('basico');
  const [formData, setFormData] = useState<Partial<Produto>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Map<string, File>>(new Map());

  // Usar as props passadas em vez dos hooks internos

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
          } else {
        // Validação falhou
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

  const tabs = [
    { id: 'basico' as const, label: 'Informações Básicas', icon: Package },
    { id: 'midia' as const, label: 'Mídia', icon: Image },
    { id: 'complementos' as const, label: 'Complementos', icon: Plus },
    { id: 'classificacoes' as const, label: 'Classificações', icon: Tag },
    { id: 'disponibilidade' as const, label: 'Disponibilidade', icon: Clock },
    { id: 'descontos' as const, label: 'Descontos', icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Formulário */}
      <form ref={formRef || undefined} onSubmit={handleSubmit} className="space-y-6">
        {/* Aba: Informações Básicas */}
        {activeTab === 'basico' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={formData.nome || ''}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nome ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Smashelândia Burger"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.categoriaId || ''}
                  onChange={(e) => {
                    const categoria = categorias.find(cat => cat.id === e.target.value);
                    handleInputChange('categoriaId', e.target.value);
                    handleInputChange('categoria', categoria?.nome || '');
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.categoria ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>

              {/* Preço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="text"
                  value={formatarPreco(formData.preco || 0)}
                  onChange={(e) => handleInputChange('preco', parsearPreco(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.preco ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0,00"
                />
                {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
              </div>

              {/* Tamanho da Porção */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serve até (pessoas)
                </label>
                <input
                  type="number"
                  value={formData.tamanhoPorcao || 1}
                  onChange={(e) => handleInputChange('tamanhoPorcao', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="10"
                />
              </div>

              {/* Tempo de Preparo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempo de Preparo (minutos)
                </label>
                <input
                  type="number"
                  value={formData.tempoPreparoMinutos || 20}
                  onChange={(e) => handleInputChange('tempoPreparoMinutos', parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="120"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status || 'ativo'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="em_falta">Em Falta</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Produto *
              </label>
              <textarea
                value={formData.descricao || ''}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.descricao ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Descreva o produto..."
                rows={4}
              />
              {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
            </div>

            {/* Checkboxes */}
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.agendamentoObrigatorio || false}
                  onChange={(e) => handleInputChange('agendamentoObrigatorio', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Agendamento obrigatório</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.destacado || false}
                  onChange={(e) => handleInputChange('destacado', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Destacar produto</span>
              </label>
            </div>
          </div>
        )}

        {/* Aba: Mídia */}
        {activeTab === 'midia' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Foto Principal</h3>
              {/* <UploadImagem
                onUpload={(file) => handleImageUpload(file, 'principal')}
                onRemove={(url) => handleImageRemove(url, 'principal')}
                imagens={formData.imagem ? [formData.imagem] : []}
                maxImagens={1}
                loading={loading}
              /> */}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Galeria de Fotos</h3>
              {/* <UploadImagem
                onUpload={(file) => handleImageUpload(file, 'galeria')}
                onRemove={(url) => handleImageRemove(url, 'galeria')}
                imagens={formData.galeriaFotos || []}
                maxImagens={5}
                loading={loading}
              /> */}
            </div>
          </div>
        )}

        {/* Aba: Complementos */}
        {activeTab === 'complementos' && (
          <div className="space-y-6">
            <ComplementosProduto
              complementos={formData.complementos || []}
              categoriasAdicionais={categoriasAdicionais}
              onChange={(complementos) => handleInputChange('complementos', complementos)}
            />
          </div>
        )}

        {/* Aba: Classificações */}
        {activeTab === 'classificacoes' && (
          <div className="space-y-6">
            {/* <ClassificacoesProduto
              classificacoes={formData.classificacoes || {
                semIngredientesOrigemAnimal: false,
                semCarne: false,
                semLactose: false,
                semAcucar: false,
                cultivadoSemAgrotoxicos: false,
                servidoGelado: false,
                teorAlcoolico: undefined,
                preparadoComFrutasFrescas: false
              }}
              onChange={(classificacoes) => handleInputChange('classificacoes', classificacoes)}
              tipoProduto={formData.categoria?.toLowerCase().includes('bebida') ? 'bebida' : 'comida'}
            /> */}
          </div>
        )}

        {/* Aba: Disponibilidade */}
        {activeTab === 'disponibilidade' && (
          <div className="space-y-6">
            {/* <DisponibilidadeProduto
              disponibilidade={formData.disponibilidade}
              onChange={(disponibilidade) => handleInputChange('disponibilidade', disponibilidade)}
              produtoId={produto?.id || 'novo'}
            /> */}
          </div>
        )}

        {/* Aba: Descontos */}
        {activeTab === 'descontos' && (
          <div className="space-y-6">
            {/* <DescontoProduto
              desconto={formData.desconto}
              onChange={(desconto) => handleInputChange('desconto', desconto)}
            /> */}
          </div>
        )}
      </form>
    </div>
  );
}; 