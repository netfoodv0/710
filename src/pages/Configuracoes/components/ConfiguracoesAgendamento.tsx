import React from 'react';
import { FormSection, FormSwitch, InputPersonalizadoQuantidade } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';
import { useAgendamentoUtils } from '../hooks/useAgendamentoUtils';

interface ConfiguracoesAgendamentoProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function ConfiguracoesAgendamento({ form }: ConfiguracoesAgendamentoProps) {
  const { config, toggleSwitch, updateNumberField } = form;
  const { horariosExemplo } = useAgendamentoUtils(config);

  return (
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
                  horariosExemplo.map((horario, index) => (
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
                onChange={(checked) => toggleSwitch('agendamentoAtivo', checked)}
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
                      onChange={(value) => updateNumberField('agendamentoAntecedencia', value)}
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
                      onChange={(value) => updateNumberField('agendamentoLimite', value)}
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
                       value={String(config?.agendamentoIntervalo || 30)}
                       onChange={(value) => updateNumberField('agendamentoIntervalo', value)}
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
                       value={String(config?.agendamentoJanela || 30)}
                       onChange={(value) => updateNumberField('agendamentoJanela', value)}
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
                  onChange={(checked) => toggleSwitch('agendamentoLojaFechada', checked)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormSection>
  );
}
