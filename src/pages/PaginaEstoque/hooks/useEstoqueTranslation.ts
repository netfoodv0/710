import { useMemo } from 'react';
import { EstoqueTranslations } from '../types';

export function useEstoqueTranslation(): EstoqueTranslations {
  const translations = useMemo(() => ({
    title: 'Estoque',
    subtitle: 'Gerenciamento de produtos em estoque',
    
    stats: {
      totalProdutos: 'Total de Produtos',
      baixoEstoque: 'Baixo Estoque',
      semEstoque: 'Sem Estoque',
      valorTotal: 'Valor Total'
    },
    
    table: {
      nome: 'Produto',
      categoria: 'Categoria',
      quantidade: 'Estoque Atual',
      quantidadeMinima: 'Estoque Mínimo',
      precoCusto: 'Preço Custo',
      custoEstoque: 'Custo Estoque',
      status: 'Status',
      acoes: 'Ações'
    },
    
    modals: {
      editarEstoque: 'Editar Estoque',
      detalhesProduto: 'Detalhes do Produto',
      alterarEstoque: 'Alterar Estoque',
      salvar: 'Salvar',
      cancelar: 'Cancelar'
    },
    
    error: {
      title: 'Erro ao carregar dados',
      message: 'Ocorreu um erro ao carregar os dados do estoque',
      retry: 'Tentar novamente'
    }
  }), []);

  return translations;
}


