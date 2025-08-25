import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
// TextField component removed - using HTML input instead
import { motion } from 'framer-motion';
import { BagIcon, UsersIcon, RevenueIcon } from '../ui';

export function ConfiguracoesPontos() {
  const {
    sistemaPontosAtivo,
    pontosPorReal,
    setPontosPorReal,
    pontosBoasVindas,
    setPontosBoasVindas
  } = useFidelidade();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
      {/* Coluna Esquerda - Configuração de Pontos */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <BagIcon size={20} color="#8b5cf6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>Configuração de Pontos</h3>
        </div>

        {/* Taxa de Conversão */}
        <motion.div 
          className={`border rounded-lg border-gray-300 min-h-[330px] p-6 flex flex-col justify-between ${sistemaPontosAtivo ? 'bg-purple-50' : 'bg-gray-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Taxa de Conversão</h4>
            <p className="text-sm text-gray-600 mb-4">
              Defina quantos pontos seus clientes ganham a cada R$ 1,00 gasto na sua loja.
            </p>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              A taxa de conversão é o coração do seu sistema de fidelidade. Quanto maior a taxa, 
              mais atrativo será para seus clientes. Uma taxa de 1:1 significa que para cada real 
              gasto, o cliente ganha 1 ponto. Considere o valor médio dos seus produtos para 
              definir uma taxa que seja atrativa e sustentável para o seu negócio.
            </p>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pontos por R$1,00
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={pontosPorReal}
                  onChange={(e) => setPontosPorReal(Number(e.target.value))}
                  disabled={!sistemaPontosAtivo}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    sistemaPontosAtivo 
                      ? 'border-gray-300 text-purple-600' 
                      : 'border-gray-200 text-gray-400 bg-gray-100'
                  }`}
                  placeholder="Ex: 1"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => console.log('Salvando taxa de conversão:', pontosPorReal)}
                className="px-4 py-2 text-white font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: sistemaPontosAtivo ? '#8b5cf6' : '#9ca3af', 
                  borderRadius: '8px',
                  border: 'none',
                  cursor: sistemaPontosAtivo ? 'pointer' : 'not-allowed'
                }}
                onMouseEnter={(e) => {
                  if (sistemaPontosAtivo) {
                    e.currentTarget.style.backgroundColor = '#7c3aed';
                  }
                }}
                onMouseLeave={(e) => {
                  if (sistemaPontosAtivo) {
                    e.currentTarget.style.backgroundColor = '#8b5cf6';
                  } else {
                    e.currentTarget.style.backgroundColor = '#9ca3af';
                  }
                }}
                disabled={!sistemaPontosAtivo}
              >
                Salvar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Exemplo de Conversão */}
        <motion.div 
          className={`rounded-lg p-6 border border-gray-300 min-h-[330px] ${sistemaPontosAtivo ? 'bg-purple-50' : 'bg-gray-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h4 className="font-semibold text-gray-800 mb-3">Exemplo de Conversão</h4>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Veja como funciona na prática! Este exemplo mostra exatamente quantos pontos seus 
            clientes ganhariam em uma compra de R$ 100,00 com a taxa configurada acima. 
            É uma ferramenta visual que ajuda você a entender o impacto da sua configuração 
            e permite ajustar a taxa conforme necessário.
          </p>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">R$ 100,00</div>
              <div className="text-sm text-gray-600">Valor da Compra</div>
            </div>
            <div className="text-red-500 text-2xl">→</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{100 * pontosPorReal} pontos</div>
              <div className="text-sm text-gray-600">Pontos Ganhos</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Coluna Direita - Novos Clientes */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <UsersIcon size={20} color="#8b5cf6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>Novos Clientes</h3>
        </div>

        {/* Pontos de Boas-vindas */}
        <motion.div 
          className={`border rounded-lg border-gray-300 min-h-[330px] p-6 flex flex-col justify-between ${sistemaPontosAtivo ? 'bg-purple-50' : 'bg-gray-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Pontos de Boas-vindas</h4>
            <p className="text-sm text-gray-600 mb-4">
              Defina quantos pontos seus clientes recebem ao se cadastrarem na sua loja.
            </p>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Os pontos de boas-vindas são uma estratégia poderosa para atrair novos clientes. 
              Ao oferecer pontos logo no cadastro, você cria um incentivo imediato para que 
              façam a primeira compra. É uma forma de mostrar que valoriza novos clientes 
              e os convida a experimentar seus produtos desde o início.
            </p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pontos ao se cadastrar
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={pontosBoasVindas}
                  onChange={(e) => setPontosBoasVindas(Number(e.target.value))}
                  disabled={!sistemaPontosAtivo}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    sistemaPontosAtivo 
                      ? 'border-gray-300 text-purple-600' 
                      : 'border-gray-200 text-gray-400 bg-gray-100'
                  }`}
                  placeholder="Ex: 100"
                />
              </div>
            </div>
            <button
              onClick={() => console.log('Salvando pontos de boas-vindas:', pontosBoasVindas)}
              className="px-4 py-2 text-white font-medium transition-colors duration-200"
              style={{ 
                backgroundColor: sistemaPontosAtivo ? '#8b5cf6' : '#9ca3af', 
                borderRadius: '8px',
                border: 'none',
                cursor: sistemaPontosAtivo ? 'pointer' : 'not-allowed'
              }}
              onMouseEnter={(e) => {
                if (sistemaPontosAtivo) {
                  e.currentTarget.style.backgroundColor = '#7c3aed';
                }
              }}
              onMouseLeave={(e) => {
                if (sistemaPontosAtivo) {
                  e.currentTarget.style.backgroundColor = '#8b5cf6';
                } else {
                  e.currentTarget.style.backgroundColor = '#9ca3af';
                }
              }}
              disabled={!sistemaPontosAtivo}
            >
              Salvar
            </button>
          </div>
        </motion.div>

        {/* Benefícios */}
        <motion.div 
          className={`rounded-lg p-6 border border-gray-300 min-h-[330px] ${sistemaPontosAtivo ? 'bg-purple-50' : 'bg-gray-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h4 className="font-semibold text-gray-800 mb-4">Benefícios</h4>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            O sistema de pontos oferece múltiplas vantagens para o seu negócio. Além de 
            fidelizar clientes existentes, ele atrai novos consumidores e aumenta o 
            valor médio das compras. Cada benefício listado abaixo representa uma 
            oportunidade de crescimento e melhoria na experiência do cliente.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <UsersIcon size={12} color="#8b5cf6" />
              </div>
              <span className="text-sm text-gray-700">Incentiva novos cadastros</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <BagIcon size={12} color="#8b5cf6" />
              </div>
              <span className="text-sm text-gray-700">Estimula a primeira compra</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <RevenueIcon size={12} color="#8b5cf6" />
              </div>
              <span className="text-sm text-gray-700">Aumenta a retenção</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <UsersIcon size={12} color="#8b5cf6" />
              </div>
              <span className="text-sm text-gray-700">Melhora a experiência</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
