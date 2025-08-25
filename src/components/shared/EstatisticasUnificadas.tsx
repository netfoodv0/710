import React, { useMemo } from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  Star,
  Clock,
  Target
} from 'lucide-react';

// Interface unificada para estatísticas
export interface EstatisticaItem {
  id: string;
  titulo: string;
  valor: number;
  tipo: 'numero' | 'moeda' | 'percentual';
  icone: React.ComponentType<{ className?: string }>;
  cor: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  descricao?: string;
  variacao?: {
    valor: number;
    tipo: 'aumento' | 'diminuicao';
    periodo: string;
  };
}

interface EstatisticasUnificadasProps {
  estatisticas: EstatisticaItem[];
  titulo?: string;
  subtitulo?: string;
  layout?: 'grid' | 'flex';
  colunas?: 2 | 3 | 4 | 5;
  mostrarVariacao?: boolean;
  className?: string;
}

// Componente de ícone memoizado
const IconeEstatistica = React.memo<{ 
  icone: React.ComponentType<{ className?: string }>;
  cor: string;
}>(({ icone: Icon, cor }) => {
  const cores = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className={`p-3 rounded-lg ${cores[cor as keyof typeof cores]}`}>
      <Icon className="h-6 w-6" />
    </div>
  );
});

IconeEstatistica.displayName = 'IconeEstatistica';

// Componente de variação memoizado
const VariacaoEstatistica = React.memo<{ 
  variacao: EstatisticaItem['variacao'];
}>(({ variacao }) => {
  if (!variacao) return null;

  const { valor, tipo, periodo } = variacao;
  const isAumento = tipo === 'aumento';
  
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className={`flex items-center gap-1 ${
        isAumento ? 'text-green-600' : 'text-red-600'
      }`}>
        {isAumento ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingUp className="h-3 w-3 rotate-180" />
        )}
        {valor}%
      </span>
      <span className="text-gray-500">vs {periodo}</span>
    </div>
  );
});

VariacaoEstatistica.displayName = 'VariacaoEstatistica';

