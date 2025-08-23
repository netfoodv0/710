import React from 'react';
import { FormSection, FormSwitch, FormSelect } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface ConfiguracaoNotinhaProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracaoNotinha({ form }: ConfiguracaoNotinhaProps) {
  const { config, toggleSwitch, updateStringField } = form;

  return (
    <FormSection
      title="Configuração da Notinha"
      description="Defina suas preferências para as notas impressas dos pedidos."
    >
      <div className="flex gap-6">
        {/* Controles à Esquerda */}
        <div className="space-y-4 flex-1">
          <FormSwitch
            label="Mostrar CNPJ da loja"
            name="mostrarCNPJ"
            checked={config?.mostrarCNPJ || false}
            onChange={(checked) => toggleSwitch('mostrarCNPJ', checked)}
          />

          <FormSwitch
            label="Mostrar categoria dos produtos"
            name="mostrarCategoria"
            checked={config?.mostrarCategoria || false}
            onChange={(checked) => toggleSwitch('mostrarCategoria', checked)}
          />

          <FormSwitch
            label="Mostrar descrição dos produtos"
            name="mostrarDescricao"
            checked={config?.mostrarDescricao || false}
            onChange={(checked) => toggleSwitch('mostrarDescricao', checked)}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Como você prefere mostrar os produtos do tipo pizza?
            </label>
            <FormSelect
              name="mostrarProdutosPizza"
              value={config?.mostrarProdutosPizza || 'nome-completo'}
              onChange={(value) => updateStringField('mostrarProdutosPizza', value as 'nome-completo' | 'por-fracao')}
              options={[
                { value: 'nome-completo', label: 'Nome completo' },
                { value: 'por-fracao', label: 'Por fração' }
              ]}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Como você prefere mostrar a quantidade de adicionais no produto?
            </label>
            <FormSwitch
              label="Mostrar quantidade de adicionais"
              name="mostrarQuantidadeAdicionais"
              checked={config?.mostrarQuantidadeAdicionais || false}
              onChange={(checked) => toggleSwitch('mostrarQuantidadeAdicionais', checked)}
            />
          </div>
        </div>

        {/* Preview da Notinha à Direita */}
        <div className="flex-shrink-0">
          <div className="bg-white border border-gray-300 rounded-none font-mono text-xs shadow-lg" style={{ width: '265px', minHeight: '400px' }}>
            {/* Cabeçalho da Notinha */}
            <div className="text-center py-2 border-b border-gray-300">
              <strong className="text-black text-sm">{config?.nomeRestaurante || 'SUA LOJA'}</strong>
              {config?.mostrarCNPJ && config?.cnpj && (
                <>
                  <br />
                  <span className="text-gray-600 text-xs">{config.cnpj}</span>
                </>
              )}
              {config?.descricao && (
                <>
                  <br />
                  <span className="text-gray-500 text-xs">{config.descricao}</span>
                </>
              )}
              {config?.telefone && (
                <>
                  <br />
                  <span className="text-gray-500 text-xs">Tel: {config.telefone}</span>
                </>
              )}
            </div>

            {/* Informações do Pedido */}
            <div className="px-2 py-1">
              <div className="text-center">
                <strong className="text-black">PEDIDO #B-0001</strong><br />
                <span className="text-gray-600 text-xs">Data: 15/12/2024 - 19:30</span><br />
                <span className="text-gray-600 text-xs">Cliente: João Silva</span><br />
                <span className="text-gray-600 text-xs">Tel: (11) 88888-8888</span>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="px-2 py-1">
              <div className="mb-2">
                <strong className="text-black">ITENS DO PEDIDO</strong><br />
                <span className="text-gray-600 text-xs">Total de itens: 4</span>
              </div>
              
              {/* Pizzas */}
              <div className="mb-2">
                {config?.mostrarCategoria && (
                  <strong className="text-black">PIZZAS</strong>
                )}
                {config?.mostrarCategoria && <br />}
                <div className="flex justify-between items-start">
                  <span className="text-black flex-1">
                    {config?.mostrarProdutosPizza === 'por-fracao' ? '1/2 Calabresa + 1/2 Marguerita' : '1 Pizza Grande'}
                  </span>
                  <span className="text-black font-bold ml-2">R$ 45,90</span>
                </div>
                {config?.mostrarDescricao && (
                  <>
                    <br />
                    <span className="text-gray-600 text-xs ml-2">  Mussarela, molho de tomate e manjericao</span>
                  </>
                )}
                {config?.mostrarProdutosPizza === 'nome-completo' && (
                  <div className="ml-4">
                    <span className="text-gray-600 text-xs">  1/2 Calabresa</span>
                    <br />
                    <span className="text-gray-600 text-xs">  1/2 Marguerita</span>
                  </div>
                )}
              </div>
              
              {/* Hamburguers */}
              <div className="mb-2">
                {config?.mostrarCategoria && (
                  <strong className="text-black">HAMBURGUERS</strong>
                )}
                {config?.mostrarCategoria && <br />}
                <div className="flex justify-between items-start">
                  <span className="text-black flex-1">3 Hamburguer Pink Australiano</span>
                  <span className="text-black font-bold ml-2">R$ 89,70</span>
                </div>
                {config?.mostrarDescricao && (
                  <>
                    <br />
                    <span className="text-gray-600 text-xs ml-2">  Hamburguer artesanal com 150g de alcatra</span>
                  </>
                )}
                <div className="ml-4">
                  <span className="text-gray-600 text-xs">  3 Batata frita</span>
                  <br />
                  <span className="text-gray-600 text-xs">  3 Pudim</span>
                  {config?.mostrarQuantidadeAdicionais && (
                    <>
                      <br />
                      <span className="text-gray-600 text-xs">  6 Maionese extra</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Totais */}
            <div className="px-2 py-1">
              <div className="flex justify-between">
                <span className="text-black">Subtotal:</span>
                <span className="text-black font-bold">R$ 135,60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Taxa de entrega:</span>
                <span className="text-black font-bold">R$ 8,00</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                <strong className="text-black text-sm">TOTAL:</strong>
                <strong className="text-black text-sm">R$ 143,60</strong>
              </div>
            </div>

            {/* Rodapé */}
            <div className="text-center py-2 border-t border-gray-300">
              <span className="text-gray-500 text-xs">Obrigado pela preferência!</span><br />
              <span className="text-gray-500 text-xs">Volte sempre!</span>
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
}
