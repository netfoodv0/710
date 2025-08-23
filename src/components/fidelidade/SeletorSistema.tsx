import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
import RadioSwitch from './RadioSwitch';

export function SeletorSistema() {
  const { sistemaAtivo, setSistemaAtivo } = useFidelidade();

  const options = [
    { value: 'cashback', label: 'Cashback' },
    { value: 'pontos', label: 'Pontos' }
  ];

  return (
    <div className="bg-white border rounded-lg" style={{ borderColor: '#cfd1d3', padding: '24px' }}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>
          Selecione o Sistema de Fidelidade
        </h2>
        
        <RadioSwitch
          value={sistemaAtivo}
          onChange={setSistemaAtivo}
          options={options}
          name="sistema-fidelidade"
        />
      </div>
    </div>
  );
}
