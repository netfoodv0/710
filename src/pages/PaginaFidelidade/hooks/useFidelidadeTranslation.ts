import { useMemo } from 'react';

export function useFidelidadeTranslation() {
  const translations = useMemo(() => ({
    // Títulos e cabeçalhos
    title: 'Fidelidade',
    subtitle: 'Sistema de fidelidade e recompensas',
    
    // Sistemas
    sistemaPontos: 'Sistema de Pontos',
    sistemaCashback: 'Sistema de Cashback',
    
    // Seções
    configuracoes: 'Configurações',
    produtos: 'Produtos',
    clientes: 'Clientes',
    
    // Configurações de pontos
    pontosPorReal: 'Pontos por Real',
    pontosBoasVindas: 'Pontos de Boas-vindas',
    
    // Configurações de cashback
    taxaCashback: 'Taxa de Cashback (%)',
    validadeCashback: 'Validade (dias)',
    
    // Ações
    adicionarProduto: 'Adicionar Produto',
    exportarDados: 'Exportar Dados',
    migrarSistema: 'Migrar Sistema',
    
    // Estatísticas
    totalClientes: 'Total de Clientes',
    totalPontos: 'Total de Pontos',
    totalProdutos: 'Total de Produtos',
    
    // Status
    ativo: 'Ativo',
    inativo: 'Inativo',
    
    // Mensagens
    carregando: 'Carregando dados de fidelidade...',
    erro: 'Erro ao carregar dados de fidelidade',
    
    // Migração
    migracaoCashbackParaPontos: 'Migrar de Cashback para Pontos',
    migracaoPontosParaCashback: 'Migrar de Pontos para Cashback',
    
    // Produtos
    nomeProduto: 'Nome do Produto',
    categoria: 'Categoria',
    pontosNecessarios: 'Pontos Necessários',
    valorOriginal: 'Valor Original',
    estoque: 'Estoque',
    
    // Clientes
    nomeCliente: 'Nome do Cliente',
    telefone: 'Telefone',
    pontosAcumulados: 'Pontos Acumulados',
    pontosUtilizados: 'Pontos Utilizados',
    saldoAtual: 'Saldo Atual',
    ultimaCompra: 'Última Compra'
  }), []);

  return translations;
}
