import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ConfiguracaoLoja } from '../../types';
import {
  ConfiguracoesSidebar,
  ConfiguracoesGeral,
  ConfiguracoesEntrega,
  ConfiguracoesHorarios,
  ConfiguracoesNotificacoes,
  ConfiguracoesAparencia
} from './components';
import { configuracaoMock } from './data/configuracaoMock';
import { useConfiguracoes } from './hooks/useConfiguracoes';

type AbaSelecionada = 'geral' | 'entrega' | 'horarios' | 'notificacoes' | 'aparencia';

export function Configuracoes() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaSelecionada>('geral');
  const { config, setConfig, salvando, handleSalvar } = useConfiguracoes({ configuracaoInicial: configuracaoMock });

  const renderAbaConteudo = () => {
    switch (abaSelecionada) {
      case 'geral':
        return <ConfiguracoesGeral config={config} setConfig={setConfig} />;
      case 'entrega':
        return <ConfiguracoesEntrega config={config} setConfig={setConfig} />;
      case 'horarios':
        return <ConfiguracoesHorarios config={config} setConfig={setConfig} />;
      case 'notificacoes':
        return <ConfiguracoesNotificacoes />;
      case 'aparencia':
        return <ConfiguracoesAparencia />;
      default:
        return <ConfiguracoesGeral config={config} setConfig={setConfig} />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Cabeçalho */}
      <div className="bg-white border border-slate-200 rounded">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-1 text-xs">
                Gerencie as configurações do seu restaurante
              </p>
            </div>
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="inline-flex items-center gap-2 px-5 py-1.5 bg-red-500 text-white rounded font-medium transition-all duration-200 hover:bg-red-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            >
              <Save className="w-5 h-5" />
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Menu Lateral */}
        <div className="lg:col-span-1">
          <ConfiguracoesSidebar 
            abaSelecionada={abaSelecionada} 
            onAbaChange={(aba) => setAbaSelecionada(aba as AbaSelecionada)} 
          />
        </div>

        {/* Conteúdo */}
        <div className="lg:col-span-3">
          {renderAbaConteudo()}
        </div>
      </div>
    </div>
  );
} 