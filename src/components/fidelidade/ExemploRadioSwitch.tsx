import React, { useState } from 'react';
import RadioSwitch from './RadioSwitch';

export function ExemploRadioSwitch() {
  const [sistemaAtivo, setSistemaAtivo] = useState('pontos');
  const [tipoConfiguracao, setTipoConfiguracao] = useState('basica');
  const [modoExibicao, setModoExibicao] = useState('lista');

  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">Exemplos de RadioSwitch</h3>
      
      {/* Exemplo 1: Sistema de Fidelidade */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Sistema de Fidelidade</h4>
        <RadioSwitch
          value={sistemaAtivo}
          onChange={setSistemaAtivo}
          options={[
            { value: 'cashback', label: 'Cashback' },
            { value: 'pontos', label: 'Pontos' }
          ]}
          name="sistema-fidelidade"
        />
        <p className="text-sm text-gray-600 mt-2">
          Sistema selecionado: <strong>{sistemaAtivo}</strong>
        </p>
      </div>

      {/* Exemplo 2: Tipo de Configuração */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Tipo de Configuração</h4>
        <RadioSwitch
          value={tipoConfiguracao}
          onChange={setTipoConfiguracao}
          options={[
            { value: 'basica', label: 'Básica' },
            { value: 'avancada', label: 'Avançada' }
          ]}
          name="tipo-configuracao"
        />
        <p className="text-sm text-gray-600 mt-2">
          Configuração: <strong>{tipoConfiguracao}</strong>
        </p>
      </div>

      {/* Exemplo 3: Modo de Exibição */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Modo de Exibição</h4>
        <RadioSwitch
          value={modoExibicao}
          onChange={setModoExibicao}
          options={[
            { value: 'lista', label: 'Lista' },
            { value: 'grid', label: 'Grid' }
          ]}
          name="modo-exibicao"
        />
        <p className="text-sm text-gray-600 mt-2">
          Modo: <strong>{modoExibicao}</strong>
        </p>
      </div>
    </div>
  );
}
