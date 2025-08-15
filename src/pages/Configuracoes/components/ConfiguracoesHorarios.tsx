import React, { useState } from 'react';
import { Clock, Plus, Trash2, Calendar, Settings, AlertCircle } from 'lucide-react';
import { ConfiguracaoLoja, HorarioPausa } from '../../../types';
import { diasSemana } from '../data/abasConfig';

interface ConfiguracoesHorariosProps {
  config: ConfiguracaoLoja;
  setConfig: React.Dispatch<React.SetStateAction<ConfiguracaoLoja>>;
  handleHorarioChange: (dia: keyof typeof config.horarioFuncionamento, campo: any, valor: string | boolean) => void;
  adicionarPausa: (dia: keyof typeof config.horarioFuncionamento) => void;
  removerPausa: (dia: keyof typeof config.horarioFuncionamento, index: number) => void;
  atualizarPausa: (dia: keyof typeof config.horarioFuncionamento, index: number, campo: keyof HorarioPausa, valor: string | boolean) => void;
  adicionarHorarioEspecial: () => void;
  removerHorarioEspecial: (id: string) => void;
  atualizarHorarioEspecial: (id: string, campo: any, valor: any) => void;
  atualizarConfiguracaoAvancada: (campo: any, valor: boolean | number) => void;
}

