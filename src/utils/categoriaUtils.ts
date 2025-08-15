import { Produto } from '../types/produtos';

/**
 * Extrai categorias únicas de uma lista de produtos
 */
export function extrairCategoriasUnicas(produtos: Produto[]): string[] {
  if (!produtos || produtos.length === 0) {
    return [];
  }

  // Usar Set para garantir unicidade e filtrar valores vazios/nulos
  const categoriasSet = new Set<string>();
  
  produtos.forEach(produto => {
    if (produto.categoriaId && produto.categoriaId.trim()) {
      categoriasSet.add(produto.categoriaId.trim());
    }
  });
  
  // Converter para array e ordenar alfabeticamente
  return Array.from(categoriasSet).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

/**
 * Conta quantos produtos existem por categoria
 */
export function contarProdutosPorCategoria(produtos: Produto[]): Record<string, number> {
  if (!produtos || produtos.length === 0) {
    return {};
  }

  const contador: Record<string, number> = {};
  
  produtos.forEach(produto => {
    if (produto.categoriaId && produto.categoriaId.trim()) {
      const categoria = produto.categoriaId.trim();
      contador[categoria] = (contador[categoria] || 0) + 1;
    }
  });
  
  return contador;
}

/**
 * Filtra produtos por categoria
 */
export function filtrarProdutosPorCategoria(produtos: Produto[], categoria: string): Produto[] {
  if (!produtos || produtos.length === 0) {
    return [];
  }

  if (categoria === 'todos' || !categoria) {
    return produtos;
  }

  return produtos.filter(produto => 
    produto.categoriaId && produto.categoriaId.trim() === categoria.trim()
  );
}
