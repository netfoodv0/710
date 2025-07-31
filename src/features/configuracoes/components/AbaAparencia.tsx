import React, { useState } from 'react';
import { Card } from '../Card';
import { temasDisponiveis, coresPrincipais } from '../data/configuracaoData';

interface AbaAparenciaProps {
  // Props podem ser adicionadas no futuro
  className?: string;
}

export function AbaAparencia(props: AbaAparenciaProps) {
  const [temaSelecionado, setTemaSelecionado] = useState('light');
  const [corSelecionada, setCorSelecionada] = useState('bg-red-500');

  return (
    <Card className="p-0 min-h-[600px] rounded">
      <div className="p-6 space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Aparência</h3>
        
        <div className="space-y-6">
          {/* Tema */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Tema</h4>
            <div className="grid grid-cols-3 gap-4">
              {temasDisponiveis.map((tema) => (
                <div key={tema.key} className="text-center">
                  <div 
                    className={`w-full h-18 rounded-lg ${tema.preview} border-gray-300 mb-2 cursor-pointer hover:border-red-500 ${
                      temaSelecionado === tema.key ? 'border-red-500 border-2' : 'border-2'
                    }`}
                    onClick={() => setTemaSelecionado(tema.key)}
                  ></div>
                  <span className="text-xs text-gray-700">{tema.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cor Principal */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Cor Principal</h4>
            <div className="grid grid-cols-6 gap-3">
              {coresPrincipais.map((cor, index) => (
                <div 
                  key={index} 
                  className={`w-11 h-11 rounded-lg ${cor} cursor-pointer hover:scale-110 transition-transform ${
                    corSelecionada === cor ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                  }`}
                  onClick={() => setCorSelecionada(cor)}
                ></div>
              ))}
            </div>
          </div>

          {/* Personalização da Interface */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Personalização da Interface</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Modo Compacto</span>
                  <p className="text-xs text-gray-600">Reduz o espaçamento entre elementos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Animações</span>
                  <p className="text-xs text-gray-600">Habilita transições e animações suaves</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Sidebar Recolhida</span>
                  <p className="text-xs text-gray-600">Mantém a barra lateral sempre recolhida</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Fonte */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Configurações de Fonte</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tamanho da Fonte
                </label>
                <select className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm">
                  <option value="pequena">Pequena</option>
                  <option value="media" selected>Média</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Família da Fonte
                </label>
                <select className="bg-[#eeeeee] text-[rgb(97,97,97)] w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none text-sm">
                  <option value="inter" selected>Inter (Padrão)</option>
                  <option value="roboto">Roboto</option>
                  <option value="opensans">Open Sans</option>
                  <option value="poppins">Poppins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Pré-visualização</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${corSelecionada}`}></div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">Pedido #1234</h5>
                  <p className="text-xs text-gray-600">João Silva - R$ 45,90</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`px-3 py-1 ${corSelecionada} text-white rounded text-xs`}>
                  Confirmar
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}