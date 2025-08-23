import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export const DashboardError: React.FC<DashboardErrorProps> = ({ error, onRetry }) => (
  <div className="min-h-screen dashboard-container">
    <div className="flex items-center justify-center p-6">
      <div className="dashboard-card p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-medium text-red-800">Erro ao carregar dashboard</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors dashboard-border"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  </div>
);
