import { useState, useCallback, useMemo } from 'react';
import { Product, ProductCategory, ProductSearchFilters } from '../types/global/products';

// Dados mockados para demonstração
const mockCategories: ProductCategory[] = [
  {
    id: '1',
    name: 'Pratos',
    description: 'Pratos principais e refeições',
    icon: '🍽️',
    color: 'bg-blue-100 text-blue-800',
    order: 1,
    products: []
  },
  {
    id: '2',
    name: 'Sobremesas',
    description: 'Doces e sobremesas',
    icon: '🍰',
    color: 'bg-pink-100 text-pink-800',
    order: 2,
    products: []
  },
  {
    id: '3',
    name: 'Bebidas',
    description: 'Bebidas e refrigerantes',
    icon: '🥤',
    color: 'bg-green-100 text-green-800',
    order: 3,
    products: []
  },
  {
    id: '4',
    name: 'Acompanhamentos',
    description: 'Acompanhamentos e saladas',
    icon: '🥗',
    color: 'bg-yellow-100 text-yellow-800',
    order: 4,
    products: []
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Pizza tradicional com molho de tomate, mussarela e manjericão',
    price: 25.90,
    categoryId: '1',
    category: mockCategories[0],
    images: ['🍕'],
    available: true,
    stock: 50,
    minStock: 10,
    maxStock: 100,
    unit: 'un',
    customizations: [],
    allergens: ['gluten', 'lactose'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Bolo de Chocolate',
    description: 'Bolo de chocolate caseiro com cobertura',
    price: 18.50,
    categoryId: '2',
    category: mockCategories[1],
    images: ['🍰'],
    available: true,
    stock: 20,
    minStock: 5,
    maxStock: 50,
    unit: 'fatia',
    customizations: [],
    allergens: ['gluten', 'ovos'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Coca-Cola',
    description: 'Refrigerante Coca-Cola 350ml',
    price: 6.90,
    categoryId: '3',
    category: mockCategories[2],
    images: ['🥤'],
    available: true,
    stock: 100,
    minStock: 20,
    maxStock: 200,
    unit: 'lata',
    customizations: [],
    allergens: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Salada Caesar',
    description: 'Salada Caesar com alface, croutons e molho especial',
    price: 22.00,
    categoryId: '4',
    category: mockCategories[3],
    images: ['🥗'],
    available: true,
    stock: 30,
    minStock: 8,
    maxStock: 60,
    unit: 'prato',
    customizations: [],
    allergens: ['gluten', 'ovos'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Hambúrguer Artesanal',
    description: 'Hambúrguer artesanal com pão brioche e carne premium',
    price: 28.90,
    categoryId: '1',
    category: mockCategories[0],
    images: ['🍔'],
    available: true,
    stock: 25,
    minStock: 5,
    maxStock: 50,
    unit: 'un',
    customizations: [],
    allergens: ['gluten', 'lactose'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Açaí na Tigela',
    description: 'Açaí na tigela com granola e frutas',
    price: 15.90,
    categoryId: '2',
    category: mockCategories[1],
    images: ['🫐'],
    available: true,
    stock: 40,
    minStock: 10,
    maxStock: 80,
    unit: 'tigela',
    customizations: [],
    allergens: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useProducts = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [categories] = useState<ProductCategory[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProductSearchFilters>({});

  // Filtrar produtos por categoria
  const productsByCategory = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  // Filtrar produtos por busca
  const filteredProducts = useMemo(() => {
    let filtered = productsByCategory;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [productsByCategory, searchTerm, filters]);

  // Selecionar categoria
  const selectCategory = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  // Atualizar termo de busca
  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters: Partial<ProductSearchFilters>) => {
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

  return {
    // Estado
    products,
    categories,
    selectedCategory,
    searchTerm,
    filters,
    
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
    
    // Estados derivados
    hasProducts: products.length > 0,
    hasCategories: categories.length > 0,
    totalProducts: products.length,
    availableProducts: products.filter(p => p.available).length
  };
};
