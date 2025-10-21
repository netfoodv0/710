// Utilitários para a página de PDV

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

export const calcularTotalPedido = (itens: any[]): number => {
  return itens.reduce((total, item) => {
    return total + (item.preco * item.quantidade);
  }, 0);
};

export const calcularSubtotal = (itens: any[]): number => {
  return calcularTotalPedido(itens);
};

export const calcularTaxaServico = (subtotal: number, percentual: number = 10): number => {
  return (subtotal * percentual) / 100;
};

export const calcularDesconto = (subtotal: number, percentual: number): number => {
  return (subtotal * percentual) / 100;
};

export const calcularTotalFinal = (subtotal: number, taxaServico: number, desconto: number): number => {
  return subtotal + taxaServico - desconto;
};

export const formatarTelefone = (telefone: string): string => {
  // Remove caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  
  // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return telefone;
};

export const formatarCPF = (cpf: string): string => {
  // Remove caracteres não numéricos
  const numeros = cpf.replace(/\D/g, '');
  
  // Formata como XXX.XXX.XXX-XX
  if (numeros.length === 11) {
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  return cpf;
};

export const validarCPF = (cpf: string): boolean => {
  const numeros = cpf.replace(/\D/g, '');
  
  if (numeros.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numeros)) return false;
  
  // Validação do CPF
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(10))) return false;
  
  return true;
};

export const gerarNumeroPedido = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PDV${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
};

export const formatarDataHora = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(data);
};


