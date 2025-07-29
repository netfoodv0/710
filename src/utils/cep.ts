// Função para formatar CEP
export const formatCEP = (cep: string): string => {
  // Remove tudo que não é dígito
  const numbers = cep.replace(/\D/g, '');
  
  // Aplica a máscara
  return numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

// Função para validar CEP
export const validateCEP = (cep: string): boolean => {
  // Remove tudo que não é dígito
  const numbers = cep.replace(/\D/g, '');
  
  // CEP deve ter 8 dígitos
  return numbers.length === 8;
};

// Função para buscar CEP via API
export const fetchCEP = async (cep: string): Promise<any> => {
  try {
    const cleanCEP = cep.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
}; 