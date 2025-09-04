import { useMemo } from 'react';
import { InsumosTranslations } from '../types';

export function useInsumosTranslation(): InsumosTranslations {
  const translations = useMemo(() => ({
    title: 'Insumos',
    subtitle: 'Gerenciamento de insumos em estoque',
    
    stats: {
      totalInsumos: 'Total de Insumos',
      baixoEstoque: 'Baixo Estoque',
      semEstoque: 'Sem Estoque',
      valorTotal: 'Valor Total'
    },
    
    table: {
      nome: 'Insumo',
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
      detalhesInsumo: 'Detalhes do Insumo',
      alterarEstoque: 'Alterar Estoque',
      salvar: 'Salvar',
      cancelar: 'Cancelar'
    },
    
    error: {
      title: 'Erro ao carregar dados',
      message: 'Ocorreu um erro ao carregar os dados dos insumos',
      retry: 'Tentar novamente'
    }
  }), []);

  return translations;
}
