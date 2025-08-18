import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Package, Image as ImageIcon, Info, Tag, Clock, Calendar, BarChart3, Search, Plus, Minus, DollarSign, Trash2, Copy, Loader2 } from 'lucide-react';
import { SaveIcon, SettingsIcon, PageHeader } from '../../components/ui';
import { ConfiguracaoLoja } from '../../types';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FormSection, InputPersonalizado, InputPersonalizadoQuantidade, InputPersonalizadoPreco, FormTextarea, FormSelect, FormSwitch, FormImageUpload } from '../../components/forms';
import { FormSingleImageUpload } from '../../components/forms/FormSingleImageUpload';
import { useConfiguracoes } from './hooks/useConfiguracoes';

export function Configuracoes() {
  const { 
    config, 
    setConfig, 
    salvando,

    handleSalvar, 
    error, 
    limparErro,
    handleHorarioChange,
    adicionarPausa,
    removerPausa,
    atualizarPausa,
    adicionarHorarioEspecial,
    removerHorarioEspecial,
    atualizarHorarioEspecial,
    atualizarConfiguracaoAvancada
  } = useConfiguracoes();
  
  const {
    notifications,
    showSuccess,
    showError,
    removeNotification
  } = useNotificationContext();

  const handleSave = useCallback(async () => {
    try {
      await handleSalvar();
      
    } catch (err) {

    }
  }, [handleSalvar, showSuccess, showError]);

  const handleRetry = useCallback(() => {
    limparErro();
  }, [limparErro]);

  const [horarioAtual, setHorarioAtual] = useState(new Date());

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setHorarioAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para gerar dois horários de exemplo baseados nas configurações
  const gerarHorariosExemplo = () => {
    if (!config?.agendamentoAtivo) return [];
    
    const intervalo = config?.agendamentoAntecedencia || 30;
    const janela = config?.agendamentoLimite || 30;
    

    
    const horarios = [];
    
    // Primeiro horário: 19:00
    const horaInicio1 = '19:00';
    const fimMinutos1 = 0 + janela;
    const horaFim1 = 19 + Math.floor(fimMinutos1 / 60);
    const minutoFim1 = fimMinutos1 % 60;
    const horaFimStr1 = `${horaFim1.toString().padStart(2, '0')}:${minutoFim1.toString().padStart(2, '0')}`;
    horarios.push(`${horaInicio1} - ${horaFimStr1}`);
    
    // Segundo horário: baseado no intervalo
    const horaInicio2 = '19:30';
    const fimMinutos2 = 30 + janela;
    const horaFim2 = 19 + Math.floor(fimMinutos2 / 60);
    const minutoFim2 = fimMinutos2 % 60;
    const horaFimStr2 = `${horaFim2.toString().padStart(2, '0')}:${minutoFim2.toString().padStart(2, '0')}`;
    horarios.push(`${horaInicio2} - ${horaFimStr2}`);
    
    return horarios;
  };



  // Error state
  if (error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-0">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />

          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
  
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Notificações */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>

        {/* Cabeçalho da página */}
        <PageHeader
          title="Configurações"
          subtitle="Gerencie as configurações do seu restaurante"
          actionButton={{
            label: "Salvar Configurações",
            onClick: handleSave,
            loading: salvando,
            disabled: salvando,
            variant: "success",
            size: "md"
          }}
        />

        {/* Conteúdo principal */}
        <div className="px-6 py-6 space-y-6">
          {/* Grid principal com 2 colunas para os cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Configurações Gerais */}
            <FormSection
              title="Configurações Gerais"
              description="Informações básicas do seu restaurante"
            >
              <div className="space-y-4">
                <InputPersonalizado
                  label="Nome do Restaurante"
                  name="nomeRestaurante"
                  value={config?.nomeRestaurante || ''}
                  onChange={(value) => setConfig({ ...config, nomeRestaurante: value })}
                  placeholder="Nome do seu restaurante"
                  required
                />

                <FormTextarea
                  label="Descrição"
                  name="descricao"
                  value={config?.descricao || ''}
                  onChange={(value) => setConfig({ ...config, descricao: value })}
                  placeholder="Descreva seu restaurante..."
                  rows={3}
                />

                <InputPersonalizado
                  label="CNPJ"
                  name="cnpj"
                  value={config?.cnpj || ''}
                  onChange={(value) => setConfig({ ...config, cnpj: value })}
                  placeholder="00.000.000/0000-00"
                />

                <InputPersonalizado
                  label="Telefone"
                  name="telefone"
                  value={config?.telefone || ''}
                  onChange={(value) => setConfig({ ...config, telefone: value })}
                  placeholder="(11) 99999-9999"
                />

                <InputPersonalizado
                  label="Link personalizado do seu cardápio"
                  name="linkPersonalizado"
                  value={config?.linkPersonalizado || ''}
                  onChange={(value) => setConfig({ ...config, linkPersonalizado: value })}
                  placeholder="Ex: netfood-marechal-castelo-branco"
                />

                {config?.linkPersonalizado && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      Este será o link do seu cardápio: 
                      <span className="font-medium text-gray-800 ml-1">
                        menu.brendi.com.br/{config.linkPersonalizado}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </FormSection>

            {/* Informações da Loja */}
            <FormSection
              title="Informações da Loja"
              description="Preencha os detalhes da sua loja."
            >
              <div className="space-y-4">
                <FormSingleImageUpload
                  label="Foto da Loja"
                  value={config?.fotoLoja || ''}
                  onChange={(value) => setConfig({ ...config, fotoLoja: value })}
                  placeholder="Selecione uma foto"
                />

                <FormSingleImageUpload
                  label="Banner da Loja"
                  value={config?.bannerLoja || ''}
                  onChange={(value) => setConfig({ ...config, bannerLoja: value })}
                  placeholder="Selecione um banner"
                  dimensions="800x256"
                />
              </div>
            </FormSection>

            {/* Configurações de Entrega */}
            <FormSection
              title="Configurações de Entrega"
              description="Configure as opções de entrega"
            >
              <div className="space-y-4">
                {/* Switches de Entrega */}
                <div className="space-y-3">
                <FormSwitch
                  label="Entrega em Domicílio"
                  name="entregaDomicilio"
                  checked={config?.entregaDomicilio || false}
                  onChange={(checked) => setConfig({ ...config, entregaDomicilio: checked })}
                />

                <FormSwitch
                  label="Retirada no Local"
                  name="retiradaLocal"
                  checked={config?.retiradaLocal || false}
                  onChange={(checked) => setConfig({ ...config, retiradaLocal: checked })}
                />

                <FormSwitch
                  label="Entrega por Delivery"
                  name="entregaDelivery"
                  checked={config?.entregaDelivery || false}
                  onChange={(checked) => setConfig({ ...config, entregaDelivery: checked })}
                />
                </div>

                {/* Campos de Valores - Lado Direito */}
                {config?.entregaDomicilio && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputPersonalizadoPreco
                      label="Taxa de Entrega"
                      name="taxaEntrega"
                      value={config?.taxaEntrega || ''}
                      onChange={(value) => setConfig({ ...config, taxaEntrega: value })}
                      placeholder="0,00"
                    />

                    <InputPersonalizadoPreco
                      label="Pedido Mínimo"
                      name="pedidoMinimo"
                      value={config?.pedidoMinimo || ''}
                      onChange={(value) => setConfig({ ...config, pedidoMinimo: value })}
                      placeholder="0,00"
                    />

                    <InputPersonalizadoQuantidade
                      label="Raio de Entrega (km)"
                      name="raioEntrega"
                      value={config?.raioEntrega || ''}
                      onChange={(value) => setConfig({ ...config, raioEntrega: value })}
                      placeholder="5"
                      min={1}
                      max={50}
                    />
                  </div>
                )}
              </div>
            </FormSection>

            {/* Modos de Pedidos */}
            <FormSection
              title="Modos de Pedidos"
              description="Escolha os modos de pedidos disponíveis para a sua loja."
            >
              <div className="space-y-4">
                <FormSwitch
                  label="Aceitar pedidos para delivery"
                  name="aceitarPedidosDelivery"
                  checked={config?.aceitarPedidosDelivery || false}
                  onChange={(checked) => setConfig({ ...config, aceitarPedidosDelivery: checked })}
                />

                <FormSwitch
                  label="Aceitar pedidos para retirada"
                  name="aceitarPedidosRetirada"
                  checked={config?.aceitarPedidosRetirada || false}
                  onChange={(checked) => setConfig({ ...config, aceitarPedidosRetirada: checked })}
                />

                <FormSwitch
                  label="Aceitar pedidos no balcão (consumo no local)"
                  name="aceitarPedidosBalcao"
                  checked={config?.aceitarPedidosBalcao || false}
                  onChange={(checked) => setConfig({ ...config, aceitarPedidosBalcao: checked })}
                />
              </div>
            </FormSection>

            {/* Configurações de Agendamento */}
            <FormSection
              title="Configurações de agendamento"
              description="Configure as opções de agendamento para a sua loja"
            >
              <div className="flex gap-6">
                {/* Preview do lado esquerdo */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Exemplo de como vai aparecer para seu cliente:
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      {/* Informações de antecedência */}
                      {config?.agendamentoAtivo && (
                        <div className="mb-3 p-2 bg-blue-100 rounded-lg text-xs text-blue-800">
                          <div className="text-center">
                            <span className="font-medium">Antecedência: {config?.agendamentoAntecedencia || 0}h</span>
                            <br />
                            <span>Limite: {config?.agendamentoLimite || 8} dias</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Caixa de data */}
                      <div className="bg-white border-2 border-red-500 rounded-lg p-3 mb-3 relative">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">Hoje</div>
                          <div className="text-lg font-bold text-gray-900">13/08</div>
                        </div>
                        {/* Triângulo vermelho apontando para baixo */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                        </div>
                      </div>
                      
                      {/* Horários disponíveis */}
                      <div className="space-y-2">
                        {config?.agendamentoAtivo ? (
                          gerarHorariosExemplo().map((horario, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                              <span className="text-sm font-medium text-gray-900">{horario}</span>
                            </div>
                          ))
                        ) : (
                          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center">
                            <span className="text-sm text-gray-500">Ative o agendamento para ver os horários</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configurações do lado direito */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-900">
                        Receber pedidos agendados
                      </label>
                      <FormSwitch
                        label=""
                        name="agendamentoAtivo"
                        checked={config?.agendamentoAtivo || false}
                        onChange={(checked) => setConfig({ ...config, agendamentoAtivo: checked })}
                      />
                    </div>
                    
                    {config?.agendamentoAtivo && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Com quantas horas antes os pedidos devem ser agendados?
                          </label>
                          <div className="flex items-center space-x-2">
                            <InputPersonalizadoQuantidade
                              name="agendamentoAntecedencia"
                              value={String(config?.agendamentoAntecedencia || 0)}
                              onChange={(value) => setConfig({ ...config, agendamentoAntecedencia: parseInt(value) || 0 })}
                              placeholder="0"
                              className="flex-1"
                              min={0}
                              max={24}
                            />
                            <div className="unit-box">Horas</div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Até quantos dias antes o consumidor pode agendar um pedido?
                          </label>
                          <div className="flex items-center space-x-2">
                            <InputPersonalizadoQuantidade
                              name="agendamentoLimite"
                              value={String(config?.agendamentoLimite || 8)}
                              onChange={(value) => setConfig({ ...config, agendamentoLimite: parseInt(value) || 8 })}
                              placeholder="8"
                              className="flex-1"
                              min={1}
                              max={30}
                            />
                            <div className="unit-box">Dias</div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-900 mb-2">
                            Intervalo entre horários disponíveis para agendamento
                          </label>
                          <div className="flex items-center space-x-2">
                            <InputPersonalizadoQuantidade
                              name="agendamentoIntervalo"
                              value={config?.agendamentoIntervalo || 30}
                              onChange={(value) => setConfig({ ...config, agendamentoIntervalo: parseInt(value) || 30 })}
                              placeholder="30"
                              className="flex-1"
                              min={15}
                              max={120}
                            />
                            <div className="unit-box">Minutos</div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Janela de tempo para entrega
                          </label>
                          <div className="flex items-center space-x-2">
                            <InputPersonalizadoQuantidade
                              name="agendamentoJanela"
                              value={config?.agendamentoJanela || 30}
                              onChange={(value) => setConfig({ ...config, agendamentoJanela: parseInt(value) || 30 })}
                              placeholder="30"
                              className="flex-1"
                              min={15}
                              max={120}
                            />
                            <div className="unit-box">Minutos</div>
                          </div>
                        </div>
                        
                        <FormSwitch
                          label="Receber pedidos agendados mesmo com a loja fechada"
                          name="agendamentoLojaFechada"
                          checked={config?.agendamentoLojaFechada || false}
                          onChange={(checked) => setConfig({ ...config, agendamentoLojaFechada: checked })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FormSection>



            {/* Configuração da Notinha */}
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
                    onChange={(checked) => setConfig({ ...config, mostrarCNPJ: checked })}
                  />

                  <FormSwitch
                    label="Mostrar categoria dos produtos"
                    name="mostrarCategoria"
                    checked={config?.mostrarCategoria || false}
                    onChange={(checked) => setConfig({ ...config, mostrarCategoria: checked })}
                  />

                  <FormSwitch
                    label="Mostrar descrição dos produtos"
                    name="mostrarDescricao"
                    checked={config?.mostrarDescricao || false}
                    onChange={(checked) => setConfig({ ...config, mostrarDescricao: checked })}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Como você prefere mostrar os produtos do tipo pizza?
                    </label>
                    <FormSelect
                      name="mostrarProdutosPizza"
                      value={config?.mostrarProdutosPizza || 'nome-completo'}
                      onChange={(value) => setConfig({ ...config, mostrarProdutosPizza: value as 'nome-completo' | 'por-fracao' })}
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
                      onChange={(checked) => setConfig({ ...config, mostrarQuantidadeAdicionais: checked })}
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

            {/* Configurações de Pagamento */}
            <FormSection
              title="Configurações de Pagamento"
              description="Configure as formas de pagamento aceitas"
            >
              <div className="space-y-4">
                <FormSwitch
                  label="Dinheiro"
                  name="pagamentoDinheiro"
                  checked={config?.pagamentoDinheiro || false}
                  onChange={(checked) => setConfig({ ...config, pagamentoDinheiro: checked })}
                />

                <FormSwitch
                  label="Cartão de Crédito"
                  name="pagamentoCredito"
                  checked={config?.pagamentoCredito || false}
                  onChange={(checked) => setConfig({ ...config, pagamentoCredito: checked })}
                />

                <FormSwitch
                  label="Cartão de Débito"
                  name="pagamentoDebito"
                  checked={config?.pagamentoDebito || false}
                  onChange={(checked) => setConfig({ ...config, pagamentoDebito: checked })}
                />

                <FormSwitch
                  label="PIX"
                  name="pagamentoPix"
                  checked={config?.pagamentoPix || false}
                  onChange={(checked) => setConfig({ ...config, pagamentoPix: checked })}
                />

                <FormSwitch
                  label="Vale Refeição"
                  name="pagamentoValeRefeicao"
                  checked={config?.pagamentoValeRefeicao || false}
                  onChange={(checked) => setConfig({ ...config, pagamentoValeRefeicao: checked })}
                />
              </div>
            </FormSection>

            {/* Configurações de Notificações */}
            <FormSection
              title="Configurações de Notificações"
              description="Gerencie as notificações do sistema"
            >
              <div className="space-y-4">
                <FormSwitch
                  label="Notificações por Email"
                  name="notificacoesEmail"
                  checked={config?.notificacoesEmail || false}
                  onChange={(checked) => setConfig({ ...config, notificacoesEmail: checked })}
                />

                <FormSwitch
                  label="Notificações por SMS"
                  name="notificacoesSMS"
                  checked={config?.notificacoesSMS || false}
                  onChange={(checked) => setConfig({ ...config, notificacoesSMS: checked })}
                />

                <FormSwitch
                  label="Notificações Push"
                  name="notificacoesPush"
                  checked={config?.notificacoesPush || false}
                  onChange={(checked) => setConfig({ ...config, notificacoesPush: checked })}
                />

                <FormSwitch
                  label="Alertas de Estoque Baixo"
                  name="alertasEstoque"
                  checked={config?.alertasEstoque || false}
                  onChange={(checked) => setConfig({ ...config, alertasEstoque: checked })}
                />
              </div>
            </FormSection>

            {/* Configurações de Aparência */}
            <FormSection
              title="Configurações de Aparência"
              description="Personalize a aparência do seu sistema"
            >
              <div className="space-y-4">
                <FormSelect
                  label="Tema"
                  name="tema"
                  value={config?.tema || 'claro'}
                  onChange={(value) => setConfig({ ...config, tema: value })}
                  options={[
                    { value: 'claro', label: 'Tema Claro' },
                    { value: 'escuro', label: 'Tema Escuro' },
                    { value: 'auto', label: 'Automático' }
                  ]}
                />

                <FormSelect
                  label="Cor Principal"
                  name="corPrincipal"
                  value={config?.corPrincipal || 'azul'}
                  onChange={(value) => setConfig({ ...config, corPrincipal: value })}
                  options={[
                    { value: 'azul', label: 'Azul' },
                    { value: 'verde', label: 'Verde' },
                    { value: 'roxo', label: 'Roxo' },
                    { value: 'vermelho', label: 'Vermelho' },
                    { value: 'laranja', label: 'Laranja' }
                  ]}
                />

                <FormSwitch
                  label="Modo Compacto"
                  name="modoCompacto"
                  checked={config?.modoCompacto || false}
                  onChange={(checked) => setConfig({ ...config, modoCompacto: checked })}
                />

                <FormSwitch
                  label="Animações"
                  name="animacoes"
                  checked={config?.animacoes || true}
                  onChange={(checked) => setConfig({ ...config, animacoes: checked })}
                />
              </div>
            </FormSection>

            {/* Fuso Horário */}
            <FormSection
              title="Fuso Horário"
              description="Selecione o fuso horário que sua loja deve seguir"
            >
              <div className="space-y-4">
                {/* Fuso Horário Principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Fuso Horário Principal
                  </label>
                  <FormSelect
                    name="fusoHorario"
                    value={config?.fusoHorario || 'America/Sao_Paulo'}
                    onChange={(value) => setConfig({ ...config, fusoHorario: value })}
                    options={[
                      { value: 'America/Noronha', label: 'Fernando de Noronha (FNT - UTC-02:00)' },
                      { value: 'America/Sao_Paulo', label: 'Brasília (BRT - UTC-03:00)' },
                      { value: 'America/Manaus', label: 'Amazonas (AMT - UTC-04:00)' },
                      { value: 'America/Rio_Branco', label: 'Acre (ACT - UTC-05:00)' }
                    ]}
                    placeholder="Selecione o fuso horário"
                  />
                </div>

                {/* Informações do Fuso Atual */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    Informações do Fuso Horário Selecionado
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Fuso Atual:</span>
                      <p className="text-blue-800">
                        {config?.fusoHorario === 'America/Noronha' && 'Fernando de Noronha (FNT)'}
                        {config?.fusoHorario === 'America/Sao_Paulo' && 'Brasília (BRT)'}
                        {config?.fusoHorario === 'America/Manaus' && 'Amazonas (AMT)'}
                        {config?.fusoHorario === 'America/Rio_Branco' && 'Acre (ACT)'}
                        {!config?.fusoHorario && 'Brasília (BRT)'}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Horário Local:</span>
                      <p className="text-blue-800 font-mono">
                        {horarioAtual.toLocaleTimeString('pt-BR', { 
                          timeZone: config?.fusoHorario || 'America/Sao_Paulo',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                        </FormSection>
          </div> {/* Fim do grid principal */}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}