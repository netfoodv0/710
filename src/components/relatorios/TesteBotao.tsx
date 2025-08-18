import React from 'react';
import { DistribuicaoClientesCategoria, CategoriaCliente } from './DistribuicaoClientesCategoria';

// Componente de teste para verificar se o botão está funcionando
export const TesteBotao: React.FC = () => {
  const categoriasTeste: CategoriaCliente[] = [
    {
      nome: 'Curiosos',
      quantidade: 18,
      altura: 260,
      cor: 'rgba(124, 58, 237, 0.9)'
    },
    {
      nome: 'Novatos',
      quantidade: 8,
      altura: 210,
      cor: 'rgba(139, 92, 246, 0.8)'
    },
    {
      nome: 'Fiéis',
      quantidade: 4,
      altura: 128,
      cor: 'rgba(168, 85, 247, 0.7)'
    },
    {
      nome: 'Super Clientes',
      quantidade: 3,
      altura: 75,
      cor: 'rgba(192, 132, 252, 0.6)'
    }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        🧪 Teste do Botão Esvaziar
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Instruções de Teste:
          </h2>
          <ol className="list-decimal list-inside text-blue-800 space-y-1">
            <li>Você deve ver o card "Distribuição de Clientes por Categoria" abaixo</li>
            <li>No topo de cada seção, deve haver labels com o nome da categoria e quantidade</li>
            <li>As caixas devem estar sempre visíveis com suas alturas corretas</li>
            <li>No canto superior direito, deve haver um botão roxo "Atualizar"</li>
            <li>Clique no botão "Atualizar" para testar a funcionalidade</li>
            <li>As caixas devem atualizar suavemente para os valores originais (3 segundos)</li>
            <li>A porcentagem deve crescer progressivamente até o valor final</li>
            <li>Não há tela de loading - as caixas sempre ficam visíveis</li>
          </ol>
        </div>

        <DistribuicaoClientesCategoria 
          categorias={categoriasTeste}
          mostrarAnimacoes={true}
          alturaMaxima={260}
          className="shadow-xl"
        />

        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">
            ✅ Funcionalidades Implementadas:
          </h3>
          <ul className="list-disc list-inside text-green-800 space-y-1">
            <li>Labels com nomes das categorias e quantidades no topo de cada seção</li>
            <li>Caixas sempre visíveis com suas alturas corretas (sem tela de loading)</li>
            <li>Botão "Atualizar" (roxo) para atualizar dados com animação suave</li>
            <li>Animação suave de atualização (3 segundos)</li>
            <li>As caixas sobem suavemente até a altura real</li>
            <li>A porcentagem cresce progressivamente até o valor final</li>
            <li>Sem quebras na animação - movimento fluido e contínuo</li>
            <li>Estado local gerenciado pelo componente</li>
            <li>Transições CSS para altura e opacidade</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
