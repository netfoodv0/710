import React from 'react';
import { Palette } from 'lucide-react';

export function ConfiguracoesAparencia() {
  const temas = [
    { key: 'light', label: 'Claro', preview: 'bg-white border-2' },
    { key: 'dark', label: 'Escuro', preview: 'bg-gray-900 border-2' },
    { key: 'auto', label: 'Automático', preview: 'bg-gradient-to-r from-white to-gray-900 border-2' }
  ];

  const cores = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 
    'bg-purple-500', 'bg-orange-500', 'bg-pink-500'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded shadow-none min-h-[600px]">
      <div className="p-4 space-y-4">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Aparência</h3>
        
        <div className="space-y-4">
          {/* Tema */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Tema</h4>
            <div className="grid grid-cols-3 gap-4">
              {temas.map((tema) => (
                <div key={tema.key} className="text-center">
                  <div className={`w-full h-18 rounded-lg ${tema.preview} border-gray-300 mb-2 cursor-pointer hover:border-red-500 transition-colors`}></div>
                  <span className="text-xs text-gray-700">{tema.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cor Principal */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Cor Principal</h4>
            <div className="grid grid-cols-6 gap-3">
              {cores.map((cor, index) => (
                <div 
                  key={index} 
                  className={`w-11 h-11 rounded-lg ${cor} cursor-pointer hover:scale-110 transition-transform border-2 border-transparent hover:border-gray-300`}
                ></div>
              ))}
            </div>
          </div>

          {/* Configurações Adicionais */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 text-sm">Outras Configurações</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">Animações</h5>
                  <p className="text-xs text-gray-600">Ativar animações e transições</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">Modo Compacto</h5>
                  <p className="text-xs text-gray-600">Reduzir espaçamentos e tamanhos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">Alta Contraste</h5>
                  <p className="text-xs text-gray-600">Melhorar legibilidade</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-purple-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-600" />
            <h4 className="text-xs font-medium text-purple-900">Personalização</h4>
          </div>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• Escolha entre tema claro, escuro ou automático</li>
            <li>• Personalize a cor principal do sistema</li>
            <li>• Ative ou desative animações conforme sua preferência</li>
            <li>• Use o modo compacto para mais informações na tela</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 