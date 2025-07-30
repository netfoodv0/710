import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users,
  Clock,
  Star,
  Plus,
  Package
} from 'lucide-react';
import { MobileCard } from './MobileCard';
import { MobileButton } from './MobileButton';
import { useDashboard } from '../../hooks/useDashboard';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

function MetricCard({ title, value, change, isPositive, icon, color, trend }: MetricCardProps) {
  return (
    <MobileCard className="flex items-center gap-4 p-4" variant="interactive">
      <div className={`p-3 rounded-2xl ${color} flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 truncate">{title}</p>
        <p className="text-xl font-bold text-gray-900 truncate">{value}</p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className={`w-3 h-3 ${
            trend === 'up' ? 'text-green-500' : 
            trend === 'down' ? 'text-red-500' : 'text-gray-400'
          }`} />
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {change}
          </span>
        </div>
      </div>
    </MobileCard>
  );
}

export function MobileDashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <MobileCard key={i} loading={true} />
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: 'Vendas Hoje',
      value: `R$ ${data?.vendasHoje || '0'}`,
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: 'up' as const
    },
    {
      title: 'Pedidos',
      value: data?.pedidosHoje?.toString() || '0',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: 'up' as const
    },
    {
      title: 'Tempo Médio',
      value: `${data?.tempoMedio || '0'} min`,
      change: '-5.1%',
      isPositive: true,
      icon: <Clock className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: 'down' as const
    },
    {
      title: 'Avaliação',
      value: `${data?.avaliacaoMedia || '0'}/5`,
      change: '+0.3',
      isPositive: true,
      icon: <Star className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      trend: 'up' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <MobileCard>
        <h3 className="font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <MobileButton
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            className="h-12"
          >
            Novo Pedido
          </MobileButton>
          <MobileButton
            variant="success"
            size="sm"
            icon={<Package className="w-4 h-4" />}
            className="h-12"
          >
            Adicionar Produto
          </MobileButton>
        </div>
      </MobileCard>

      {/* Recent Orders */}
      <MobileCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Pedidos Recentes</h3>
          <MobileButton variant="ghost" size="sm">
            Ver todos
          </MobileButton>
        </div>
        <div className="space-y-3">
          {data?.pedidosRecentes?.slice(0, 3).map((pedido, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">#{pedido.id}</p>
                <p className="text-sm text-gray-600 truncate">{pedido.cliente}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-medium text-gray-900">R$ {pedido.valor}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  pedido.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                  pedido.status === 'Preparando' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {pedido.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </MobileCard>
    </div>
  );
} 