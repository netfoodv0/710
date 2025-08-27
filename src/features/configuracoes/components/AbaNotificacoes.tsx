import React, { useState } from 'react';
import { Card } from '../../../components/Card';
import { Calendar } from 'lucide-react';
import { CustomDropdown, DropdownOption } from '../../../components/forms/CustomDropdown';
import { FormSwitch } from '../../../components/forms/FormSwitch';

interface AbaNotificacoesProps {
  // Props podem ser adicionadas no futuro
  className?: string;
}

export function AbaNotificacoes(props: AbaNotificacoesProps) {
  const [frequenciaBackup, setFrequenciaBackup] = useState('diario');

  const notificacoes = [
    { key: 'novos_pedidos', label: 'Novos Pedidos', desc: 'Receber notificação quando chegar um novo pedido', ativo: true },
    { key: 'pedidos_cancelados', label: 'Pedidos Cancelados', desc: 'Receber notificação quando um pedido for cancelado', ativo: true },
    { key: 'pedidos_entregues', label: 'Pedidos Entregues', desc: 'Receber notificação quando um pedido for entregue', ativo: false },
    { key: 'estoque_baixo', label: 'Estoque Baixo', desc: 'Receber notificação quando produtos estiverem com estoque baixo', ativo: true },
    { key: 'relatorios_diarios', label: 'Relatórios Diários', desc: 'Receber relatório diário por e-mail', ativo: false },
  ];

  const handleToggleNotificacao = (key: string) => {
    // Lógica para alternar notificação
  };

  const frequenciaOptions: DropdownOption[] = [
    { value: 'diario', label: 'Diário', icon: <Calendar className="w-4 h-4 text-blue-500" /> },
    { value: 'semanal', label: 'Semanal', icon: <Calendar className="w-4 h-4 text-green-500" /> },
    { value: 'mensal', label: 'Mensal', icon: <Calendar className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Notificações</h3>
        
        <div className="space-y-4">
          {notificacoes.map((notif) => (
            <div key={notif.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{notif.label}</h4>
                <p className="text-xs text-gray-600">{notif.desc}</p>
              </div>
              <FormSwitch
                name={notif.key}
                label=""
                checked={notif.ativo}
                onChange={() => handleToggleNotificacao(notif.key)}
                className="mb-0"
              />
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
                <CustomDropdown
                  options={frequenciaOptions}
                  selectedValue={frequenciaBackup}
                  onValueChange={setFrequenciaBackup}
                  size="sm"
                />
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
              <FormSwitch
                name="somNovosPedidos"
                label=""
                checked={true}
                onChange={() => {}}
                className="mb-0"
              />
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
