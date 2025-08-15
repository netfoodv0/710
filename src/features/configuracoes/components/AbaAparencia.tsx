import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { CustomDropdown, DropdownOption } from '../../../components/ui/CustomDropdown';
import { Type, Palette } from 'lucide-react';

interface AbaAparenciaProps {
  // Props podem ser adicionadas no futuro
  className?: string;
}

export function AbaAparencia(props: AbaAparenciaProps) {
  const [corSelecionada, setCorSelecionada] = useState('bg-blue-600');
  const [tamanhoFonte, setTamanhoFonte] = useState('media');
  const [familiaFonte, setFamiliaFonte] = useState('inter');

  const cores = [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-orange-600',
    'bg-red-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-teal-600'
  ];

  const tamanhoFonteOptions: DropdownOption[] = [
    { value: 'pequena', label: 'Pequena', icon: <Type className="w-4 h-4 text-gray-500" /> },
    { value: 'media', label: 'Média', icon: <Type className="w-4 h-4 text-gray-700" /> },
    { value: 'grande', label: 'Grande', icon: <Type className="w-4 h-4 text-gray-900" /> }
  ];

  const familiaFonteOptions: DropdownOption[] = [
    { value: 'inter', label: 'Inter (Padrão)', icon: <Type className="w-4 h-4 text-blue-500" /> },
    { value: 'roboto', label: 'Roboto', icon: <Type className="w-4 h-4 text-green-500" /> },
    { value: 'opensans', label: 'Open Sans', icon: <Type className="w-4 h-4 text-purple-500" /> },
    { value: 'poppins', label: 'Poppins', icon: <Type className="w-4 h-4 text-orange-500" /> }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-gray-900">Configurações de Aparência</h3>
        
        <div className="space-y-6">
          {/* Tema de Cores */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Tema de Cores</h4>
            <div className="space-y-3">
              <p className="text-xs text-gray-600">Escolha a cor principal do seu dashboard</p>
              <div className="flex flex-wrap gap-3">
                {cores.map((cor) => (
                  <div
                    key={cor}
                    className={`w-8 h-8 rounded-lg cursor-pointer border-2 transition-all ${
                      corSelecionada === cor ? 'border-gray-900 scale-110' : 'border-gray-300 hover:border-gray-500'
                    } ${cor}`}
                    onClick={() => setCorSelecionada(cor)}
                  ></div>
                ))}
              </div>
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
                <CustomDropdown
                  options={tamanhoFonteOptions}
                  selectedValue={tamanhoFonte}
                  onValueChange={setTamanhoFonte}
                  size="sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Família da Fonte
                </label>
                <CustomDropdown
                  options={familiaFonteOptions}
                  selectedValue={familiaFonte}
                  onValueChange={setFamiliaFonte}
                  size="sm"
                />
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