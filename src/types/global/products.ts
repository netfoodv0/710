// Tipos relacionados a produtos (versão simplificada para PDV)

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  category: ProductCategory;
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

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  order: number;
  products: Product[];
}

export interface ProductSearchFilters {
  available?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFormData {
  nome: string;
  preco: number;
  categoria: string;
  descricao?: string;
  imagem?: string;
  tempoPreparo?: number;
  estoque?: number;
  ativo: boolean;
}