export function ConfiguracoesHorarios({
  config,
  handleHorarioChange,
  adicionarPausa,
  removerPausa,
  atualizarPausa,
  adicionarHorarioEspecial,
  removerHorarioEspecial,
  atualizarHorarioEspecial,
  atualizarConfiguracaoAvancada
}: ConfiguracoesHorariosProps) {
  const [abaSelecionada, setAbaSelecionada] = useState<'normal' | 'especiais' | 'avancado'>('normal');

  const renderHorarioNormal = () => (
    <div className="space-y-4">
      {diasSemana.map((dia) => {
        const horario = config.horarioFuncionamento[dia.key];
        
        return (
          <div key={dia.key} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={horario.ativo}
                    onChange={(e) => handleHorarioChange(dia.key, 'ativo', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                
                <span className={`text-sm font-medium ${horario.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                  {dia.label}
                </span>
              </div>
              
              {horario.ativo && (
                <button
                  onClick={() => adicionarPausa(dia.key)}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar Pausa
                </button>
              )}
            </div>
            
            {horario.ativo && (
              <div className="space-y-4">
                {/* Horários principais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Abertura</label>
                    <input
                      type="time"
                      value={horario.abertura}
                      onChange={(e) => handleHorarioChange(dia.key, 'abertura', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fechamento</label>
                    <input
                      type="time"
                      value={horario.fechamento}
                      onChange={(e) => handleHorarioChange(dia.key, 'fechamento', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pedidos até</label>
                    <input
                      type="time"
                      value={horario.pedidoAte || ''}
                      onChange={(e) => handleHorarioChange(dia.key, 'pedidoAte', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entrega até</label>
                    <input
                      type="time"
                      value={horario.entregaAte || ''}
                      onChange={(e) => handleHorarioChange(dia.key, 'entregaAte', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                {/* Pausas */}
                {horario.pausas.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">Pausas</h5>
                    {horario.pausas.map((pausa, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                        <input
                          type="checkbox"
                          checked={pausa.ativo}
                          onChange={(e) => atualizarPausa(dia.key, index, 'ativo', e.target.checked)}
                          className="rounded"
                        />
                        <input
                          type="time"
                          value={pausa.inicio}
                          onChange={(e) => atualizarPausa(dia.key, index, 'inicio', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-gray-500">até</span>
                        <input
                          type="time"
                          value={pausa.fim}
                          onChange={(e) => atualizarPausa(dia.key, index, 'fim', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          value={pausa.motivo || ''}
                          onChange={(e) => atualizarPausa(dia.key, index, 'motivo', e.target.value)}
                          placeholder="Motivo (opcional)"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <button
                          onClick={() => removerPausa(dia.key, index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderHorariosEspeciais = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Horários Especiais</h4>
        <button
          onClick={adicionarHorarioEspecial}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar Horário Especial
        </button>
      </div>
      
      {config.horariosEspeciais.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Nenhum horário especial configurado</p>
          <p className="text-sm">Adicione horários para feriados, eventos ou datas especiais</p>
        </div>
      ) : (
        <div className="space-y-4">
          {config.horariosEspeciais.map((horario) => (
            <div key={horario.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={horario.ativo}
                      onChange={(e) => atualizarHorarioEspecial(horario.id, 'ativo', e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                  
                  <span className={`text-sm font-medium ${horario.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                    {new Date(horario.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <button
                  onClick={() => removerHorarioEspecial(horario.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {horario.ativo && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                    <input
                      type="date"
                      value={horario.data}
                      onChange={(e) => atualizarHorarioEspecial(horario.id, 'data', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Abertura</label>
                    <input
                      type="time"
                      value={horario.abertura}
                      onChange={(e) => atualizarHorarioEspecial(horario.id, 'abertura', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fechamento</label>
                    <input
                      type="time"
                      value={horario.fechamento}
                      onChange={(e) => atualizarHorarioEspecial(horario.id, 'fechamento', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Motivo</label>
                    <input
                      type="text"
                      value={horario.motivo}
                      onChange={(e) => atualizarHorarioEspecial(horario.id, 'motivo', e.target.value)}
                      placeholder="Ex: Feriado, Evento especial"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderConfiguracaoAvancada = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-medium text-gray-900">Configurações Avançadas</h4>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <h5 className="font-medium text-gray-900 text-sm">Aceitar pedidos fora do horário</h5>
            <p className="text-sm text-gray-600">Permitir que clientes façam pedidos mesmo quando fechado</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.configuracaoAvancada.aceitarPedidosForaHorario}
              onChange={(e) => atualizarConfiguracaoAvancada('aceitarPedidosForaHorario', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <h5 className="font-medium text-gray-900 text-sm">Pausa automática</h5>
            <p className="text-sm text-gray-600">Pausar automaticamente pedidos durante intervalos configurados</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.configuracaoAvancada.pausaAutomatica}
              onChange={(e) => atualizarConfiguracaoAvancada('pausaAutomatica', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <h5 className="font-medium text-gray-900 text-sm">Notificar mudanças de horário</h5>
            <p className="text-sm text-gray-600">Enviar notificações quando horários forem alterados</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.configuracaoAvancada.notificarMudancaHorario}
              onChange={(e) => atualizarConfiguracaoAvancada('notificarMudancaHorario', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-3">
            <h5 className="font-medium text-gray-900 text-sm">Tempo limite para entrega</h5>
            <p className="text-sm text-gray-600">Tempo máximo em minutos para completar uma entrega</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="15"
              max="180"
              value={config.configuracaoAvancada.tempoLimiteEntrega}
              onChange={(e) => atualizarConfiguracaoAvancada('tempoLimiteEntrega', parseInt(e.target.value))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-600">minutos</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm min-h-[600px]">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Horários de Funcionamento</h3>
        
        {/* Abas */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setAbaSelecionada('normal')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                abaSelecionada === 'normal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horários Normais
              </div>
            </button>
            
            <button
              onClick={() => setAbaSelecionada('especiais')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                abaSelecionada === 'especiais'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Horários Especiais
                {config.horariosEspeciais.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {config.horariosEspeciais.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setAbaSelecionada('avancado')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                abaSelecionada === 'avancado'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurações Avançadas
              </div>
            </button>
          </nav>
        </div>
        
        {/* Conteúdo das abas */}
        <div className="mt-6">
          {abaSelecionada === 'normal' && renderHorarioNormal()}
          {abaSelecionada === 'especiais' && renderHorariosEspeciais()}
          {abaSelecionada === 'avancado' && renderConfiguracaoAvancada()}
        </div>
        
        {/* Informações Adicionais */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-900">Dicas de Configuração</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Configure horários de abertura e fechamento para cada dia</li>
            <li>• Defina horários limite para pedidos e entregas</li>
            <li>• Adicione pausas para almoço ou intervalos</li>
            <li>• Use horários especiais para feriados e eventos</li>
            <li>• Configure opções avançadas para maior controle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}