import React, { useState } from 'react';
import { 
  EstatisticasUnificadas, 
  useEstatisticasPadrao,
  AnimatedContainer,
  AnimatedList,
  AnimatedPresence,
  LoadingAnimado,
  useAnimacao
} from '../shared';

export const ComponentesUnificadosExample: React.FC = () => {
  const [mostrarAnimacao, setMostrarAnimacao] = useState(true);
  const [mostrarLoading, setMostrarLoading] = useState(false);
  
  // Usar estatísticas padronizadas
  const { estatisticasGerais, estatisticasClientes, estatisticasProdutos } = useEstatisticasPadrao();
  
  // Usar hook de animação
  const { mostrar: mostrarEntrada } = useAnimacao(500);

  // Simular loading
  const simularLoading = () => {
    setMostrarLoading(true);
    setTimeout(() => setMostrarLoading(false), 3000);
  };

  // Lista de itens para animação escalonada
  const itensAnimacao = [
    <div key="1" className="bg-blue-100 p-4 rounded-lg">Item 1</div>,
    <div key="2" className="bg-green-100 p-4 rounded-lg">Item 2</div>,
    <div key="3" className="bg-purple-100 p-4 rounded-lg">Item 3</div>,
    <div key="4" className="bg-orange-100 p-4 rounded-lg">Item 4</div>
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Exemplo de Componentes Unificados
      </h1>

      {/* Seção de Estatísticas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Estatísticas Unificadas
        </h2>

        {/* Estatísticas Gerais */}
        <AnimatedContainer tipo="entrada" delay={0}>
          <EstatisticasUnificadas
            estatisticas={estatisticasGerais}
            titulo="Estatísticas Gerais"
            subtitulo="Visão geral do negócio"
            colunas={4}
            mostrarVariacao={true}
          />
        </AnimatedContainer>

        {/* Estatísticas de Clientes */}
        <AnimatedContainer tipo="entrada" delay={200}>
          <EstatisticasUnificadas
            estatisticas={estatisticasClientes}
            titulo="Estatísticas de Clientes"
            subtitulo="Análise do comportamento dos clientes"
            colunas={4}
            mostrarVariacao={true}
          />
        </AnimatedContainer>

        {/* Estatísticas de Produtos */}
        <AnimatedContainer tipo="entrada" delay={400}>
          <EstatisticasUnificadas
            estatisticas={estatisticasProdutos}
            titulo="Estatísticas de Produtos"
            subtitulo="Performance dos produtos"
            colunas={4}
            mostrarVariacao={false}
          />
        </AnimatedContainer>
      </section>

      {/* Seção de Animações */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sistema de Animações
        </h2>

        {/* Animações diferentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedContainer tipo="slide" delay={0} hover={true}>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <h3 className="font-semibold mb-2">Slide + Hover</h3>
              <p className="text-gray-600">Passe o mouse para ver o efeito</p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer tipo="escala" delay={200} click={true}>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <h3 className="font-semibold mb-2">Escala + Click</h3>
              <p className="text-gray-600">Clique para ver o efeito</p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer tipo="bounce" delay={400}>
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <h3 className="font-semibold mb-2">Bounce</h3>
              <p className="text-gray-600">Animação de entrada</p>
            </div>
          </AnimatedContainer>
        </div>

        {/* Lista com animação escalonada */}
        <AnimatedContainer tipo="entrada" delay={600}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Lista com Animação Escalonada
            </h3>
            <AnimatedList
              items={itensAnimacao}
              tipo="entradaEscalonada"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            />
          </div>
        </AnimatedContainer>

        {/* AnimatePresence */}
        <AnimatedContainer tipo="entrada" delay={800}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              AnimatePresence
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setMostrarAnimacao(!mostrarAnimacao)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                {mostrarAnimacao ? 'Esconder' : 'Mostrar'}
              </button>
            </div>
            <AnimatedPresence
              mostrar={mostrarAnimacao}
              tipo="fade"
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <p className="text-gray-700">
                Este conteúdo aparece e desaparece com animação suave.
              </p>
            </AnimatedPresence>
          </div>
        </AnimatedContainer>
      </section>

      {/* Seção de Loading */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Loading Animado
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-4">Loading Pequeno</h3>
            <LoadingAnimado tamanho="sm" texto="Carregando..." />
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-4">Loading Médio</h3>
            <LoadingAnimado tamanho="md" texto="Processando..." cor="success" />
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-4">Loading Grande</h3>
            <LoadingAnimado tamanho="lg" texto="Aguarde..." cor="warning" />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={simularLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Simular Loading
          </button>
          
          {mostrarLoading && (
            <div className="mt-4">
              <LoadingAnimado 
                tamanho="md" 
                texto="Carregando dados..." 
                cor="primary" 
              />
            </div>
          )}
        </div>
      </section>

      {/* Seção de Controles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Controles de Animação
        </h2>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-4">Hook useAnimacao</h3>
          <p className="text-gray-600 mb-4">
            Este conteúdo apareceu com delay de 500ms usando o hook useAnimacao.
          </p>
          
          <AnimatedContainer 
            tipo="entrada" 
            mostrar={mostrarEntrada}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <p className="text-gray-700">
              ✅ Conteúdo animado controlado pelo hook!
            </p>
          </AnimatedContainer>
        </div>
      </section>
    </div>
  );
};
