import React, { useState, useEffect, useCallback } from 'react';
import { CategoriaCliente } from './DistribuicaoClientesCategoria';

interface CalculadoraClientesProps {
  categorias: CategoriaCliente[];
  alturaMaxima?: number;
  className?: string;
}

export const CalculadoraClientes: React.FC<CalculadoraClientesProps> = ({ 
  categorias, 
  className = '' 
}) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [resultado, setResultado] = useState<number>(0);

  const calcularResultado = useCallback(() => {
    if (categoriaSelecionada && quantidade > 0) {
      const categoria = categorias.find(cat => cat.nome === categoriaSelecionada);
      if (categoria) {
        setResultado(categoria.valor * quantidade);
      }
    }
  }, [categoriaSelecionada, quantidade, categorias]);

  useEffect(() => {
    calcularResultado();
  }, [calcularResultado]);

  return (
    <div className={`bg-white border rounded-lg p-6 ${className}`} style={{ borderColor: '#cfd1d3' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculadora de Clientes</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{ borderColor: '#cfd1d3' }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.nome} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade
          </label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{ borderColor: '#cfd1d3' }}
          />
        </div>

        <div className="border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Resultado</p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {resultado.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Funções utilitárias para uso em outros componentes
export const calcularClientesPara100 = (
  quantidade: number, 
  altura: number, 
  alturaMaxima: number = 260
): number => {
  if (altura === 0) return 0;
  const proporcaoAtual = altura / alturaMaxima;
  if (proporcaoAtual >= 1) return quantidade;
  return Math.ceil(quantidade / proporcaoAtual);
};

export const calcularPorcentagemAtual = (
  altura: number, 
  alturaMaxima: number = 260
): number => {
  return Math.round((altura / alturaMaxima) * 100);
};

export const calcularClientesFaltantes = (
  quantidade: number, 
  altura: number, 
  alturaMaxima: number = 260
): number => {
  const clientesPara100 = calcularClientesPara100(quantidade, altura, alturaMaxima);
  return Math.max(0, clientesPara100 - quantidade);
};
