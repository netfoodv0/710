import { useCallback } from 'react';

// Hook para formatação de moeda
export const useCurrencyFormatter = () => {
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }, []);

  return { formatCurrency };
};

// Hook para formatação de nomes e iniciais
export const useNameFormatter = () => {
  const getInitials = useCallback((name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const getAvatarColor = useCallback((name: string): string => {
    const colors = [
      'bg-gray-100 text-gray-700',
      'bg-blue-50 text-blue-700',
      'bg-green-50 text-green-700',
      'bg-purple-50 text-purple-700',
      'bg-orange-50 text-orange-700',
      'bg-teal-50 text-teal-700'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }, []);

  return { getInitials, getAvatarColor };
};

// Hook para formatação de produtos
export const useProductFormatter = () => {
  const getProductImage = useCallback((productName: string): string => {
    const productImages: { [key: string]: string } = {
      'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop&crop=center',
      'hambúrguer': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop&crop=center',
      'açaí': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center',
      'sushi': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=80&h=80&fit=crop&crop=center',
      'salada': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop&crop=center',
      'batata': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=80&h=80&fit=crop&crop=center',
      'combo': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center'
    };

    const lowerName = productName.toLowerCase();
    
    for (const [key, image] of Object.entries(productImages)) {
      if (lowerName.includes(key)) {
        return image;
      }
    }
    
    // Imagem padrão para produtos não mapeados
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center';
  }, []);

  return { getProductImage };
};

// Hook combinado para todas as formatações
export const useDataFormatter = () => {
  const { formatCurrency } = useCurrencyFormatter();
  const { getInitials, getAvatarColor } = useNameFormatter();
  const { getProductImage } = useProductFormatter();

  return {
    formatCurrency,
    getInitials,
    getAvatarColor,
    getProductImage
  };
};