export const EstatisticasUnificadas: React.FC<EstatisticasUnificadasProps> = React.memo(({
  estatisticas,
  titulo,
  subtitulo,
  layout = 'grid',
  colunas = 4,
  mostrarVariacao = true,
  className = ''
}) => {
  // Memoizar estatísticas formatadas
  const estatisticasFormatadas = useMemo(() => 
    estatisticas.map(item => {
      let valorFormatado: string;
      
      switch (item.tipo) {
        case 'moeda':
          valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(item.valor);
          break;
        case 'percentual':
          valorFormatado = `${item.valor.toFixed(1)}%`;
          break;
        case 'numero':
        default:
          valorFormatado = item.valor.toLocaleString('pt-BR');
          break;
      }

      return {
        ...item,
        valorFormatado
      };
    }), [estatisticas]
  );

  // Memoizar classes de grid
  const gridClasses = useMemo(() => {
    const classes = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
    };
    return classes[colunas];
  }, [colunas]);

  const containerClasses = layout === 'grid' 
    ? `grid gap-6 ${gridClasses}`
    : 'flex flex-wrap gap-6';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Cabeçalho */}
      {(titulo || subtitulo) && (
        <div className="text-center">
          {titulo && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {titulo}
            </h2>
          )}
          {subtitulo && (
            <p className="text-gray-600 text-lg">
              {subtitulo}
            </p>
          )}
        </div>
      )}

      {/* Grid de estatísticas */}
      <div className={containerClasses}>
        {estatisticasFormatadas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <IconeEstatistica icone={item.icone} cor={item.cor} />
              {mostrarVariacao && item.variacao && (
                <VariacaoEstatistica variacao={item.variacao} />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">
                {item.titulo}
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {item.valorFormatado}
              </p>
              {item.descricao && (
                <p className="text-xs text-gray-500">
                  {item.descricao}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

EstatisticasUnificadas.displayName = 'EstatisticasUnificadas';

// Hook para criar estatísticas padronizadas
export const useEstatisticasPadrao = () => {
  const estatisticasGerais = useMemo((): EstatisticaItem[] => [
    {
      id: 'total-pedidos',
      titulo: 'Total de Pedidos',
      valor: 1247,
      tipo: 'numero',
      icone: ShoppingCart,
      cor: 'blue',
      descricao: 'Pedidos realizados no período',
      variacao: {
        valor: 12.5,
        tipo: 'aumento',
        periodo: 'mês anterior'
      }
    },
    {
      id: 'faturamento-total',
      titulo: 'Faturamento Total',
      valor: 45678.90,
      tipo: 'moeda',
      icone: DollarSign,
      cor: 'green',
      descricao: 'Receita total no período',
      variacao: {
        valor: 8.3,
        tipo: 'aumento',
        periodo: 'mês anterior'
      }
    },
    {
      id: 'clientes-ativos',
      titulo: 'Clientes Ativos',
      valor: 342,
      tipo: 'numero',
      icone: Users,
      cor: 'purple',
      descricao: 'Clientes que fizeram pedidos',
      variacao: {
        valor: 5.2,
        tipo: 'aumento',
        periodo: 'mês anterior'
      }
    },
    {
      id: 'ticket-medio',
      titulo: 'Ticket Médio',
      valor: 36.63,
      tipo: 'moeda',
      icone: Target,
      cor: 'orange',
      descricao: 'Valor médio por pedido',
      variacao: {
        valor: 2.1,
        tipo: 'diminuicao',
        periodo: 'mês anterior'
      }
    }
  ], []);

  const estatisticasClientes = useMemo((): EstatisticaItem[] => [
    {
      id: 'total-clientes',
      titulo: 'Total de Clientes',
      valor: 456,
      tipo: 'numero',
      icone: Users,
      cor: 'blue',
      descricao: 'Total de clientes cadastrados'
    },
    {
      id: 'novos-clientes',
      titulo: 'Novos Clientes',
      valor: 28,
      tipo: 'numero',
      icone: Users,
      cor: 'green',
      descricao: 'Clientes novos no período',
      variacao: {
        valor: 15.4,
        tipo: 'aumento',
        periodo: 'mês anterior'
      }
    },
    {
      id: 'clientes-ativos',
      titulo: 'Clientes Ativos',
      valor: 342,
      tipo: 'numero',
      icone: Users,
      cor: 'purple',
      descricao: 'Clientes com pedidos ativos'
    },
    {
      id: 'taxa-retencao',
      titulo: 'Taxa de Retenção',
      valor: 75.2,
      tipo: 'percentual',
      icone: Star,
      cor: 'orange',
      descricao: 'Clientes que retornaram'
    }
  ], []);

  const estatisticasProdutos = useMemo((): EstatisticaItem[] => [
    {
      id: 'total-produtos',
      titulo: 'Total de Produtos',
      valor: 156,
      tipo: 'numero',
      icone: Package,
      cor: 'blue',
      descricao: 'Produtos cadastrados'
    },
    {
      id: 'produtos-ativos',
      titulo: 'Produtos Ativos',
      valor: 142,
      tipo: 'numero',
      icone: Package,
      cor: 'green',
      descricao: 'Produtos disponíveis'
    },
    {
      id: 'produtos-estoque',
      titulo: 'Em Estoque',
      valor: 98,
      tipo: 'numero',
      icone: Package,
      cor: 'purple',
      descricao: 'Produtos com estoque'
    },
    {
      id: 'produtos-vendidos',
      titulo: 'Mais Vendidos',
      valor: 23,
      tipo: 'numero',
      icone: TrendingUp,
      cor: 'orange',
      descricao: 'Produtos em alta'
    }
  ], []);

  return {
    estatisticasGerais,
    estatisticasClientes,
    estatisticasProdutos
  };
};
