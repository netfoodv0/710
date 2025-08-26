import React, { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Plus, Trash2, Settings, Loader2 } from 'lucide-react';
import { SaveIcon, ClockIcon, DuplicateIcon, PageHeader } from '../../components/ui';
import { ConfiguracaoLoja } from '../../types';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FormSection, InputPersonalizado } from '../../components/forms';
import { useConfiguracoes } from '../Configuracoes/hooks/useConfiguracoes';

export default function Horarios() {
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
      showSuccess('Horários salvos com sucesso!');
    } catch (err) {
      showError('Erro ao salvar horários');
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

  // Error state
  if (error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar configurações</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
             <div 
               className="min-h-screen bg-dashboard" 
               style={{ 
                 scrollbarWidth: 'none', 
                 msOverflowStyle: 'none',
                 overflow: 'hidden'
               }}
             >
                {/* Cabeçalho da página */}
        <PageHeader
          title="Horários de Funcionamento"
          subtitle="Configure os horários de funcionamento do seu restaurante"
          actionButton={{
            label: "Salvar Horários",
            onClick: handleSave,
            loading: salvando,
            disabled: salvando,
            variant: "success",
            size: "md"
          }}
        />


        {/* Main Content */}
        <div className="px-6 pt-6 overflow-hidden">
          <div className="w-full overflow-hidden">
            {/* Configurações de Horários - Formato Tabela */}
            <div className="w-full overflow-hidden">
              <div 
                className="bg-white border rounded-lg p-6 border-dashboard overflow-hidden"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none'
                }}
              >
                {/* Tabela de horários */}
                <div 
                  className="rounded-xl border border-dashboard overflow-hidden" 
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    overflow: 'hidden'
                  }}
                >
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 table-header-32-5">
                      <tr>
                        <th className="px-4 text-left text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                          Dia da Semana
                        </th>
                        <th className="px-4 text-left text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                          Horários
                        </th>
                        <th className="px-4 text-center text-sm font-medium text-gray-900 border-b border-dashboard pt-4 pb-4">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-dashboard">
                      {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map((dia, index) => {
                        const diaKey = dia.toLowerCase().replace('-feira', '');
                        const horarios = config?.horariosFuncionamento?.[diaKey] || [];
                        
                        return (
                          <tr key={dia} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              {dia}
                            </td>
                            <td className="px-4 py-4">
                              <div className="space-y-2">
                                {horarios.map((horario: any, horarioIndex: number) => (
                                  <div key={horarioIndex} className="flex items-center space-x-2">
                                    <InputPersonalizado
                                      label=""
                                      name={`${diaKey}-inicio-${horarioIndex}`}
                                      value={horario.inicio || ''}
                                      onChange={(value) => {
                                        const novosHorarios = [...horarios];
                                        novosHorarios[horarioIndex] = { ...horario, inicio: value };
                                        setConfig({
                                          ...config,
                                          horariosFuncionamento: {
                                            ...config?.horariosFuncionamento,
                                            [diaKey]: novosHorarios
                                          }
                                        });
                                      }}
                                      placeholder="08:00"
                                      type="time"
                                      className="text-sm !h-9"
                                      style={{ width: '120px', height: '36px', minHeight: '36px', maxHeight: '36px' }}
                                    />
                                    <span className="text-xs text-gray-400">-</span>
                                    <InputPersonalizado
                                      label=""
                                      name={`${diaKey}-fim-${horarioIndex}`}
                                      value={horario.fim || ''}
                                      onChange={(value) => {
                                        const novosHorarios = [...horarios];
                                        novosHorarios[horarioIndex] = { ...horario, fim: value };
                                        setConfig({
                                          ...config,
                                          horariosFuncionamento: {
                                            ...config?.horariosFuncionamento,
                                            [diaKey]: novosHorarios
                                          }
                                        });
                                      }}
                                      placeholder="18:00"
                                      type="time"
                                      className="text-sm !h-9"
                                      style={{ width: '120px', height: '36px', minHeight: '36px', maxHeight: '36px' }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const novosHorarios = horarios.filter((_: any, i: number) => i !== horarioIndex);
                                        setConfig({
                                          ...config,
                                          horariosFuncionamento: {
                                            ...config?.horariosFuncionamento,
                                            [diaKey]: novosHorarios
                                          }
                                        });
                                      }}
                                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                      title="Remover período"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                {horarios.length === 0 && (
                                  <span className="text-xs text-gray-400 italic">Fechado</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (index > 0) {
                                      const diaAnterior = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'][index - 1];
                                      const diaAnteriorKey = diaAnterior.toLowerCase().replace('-feira', '');
                                      const horariosAnteriores = config?.horariosFuncionamento?.[diaAnteriorKey] || [];
                                      if (horariosAnteriores.length > 0) {
                                        setConfig({
                                          ...config,
                                          horariosFuncionamento: {
                                            ...config?.horariosFuncionamento,
                                            [diaKey]: [...horariosAnteriores]
                                          }
                                        });
                                      }
                                    }
                                  }}
                                  className="px-3 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors flex items-center space-x-2"
                                  title="Copiar horário do dia anterior"
                                  style={{ height: '40px' }}
                                >
                                  <DuplicateIcon size={16} color="#6b7280" />
                                  <span className="text-xs font-medium">Copiar horário</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const novosHorarios = [...horarios, { inicio: '08:00', fim: '18:00' }];
                                    setConfig({
                                      ...config,
                                      horariosFuncionamento: {
                                        ...config?.horariosFuncionamento,
                                        [diaKey]: novosHorarios
                                      }
                                    });
                                  }}
                                  className="px-3 text-xs text-white bg-green-600 rounded hover:bg-green-700 transition-colors flex items-center space-x-2"
                                  title="Adicionar período"
                                  style={{ height: '40px' }}
                                >
                                  <Plus className="w-4 h-4" />
                                  <span className="text-xs font-medium">Novo período</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={removeNotification}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
}
