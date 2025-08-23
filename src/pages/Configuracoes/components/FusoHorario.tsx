import React from 'react';
import { FormSection, FormSelect } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';
import { useHorarioAtual } from '../hooks/useHorarioAtual';

interface FusoHorarioProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function FusoHorario({ form }: FusoHorarioProps) {
  const { config, updateStringField } = form;
  const horarioAtual = useHorarioAtual();

  return (
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
            onChange={(value) => updateStringField('fusoHorario', value)}
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
  );
}
