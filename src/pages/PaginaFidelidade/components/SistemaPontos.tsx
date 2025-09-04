import React from 'react';
import { FormSwitch } from '../../../components/forms/FormSwitch';
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from '../../../components/animate-ui';
import { ConfiguracoesPontos } from './ConfiguracoesPontos';
import { ProdutosResgataveis } from './ProdutosResgataveis';
import { ClientesPontos } from './ClientesPontos';
import { SistemaPontosProps, SecaoAtiva } from '../types';

export function SistemaPontos({
  pontosPorReal,
  pontosBoasVindas,
  sistemaPontosAtivo,
  secaoAtiva,
  produtosResgataveis,
  clientesPontos,
  onPontosPorRealChange,
  onPontosBoasVindasChange,
  onToggle,
  onSecaoChange,
  onAdicionarProduto,
  onExportarDados
}: SistemaPontosProps & {
  secaoAtiva: SecaoAtiva;
  produtosResgataveis: any[];
  clientesPontos: any[];
  onSecaoChange: (secao: SecaoAtiva) => void;
  onAdicionarProduto: () => void;
  onExportarDados: () => void;
}) {
  return (
    <div className="bg-white border rounded-lg" style={{ borderColor: '#cfd1d3', padding: '24px' }}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>
          Sistema de Pontos
        </h3>
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <p className="text-gray-600 flex-1">
          O sistema de pontos permite que seus clientes acumulem pontos<br />
          com base em suas compras. Esses pontos podem ser trocados<br />
          por produtos selecionados.
        </p>
        <div className="flex items-center space-x-3 ml-4">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            sistemaPontosAtivo 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {sistemaPontosAtivo ? 'Ativo' : 'Inativo'}
          </span>
          <FormSwitch
            name="sistemaPontos"
            label=""
            checked={sistemaPontosAtivo}
            onChange={(checked) => onToggle(checked)}
            className="mb-0"
          />
        </div>
      </div>

      {/* Botões de Seção */}
      <div className="mb-6">
        <Tabs value={secaoAtiva} onValueChange={(value) => onSecaoChange(value as SecaoAtiva)}>
          <TabsList className="shadow-none">
            <TabsTrigger 
              value="configuracoes" 
              className="shadow-none data-[state=active]:border data-[state=active]:border-gray-300 data-[state=active]:bg-gray-50"
            >
              Configurações Gerais
            </TabsTrigger>
            <TabsTrigger 
              value="produtos" 
              className="shadow-none data-[state=active]:border data-[state=active]:border-gray-300 data-[state=active]:bg-gray-50"
            >
              Produtos Resgatáveis
            </TabsTrigger>
            <TabsTrigger 
              value="clientes" 
              className="shadow-none data-[state=active]:border data-[state=active]:border-gray-300 data-[state=active]:bg-gray-50"
            >
              Clientes com Pontos
            </TabsTrigger>
          </TabsList>
          
          <TabsContents className="mt-4">
            <TabsContent value="configuracoes">
              <ConfiguracoesPontos
                pontosPorReal={pontosPorReal}
                pontosBoasVindas={pontosBoasVindas}
                onPontosPorRealChange={onPontosPorRealChange}
                onPontosBoasVindasChange={onPontosBoasVindasChange}
              />
            </TabsContent>
            
            <TabsContent value="produtos">
              <ProdutosResgataveis
                produtos={produtosResgataveis}
                onAdicionarProduto={onAdicionarProduto}
              />
            </TabsContent>
            
            <TabsContent value="clientes">
              <ClientesPontos
                clientes={clientesPontos}
                onExportarDados={onExportarDados}
              />
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </div>
  );
}
