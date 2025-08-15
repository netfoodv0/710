import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface CupomErrorStateProps {
  error: string;
  onRetry: () => void;
  onClearError: () => void;
}

export function CupomErrorState({ error, onRetry, onClearError }: CupomErrorStateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      <div className="flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Erro ao carregar cupons</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={onRetry}
                  variant="outline"
                  size="sm"
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
      
                </Button>
                <Button
                  onClick={onClearError}
                  variant="ghost"
                  size="sm"
                  className="text-red-700 hover:bg-red-100"
                >
                  Dispensar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}