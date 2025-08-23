import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Insumo {
  id?: number;
  nome: string;
  categoria: string;
  permiteEstoqueNegativo: boolean;
  unidadeMedida: string;
  precoCusto: number;
  estoqueMinimo?: number;
  estoqueAtual?: number;
  controleEstoque: boolean;
}

interface ModalCadastroInsumoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (insumo: Insumo) => void;
  insumoEditando?: Insumo | null;
}

export function ModalCadastroInsumo({ isOpen, onClose, onSave, insumoEditando }: ModalCadastroInsumoProps) {
  const [activeTab, setActiveTab] = useState<'informacoes' | 'estoque' | 'onde-usado'>('informacoes');
  const [insumo, setInsumo] = useState<Insumo>({
    nome: '',
    categoria: 'categorias teste',
    permiteEstoqueNegativo: false,
    unidadeMedida: 'Unidade',
    precoCusto: 0.00,
    estoqueMinimo: 0,
    estoqueAtual: 0,
    controleEstoque: true
  });

  // Categorias disponíveis
  const categorias = [
    'categorias teste',
    'Farinhas',
    'Carnes',
    'Laticínios',
    'Legumes',
    'Óleos',
    'Condimentos',
    'Bebidas'
  ];

  // Unidades de medida disponíveis
  const unidadesMedida = [
    'Unidade',
    'ml',
    'l',
    'g',
    'kg',
    'cm'
  ];

  // useEffect para inicializar dados quando editando
  React.useEffect(() => {
    if (insumoEditando) {
      setInsumo(insumoEditando);
    } else {
      setInsumo({
        nome: '',
        categoria: 'categorias teste',
        permiteEstoqueNegativo: false,
        unidadeMedida: 'Unidade',
        precoCusto: 0.00,
        estoqueMinimo: 0,
        estoqueAtual: 0,
        controleEstoque: true
      });
    }
  }, [insumoEditando, isOpen]);

  const handleInputChange = (campo: keyof Insumo, valor: any) => {
    setInsumo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSave = () => {
    if (insumo.nome.trim()) {
      onSave({
        ...insumo,
        id: insumoEditando?.id || Date.now()
      });
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {insumoEditando ? 'Editar Insumo' : 'Novo Insumo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Abas */}
        <div className="flex space-x-6 px-6 pt-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('informacoes')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'informacoes'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            INFORMAÇÕES
          </button>
          <button
            onClick={() => setActiveTab('estoque')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'estoque'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ESTOQUE
          </button>
          <button
            onClick={() => setActiveTab('onde-usado')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'onde-usado'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ONDE É USADO
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'informacoes' && (
            /* Aba Informações */
            <div className="grid grid-cols-2 gap-6">
              {/* Coluna Esquerda */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do insumo
                  </label>
                  <input
                    type="text"
                    value={insumo.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full px-3 py-2 border border-red-500 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Digite o nome do insumo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da categoria
                  </label>
                  <select
                    value={insumo.categoria}
                    onChange={(e) => handleInputChange('categoria', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Permitir estoque negativo
                    </span>
                    <button
                      onClick={() => handleInputChange('permiteEstoqueNegativo', !insumo.permiteEstoqueNegativo)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        insumo.permiteEstoqueNegativo ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        insumo.permiteEstoqueNegativo ? 'translate-x-5' : 'translate-x-1'
                      } mt-1`}></div>
                    </button>
                  </label>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidade de medida
                  </label>
                  <select
                    value={insumo.unidadeMedida}
                    onChange={(e) => handleInputChange('unidadeMedida', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {unidadesMedida.map((unidade) => (
                      <option key={unidade} value={unidade}>{unidade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de custo
                  </label>
                  <input
                    type="number"
                    value={insumo.precoCusto}
                    onChange={(e) => handleInputChange('precoCusto', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'estoque' && (
            /* Aba Estoque */
            <div className="space-y-6">
              {/* Nome do insumo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{insumo.nome || 'Nome do Insumo'}</h3>
                <p className="text-sm text-gray-600">{insumo.categoria}</p>
              </div>

              {/* Controle de estoque */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Controle de estoque ativado</span>
                  <button
                    onClick={() => handleInputChange('controleEstoque', !insumo.controleEstoque)}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      insumo.controleEstoque ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      insumo.controleEstoque ? 'translate-x-5' : 'translate-x-1'
                    } mt-1`}></div>
                  </button>
                </div>
              </div>

              {/* Campos de estoque */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque mínimo</label>
                  <input
                    type="number"
                    value={insumo.estoqueMinimo}
                    onChange={(e) => handleInputChange('estoqueMinimo', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque atual</label>
                  <input
                    type="number"
                    value={insumo.estoqueAtual}
                    onChange={(e) => handleInputChange('estoqueAtual', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min="0"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    ALTERAR ESTOQUE
                  </button>
                </div>
              </div>

              {/* Histórico de movimentações */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de movimentações</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md">
                    <span className="text-sm text-gray-600">21/09/2023 00:00 ~ 27/09/2023 23:59</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                    + Filtro
                  </button>
                </div>

                {/* Tabela de movimentações */}
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtde</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Variação
                          <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Un.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center space-y-2">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="text-gray-500">Nada encontrado</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'onde-usado' && (
            /* Aba Onde é Usado */
            <div className="space-y-6">
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Produtos que usam este insumo</h3>
                <p className="text-gray-500">Nenhum produto encontrado usando este insumo</p>
              </div>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSave}
            disabled={!insumo.nome.trim()}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}
