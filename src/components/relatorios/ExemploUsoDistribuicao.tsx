import React, { useState, useEffect } from 'react';
import { DistribuicaoClientesCategoria, CategoriaCliente } from './DistribuicaoClientesCategoria';

// Exemplo de uso do componente
export const ExemploUsoDistribuicao: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaCliente[]>([]);
  const [mostrarAnimacoes, setMostrarAnimacoes] = useState(false);

  // Dados de exemplo
  const dadosExemplo: CategoriaCliente[] = [
    {
      nome: 'Curiosos',
      quantidade: 18,
      altura: 260,
      cor: 'rgba(124, 58, 237, 0.9)' // Roxo escuro
    },
    {
      nome: 'Novatos',
      quantidade: 8,
      altura: 210,
      cor: 'rgba(139, 92, 246, 0.8)' // Roxo médio
    },
    {
      nome: 'Fiéis',
      quantidade: 4,
      altura: 128,
      cor: 'rgba(168, 85, 247, 0.7)' // Roxo claro
    },
    {
      nome: 'Super Clientes',
      quantidade: 3,
      altura: 75,
      cor: 'rgba(192, 132, 252, 0.6)' // Roxo muito claro
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setCategorias(dadosExemplo);
      setMostrarAnimacoes(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Exemplo de Uso - Distribuição de Clientes por Categoria
      </h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Componente com Dados Estáticos
        </h2>
        <DistribuicaoClientesCategoria 
          categorias={dadosExemplo}
          mostrarAnimacoes={true}
          className="shadow-lg"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Componente com Dados Carregados Dinamicamente
        </h2>
        {categorias.length > 0 ? (
          <DistribuicaoClientesCategoria 
            categorias={categorias}
            mostrarAnimacoes={mostrarAnimacoes}
            className="shadow-lg"
          />
        ) : (
          <div className="bg-gray-100 p-8 text-center rounded-lg">
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Como Usar:</h3>
        <pre className="text-sm text-blue-800 bg-white p-3 rounded border">
{`import { DistribuicaoClientesCategoria, CategoriaCliente } from './DistribuicaoClientesCategoria';

const categorias: CategoriaCliente[] = [
  {
    nome: 'Curiosos',
    quantidade: 18,
    altura: 260,
    cor: 'rgba(124, 58, 237, 0.9)'
  },
  // ... mais categorias
];

<DistribuicaoClientesCategoria 
  categorias={categorias}
  mostrarAnimacoes={true}
  alturaMaxima={260}
  className="custom-class"
/>`}
        </pre>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">✨ Nova Funcionalidade:</h3>
        <div className="space-y-2 text-green-800">
          <p><strong>🎬 Animação Automática:</strong> Ao recarregar a página, os cards começam em 0% e animam até seus valores reais</p>
          <p><strong>📊 Contagem Progressiva:</strong> Porcentagens e alturas são animadas suavemente de 0% até o valor final</p>
          <p><strong>🔄 Botão "Atualizar":</strong> Clique para recriar a animação de carregamento</p>
          <p><strong>⚡ Performance:</strong> Animação em 60 FPS para máxima suavidade</p>
          <p><strong>🎯 Timing Perfeito:</strong> 2.5 segundos de animação suave e natural</p>
        </div>
      </div>
    </div>
  );
};
