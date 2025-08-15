import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Star, TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart } from 'lucide-react';
import { DadosRelatorios } from '../types/relatorios.types';
import { FormSection } from '../../../components/forms/FormSection';

interface TabelaTopProdutosProps {
  dados: DadosRelatorios | null;
}

type OrdenacaoTipo = 'nome' | 'vendas' | 'receita' | 'avaliacaoMedia' | 'crescimento';
type OrdenacaoDirecao = 'asc' | 'desc';

export const TabelaTopProdutos: React.FC<TabelaTopProdutosProps> = ({ dados }) => {
  const [ordenacao, setOrdenacao] = useState<OrdenacaoTipo>('receita');
  const [direcao, setDirecao] = useState<OrdenacaoDirecao>('desc');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const handleOrdenacao = (campo: OrdenacaoTipo) => {
    if (ordenacao === campo) {
      setDirecao(direcao === 'asc' ? 'desc' : 'asc');
    } else {
      setOrdenacao(campo);
      setDirecao('desc');
    }
    setPaginaAtual(1);
  };

  const produtosOrdenados = useMemo(() => {
    if (!dados?.topProdutos) return [];

    const produtos = [...dados.topProdutos];
    
    produtos.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      switch (ordenacao) {
        case 'nome':
          valorA = a.nome.toLowerCase();
          valorB = b.nome.toLowerCase();
          break;
        case 'vendas':
          valorA = a.vendas;
          valorB = b.vendas;
          break;
        case 'receita':
          valorA = a.receita;
          valorB = b.receita;
          break;
        case 'avaliacaoMedia':
          valorA = a.avaliacaoMedia;
          valorB = b.avaliacaoMedia;
          break;
        case 'crescimento':
          valorA = a.crescimentoVendas;
          valorB = b.crescimentoVendas;
          break;
        default:
          return 0;
      }

      if (valorA < valorB) return direcao === 'asc' ? -1 : 1;
      if (valorA > valorB) return direcao === 'asc' ? 1 : -1;
      return 0;
    });

    return produtos;
  }, [dados?.topProdutos, ordenacao, direcao]);

  const produtosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return produtosOrdenados.slice(inicio, fim);
  }, [produtosOrdenados, paginaAtual]);

  const totalPaginas = Math.ceil(produtosOrdenados.length / itensPorPagina);

  const renderIconeOrdenacao = (campo: OrdenacaoTipo) => {
    if (ordenacao !== campo) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return direcao === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarPorcentagem = (valor: number) => {
    const sinal = valor >= 0 ? '+' : '';
    return `${sinal}${valor.toFixed(1)}%`;
  };

  const obterCorCrescimento = (crescimento: number) => {
    if (crescimento > 0) return 'text-green-600';
    if (crescimento < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const obterIconeCrescimento = (crescimento: number) => {
    if (crescimento > 0) return <TrendingUp className="w-3 h-3" />;
    if (crescimento < 0) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  if (!dados) {
    return (
      <FormSection
        title="Top Produtos"
        description="Produtos mais vendidos e performance"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection
      title="Top Produtos"
      description="Produtos mais vendidos e performance"
    >


      {/* Tabela */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200" style={{ height: '73px' }}>
              <tr>
                <th className="px-4 py-3 text-left" style={{ height: '73px' }}>
                  <button
                    onClick={() => handleOrdenacao('nome')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Produto
                    {renderIconeOrdenacao('nome')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left" style={{ height: '73px' }}>
                  <button
                    onClick={() => handleOrdenacao('vendas')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Vendas
                    {renderIconeOrdenacao('vendas')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left" style={{ height: '73px' }}>
                  <button
                    onClick={() => handleOrdenacao('receita')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Receita
                    {renderIconeOrdenacao('receita')}
                  </button>
                </th>

                <th className="px-4 py-3 text-left" style={{ height: '73px' }}>
                  <button
                    onClick={() => handleOrdenacao('crescimento')}
                    className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Crescimento
                    {renderIconeOrdenacao('crescimento')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ height: '73px' }}>
                  Categoria
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtosPaginados.map((produto, index) => {
                const posicaoGlobal = (paginaAtual - 1) * itensPorPagina + index + 1;
                return (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">#{posicaoGlobal}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                          <div className="text-xs text-gray-500">ID: {produto.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {(produto.vendas || 0).toLocaleString('pt-BR')}
                      </div>
                      <div className="text-xs text-gray-500">unidades</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatarMoeda(produto.receita)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatarMoeda(produto.vendas > 0 ? produto.receita / produto.vendas : 0)} / unidade
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 text-sm font-medium ${obterCorCrescimento(produto.crescimentoVendas)}`}>
                        {obterIconeCrescimento(produto.crescimentoVendas)}
                        {formatarPorcentagem(produto.crescimentoVendas)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {produto.categoria}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
                  disabled={paginaAtual === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))}
                  disabled={paginaAtual === totalPaginas}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando{' '}
                    <span className="font-medium">{(paginaAtual - 1) * itensPorPagina + 1}</span>
                    {' '}até{' '}
                    <span className="font-medium">
                      {Math.min(paginaAtual * itensPorPagina, produtosOrdenados.length)}
                    </span>
                    {' '}de{' '}
                    <span className="font-medium">{produtosOrdenados.length}</span>
                    {' '}resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
                      disabled={paginaAtual === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    
                    {[...Array(totalPaginas)].map((_, i) => {
                      const pagina = i + 1;
                      if (
                        pagina === 1 ||
                        pagina === totalPaginas ||
                        (pagina >= paginaAtual - 1 && pagina <= paginaAtual + 1)
                      ) {
                        return (
                          <button
                            key={pagina}
                            onClick={() => setPaginaAtual(pagina)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagina === paginaAtual
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pagina}
                          </button>
                        );
                      } else if (
                        pagina === paginaAtual - 2 ||
                        pagina === paginaAtual + 2
                      ) {
                        return (
                          <span
                            key={pagina}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))}
                      disabled={paginaAtual === totalPaginas}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próximo
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
};