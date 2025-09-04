// Tipos relacionados a produtos (versão simplificada para PDV)

export interface Product {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  ativo: boolean;
  imagem?: string;
  descricao?: string;
  tempoPreparo?: number;
  estoque?: number;
  disponivel: boolean;
}

export interface ProductCategory {
  id: string;
  nome: string;
  ativa: boolean;
  ordem: number;
}

export interface ProductSearchFilters {
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  disponivel?: boolean;
  ativo?: boolean;
  busca?: string;
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
