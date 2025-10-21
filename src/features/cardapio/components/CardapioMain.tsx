import { useMemo, useEffect } from 'react';

import { ListaProdutos } from '../../../components/lists/ListaProdutos';
import { ComplementoInfo } from '../../../components/cards/ComplementoInfo';
import { ComplementosList } from '../../../components/cards/ComplementosList';
import { useCardapioModals } from '../../../context/CardapioModalsContext';
import { useCardapioContext } from '../../../context/CardapioContext';
import { useCardapioData } from '../hooks/useCardapioData';
import { useCardapioActions } from '../hooks/useCardapioActions';

export function CardapioMain() {
  const { 
    openModalNovoProduto, 
    onProdutoCriado, 
    openModalNovoComplemento, 
    onComplementoCriado 
  } = useCardapioModals();
  
  const { state } = useCardapioContext();
  
  // Hook customizado para gerenciar dados
  const {
    produtos,
    categorias,
    complementos,
    loading,
    recarregarProdutos,
    recarregarComplementos
  } = useCardapioData();

  // Hook customizado para gerenciar ações
  const {
    handleExcluirProduto,
    handleDuplicarProduto,
    handleToggleStatusProduto,
    handleExcluirComplemento,
    handleDuplicarComplemento,
    handleToggleStatusComplemento
  } = useCardapioActions({
    onProdutoDeleted: recarregarProdutos,
    onProdutoDuplicated: recarregarProdutos,
    onProdutoStatusChanged: recarregarProdutos,
    onComplementoDeleted: recarregarComplementos,
    onComplementoDuplicated: recarregarComplementos,
    onComplementoStatusChanged: recarregarComplementos
  });
  
  const categoriaSelecionada = state.filtros.categoria;
  const complementoSelecionado = state.filtros.complementoSelecionado;
  const abaAtiva = state.filtros.abaAtiva || 'produtos';

  // Determinar a categoria correta baseada na aba ativa
  const categoriaAtiva = useMemo(() => {
    if (abaAtiva === 'complementos') {
      // Para complementos, usar a categoria do complemento selecionado
      if (complementoSelecionado && complementoSelecionado.categoria) {
        return complementoSelecionado.categoria;
      }
      // Se não há complemento selecionado, usar 'todos' para mostrar todos os complementos
      return 'todos';
    } else {
      // Para produtos, usar a categoria selecionada normalmente
      return categoriaSelecionada;
    }
  }, [abaAtiva, categoriaSelecionada, complementoSelecionado]);

  // Registrar callback para recarregar produtos quando um novo for criado
  useEffect(() => {
    if (onProdutoCriado) {
      onProdutoCriado(recarregarProdutos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem

  // Registrar callback para recarregar complementos quando um novo for criado
  useEffect(() => {
    if (onComplementoCriado) {
      onComplementoCriado(recarregarComplementos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem

  // Filtrar produtos pela categoria selecionada
  const produtosFiltrados = useMemo(() => {
    if (!categoriaSelecionada || categoriaSelecionada === 'todos') {
      return produtos;
    }
    return produtos.filter(produto => produto.categoria === categoriaSelecionada);
  }, [produtos, categoriaSelecionada]);

  // Converter produtos para o formato esperado pelo ListaProdutos
  const produtosFormatados = useMemo(() => {
    return produtosFiltrados.map(produto => ({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.precoVenda,
      categoriaId: produto.categoria,
      categoriaNome: produto.categoria,
      ativo: produto.status === 'ativo',
      destacado: false,
      posicao: 0,
      lojaId: produto.lojaId,
      imagem: produto.imagem,
      tempoPreparo: 0,
      dataCriacao: produto.dataCriacao,
      dataAtualizacao: produto.dataAtualizacao
    }));
  }, [produtosFiltrados]);

  // Converter produtos para o formato completo para edição
  const produtosParaEdicao = useMemo(() => {
    return produtosFiltrados.map(produto => ({
      id: produto.id,
      lojaId: produto.lojaId,
      nome: produto.nome,
      categoria: produto.categoria,
      descricao: produto.descricao,
      precoVenda: produto.precoVenda,
      precoCusto: produto.precoCusto,
      estoqueAtual: produto.estoqueAtual,
      estoqueMinimo: produto.estoqueMinimo || 0,
      controleEstoque: produto.controleEstoque || false,
      status: produto.status,
      codigoBarras: produto.codigoBarras,
      codigoSku: produto.codigoSku,
      unidadeMedida: produto.unidadeMedida,
      imagem: produto.imagem,
      horariosDisponibilidade: produto.horariosDisponibilidade || [],
      dataCriacao: produto.dataCriacao,
      dataAtualizacao: produto.dataAtualizacao
    }));
  }, [produtosFiltrados]);

  const nomesCategorias = useMemo(() => {
    return categorias.map(cat => cat.nome);
  }, [categorias]);

  // Mostrar loading state
  if (loading) {
    return (
      <div className="flex-1 space-y-6">
        <div className="bg-white/60 border-2 rounded-2xl" style={{ borderColor: 'white' }}>
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Carregando cardápio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Conteúdo baseado na aba ativa */}
      {abaAtiva === 'complementos' ? (
        /* Lista de Complementos */
        <div className="bg-white/60 border-2 rounded-2xl" style={{ borderColor: 'white' }}>
          <div className="p-4">
            <ComplementosList
              complementos={complementos}
              categorias={[]}
              onCreate={() => {
                // Passar a categoria ativa para o modal
                const categoriaAtual = categoriaAtiva === 'todos' ? '' : categoriaAtiva;
                openModalNovoComplemento(null, categoriaAtual);
              }}
              onEdit={(complemento) => {
                // Encontrar o complemento completo para edição
                const complementoCompleto = complementos.find(comp => comp.id === complemento.id);
                if (complementoCompleto) {
                  openModalNovoComplemento(complementoCompleto);
                }
              }}
              onDelete={handleExcluirComplemento}
              onDuplicate={handleDuplicarComplemento}
              onToggleStatus={handleToggleStatusComplemento}
              categoriaSelecionada={categoriaAtiva}
              onShowCategoryToast={() => {}}
              onReorderComplementos={() => {}}
            />
          </div>
        </div>
      ) : complementoSelecionado ? (
        /* Informações do Complemento Selecionado */
        <ComplementoInfo complemento={complementoSelecionado} />
      ) : (
        /* Lista de Produtos */
        <div className="bg-white/60 border-2 rounded-2xl" style={{ borderColor: 'white' }}>
          <div className="p-4">
            <ListaProdutos
              produtos={produtosFormatados}
              categorias={nomesCategorias}
              onCreate={() => {
                // Passar a categoria selecionada para o modal
                const categoriaAtual = categoriaSelecionada === 'todos' ? '' : categoriaSelecionada;
                openModalNovoProduto(null, categoriaAtual);
              }}
              onEdit={(produto: any) => {
                // Encontrar o produto completo para edição
                const produtoCompleto = produtosParaEdicao.find(p => p.id === produto.id);
                if (produtoCompleto) {
                  openModalNovoProduto(produtoCompleto);
                }
              }}
              onDelete={(produtoId: string) => handleExcluirProduto(produtoId, produtos)}
              onDuplicate={handleDuplicarProduto}
              onToggleStatus={handleToggleStatusProduto}
              categoriaSelecionada={categoriaSelecionada}
              onShowCategoryToast={() => {}}
              onReorderProdutos={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
