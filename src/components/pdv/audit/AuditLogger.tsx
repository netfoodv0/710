import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FileText, Download, Trash2, Eye, Clock, User, Activity } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
  action: string;
  details: string;
  category: 'order' | 'product' | 'customer' | 'payment' | 'system';
  severity: 'info' | 'warning' | 'error';
  metadata?: Record<string, any>;
}

interface AuditContextType {
  logs: AuditLog[];
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  exportLogs: () => void;
  getLogsByCategory: (category: AuditLog['category']) => AuditLog[];
  getLogsByUser: (userId: string) => AuditLog[];
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit deve ser usado dentro de AuditProvider');
  }
  return context;
};

interface AuditProviderProps {
  children: ReactNode;
}

export const AuditProvider: React.FC<AuditProviderProps> = ({ children }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const addLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setLogs(prev => [newLog, ...prev]);

    // Em produção, enviar para servidor
    console.log('Audit Log:', newLog);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const csvContent = [
      ['ID', 'Timestamp', 'User', 'Action', 'Details', 'Category', 'Severity'],
      ...logs.map(log => [
        log.id,
        log.timestamp.toISOString(),
        log.userName || 'Unknown',
        log.action,
        log.details,
        log.category,
        log.severity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getLogsByCategory = (category: AuditLog['category']) => {
    return logs.filter(log => log.category === category);
  };

  const getLogsByUser = (userId: string) => {
    return logs.filter(log => log.userId === userId);
  };

  const value: AuditContextType = {
    logs,
    addLog,
    clearLogs,
    exportLogs,
    getLogsByCategory,
    getLogsByUser
  };

  return (
    <AuditContext.Provider value={value}>
      {children}
    </AuditContext.Provider>
  );
};

// Componente para visualizar logs
export const AuditLogViewer: React.FC = () => {
  const { logs, clearLogs, exportLogs } = useAudit();
  const [selectedCategory, setSelectedCategory] = useState<AuditLog['category'] | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<AuditLog['severity'] | 'all'>('all');

  const filteredLogs = logs.filter(log => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    return matchesCategory && matchesSeverity;
  });

  const getSeverityColor = (severity: AuditLog['severity']) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryIcon = (category: AuditLog['category']) => {
    switch (category) {
      case 'order': return <Activity size={16} />;
      case 'product': return <FileText size={16} />;
      case 'customer': return <User size={16} />;
      case 'payment': return <FileText size={16} />;
      case 'system': return <Activity size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Logs de Auditoria</h3>
        <div className="flex space-x-2">
          <button
            onClick={exportLogs}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Exportar</span>
          </button>
          <button
            onClick={clearLogs}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 size={16} />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as AuditLog['category'] | 'all')}
            className="p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todas</option>
            <option value="order">Pedidos</option>
            <option value="product">Produtos</option>
            <option value="customer">Clientes</option>
            <option value="payment">Pagamentos</option>
            <option value="system">Sistema</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value as AuditLog['severity'] | 'all')}
            className="p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todas</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Lista de Logs */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={`p-3 rounded-lg border ${getSeverityColor(log.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getCategoryIcon(log.category)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{log.action}</span>
                    <span className="text-xs opacity-75">
                      {log.timestamp.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm">{log.details}</p>
                  {log.userName && (
                    <p className="text-xs opacity-75 mt-1">
                      Usuário: {log.userName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="capitalize">{log.category}</span>
                <span className="capitalize">{log.severity}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText size={48} className="mx-auto mb-2 opacity-50" />
            <p>Nenhum log encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};
