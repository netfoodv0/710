import React, { useState } from 'react';
import { Card } from '../Card';
import { NotificacaoConfig } from '../../types';
import { tiposNotificacao } from '../../data/configuracaoMock';

interface AbaNotificacoesProps {
  // Props podem ser adicionadas no futuro
  className?: string;
}

export function AbaNotificacoes(props: AbaNotificacoesProps) {
  const [notificacoes, setNotificacoes] = useState<NotificacaoConfig[]>(
    tiposNotificacao.map(notif => ({ ...notif, ativo: true }))
  );

  const handleToggleNotificacao = (key: string) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.key === key ? { ...notif, ativo: !notif.ativo } : notif
      )
    );
  };

  return (
    <Card className="p-0 min-h-[600px] rounded">
      <div className="p-6 space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Notificações</h3>
        
        <div className="space-y-4">
          {notificacoes.map((notif) => (
            <div key={notif.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{notif.label}</h4>
                <p className="text-xs text-gray-600">{notif.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notif.ativo}
                  onChange={() => handleToggleNotificacao(notif.key)}
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Configurações de E-mail */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Configurações de E-mail</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                E-mail para Notificações
              </label>
              <input
                type="email"
                placeholder="admin@restaurante.com"
                className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Horário do Relatório Diário
                </label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Frequência de Backup
                </label>
                <select className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm">
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Som */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Configurações de Som</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-900">Som para Novos Pedidos</span>
                <p className="text-xs text-gray-600">Reproduzir som quando receber um novo pedido</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Volume das Notificações
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Silencioso</span>
                <span>Alto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}