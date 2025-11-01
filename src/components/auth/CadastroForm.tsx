import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Store, Phone, Mail, Lock, MapPin, Loader2, Check } from 'lucide-react';
import { cadastroLojaSchema, type CadastroLojaFormData } from '../../types/global/auth';

interface CadastroFormProps {
  onSubmit: (data: CadastroLojaFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const segmentos = [
  'Restaurante',
  'Pizzaria',
  'Hamburgueria',
  'Doceria',
  'Cafeteria',
  'Sorveteria',
  'Padaria',
  'Açaí',
  'Outros'
];

export const CadastroForm: React.FC<CadastroFormProps> = ({
  onSubmit,
  isLoading = false,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [aceiteTermos, setAceiteTermos] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CadastroLojaFormData>({
    resolver: zodResolver(cadastroLojaSchema)
  });

  const handleFormSubmit = async (data: CadastroLojaFormData) => {
    if (!aceiteTermos) {
      return;
    }
    
    try {
      await onSubmit(data);
    } catch (error) {
      // Erro já é tratado pelo contexto
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-sm font-bold text-gray-900 mb-2">
            Crie sua loja
          </h1>
          <p className="text-gray-600 text-xs">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Dados da Loja */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
              Dados da Loja
            </h2>

            {/* Nome da Loja */}
            <div>
              <label htmlFor="nomeLoja" className="block text-sm text-gray-600 mb-2">
                Nome da loja
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('nomeLoja')}
                  type="text"
                  id="nomeLoja"
                  className="block w-full pl-10 pr-3 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="Ex: Restaurante do João"
                  disabled={isLoading}
                />
              </div>
              {errors.nomeLoja && (
                <p className="mt-1 text-sm text-red-600">{errors.nomeLoja.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm text-gray-600 mb-2">
                WhatsApp da loja
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('whatsapp')}
                  type="tel"
                  id="whatsapp"
                  autoComplete="tel"
                  className="block w-full pl-10 pr-3 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="(00) 00000-0000"
                  disabled={isLoading}
                />
              </div>
              {errors.whatsapp && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* Segmento */}
            <div>
              <label htmlFor="segmento" className="block text-sm text-gray-600 mb-2">
                Qual o seu segmento?
              </label>
              <select
                {...register('segmento')}
                id="segmento"
                className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                disabled={isLoading}
              >
                <option value="">Selecione um segmento</option>
                {segmentos.map((segmento) => (
                  <option key={segmento} value={segmento}>
                    {segmento}
                  </option>
                ))}
              </select>
              {errors.segmento && (
                <p className="mt-1 text-sm text-red-600">{errors.segmento.message}</p>
              )}
            </div>
          </div>

          {/* Dados de Acesso */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
              Dados de Acesso
            </h2>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full pl-10 pr-3 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="suporte@sistema-voult.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm text-gray-600 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('senha')}
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  autoComplete="new-password"
                  className="block w-full pl-10 pr-12 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">Mínimo 8 caracteres</p>
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
              Endereço
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Você poderá ocultar o endereço da loja nas configurações
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CEP */}
              <div>
                <label htmlFor="cep" className="block text-sm text-gray-600 mb-2">
                  CEP
                </label>
                <input
                  {...register('endereco.cep')}
                  type="text"
                  id="cep"
                  autoComplete="postal-code"
                  className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="00000-000"
                  disabled={isLoading}
                />
                {errors.endereco?.cep && (
                  <p className="mt-1 text-sm text-red-600">{errors.endereco.cep.message}</p>
                )}
              </div>

              {/* Número */}
              <div>
                <label htmlFor="numero" className="block text-sm text-gray-600 mb-2">
                  Número
                </label>
                <input
                  {...register('endereco.numero')}
                  type="text"
                  id="numero"
                  autoComplete="address-line2"
                  className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="123"
                  disabled={isLoading}
                />
                {errors.endereco?.numero && (
                  <p className="mt-1 text-sm text-red-600">{errors.endereco.numero.message}</p>
                )}
              </div>
            </div>

            {/* Rua */}
            <div>
              <label htmlFor="rua" className="block text-sm text-gray-600 mb-2">
                Rua
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('endereco.rua')}
                  type="text"
                  id="rua"
                  autoComplete="address-line1"
                  className="block w-full pl-10 pr-3 h-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="Ex: Avenida Paulista"
                  disabled={isLoading}
                />
              </div>
              {errors.endereco?.rua && (
                <p className="mt-1 text-sm text-red-600">{errors.endereco.rua.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bairro */}
              <div>
                <label htmlFor="bairro" className="block text-sm text-gray-600 mb-2">
                  Bairro
                </label>
                <input
                  {...register('endereco.bairro')}
                  type="text"
                  id="bairro"
                  autoComplete="address-level2"
                  className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="Centro"
                  disabled={isLoading}
                />
                {errors.endereco?.bairro && (
                  <p className="mt-1 text-sm text-red-600">{errors.endereco.bairro.message}</p>
                )}
              </div>

              {/* Cidade */}
              <div>
                <label htmlFor="cidade" className="block text-sm text-gray-600 mb-2">
                  Cidade
                </label>
                <input
                  {...register('endereco.cidade')}
                  type="text"
                  id="cidade"
                  autoComplete="address-level1"
                  className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="São Paulo"
                  disabled={isLoading}
                />
                {errors.endereco?.cidade && (
                  <p className="mt-1 text-sm text-red-600">{errors.endereco.cidade.message}</p>
                )}
              </div>
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="estado" className="block text-sm text-gray-600 mb-2">
                Estado
              </label>
              <select
                {...register('endereco.estado')}
                id="estado"
                className="block w-full h-10 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                disabled={isLoading}
              >
                <option value="">Selecione o estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
              {errors.endereco?.estado && (
                <p className="mt-1 text-sm text-red-600">{errors.endereco.estado.message}</p>
              )}
            </div>
          </div>

          {/* Termos de Uso */}
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                id="aceiteTermos"
                type="checkbox"
                checked={aceiteTermos}
                onChange={(e) => setAceiteTermos(e.target.checked)}
                className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                disabled={isLoading}
              />
            </div>
            <div className="text-sm">
              <label htmlFor="aceiteTermos" className="text-gray-700">
                Ao prosseguir você concorda com{' '}
                <a href="/termos" className="text-gray-900 hover:text-gray-700">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="/privacidade" className="text-gray-900 hover:text-gray-700">
                  política de privacidade
                </a>
                .
              </label>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Botão de Cadastro */}
          <button
            type="submit"
            disabled={isLoading || !aceiteTermos}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Criando conta...
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Criar conta
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}; 
