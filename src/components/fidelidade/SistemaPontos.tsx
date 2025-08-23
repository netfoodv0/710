import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
import { FormSwitch } from '../forms/FormSwitch';
import { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent } from '../animate-ui';
import { ConfiguracoesPontos } from './ConfiguracoesPontos';
import { ProdutosResgataveis } from './ProdutosResgataveis';
import { ClientesPontos } from './ClientesPontos';

export function SistemaPontos() {
  const { sistemaPontosAtivo, setSistemaPontosAtivo, secaoAtiva, setSecaoAtiva } = useFidelidade();

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
            onChange={(checked) => setSistemaPontosAtivo(checked)}
            className="mb-0"
          />
        </div>
      </div>

      {/* Botões de Seção */}
      <div className="mb-6">
        <Tabs value={secaoAtiva} onValueChange={(value) => setSecaoAtiva(value as any)}>
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
              <ConfiguracoesPontos />
            </TabsContent>
            
            <TabsContent value="produtos">
              <ProdutosResgataveis />
            </TabsContent>
            
            <TabsContent value="clientes">
              <ClientesPontos />
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </div>
  );
}
