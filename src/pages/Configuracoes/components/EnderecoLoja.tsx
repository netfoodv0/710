import React from 'react';
import { MapPin } from 'lucide-react';
import { FormSection, InputPersonalizado } from '../../../components/forms';
import { useConfiguracoesForm } from '../hooks/useConfiguracoesForm';

interface EnderecoLojaProps {
  form: ReturnType<typeof useConfiguracoesForm>;
}

export function EnderecoLoja({ form }: EnderecoLojaProps) {
  const { config, updateEndereco, getEnderecoCompleto } = form;

  return (
    <FormSection
      title="Endereço da Loja"
      description="Informações de localização da sua loja"
      icon={<MapPin size={30} />}
    >
      <div className="space-y-4">
        <InputPersonalizado
          label="Rua"
          name="endereco.rua"
          value={getEnderecoCompleto().rua}
          onChange={(value) => updateEndereco('rua', String(value))}
          placeholder="Nome da rua"
          required
        />

        <InputPersonalizado
          label="Número"
          name="endereco.numero"
          value={getEnderecoCompleto().numero}
          onChange={(value) => updateEndereco('numero', String(value))}
          placeholder="Número da casa"
          required
        />

        <InputPersonalizado
          label="Bairro"
          name="endereco.bairro"
          value={getEnderecoCompleto().bairro}
          onChange={(value) => updateEndereco('bairro', String(value))}
          placeholder="Nome do bairro"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputPersonalizado
            label="Cidade"
            name="endereco.cidade"
            value={getEnderecoCompleto().cidade}
            onChange={(value) => updateEndereco('cidade', String(value))}
            placeholder="Nome da cidade"
            required
          />

          <InputPersonalizado
            label="Estado"
            name="endereco.estado"
            value={getEnderecoCompleto().estado}
            onChange={(value) => updateEndereco('estado', String(value))}
            placeholder="UF"
            required
          />
        </div>

        <InputPersonalizado
          label="CEP"
          name="endereco.cep"
          value={getEnderecoCompleto().cep}
          onChange={(value) => updateEndereco('cep', String(value))}
          placeholder="00000-000"
          required
        />
      </div>
    </FormSection>
  );
}
