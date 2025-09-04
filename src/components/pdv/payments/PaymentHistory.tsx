import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Download, Eye, Receipt, CreditCard, DollarSign, QrCode } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { PaymentMethod } from './PaymentMethodSelector';

export interface PaymentRecord {
  id: string;
  orderId: string;
  customerName?: string;
  orderType: 'dine-in' | 'delivery' | 'takeaway';
  tableNumber?: string;
  deliveryAddress?: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  taxAmount: number;
  serviceCharge: number;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  installments: number;
  amountPaid: number;
  changeAmount: number;
  notes: string;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
  cashierName: string;
}

interface PaymentHistoryProps {
  payments: PaymentRecord[];
  onPaymentView: (payment: PaymentRecord) => void;
  onPaymentExport: () => void;
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  payments,
  onPaymentView,
  onPaymentExport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentRecord['status'] | 'all'>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'customer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtrar e ordenar pagamentos
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.cashierName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.paymentMethod.id === methodFilter;
      
      let matchesDate = true;
      const now = new Date();
      const paymentDate = new Date(payment.createdAt);
      
      switch (dateFilter) {
        case 'today':
          matchesDate = paymentDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= monthAgo;
          break;
      }
      
      return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'amount':
          comparison = a.total - b.total;
          break;
        case 'customer':
          comparison = (a.customerName || '').localeCompare(b.customerName || '');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusBadge = (status: PaymentRecord['status']) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      cancelled: 'destructive',
      refunded: 'outline'
    };
    
    const labels = {
      completed: 'Concluído',
      pending: 'Pendente',
      cancelled: 'Cancelado',
      refunded: 'Reembolsado'
    };
    
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'cash': return <DollarSign className="h-4 w-4" />;
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'pix': return <QrCode className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getOrderTypeInfo = (payment: PaymentRecord) => {
    switch (payment.orderType) {
      case 'dine-in':
        return { icon: '🍽️', label: `Mesa ${payment.tableNumber || 'N/A'}` };
      case 'delivery':
        return { icon: '🚚', label: 'Delivery' };
      case 'takeaway':
        return { icon: '📦', label: 'Retirada' };
    }
  };

  const calculateTotals = () => {
    const total = filteredPayments.reduce((sum, p) => sum + p.total, 0);
    const completed = filteredPayments.filter(p => p.status === 'completed').length;
    const pending = filteredPayments.filter(p => p.status === 'pending').length;
    
    return { total, completed, pending };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <History className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">Histórico de Pagamentos</h3>
        </div>
        <Button onClick={onPaymentExport} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{filteredPayments.length}</div>
          <div className="text-sm text-blue-800">Total de Pagamentos</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">R$ {totals.total.toFixed(2)}</div>
          <div className="text-sm text-green-800">Valor Total</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{totals.completed}</div>
          <div className="text-sm text-purple-800">Concluídos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cliente, Pedido..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PaymentRecord['status'] | 'all')}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="completed">Concluído</option>
            <option value="pending">Pendente</option>
            <option value="cancelled">Cancelado</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Método</label>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="cash">Dinheiro</option>
            <option value="credit_card">Cartão Crédito</option>
            <option value="debit_card">Cartão Débito</option>
            <option value="pix">PIX</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="today">Hoje</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar</label>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field as any);
              setSortOrder(order as any);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="date-desc">Data (Mais Recente)</option>
            <option value="date-asc">Data (Mais Antiga)</option>
            <option value="amount-desc">Valor (Maior)</option>
            <option value="amount-asc">Valor (Menor)</option>
            <option value="customer-asc">Cliente (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Lista de Pagamentos */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredPayments.map((payment) => {
          const orderInfo = getOrderTypeInfo(payment);
          
          return (
            <div
              key={payment.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
              onClick={() => onPaymentView(payment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        Pedido #{payment.orderId}
                      </span>
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{orderInfo.icon} {orderInfo.label}</span>
                      {payment.customerName && (
                        <span>👤 {payment.customerName}</span>
                      )}
                      <span>💰 R$ {payment.total.toFixed(2)}</span>
                      <span>🕒 {formatDate(payment.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    R$ {payment.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {payment.paymentMethod.name}
                  </div>
                  {payment.installments > 1 && (
                    <div className="text-xs text-blue-600">
                      {payment.installments}x
                    </div>
                  )}
                </div>
              </div>
              
              {/* Itens do Pedido (Preview) */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-1">
                  {payment.items.length} item(s)
                </div>
                <div className="flex flex-wrap gap-1">
                  {payment.items.slice(0, 3).map((item, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.quantity}x {item.name}
                    </span>
                  ))}
                  {payment.items.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{payment.items.length - 3} mais
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredPayments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <History size={48} className="mx-auto mb-2 opacity-50" />
            <p>Nenhum pagamento encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Paginação (se necessário) */}
      {filteredPayments.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {filteredPayments.length} de {payments.length} pagamentos
            </span>
            <span>
              Total: R$ {totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
