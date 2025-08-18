import React, { useState } from 'react';
import { X, Bot, Clock, MessageSquare } from 'lucide-react';
import { SettingsIcon } from '../../ui';
import { useBot } from '../../context/botContext';

interface BotSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BotSettingsModal({ isOpen, onClose }: BotSettingsModalProps) {
  const { isBotEnabled, setBotEnabled, activeChats } = useBot();
  const [defaultMessage, setDefaultMessage] = useState(() => {
    return localStorage.getItem('botDefaultMessage') || 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.';
  });
  const [businessHoursStart, setBusinessHoursStart] = useState('09:00');
  const [businessHoursEnd, setBusinessHoursEnd] = useState('18:00');
  const [enableBusinessHours, setEnableBusinessHours] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    // Aqui você pode salvar as configurações no localStorage ou banco de dados
    localStorage.setItem('botDefaultMessage', defaultMessage);
    localStorage.setItem('botBusinessHoursStart', businessHoursStart);
    localStorage.setItem('botBusinessHoursEnd', businessHoursEnd);
    localStorage.setItem('botEnableBusinessHours', enableBusinessHours.toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2a3942] rounded-lg p-6 w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-green-400" />
            <h2 className="text-white text-lg font-semibold">Configurações do Robô</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status do robô */}
        <div className="mb-6">
          <label className="flex items-center gap-3 text-white mb-3">
            <input
              type="checkbox"
              checked={isBotEnabled}
              onChange={(e) => setBotEnabled(e.target.checked)}
              className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
            />
            <span className="font-medium">Ativar robô de atendimento</span>
          </label>
          <p className="text-gray-400 text-sm ml-7">
            Quando ativado, o robô responderá automaticamente às mensagens recebidas
          </p>
          
          {/* Conversas ativas */}
          {isBotEnabled && activeChats.size > 0 && (
            <div className="mt-4 ml-7 p-3 bg-[#202c33] rounded-lg">
              <h4 className="text-white text-sm font-medium mb-2">Conversas com robô ativo:</h4>
              <div className="space-y-1">
                {Array.from(activeChats).map((chatId) => (
                  <div key={chatId} className="flex items-center gap-2 text-green-400 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Chat ID: {chatId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mensagem padrão */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Mensagem de resposta automática
          </label>
          <textarea
            value={defaultMessage}
            onChange={(e) => setDefaultMessage(e.target.value)}
            className="w-full h-24 bg-[#202c33] text-white border border-gray-600 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite a mensagem que o robô enviará para qualquer mensagem recebida..."
          />
          <p className="text-gray-400 text-sm mt-2">
            Esta mensagem será enviada automaticamente para qualquer mensagem recebida do cliente
          </p>
        </div>

        {/* Horário comercial */}
        <div className="mb-6">
          <label className="flex items-center gap-3 text-white mb-3">
            <input
              type="checkbox"
              checked={enableBusinessHours}
              onChange={(e) => setEnableBusinessHours(e.target.checked)}
              className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
            />
            <span className="font-medium">Restringir a horário comercial</span>
          </label>
          
          {enableBusinessHours && (
            <div className="ml-7 mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Início</label>
                  <input
                    type="time"
                    value={businessHoursStart}
                    onChange={(e) => setBusinessHoursStart(e.target.value)}
                    className="bg-[#202c33] text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Fim</label>
                  <input
                    type="time"
                    value={businessHoursEnd}
                    onChange={(e) => setBusinessHoursEnd(e.target.value)}
                    className="bg-[#202c33] text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-xs">
                O robô só responderá automaticamente durante este horário
              </p>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
