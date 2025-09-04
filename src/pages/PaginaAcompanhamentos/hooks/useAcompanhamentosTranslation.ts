import { useMemo } from 'react';
import { AcompanhamentosTranslations } from '../types';

export function useAcompanhamentosTranslation(): AcompanhamentosTranslations {
  const translations = useMemo(() => ({
    title: 'Acompanhamentos',
    subtitle: 'Gerenciamento de acompanhamentos em estoque',
    
    stats: {
      totalProdutos: 'Total de Acompanhamentos',
      baixoEstoque: 'Baixo Estoque',
      semEstoque: 'Sem Estoque',
      valorTotal: 'Valor Total'
    },
    
    table: {
      nome: 'Produto',
      categoria: 'Categoria',
      quantidade: 'Quantidade',
      quantidadeMinima: 'Mínimo',
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
      message: 'Ocorreu um erro ao carregar os dados dos acompanhamentos',
      retry: 'Tentar novamente'
    }
  }), []);

  return translations;
}
