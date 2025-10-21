// Utilitários para a página de Pedidos

export const formatarValor = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarData = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
};

export const formatarStatus = (status: string): string => {
  const statusMap = {
    novo: 'Novo',
    pendente: 'Pendente',
    confirmado: 'Confirmado',
    preparando: 'Preparando',
    pronto: 'Pronto',
    saiu_entrega: 'Saiu para Entrega',
    entregue: 'Entregue',
    cancelado: 'Cancelado'
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

export const getStatusColor = (status: string): string => {
  const colors = {
    novo: 'bg-blue-100 text-blue-800',
    pendente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-green-100 text-green-800',
    preparando: 'bg-orange-100 text-orange-800',
    pronto: 'bg-purple-100 text-purple-800',
    saiu_entrega: 'bg-indigo-100 text-indigo-800',
    entregue: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const formatarFormaPagamento = (forma: string): string => {
  const formas = {
    dinheiro: 'Dinheiro',
    pix: 'PIX',
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    cartao: 'Cartão',
    credito: 'Crédito',
    debito: 'Débito'
  };
  return formas[forma as keyof typeof formas] || forma;
};

export const formatarFormaEntrega = (forma: string): string => {
  const formas = {
    delivery: 'Delivery',
    retirada: 'Retirada',
    balcao: 'Balcão'
  };
  return formas[forma as keyof typeof formas] || forma;
};

export const calcularTempoDecorrido = (dataHora: Date): string => {
  const agora = new Date();
  const diffMs = agora.getTime() - dataHora.getTime();
  const diffMinutos = Math.floor(diffMs / (1000 * 60));
  const diffHoras = Math.floor(diffMinutos / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffDias > 0) {
    return `${diffDias} dia${diffDias > 1 ? 's' : ''} atrás`;
  } else if (diffHoras > 0) {
    return `${diffHoras} hora${diffHoras > 1 ? 's' : ''} atrás`;
  } else if (diffMinutos > 0) {
    return `${diffMinutos} minuto${diffMinutos > 1 ? 's' : ''} atrás`;
  } else {
    return 'Agora mesmo';
  }
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

export const formatarNomeCliente = (nome: string): string => {
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
};

export const formatarObservacoes = (observacoes: string): string => {
  return observacoes || 'Nenhuma observação';
};

export const validarPedido = (pedido: any): boolean => {
  return pedido && 
         pedido.id && 
         pedido.numero && 
         pedido.cliente && 
         pedido.total;
};

export const ordenarPedidos = (pedidos: any[], criterio: 'data' | 'valor' | 'status' = 'data'): any[] => {
  return [...pedidos].sort((a, b) => {
    switch (criterio) {
      case 'data':
        return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
      case 'valor':
        return b.total - a.total;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
};

export const filtrarPedidos = (pedidos: any[], filtro: string): any[] => {
  if (!filtro) return pedidos;
  
  const filtroLower = filtro.toLowerCase();
  return pedidos.filter(pedido => 
    pedido.numero.toLowerCase().includes(filtroLower) ||
    pedido.cliente.nome.toLowerCase().includes(filtroLower) ||
    pedido.cliente.telefone.includes(filtroLower) ||
    pedido.id.toLowerCase().includes(filtroLower)
  );
};


