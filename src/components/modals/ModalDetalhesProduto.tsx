import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';

interface ProdutoEstoque {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  precoUnitario: number;
  status: string;
  semControleEstoque?: boolean;
  fichaTecnica: string;
  medida: string;
}

interface Insumo {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  custo: number;
  estoque: string;
  permiteNegativo: boolean;
}

interface ModalDetalhesProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  produto: ProdutoEstoque | null;
  onAlterarEstoque: (produto: ProdutoEstoque, tipo: 'adicionar' | 'retirar', quantidade: number, descricao: string) => void;
  onSalvarProduto?: (produto: ProdutoEstoque) => void;
}

export function ModalDetalhesProduto({ isOpen, onClose, produto, onAlterarEstoque, onSalvarProduto }: ModalDetalhesProdutoProps) {
  const [activeTab, setActiveTab] = useState<'estoque' | 'ficha-tecnica'>('estoque');
  const [showAlterarEstoque, setShowAlterarEstoque] = useState(false);
  const [tipoOperacao, setTipoOperacao] = useState<'adicionar' | 'retirar'>('adicionar');
  const [quantidade, setQuantidade] = useState(0);
  const [descricao, setDescricao] = useState('Atualização de estoque');
  
  // Estados para controle de edição
  const [produtoEditado, setProdutoEditado] = useState<ProdutoEstoque | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [insumos, setInsumos] = useState<Insumo[]>([
    {
      id: 1,
      nome: 'Fatia de queijo',
      categoria: 'categorias teste',
      quantidade: 1,
      custo: 0.00,
      estoque: 'Crítico',
      permiteNegativo: false
    },
    {
      id: 2,
      nome: 'insumo demostrativo',
      categoria: 'categorias teste',
      quantidade: 3,
      custo: 0.00,
      estoque: 'Sem controle',
      permiteNegativo: true
    }
  ]);
  const [novoInsumo, setNovoInsumo] = useState('');

  // useEffect para inicializar produto editado
  React.useEffect(() => {
    if (produto && isOpen) {
      setProdutoEditado({ ...produto });
      setModoEdicao(false);
      setActiveTab('estoque');
    }
  }, [produto, isOpen]);

  // Funções para gerenciar funcionalidades
  const handleToggleControleEstoque = () => {
    if (produtoEditado) {
      const produtoAtualizado = {
        ...produtoEditado,
        semControleEstoque: !produtoEditado.semControleEstoque
      };
      setProdutoEditado(produtoAtualizado);
      if (onSalvarProduto) {
        onSalvarProduto(produtoAtualizado);
      }
    }
  };

  const handleAlterarEstoque = () => {
    if (produto) {
      onAlterarEstoque(produto, tipoOperacao, quantidade, descricao);
      setShowAlterarEstoque(false);
      setQuantidade(0);
      setDescricao('Atualização de estoque');
    }
  };

  const handleEditarEstoqueMinimo = (valor: number) => {
    if (produtoEditado) {
      const produtoAtualizado = {
        ...produtoEditado,
        quantidadeMinima: valor
      };
      setProdutoEditado(produtoAtualizado);
      if (onSalvarProduto) {
        onSalvarProduto(produtoAtualizado);
      }
    }
  };

  const handleAdicionarInsumo = () => {
    if (novoInsumo.trim()) {
      const novoInsumoObj: Insumo = {
        id: Date.now(),
        nome: novoInsumo,
        categoria: 'Nova categoria',
        quantidade: 1,
        custo: 0.00,
        estoque: 'Sem controle',
        permiteNegativo: false
      };
      setInsumos(prev => [...prev, novoInsumoObj]);
      setNovoInsumo('');
    }
  };

  const handleEditarInsumo = (id: number, campo: keyof Insumo, valor: any) => {
    setInsumos(prev => prev.map(insumo => 
      insumo.id === id ? { ...insumo, [campo]: valor } : insumo
    ));
  };

  const handleRemoverInsumo = (id: number) => {
    setInsumos(prev => prev.filter(insumo => insumo.id !== id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'em_estoque') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Em estoque</span>;
    } else if (status === 'estoque_baixo') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Estoque baixo</span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Em falta</span>;
    }
  };

  if (!isOpen || !produto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden" style={{ backgroundColor: 'white !important' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            {/* Abas */}
            <div className="flex space-x-6 mb-4">
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
                onClick={() => setActiveTab('ficha-tecnica')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'ficha-tecnica'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                FICHA TÉCNICA
              </button>
            </div>

            {/* Nome do produto */}
            <h2 className="text-2xl font-bold text-gray-900">{produto.nome}</h2>
            <p className="text-gray-600">{produto.categoria}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {activeTab === 'estoque' ? (
            /* Aba Estoque */
            <div className="space-y-6">
              {/* Informações de preço */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>Preço de custo: {formatCurrency(produto.precoCusto)}</p>
                <p>Preço de venda: {formatCurrency(produto.precoUnitario)}</p>
                <p>Custo da ficha técnica: R$ 0,00</p>
              </div>

              {/* Status do estoque */}
              <div className="flex items-center space-x-4">
                {getStatusBadge(produto.status)}
                               <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600">Controle de estoque ativado</span>
                 <button
                   onClick={handleToggleControleEstoque}
                   className={`w-10 h-6 rounded-full transition-colors ${
                     produtoEditado?.semControleEstoque ? 'bg-gray-300' : 'bg-red-600'
                   }`}
                 >
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                     produtoEditado?.semControleEstoque ? 'translate-x-1' : 'translate-x-5'
                   } mt-1`}></div>
                 </button>
               </div>
              </div>

              {/* Controles de estoque */}
              <div className="grid grid-cols-3 gap-4">
                                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Estoque mínimo</label>
                   <input
                     type="number"
                     value={produtoEditado?.quantidadeMinima || 0}
                     onChange={(e) => handleEditarEstoqueMinimo(Number(e.target.value))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                     min="0"
                   />
                 </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque atual</label>
                  <input
                    type="number"
                    value={produto.quantidade}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setShowAlterarEstoque(true)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
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
          ) : (
            /* Aba Ficha Técnica */
            <div className="space-y-6">
              {/* Informações de preço */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>Preço de custo: {formatCurrency(produto.precoCusto)}</p>
                <p>Preço de venda: {formatCurrency(produto.precoUnitario)}</p>
                <p>Custo da ficha técnica: R$ 0,00</p>
              </div>

              {/* Status do estoque */}
              <div className="flex items-center space-x-4">
                {getStatusBadge(produto.status)}
              </div>

              {/* Campo de busca de insumos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesquise e adicione um insumo
        </label>
                               <div className="flex space-x-2">
                 <div className="flex-1 relative">
                   <input
                     type="text"
                     placeholder="Pesquise e adicione um insumo"
                     value={novoInsumo}
                     onChange={(e) => setNovoInsumo(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' && handleAdicionarInsumo()}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                   />
                 </div>
                 <button
                   onClick={handleAdicionarInsumo}
                   disabled={!novoInsumo.trim()}
                   className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                 >
                   Adicionar
                 </button>
               </div>
              </div>

              {/* Tabela de insumos */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insumo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtde</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permite negativo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {insumos.map((insumo) => (
                      <tr key={insumo.id}>
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{insumo.nome}</div>
                            <div className="text-xs text-gray-500">{insumo.categoria}</div>
                          </div>
                        </td>
                                                 <td className="px-4 py-3">
                           <input
                             type="number"
                             value={insumo.quantidade}
                             onChange={(e) => handleEditarInsumo(insumo.id, 'quantidade', Number(e.target.value))}
                             className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                             min="0"
                           />
                           <span className="ml-1 text-xs text-gray-500">UN</span>
                         </td>
                         <td className="px-4 py-3">
                           <div>
                             <input
                               type="number"
                               value={insumo.custo}
                               onChange={(e) => handleEditarInsumo(insumo.id, 'custo', Number(e.target.value))}
                               className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                               min="0"
                               step="0.01"
                             />
                             <div className="text-xs text-gray-500">0%</div>
                           </div>
                         </td>
                         <td className="px-4 py-3">
                           <select
                             value={insumo.estoque}
                             onChange={(e) => handleEditarInsumo(insumo.id, 'estoque', e.target.value)}
                             className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${
                               insumo.estoque === 'Crítico' 
                                 ? 'bg-red-100 text-red-800' 
                                 : 'bg-gray-100 text-gray-800'
                             }`}
                           >
                             <option value="Crítico">Crítico</option>
                             <option value="Sem controle">Sem controle</option>
                             <option value="Normal">Normal</option>
                           </select>
                         </td>
                         <td className="px-4 py-3">
                           <button
                             onClick={() => handleEditarInsumo(insumo.id, 'permiteNegativo', !insumo.permiteNegativo)}
                             className={`text-sm px-2 py-1 rounded ${
                               insumo.permiteNegativo 
                                 ? 'bg-green-100 text-green-800' 
                                 : 'bg-gray-100 text-gray-800'
                             }`}
                           >
                             {insumo.permiteNegativo ? 'Sim' : 'Não'}
                           </button>
                         </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleRemoverInsumo(insumo.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Remover insumo"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Alterar Estoque */}
      {showAlterarEstoque && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Alterar estoque</h3>
              <button
                onClick={() => setShowAlterarEstoque(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nome do produto */}
            <div className="px-6 py-2">
              <p className="text-sm text-gray-600">{produto.nome}</p>
            </div>

            {/* Abas de operação */}
            <div className="px-6 py-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setTipoOperacao('adicionar')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    tipoOperacao === 'adicionar'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp size={20} />
                  <span>ADICIONAR</span>
                </button>
                <button
                  onClick={() => setTipoOperacao('retirar')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    tipoOperacao === 'retirar'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Minus size={20} />
                  <span>RETIRAR</span>
                </button>
              </div>
            </div>

            {/* Informações de estoque */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atual</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                    {produto.quantidade}
                  </div>
                </div>
        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {tipoOperacao === 'adicionar' ? 'Adicionar' : 'Retirar'}
          </label>
                  <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atualizado</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                    {tipoOperacao === 'adicionar' 
                      ? produto.quantidade + quantidade 
                      : Math.max(0, produto.quantidade - quantidade)
                    }
                  </div>
                </div>
              </div>

              {/* Informações de custo */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custo atual</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                    {formatCurrency(produto.precoCusto)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custo unitário</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                    {formatCurrency(produto.precoCusto)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custo médio</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                    {formatCurrency(produto.precoCusto)}
                  </div>
                </div>
              </div>

              {/* Campo de descrição */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  placeholder="Atualização de estoque"
                />
              </div>
            </div>

            {/* Botão de salvar */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleAlterarEstoque}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
} 
