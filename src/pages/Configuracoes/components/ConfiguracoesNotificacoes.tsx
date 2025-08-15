import React from 'react';
import { Bell } from 'lucide-react';

export function ConfiguracoesNotificacoes() {
  const notificacoes = [
    { 
      key: 'novoPedido', 
      label: 'Novo pedido recebido', 
      desc: 'Receber notificação quando um novo pedido for feito',
      defaultChecked: true
    },
    { 
      key: 'pedidoCancelado', 
      label: 'Pedido cancelado', 
      desc: 'Notificar quando um pedido for cancelado',
      defaultChecked: true
    },
    { 
      key: 'novaAvaliacao', 
      label: 'Nova avaliação', 
      desc: 'Receber notificação de novas avaliações de clientes',
      defaultChecked: true
    },
    { 
      key: 'baixoEstoque', 
      label: 'Estoque baixo', 
      desc: 'Alertar quando produtos estiverem com estoque baixo',
      defaultChecked: false
    },
    { 
      key: 'relatoriosDiarios', 
      label: 'Relatórios diários', 
      desc: 'Receber resumo diário de vendas por e-mail',
      defaultChecked: false
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm min-h-[600px]">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Configurações de Notificações</h3>
        
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
                  defaultChecked={notif.defaultChecked}
                />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="bg-yellow-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-600" />
            <h4 className="text-sm font-medium text-yellow-900">Sobre as Notificações</h4>
          </div>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• As notificações aparecerão no painel e podem ser enviadas por e-mail</li>
            <li>• Você pode personalizar quais notificações deseja receber</li>
            <li>• Notificações importantes sempre serão exibidas</li>
            <li>• Configure seu e-mail para receber relatórios diários</li>
          </ul>
        </div>
      </div>
    </div>
  );
}