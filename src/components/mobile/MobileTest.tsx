import React from 'react';
import { MobileCard } from './MobileCard';
import { MobileButton } from './MobileButton';
import { MobileInput } from './MobileInput';
import { cn } from '../../utils';

export function MobileTest() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-gray-900">Teste dos Componentes Mobile</h1>
      
      {/* Teste do MobileCard */}
      <MobileCard>
        <h2 className="text-lg font-semibold mb-2">Teste do MobileCard</h2>
        <p className="text-gray-600">Este é um teste do componente MobileCard funcionando corretamente.</p>
      </MobileCard>

      {/* Teste do MobileButton */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Teste dos MobileButton</h2>
        <div className="grid grid-cols-2 gap-4">
          <MobileButton variant="primary" fullWidth>
            Botão Primário
          </MobileButton>
          <MobileButton variant="secondary" fullWidth>
            Botão Secundário
          </MobileButton>
          <MobileButton variant="outline" fullWidth>
            Botão Outline
          </MobileButton>
          <MobileButton variant="ghost" fullWidth>
            Botão Ghost
          </MobileButton>
        </div>
      </div>

      {/* Teste do MobileInput */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Teste do MobileInput</h2>
        <MobileInput
          label="Nome"
          placeholder="Digite seu nome"
          value={inputValue}
          onChange={setInputValue}
          fullWidth
        />
        <MobileInput
          label="Email"
          placeholder="Digite seu email"
          type="email"
          fullWidth
        />
        <MobileInput
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          fullWidth
        />
      </div>

      {/* Teste da função cn */}
      <div className={cn(
        'p-4 rounded-lg',
        'bg-blue-100 text-blue-900',
        'border border-blue-200'
      )}>
        <h2 className="text-lg font-semibold">Teste da função cn</h2>
        <p>Esta div usa a função cn para combinar classes condicionalmente.</p>
      </div>
    </div>
  );
} 