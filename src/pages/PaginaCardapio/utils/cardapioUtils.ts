// Utilitários para a página de Cardápio

export const formatarPreco = (preco: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco);
};

export const formatarCategoria = (categoria: string): string => {
  return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
};

export const formatarDescricao = (descricao: string, maxLength: number = 100): string => {
  if (descricao.length <= maxLength) {
    return descricao;
  }
  return descricao.substring(0, maxLength) + '...';
};

export const formatarDisponibilidade = (disponivel: boolean): string => {
  return disponivel ? 'Disponível' : 'Indisponível';
};

export const getDisponibilidadeColor = (disponivel: boolean): string => {
  return disponivel ? 'text-green-600' : 'text-red-600';
};

export const formatarTempoPreparo = (tempo: number): string => {
  if (tempo < 60) {
    return `${tempo} min`;
  }
  const horas = Math.floor(tempo / 60);
  const minutos = tempo % 60;
  return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`;
};

export const formatarIngredientes = (ingredientes: string[]): string => {
  return ingredientes.join(', ');
};

export const formatarObservacoes = (observacoes: string): string => {
  return observacoes || 'Nenhuma observação';
};

export const validarProduto = (produto: any): boolean => {
  return produto && 
         produto.nome && 
         produto.preco && 
         produto.categoria;
};

export const ordenarProdutos = (produtos: any[], criterio: 'nome' | 'preco' | 'categoria' = 'nome'): any[] => {
  return [...produtos].sort((a, b) => {
    switch (criterio) {
      case 'nome':
        return a.nome.localeCompare(b.nome);
      case 'preco':
        return a.preco - b.preco;
      case 'categoria':
        return a.categoria.localeCompare(b.categoria);
      default:
        return 0;
    }
  });
};

export const filtrarProdutos = (produtos: any[], filtro: string): any[] => {
  if (!filtro) return produtos;
  
  const filtroLower = filtro.toLowerCase();
  return produtos.filter(produto => 
    produto.nome.toLowerCase().includes(filtroLower) ||
    produto.descricao?.toLowerCase().includes(filtroLower) ||
    produto.categoria.toLowerCase().includes(filtroLower)
  );
};
