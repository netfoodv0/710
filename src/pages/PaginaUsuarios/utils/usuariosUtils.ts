// Utilitários para a página de Usuários

export const formatarTelefone = (telefone: string): string => {
  const numeros = telefone.replace(/\D/g, '');
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return telefone;
};

export const formatarData = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR');
};

export const formatarAvaliacao = (avaliacao: number): string => {
  return avaliacao.toFixed(1);
};

export const getStatusBadge = (status: 'ativo' | 'inativo') => {
  return {
    ativo: {
      label: 'Ativo',
      className: 'bg-green-100 text-green-800'
    },
    inativo: {
      label: 'Inativo',
      className: 'bg-red-100 text-red-800'
    }
  }[status];
};

export const getCargoBadge = (cargo: string) => {
  const cores = {
    'Gerente': 'bg-purple-100 text-purple-800',
    'Atendente': 'bg-blue-100 text-blue-800',
    'Cozinheiro': 'bg-orange-100 text-orange-800',
    'Caixa': 'bg-green-100 text-green-800',
    'Motoboy': 'bg-yellow-100 text-yellow-800'
  };
  
  return {
    label: cargo,
    className: cores[cargo as keyof typeof cores] || 'bg-gray-100 text-gray-800'
  };
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefone = (telefone: string): boolean => {
  const numeros = telefone.replace(/\D/g, '');
  return numeros.length === 10 || numeros.length === 11;
};

export const calcularEstatisticas = (operadores: any[], motoboys: any[]) => {
  return {
    totalOperadores: operadores.length,
    totalMotoboys: motoboys.length,
    operadoresAtivos: operadores.filter(op => op.status === 'ativo').length,
    motoboysAtivos: motoboys.filter(mb => mb.status === 'ativo').length
  };
};


