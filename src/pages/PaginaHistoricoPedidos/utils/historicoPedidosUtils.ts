// Utilitários para a página de Histórico de Pedidos

export const formatarData = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
};

export const formatarValor = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
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

export const formatarFormaEntrega = (forma: string): string => {
  const formas = {
    delivery: 'Delivery',
    retirada: 'Retirada',
    balcao: 'Balcão'
  };
  return formas[forma as keyof typeof formas] || forma;
};

export const formatarOrigemPedido = (origem: string): string => {
  const origens = {
    pdv: 'PDV',
    cardapio_digital: 'Cardápio Digital',
    whatsapp: 'WhatsApp',
    telefone: 'Telefone',
    presencial: 'Presencial'
  };
  return origens[origem as keyof typeof origens] || origem;
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

export const validarFiltros = (filtros: any): boolean => {
  if (filtros.dataInicio && filtros.dataFim) {
    const inicio = new Date(filtros.dataInicio);
    const fim = new Date(filtros.dataFim);
    return inicio <= fim;
  }
  return true;
};

export const gerarNomeArquivoExportacao = (filtros?: any): string => {
  const agora = new Date();
  const data = agora.toISOString().split('T')[0];
  const hora = agora.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  let sufixo = '';
  if (filtros?.dataInicio && filtros?.dataFim) {
    const inicio = new Date(filtros.dataInicio).toISOString().split('T')[0];
    const fim = new Date(filtros.dataFim).toISOString().split('T')[0];
    sufixo = `_${inicio}_a_${fim}`;
  }
  
  return `historico_pedidos_${data}_${hora}${sufixo}.csv`;
};
