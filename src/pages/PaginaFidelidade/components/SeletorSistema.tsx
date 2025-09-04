import React from 'react';
import { SistemaFidelidade } from '../types';
import RadioSwitch from '../../../components/fidelidade/RadioSwitch';

interface SeletorSistemaProps {
  sistemaAtivo: SistemaFidelidade;
  onSistemaChange: (sistema: SistemaFidelidade) => void;
}

export function SeletorSistema({ sistemaAtivo, onSistemaChange }: SeletorSistemaProps) {
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
          onChange={onSistemaChange}
          options={options}
          name="sistema-fidelidade"
        />
      </div>
    </div>
  );
}
