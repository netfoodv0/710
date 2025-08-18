import React from 'react';
import { CalculadoraClientes, CategoriaCliente } from './CalculadoraClientes';

// Exemplo de uso da calculadora
export const ExemploCalculadora: React.FC = () => {
  // Dados de exemplo com diferentes cenários
  const categoriasExemplo: CategoriaCliente[] = [
    {
      nome: 'Curiosos',
      quantidade: 18,
      altura: 260, // 100% - já está completo
      cor: 'rgba(124, 58, 237, 0.9)'
    },
    {
      nome: 'Novatos',
      quantidade: 8,
      altura: 210, // ~81% - faltam alguns clientes
      cor: 'rgba(139, 92, 246, 0.8)'
    },
    {
      nome: 'Fiéis',
      quantidade: 4,
      altura: 128, // ~49% - faltam muitos clientes
      cor: 'rgba(168, 85, 247, 0.7)'
    },
    {
      nome: 'Super Clientes',
      quantidade: 3,
      altura: 75, // ~29% - faltam muitos clientes
      cor: 'rgba(192, 132, 252, 0.6)'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Calculadora de Clientes para 100%
      </h1>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          📊 Como Funciona a Cálculo
        </h2>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Fórmula:</strong> Clientes para 100% = Clientes Atuais ÷ (Altura Atual ÷ Altura Máxima)
          </p>
          <p>
            <strong>Exemplo:</strong> Se você tem 8 clientes com altura 210px e altura máxima 260px:
          </p>
          <div className="bg-white p-3 rounded border font-mono text-xs">
            Clientes para 100% = 8 ÷ (210 ÷ 260) = 8 ÷ 0.81 = 9.88 ≈ 10 clientes
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Calculadora em Ação
        </h2>
        <CalculadoraClientes 
          categorias={categoriasExemplo}
          alturaMaxima={260}
          className="shadow-lg"
        />
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">🎯 Resumo dos Resultados:</h3>
        <div className="text-sm text-green-800 space-y-1">
          <p>• <strong>Curiosos:</strong> 18 clientes (100%) - ✅ Completo!</p>
          <p>• <strong>Novatos:</strong> 8 → 10 clientes para 100% (faltam 2)</p>
          <p>• <strong>Fiéis:</strong> 4 → 8 clientes para 100% (faltam 4)</p>
          <p>• <strong>Super Clientes:</strong> 3 → 10 clientes para 100% (faltam 7)</p>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">💡 Dicas de Uso:</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Use a calculadora para planejar campanhas de marketing</li>
          <li>• Identifique quais categorias precisam de mais atenção</li>
          <li>• Estabeleça metas realistas baseadas nos números atuais</li>
          <li>• Monitore o progresso ao longo do tempo</li>
        </ul>
      </div>
    </div>
  );
};
