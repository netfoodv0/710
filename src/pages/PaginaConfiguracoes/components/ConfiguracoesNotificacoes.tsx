import React from 'react';
import { ConfiguracoesNotificacoesProps } from '../types';

export function ConfiguracoesNotificacoes({ config, onConfigChange, loading }: ConfiguracoesNotificacoesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Notificações</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notificacoesEmail"
            checked={config.notificacoesEmail || false}
            onChange={(e) => onConfigChange({ notificacoesEmail: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="notificacoesEmail" className="ml-2 block text-sm text-gray-900">
            Notificações por email
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notificacoesSMS"
            checked={config.notificacoesSMS || false}
            onChange={(e) => onConfigChange({ notificacoesSMS: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="notificacoesSMS" className="ml-2 block text-sm text-gray-900">
            Notificações por SMS
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notificacoesPush"
            checked={config.notificacoesPush || false}
            onChange={(e) => onConfigChange({ notificacoesPush: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="notificacoesPush" className="ml-2 block text-sm text-gray-900">
            Notificações push
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notificarMudancaHorario"
            checked={config.configuracaoAvancada?.notificarMudancaHorario || false}
            onChange={(e) => onConfigChange({ 
              configuracaoAvancada: { 
                ...config.configuracaoAvancada, 
                notificarMudancaHorario: e.target.checked 
              }
            })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="notificarMudancaHorario" className="ml-2 block text-sm text-gray-900">
            Notificar mudanças de horário
          </label>
        </div>
      </div>
    </div>
  );
}
