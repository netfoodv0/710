import { Product, ProductCategory } from '../types/global/products';
import { useProductsFirebasePDV } from './useProductsFirebasePDV';


export const useProducts = () => {
  // Usar o hook do Firebase para dados reais
  const firebaseData = useProductsFirebasePDV();

  // Mapear dados do Firebase para o formato esperado pelo PDV
  const products: Product[] = firebaseData.products.map(produto => ({
    id: produto.id,
    name: produto.name,
    description: produto.description || '',
    price: produto.price,
    categoryId: produto.categoryId,
    category: {
      id: produto.category.id,
      name: produto.category.name,
      description: produto.category.description,
      color: produto.category.color,
      order: produto.category.order,
      products: []
    },
    images: produto.images || [],
    available: produto.available,
    stock: produto.stock,
    minStock: produto.minStock,
    maxStock: produto.maxStock,
    unit: produto.unit,
    customizations: produto.customizations,
    allergens: produto.allergens,
    createdAt: produto.createdAt,
    updatedAt: produto.updatedAt
  }));

  const categories: ProductCategory[] = firebaseData.categories.map(categoria => ({
    id: categoria.id,
    name: categoria.name,
    description: categoria.description,
    color: categoria.color,
    order: categoria.order,
    products: []
  }));

  return {
    // Estado
    products,
    categories,
    selectedCategory: firebaseData.selectedCategory,
    searchTerm: firebaseData.searchTerm,
    filters: firebaseData.filters,
    loading: firebaseData.loading,
    error: firebaseData.error,
    
    // Produtos filtrados
    filteredProducts: firebaseData.filteredProducts.map(produto => ({
      id: produto.id,
      name: produto.name,
      description: produto.description || '',
      price: produto.price,
      categoryId: produto.categoryId,
      category: {
        id: produto.category.id,
        name: produto.category.name,
        description: produto.category.description,
        color: produto.category.color,
        order: produto.category.order,
        products: []
      },
      images: produto.images || [],
      available: produto.available,
      stock: produto.stock,
      minStock: produto.minStock,
      maxStock: produto.maxStock,
      unit: produto.unit,
      customizations: produto.customizations,
      allergens: produto.allergens,
      createdAt: produto.createdAt,
      updatedAt: produto.updatedAt
    })),
    productsByCategory: firebaseData.productsByCategory.map(produto => ({
      id: produto.id,
      name: produto.name,
      description: produto.description || '',
      price: produto.price,
      categoryId: produto.categoryId,
      category: {
        id: produto.category.id,
        name: produto.category.name,
        description: produto.category.description,
        color: produto.category.color,
        order: produto.category.order,
        products: []
      },
      images: produto.images || [],
      available: produto.available,
      stock: produto.stock,
      minStock: produto.minStock,
      maxStock: produto.maxStock,
      unit: produto.unit,
      customizations: produto.customizations,
      allergens: produto.allergens,
      createdAt: produto.createdAt,
      updatedAt: produto.updatedAt
    })),
    
    // Ações
    selectCategory: firebaseData.selectCategory,
    updateSearchTerm: firebaseData.updateSearchTerm,
    applyFilters: firebaseData.applyFilters,
    clearFilters: firebaseData.clearFilters,
    getProductById: firebaseData.getProductById,
    getProductsByCategory: firebaseData.getProductsByCategory,
    categoryHasProducts: firebaseData.categoryHasProducts,
    refreshData: firebaseData.refreshData,
    
    // Estados derivados
    hasProducts: firebaseData.hasProducts,
    hasCategories: firebaseData.hasCategories,
    totalProducts: firebaseData.totalProducts,
    availableProducts: firebaseData.availableProducts
  };
};