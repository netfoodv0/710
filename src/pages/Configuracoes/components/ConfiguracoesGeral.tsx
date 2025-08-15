import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { ConfiguracaoLoja } from '../../../types';

interface ConfiguracoesGeralProps {
  config: ConfiguracaoLoja;
  setConfig: React.Dispatch<React.SetStateAction<ConfiguracaoLoja>>;
}

export function ConfiguracoesGeral({ config, setConfig }: ConfiguracoesGeralProps) {
  const handleInputChange = (field: keyof ConfiguracaoLoja, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEnderecoChange = (field: keyof typeof config.endereco, value: string) => {
    setConfig(prev => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Informações Gerais</h3>
        
        {/* Logo do Restaurante */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Logo do Restaurante</h4>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-[#ebebeb] rounded-xl flex items-center justify-center border-[0.7px] border-dashed border-gray-300">
              <Camera className="w-7 h-7 text-gray-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Formato recomendado: PNG, JPG (máx. 2MB)</p>
                <p className="text-xs text-gray-500">Dimensões: 200x200px</p>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs">
                <Upload className="w-3.5 h-3.5" />
                Alterar Logo
              </button>
            </div>
          </div>
        </div>

        {/* Banner do Restaurante */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Banner do Restaurante</h4>
          <div className="flex items-start gap-4">
            <div className="w-full max-w-72 h-28 bg-[#ebebeb] rounded-xl flex items-center justify-center border-[0.7px] border-dashed border-gray-300">
              <Camera className="w-7 h-7 text-gray-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Formato recomendado: PNG, JPG (máx. 5MB)</p>
                <p className="text-xs text-gray-500">Dimensões: 800x200px</p>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs">
                <Upload className="w-3.5 h-3.5" />
                Alterar Banner
              </button>
            </div>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Restaurante
            </label>
            <input
              type="text"
              value={config.nomeRestaurante}
              onChange={(e) => handleInputChange('nomeRestaurante', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              value={config.cnpj}
              onChange={(e) => handleInputChange('cnpj', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="text"
              value={config.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Endereço</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rua
              </label>
              <input
                type="text"
                value={config.endereco.rua}
                onChange={(e) => handleEnderecoChange('rua', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                value={config.endereco.bairro}
                onChange={(e) => handleEnderecoChange('bairro', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                value={config.endereco.cidade}
                onChange={(e) => handleEnderecoChange('cidade', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                value={config.endereco.estado}
                onChange={(e) => handleEnderecoChange('estado', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                value={config.endereco.cep}
                onChange={(e) => handleEnderecoChange('cep', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}