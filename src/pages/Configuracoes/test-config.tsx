import React from 'react';
import { useConfiguracoes } from './hooks/useConfiguracoes';

export function TestConfiguracoes() {
  const { config, setConfig, salvando, handleSalvar } = useConfiguracoes();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Configurações</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Configuração Atual:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Teste de Funcionalidades:</h2>
          <div className="space-y-2">
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {salvando ? 'Salvando...' : 'Testar Salvamento'}
            </button>

            <button
              onClick={() => setConfig(prev => ({
                ...prev,
                nomeRestaurante: 'Restaurante Teste ' + Date.now()
              }))}
              className="px-4 py-2 bg-green-500 text-white rounded ml-2"
            >
              Alterar Nome
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Status:</h2>
          <p>Salvando: {salvando ? 'Sim' : 'Não'}</p>
          <p>Nome do Restaurante: {config.nomeRestaurante}</p>
          <p>Email: {config.email}</p>
          <p>Telefone: {config.telefone}</p>
        </div>
      </div>
    </div>
  );
} 
