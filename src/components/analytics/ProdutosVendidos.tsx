import React from 'react';
import { TrendingUp, Star } from 'lucide-react';
import { ReportIcon } from '../ui';

interface ProdutoVendido {
  nome: string;
  quantidade: number;
  receita: number;
  posicao?: number;
}

interface ProdutosVendidosProps {
  produtos: ProdutoVendido[];
}

// Função para gerar fotos fictícias de produtos baseadas no nome
const getProductImage = (productName: string): string => {
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
};

export const ProdutosVendidos: React.FC<ProdutosVendidosProps> = ({ produtos }) => {
  const produtosDefault: ProdutoVendido[] = [
    {
      nome: 'Pizza Margherita',
      quantidade: 156,
      receita: 4680.00,
      posicao: 1
    },
    {
      nome: 'Hambúrguer Artesanal',
      quantidade: 134,
      receita: 4020.00,
      posicao: 2
    },
    {
      nome: 'Açaí 500ml',
      quantidade: 98,
      receita: 1470.00,
      posicao: 3
    },
    {
      nome: 'Sushi Combo',
      quantidade: 67,
      receita: 3350.00,
      posicao: 4
    },
    {
      nome: 'Salada Caesar',
      quantidade: 89,
      receita: 1780.00,
      posicao: 5
    },
    {
      nome: 'Batata Frita',
      quantidade: 123,
      receita: 1845.00,
      posicao: 6
    }
  ];

  const produtosExibir = produtos.length > 0 ? produtos : produtosDefault;

  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px] hide-scrollbar">
        {produtosExibir.map((produto, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 bg-white rounded-lg border h-[62px]" style={{ borderColor: '#cfd1d3' }}>
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={getProductImage(produto.nome)} 
                alt={produto.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback para imagem padrão em caso de erro
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center';
                }}
              />
            </div>
            <div className="grid grid-rows-2 gap-1">
              <p className="font-medium text-gray-700 text-sm">{produto.nome}</p>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-xs text-gray-500">{produto.quantidade} vendas</span>
                <span className="text-xs font-semibold text-gray-900">{formatarMoeda(produto.receita)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-2">
        <a 
          href="/relatorios" 
          className="inline-flex items-center justify-center space-x-2 w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-[100px] hover:bg-purple-700 transition-colors"
        >
          <ReportIcon size={24} color="#FFFFFF" />
          <span>Acessar relatórios completos</span>
        </a>
      </div>
    </div>
  );
};
