import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users,
  Clock,
  Star
} from 'lucide-react';
import { MobileCard } from './MobileCard';
import { useDashboard } from '../../hooks/useDashboard';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, isPositive, icon, color }: MetricCardProps) {
  return (
    <MobileCard className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className={`w-3 h-3 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
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
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-24 rounded-xl"></div>
          </div>
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
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      value: data?.pedidosHoje?.toString() || '0',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Tempo Médio',
      value: `${data?.tempoMedio || '0'} min`,
      change: '-5.1%',
      isPositive: true,
      icon: <Clock className="w-6 h-6 text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Avaliação',
      value: `${data?.avaliacaoMedia || '0'}/5`,
      change: '+0.3',
      isPositive: true,
      icon: <Star className="w-6 h-6 text-white" />,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
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
          <button className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            Novo Pedido
          </button>
          <button className="p-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors">
            Adicionar Produto
          </button>
        </div>
      </MobileCard>

      {/* Recent Orders */}
      <MobileCard>
        <h3 className="font-semibold text-gray-900 mb-4">Pedidos Recentes</h3>
        <div className="space-y-3">
          {data?.pedidosRecentes?.slice(0, 3).map((pedido, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">#{pedido.id}</p>
                <p className="text-sm text-gray-600">{pedido.cliente}</p>
              </div>
              <div className="text-right">
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