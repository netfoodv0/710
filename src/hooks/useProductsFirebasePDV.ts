import { useState, useEffect, useCallback, useMemo } from 'react';
import { FirebaseProdutosService } from '../services/firebase/produtosService';
import { FirebaseCategoriaService } from '../services/firebaseCategoriaService';
import { Categoria } from '../types';
import { useAuth } from './useAuth';

// Tipos específicos para o PDV
export interface ProductPDV {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  category: ProductCategoryPDV;
  images?: string[];
  available: boolean;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  customizations: any[];
  allergens: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategoryPDV {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
  products: ProductPDV[];
}

export interface ProductSearchFiltersPDV {
  available?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export const useProductsFirebasePDV = () => {
  const { getLojaId } = useAuth();
  const [products, setProducts] = useState<ProductPDV[]>([]);
  const [categories, setCategories] = useState<ProductCategoryPDV[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProductSearchFiltersPDV>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Instanciar serviços apenas uma vez usando useRef para evitar recriações
  const produtosService = useMemo(() => new FirebaseProdutosService(), []);
  const categoriasService = useMemo(() => new FirebaseCategoriaService(), []);

  // Função para obter unidade do produto baseado no nome
  const getProductUnit = useCallback((productName: string): string => {
    const name = productName.toLowerCase();
    if (name.includes('pizza') || name.includes('hambúrguer') || name.includes('sanduíche')) return 'un';
    if (name.includes('bolo') || name.includes('torta') || name.includes('fatia')) return 'fatia';
    if (name.includes('refrigerante') || name.includes('cerveja') || name.includes('lata')) return 'lata';
    if (name.includes('salada') || name.includes('prato') || name.includes('porção')) return 'prato';
    if (name.includes('açaí') || name.includes('tigela') || name.includes('copo')) return 'tigela';
    return 'un'; // Unidade padrão
  }, []);

  // Mapear dados do Firebase para formato do PDV
  const mapProdutoToPDV = useCallback((produto: any, categoria: Categoria): ProductPDV => {
    // Função para converter preço com segurança
    const parsePrice = (price: any): number => {
      if (typeof price === 'number') {
        return price;
      }
      if (typeof price === 'string') {
        const parsed = parseFloat(price.replace(',', '.'));
        return isNaN(parsed) ? 0 : parsed;
      }
      if (price && typeof price === 'object' && price.value) {
        return parsePrice(price.value);
      }
      return 0;
    };
    
    // Usar precoVenda como o preço principal do produto
    const price = parsePrice(produto.precoVenda);
    
    return {
      id: produto.id,
      name: produto.nome || 'Produto sem nome',
      description: produto.descricao || '',
      price: price,
      categoryId: produto.categoriaId,
      category: {
        id: categoria.id,
        name: categoria.nome,
        description: categoria.descricao || '',
        color: 'bg-white text-purple-800',
        order: categoria.ordem || 9999,
        products: []
      },
      images: produto.imagens || [],
      available: produto.status === 'ativo',
      stock: produto.estoqueAtual || 0,
      minStock: produto.estoqueMinimo || 0,
      maxStock: 100, // Valor padrão
      unit: produto.unidadeMedida || getProductUnit(produto.nome),
      customizations: produto.adicionais || [],
      allergens: [], // Implementar se necessário
      createdAt: produto.dataCriacao,
      updatedAt: produto.dataAtualizacao
    };
  }, [getProductUnit]);

  // Carregar dados do Firebase apenas uma vez
  useEffect(() => {
    const loadData = async () => {
      const lojaId = getLojaId();
      if (!lojaId || dataLoaded) return;

      try {
        setLoading(true);
        setError(null);

        // Carregar categorias
        const categoriasData = await categoriasService.buscarCategorias(lojaId, {});
        const categoriasPDV: ProductCategoryPDV[] = categoriasData.map(categoria => ({
          id: categoria.id,
          name: categoria.nome,
          description: categoria.descricao || '',
          color: 'bg-white text-purple-800',
          order: categoria.ordem || 9999,
          products: []
        }));

        setCategories(categoriasPDV);

        // Carregar produtos
        const produtosData = await produtosService.buscarProdutos({ status: 'ativo' });
        
        // Debug: verificar os dados brutos dos produtos (apenas uma vez)
        if (produtosData.length > 0) {
          console.log('Produtos carregados do Firebase:', produtosData.length, 'produtos');
        }
        
        // Validar se há categorias disponíveis
        if (categoriasData.length === 0) {
          console.error('Nenhuma categoria encontrada. Produtos não podem ser exibidos sem categorias.');
          setProducts([]);
          setDataLoaded(true);
          return;
        }

        // Processar produtos com validação rigorosa
        const produtosPDV: ProductPDV[] = produtosData
          .filter(produto => {
            // Validar se o produto tem dados essenciais
            if (!produto.nome || produto.nome.trim() === '') {
              console.warn(`Produto com ID ${produto.id} não tem nome válido. Ignorando.`);
              return false;
            }
            return true;
          })
          .map((produto, index) => {
            // Buscar categoria do produto
            let categoria = categoriasData.find(cat => cat.id === produto.categoriaId);
            
            // Se não tem categoria válida, distribuir entre as categorias existentes
            if (!categoria) {
              const categoriaIndex = index % categoriasData.length;
              categoria = categoriasData[categoriaIndex];
              console.warn(`Produto "${produto.nome}" não tem categoria válida. Associando à categoria: "${categoria.nome}"`);
            }
            
            return mapProdutoToPDV(produto, categoria);
          });
        setProducts(produtosPDV);
        setDataLoaded(true);

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar produtos e categorias');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getLojaId, dataLoaded]);

  // Filtrar produtos por categoria - sempre mostrar todos os produtos agrupados
  const productsByCategory = useMemo(() => {
    return products; // Sempre mostrar todos os produtos para agrupamento por categoria
  }, [products]);

  // Filtrar produtos por busca
  const filteredProducts = useMemo(() => {
    let filtered = productsByCategory;

    // Filtro por categoria selecionada (se houver)
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por disponibilidade
    if (filters.available !== undefined) {
      filtered = filtered.filter(product => product.available === filters.available);
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange!.min && product.price <= filters.priceRange!.max
      );
    }

    // Ordenação
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'name':
            return filters.sortOrder === 'desc' 
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          case 'price':
            return filters.sortOrder === 'desc' 
              ? b.price - a.price
              : a.price - b.price;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [productsByCategory, selectedCategory, searchTerm, filters.available, filters.priceRange, filters.sortBy, filters.sortOrder]);

  // Selecionar categoria
  const selectCategory = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  // Atualizar termo de busca
  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters: Partial<ProductSearchFiltersPDV>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setSelectedCategory(null);
  }, []);

  // Buscar produto por ID
  const getProductById = useCallback((id: string) => {
    return products.find(product => product.id === id);
  }, [products]);

  // Obter produtos por categoria
  const getProductsByCategory = useCallback((categoryId: string) => {
    return products.filter(product => product.categoryId === categoryId);
  }, [products]);

  // Verificar se categoria tem produtos
  const categoryHasProducts = useCallback((categoryId: string) => {
    return products.some(product => product.categoryId === categoryId);
  }, [products]);

  // Recarregar dados
  const refreshData = useCallback(() => {
    setDataLoaded(false);
  }, []);

  return {
    // Estado
    products,
    categories,
    selectedCategory,
    searchTerm,
    filters,
    loading,
    error,
    
    // Produtos filtrados
    filteredProducts,
    productsByCategory,
    
    // Ações
    selectCategory,
    updateSearchTerm,
    applyFilters,
    clearFilters,
    getProductById,
    getProductsByCategory,
    categoryHasProducts,
    refreshData,
    
    // Estados derivados
    hasProducts: products.length > 0,
    hasCategories: categories.length > 0,
    totalProducts: products.length,
    availableProducts: products.filter(p => p.available).length
  };
};
